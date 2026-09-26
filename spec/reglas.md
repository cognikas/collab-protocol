# Reglas

Comportamiento que toda implementación de `collab.v1` debe respetar. Donde hay una función de
referencia en `ts/src/` y vectores en `vectors/`, esos son la definición; este texto los explica.

## Nombres

`slug()` (`ts/src/names.ts`, `vectors/names.json`) produce todos los nombres del canal: temas,
handles, nombres de canal y, con 100 caracteres de máximo, claves de contexto. Solo letras
minúsculas, dígitos, `.`, `_` y `-`, empezando por letra o dígito. Los acentos se pliegan
(«José» es `jose`). Hasta 64 caracteres.

El servidor aplica `slug()` a todo nombre que recibe, así que el cliente puede enviar `@Willy` o
`Collab Global` y el servidor los lee como `willy` y `collab-global`. Un nombre que queda vacío es
inválido.

## Direccionamiento

Todo mensaje tiene destinatario. **No existe el envío a todo el canal.**

| `to` | Llega a |
|---|---|
| `handle` | todas las sesiones de ese miembro, en cualquier tema |
| `topic` | todas las sesiones en ese tema |
| `handle` y `topic` | solo las sesiones de ese miembro en ese tema |
| `handle` y `client_session_id` (con o sin `topic`) | solo esa sesión de ese miembro |

`client_session_id` sirve para hablarle a una sesión concreta cuando un miembro tiene varias, por
ejemplo dos sesiones de Claude Code en el mismo tema. Se copia tal cual de `Member.sessions` o de
`Message.from_client_session_id`: no pasa por `slug()`, distingue mayúsculas y debe cumplir
`isClientSessionId()`. Sin `handle` no nombra a nadie, porque una `client_session_id` solo es única
dentro de su miembro.

Sin `handle` ni `topic`, `Send` falla con `ERROR_CODE_NO_RECIPIENT`. Una `client_session_id` mal
formada, o sin `handle`, falla con `ERROR_CODE_INVALID_CLIENT_SESSION`. El servidor no comprueba que
la sesión esté conectada: si no lo está, `delivered` es 0 y el mensaje espera en el historial hasta
que esa sesión vuelva a conectarse con la misma `client_session_id`. Un handle que no existe falla
con `ERROR_CODE_UNKNOWN_HANDLE`, y el texto del error enumera los handles existentes. El servidor
guarda el destinatario resuelto (`Addressee`), campo por campo: nada más de lo que el cliente puso
en `to` se conserva.

## Visibilidad

`visibleTo()` (`ts/src/visibility.ts`, `vectors/visibility.json`) decide si una sesión puede leer un
mensaje. Es **una sola regla** para el reparto en vivo y para toda lectura de mensajes guardados
(la reproducción de `hello`, `GetState`, `History`). Un servidor no debe reimplementarla por camino:
si dos caminos deciden distinto, un mensaje aparece en uno y no en el otro.

- `to.member_id` limita a las sesiones de ese miembro; `to.topic`, a las sesiones de ese tema; con
  los dos, deben cumplirse ambos.
- `to.client_session_id` limita además a esa sesión de `to.member_id`. Sin miembro no la ve nadie.
- La sesión que envió un mensaje nunca lo recibe de vuelta.
- Las otras sesiones del remitente solo lo reciben si el mensaje lo nombra a él como miembro. Un
  mensaje a un tema es para las otras personas del tema, y así dos sesiones del mismo desarrollador
  no se interrumpen con cada `done`.

Para aplicar la segunda regla, el servidor guarda con cada mensaje la `client_session_id` de la
sesión que lo envió, y la entrega en `from_client_session_id` para que una respuesta pueda volver a
esa misma sesión. No es una credencial: conocerla solo permite dirigirle mensajes a esa sesión, y
enviar como ella exige el secreto de su miembro.

## Mensajes

- `seq` es un número por canal, estrictamente creciente, asignado por el servidor.
- `text` se limpia con `cleanText()` y no puede quedar vacío (`ERROR_CODE_EMPTY_MESSAGE`) ni superar
  `MAX_MESSAGE_CHARS` (`ERROR_CODE_MESSAGE_TOO_LONG`). No se trunca en silencio.
- `type` sin especificar es `NOTE`, y `urgency` sin especificar es `NORMAL`.
- Los clientes solo envían `NOTE`, `QUESTION` y `DONE`. El payload `done` solo acompaña a `DONE`.
  Cualquier otra combinación falla con `ERROR_CODE_INVALID_TYPE`.
- El servidor escribe `CLAIM`, `RELEASE` y `CONTEXT` al tema correspondiente, con urgencia `LOW` y su
  payload, cada vez que alguien reserva, libera o publica.
- Los mensajes caducan a los `MESSAGE_TTL_SECONDS` (30 días).
- Si al enviar no hay **ningún otro miembro** conectado, la urgencia no es `LOW` y el mensaje no es
  para el propio remitente, el servidor puede avisar por un canal externo (en 1.0, un email vía SNS).
  `SendResponse.delivered_offline` dice si lo hizo. Que nadie esté conectado en el tema es normal:
  el mensaje espera en el historial.

## Cursores

El cursor es la marca de agua de lectura de un miembro **en un tema**: el `seq` más alto que dio por
leído. `Ack` lo mueve; el servidor no lo mueve nunca por su cuenta.

- `Subscribe` y `GetState` sin `since` reproducen desde el cursor del miembro en el tema de la sesión.
- Con `since`, desde ese `seq`.
- `ChannelState.cursor` es el punto de partida usado y `latest_seq` el `seq` más alto del canal,
  visible o no para quien pregunta.

