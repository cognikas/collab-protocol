# Reglas

Comportamiento que toda implementación de `collab.v1` debe respetar. Donde hay una función de
referencia en `ts/src/` y vectores en `vectors/`, esos son la definición; este texto los explica.

## Nombres

`slug()` (`ts/src/names.ts`, `vectors/names.json`) produce todos los nombres del canal: temas,
handles, nombres de canal, claves de listas de tareas (`taskListKey()`) y, con 100 caracteres de
máximo, claves de contexto. Solo letras
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
- La excepción es `to.include_sender`: con él, las otras sesiones del remitente también lo
  reciben (la que lo envió sigue sin recibirlo). Solo lo pone el servidor, en los avisos de tareas:
  lo que una sesión hizo en una lista compartida lo tienen que saber también las otras sesiones de
  ese desarrollador en el tema. `Recipient` no lo tiene.

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
  payload, cada vez que alguien reserva, libera o publica. También escribe `TASK` con cada cambio en
  una lista de tareas (ver [Tareas](#tareas)).
- Los mensajes caducan a los `MESSAGE_TTL_SECONDS` (30 días).
- Si al enviar no hay **ningún otro miembro** conectado, la urgencia no es `LOW`, el mensaje no es
  para el propio remitente y no es un aviso de tareas, el servidor puede avisar por un canal externo
  (en 1.0, un email vía SNS).
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

## Tareas

Una lista de tareas es un checklist con nombre dentro de un tema: sirve para repartirse el trabajo
y dejar constancia de cómo avanzó. Un tema puede tener varias.

- **Listas.** `CreateTaskList` crea la lista en el tema de la sesión. La clave pasa por
  `taskListKey()`; si queda vacía, `ERROR_CODE_INVALID_KEY`. Crear una clave que ya existe en el tema
  no es un error: devuelve la lista tal cual, con `created: false`.
- **Tareas.** `AddTasks` agrega tareas a una lista del tema de la sesión, numeradas desde 1 en el
  orden en que llegan (`rc5#3`). El número no se reutiliza. Entre 1 y `MAX_TASKS_PER_ADD` por
  llamada y hasta `MAX_TASKS_PER_LIST` por lista; un título vacío, un campo por encima de su límite o
  demasiadas tareas fallan con `ERROR_CODE_INVALID_TASK`. Una lista o tarea que no existe,
  `ERROR_CODE_NOT_FOUND`.
- **Estados.** Una tarea está `OPEN` (nadie la tiene), `IN_PROGRESS` (la tiene `holder`), `DONE` o
  `DISMISSED`. Las dos primeras son abiertas y las dos últimas cerradas. Una tarea cerrada no
  cambia más (`ERROR_CODE_TASK_CLOSED`), y nada se borra: descartar es un borrado suave.
- **Quién puede qué** (`UpdateTask`). Los permisos son del miembro, no de la sesión: quien tiene una
  tarea puede actuar sobre ella desde cualquiera de sus sesiones y temas, nombrando el `topic` de la
  lista.

  | Cambio | Desde | Quién | Queda |
  |---|---|---|---|
  | `checkout` | `OPEN` | cualquiera | `IN_PROGRESS` |
  | `checkout` | `IN_PROGRESS` propia | su holder (pasa a la sesión que llama) | `IN_PROGRESS` |
  | `checkout` con `takeover` | `IN_PROGRESS` ajena sin cambios en `TASK_STALE_SECONDS` (2 h) | cualquiera | `IN_PROGRESS` |
  | `progress` | `IN_PROGRESS` | su holder | `IN_PROGRESS` |
  | `release` | `IN_PROGRESS` | su holder | `OPEN` |
  | `finish` | `OPEN` (la toma y la termina) o `IN_PROGRESS` propia | cualquiera, o su holder | `DONE` |
  | `dismiss` | `OPEN` o `IN_PROGRESS` | quien la creó o su holder | `DISMISSED` |

  Tomar una tarea ajena sin `takeover`, o antes de tiempo, falla con `ERROR_CODE_TASK_TAKEN`, y el
  texto del error dice quién la tiene y desde cuándo. Cualquier otro cambio que el miembro no puede
  hacer falla con `ERROR_CODE_NOT_TASK_HOLDER`. `progress` exige texto y `dismiss` exige motivo
  (`ERROR_CODE_INVALID_TASK`); `percent` va de 0 a 100.
- **Lo que queda.** `holder` se conserva al terminar (dice quién la hizo) y se borra al soltarla.
  `last_progress` es el último reporte; los anteriores quedan en los mensajes del canal.
  `resolution` guarda el resumen de `finish` o el motivo de `dismiss`. Las tareas y las listas no
  caducan.
- **Consultas.** `ListTasks` lee el tema de la sesión o, si nombra otro `topic`, ese tema. Por
  defecto devuelve solo las abiertas (`TASK_FILTER_OPEN`); las cerradas se piden con
  `TASK_FILTER_CLOSED` o `TASK_FILTER_ALL`. Las abiertas van por lista y número; las cerradas
  después, de la más reciente a la más antigua. `truncated` dice si `limit` dejó tareas fuera.
  `ListTasks` es solo HTTP, como `GetState`: una lista entera puede superar el límite de un mensaje
  de WebSocket. `ChannelState.task_lists` trae las listas del tema que tienen tareas abiertas, con
  sus contadores.
- **Avisos.** Cada cambio escribe un mensaje `TASK` a `{topic: <tema de la lista>, include_sender:
  true}`, con el payload `task`: la lista con sus contadores después del cambio, los números de las
  tareas y el evento. Llega a todas las sesiones del tema salvo la que actuó, incluidas las otras
  sesiones de quien actuó. Un `AddTasks` escribe un solo aviso. El texto lo escribe el servidor.

  | Evento | Urgencia |
  |---|---|
  | `ADDED`, `CHECKED_OUT`, `PROGRESS`, `RELEASED` | `LOW` |
  | `DONE`, `DISMISSED`, y `CHECKED_OUT` cuando es un `takeover` | `NORMAL` |

  Así los reportes de avance no interrumpen a nadie por sí solos, y el cierre de una tarea sí. Los
  avisos de tareas nunca salen por el canal externo de avisos.

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
  referencias, tarea de un `done`, títulos de tareas y de listas, reportes de avance, resúmenes y
  motivos de cierre) pasan por `cleanLine()`: una sola línea, sin caracteres de
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
| Título de una lista de tareas | 200 caracteres |
| Título de una tarea | 300 caracteres |
| Referencias por tarea | 5, de hasta 300 caracteres |
| Reporte de avance, resumen de `finish`, motivo de `dismiss`, nota de `release` | 500 caracteres |
| Tareas por `AddTasks` | 25 |
| Tareas por lista | 500 |
| Tareas por `ListTasks` | 100 por defecto, 500 como máximo |
| Listas de tareas en el estado | 50 |
| Tiempo sin cambios para tomar una tarea ajena | 2 h |
| Mensajes por `History` | 100 por defecto, 200 como máximo |
| Mensajes en el estado | 100 por defecto, 500 como máximo |
| Invitación | 24 h por defecto, 7 días como máximo |
| Ticket de WebSocket | 60 s, un solo uso |