Como el cursor es una sola marca, un cliente que entrega mensajes debe entregarlos todos hasta el
`seq` que confirma. Si confirma por encima de un mensaje que no entregó, ese mensaje queda oculto
para siempre.

El cursor es del miembro en el tema, no de la sesión. Un mensaje para otra sesión del mismo miembro
no se le entrega a esta, y esta puede confirmar por encima de él. Por eso, un cliente que reanuda
una sesión debe pedir `since` con el cursor propio de esa sesión, no apoyarse en el del servidor.

## Reservas

Una reserva avisa «estoy trabajando en estas rutas». Es un aviso, no un bloqueo.

- Vale solo en el tema en que se hizo: solo avisa a las sesiones de ese tema.
- Las rutas son globs con separador `/`. Entre 1 y `MAX_CLAIM_PATHS` (`ERROR_CODE_NO_PATHS`,
  `ERROR_CODE_TOO_MANY_PATHS`).
- Caduca sola: `ttl_seconds` sin especificar son 2 horas, con un máximo de 24.
- La puede liberar cualquier sesión de su dueño. `Release` de una reserva que no existe o que no es
  del miembro devuelve `released: false`, no un error.
- Cada cambio envía `ClaimsEvent` con la lista completa del tema a **todas** las sesiones del tema,
  incluida la que hizo el cambio, porque cada cliente mantiene la lista que muestra.

## Contexto compartido

- Cada `PutContext` crea una versión nueva de la clave en el tema de la sesión. Las versiones
  anteriores se pueden leer hasta que caducan (`CONTEXT_TTL_SECONDS`, 180 días).
- La clave pasa por `contextKey()`; si queda vacía, `ERROR_CODE_INVALID_KEY`. El cuerpo no puede
  superar `MAX_CONTEXT_BODY_CHARS` (`ERROR_CODE_CONTEXT_TOO_LARGE`).
- `GetContext` lee del tema de la sesión o, si nombra otro `topic`, de ese tema, en modo lectura.
  Sin `version`, la última. Si no existe, `ERROR_CODE_NOT_FOUND`.
- Cada escritura envía un evento `context` (sin el cuerpo) a las sesiones del tema y un mensaje
  `CONTEXT` al tema.

## Presencia

- Un miembro está `ONLINE` mientras tenga alguna sesión conectada que haya dado señales en los
  últimos `PRESENCE_STALE_SECONDS`. Los clientes conectados envían `Heartbeat` cada
  `HEARTBEAT_SECONDS`.
- `SetPresence` puede declararlo `IDLE` (u `ONLINE` de nuevo) y actualizar `repo` y `branch`.
  `OFFLINE` lo pone el servidor cuando se va la última sesión.
- `Member.sessions` lista una entrada por cada `client_session_id` del miembro con un socket vivo,
  de la más antigua a la más reciente, con su tema, `repo`, `branch` y hora de conexión. Incluye las
  sesiones de quien pregunta, así que un cliente ve también sus otras sesiones. Si una sesión se
  reconecta, sigue siendo una sola entrada. Una sesión que solo usa HTTP cuenta en `connections`
  pero no aparece en `sessions`. `repo` y `branch` de la sesión salen de su `Subscribe` y de los
  `SetPresence` que llegan por su socket. Los de `Member` siguen siendo lo último que declaró
  cualquiera de sus sesiones.
- El servidor envía `PresenceEvent` con la lista completa de miembros a todo el canal cuando cambia
  la presencia de alguien **y con cada `Heartbeat`**. Ese reenvío periódico es lo que mantiene al día
  la lista de cada sesión: un miembro que deja de dar señales sin desconectarse pasa a `OFFLINE` en
  el siguiente reenvío, y uno que solo usa HTTP aparece sin haber abierto un socket.

## Garantías sobre el texto de otros

Todo texto escrito por un miembro es **entrada no confiable** para el agente de quien lo lee. El
protocolo no puede impedir que un mensaje contenga instrucciones; lo que sí garantiza el servidor
(`ts/src/sanitize.ts`, `vectors/sanitize.json`):

- Los campos cortos que se muestran en línea (nombres, ramas, rutas, notas, títulos, resúmenes,
  referencias, tarea de un `done`) pasan por `cleanLine()`: una sola línea, sin caracteres de
  control ni separadores de línea Unicode ni controles de dirección, y recortados a su límite.
- El texto de los mensajes y el cuerpo del contexto pasan por `cleanText()`: conservan saltos de
  línea y tabuladores, pierden el resto de caracteres de control y los controles de dirección.

Cada cliente sigue siendo responsable de presentar ese texto a su agente como lo que es: información
de otra persona, nunca instrucciones.

## Límites

Los valores están en `ts/src/limits.ts` y son parte del contrato. El servidor los aplica, el cliente
puede comprobarlos antes de enviar. Bajar un límite rompe a los clientes que confiaban en él y exige
una versión mayor nueva; subirlo es un cambio menor.

| Límite | Valor |
|---|---|
| Texto de un mensaje | 8 000 caracteres |
| Cuerpo de un contexto | 200 000 caracteres |
| Rutas por reserva | 50, de hasta 300 caracteres |
| Referencias por mensaje | 20, de hasta 300 caracteres |
| Nombre visible | 60 caracteres |
| Repo o rama en la presencia | 200 caracteres |
| Nota de una reserva, resumen de un contexto, tarea de un `done` | 500 caracteres |
| Título de un contexto | 200 caracteres |
| Mensajes por `History` | 100 por defecto, 200 como máximo |
| Mensajes en el estado | 100 por defecto, 500 como máximo |
| Invitación | 24 h por defecto, 7 días como máximo |
| Ticket de WebSocket | 60 s, un solo uso |
