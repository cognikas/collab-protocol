# Cambios

## 1.0.0-rc.5 — 2026-09-28

- **`HistoryRequest.as_member`:** `History` puede leer como el miembro y no como la sesión que
  llama. Además de lo que ya devolvía, trae lo que enviaron las sesiones del miembro (también la que
  llama) y lo dirigido a cualquiera de sus sesiones. El tema sigue aplicando. Es para un cliente que
  muestra la conversación entera de un miembro, como un panel (`spec/reglas.md`, Leer como miembro).
- **`HistoryResponse.as_member`** confirma que el servidor lo aplicó. Un servidor anterior ignora el
  campo de la petición y deja este en falso, así que el cliente sabe qué recibió.
- **`HistoryResponse.truncated`:** avisa que pudieron quedar fuera mensajes legibles posteriores a
  `since`, porque eran más que `limit` o más antiguos de lo que el servidor lee de una vez. Los que
  llegan siguen siendo los más nuevos. Así un cliente no tiene que adivinar el límite interno del
  servidor para saber si su historial está completo.
- `visibleTo()` lo recibe como `Viewer.asMember`. El reparto en vivo, `hello` y `GetState` no lo
  usan.
- Nuevos vectores en `asMemberCases` de `vectors/visibility.json`. Los existentes no cambian.
- El protocolo sigue siendo `1.0`: todo es aditivo y 1.0 aún no se ha publicado.

## 1.0.0-rc.4 — 2026-09-27

- **Listas de tareas** compartidas por tema (`TaskList`, `Task`, `TaskStatus`), con cuatro
  operaciones nuevas en `ChannelService`:
  - `CreateTaskList` crea una lista y es idempotente.
  - `AddTasks` agrega tareas numeradas por lista.
  - `UpdateTask` toma, reporta avance, suelta, termina o descarta una tarea.
  - `ListTasks` devuelve las abiertas por defecto y las cerradas cuando se piden. Solo existe por
    HTTP.

  Quien tiene una tarea es su dueño. Descartar es un borrado suave: la tarea queda, con su motivo
  (`spec/reglas.md`, Tareas).
- Cada cambio escribe un mensaje `MESSAGE_TYPE_TASK`, con el payload `TaskPayload`, al tema de la
  lista. Los cierres tienen urgencia `NORMAL` y el resto `LOW`.
- **`Addressee.include_sender`:** con él, un aviso también llega a las otras sesiones de quien lo
  causó. Solo lo pone el servidor, en los avisos de tareas, y `visibleTo()` lo aplica
  (`spec/reglas.md`, Visibilidad).
- **`ChannelState.task_lists`:** las listas del tema con tareas abiertas y sus contadores.
- `ClientFrame` y `Result` tienen tres casos nuevos: `create_task_list`, `add_tasks` y
  `update_task`.
- **Códigos de error nuevos:** `ERROR_CODE_INVALID_TASK`, `ERROR_CODE_TASK_TAKEN` (409),
  `ERROR_CODE_TASK_CLOSED` (409) y `ERROR_CODE_NOT_TASK_HOLDER` (403).
- **Otros agregados:** `taskListKey()` y los límites de tareas en `limits.ts`.
- Nuevos vectores de visibilidad, de nombres y de formato. Los existentes no cambian.
- El protocolo sigue siendo `1.0`: todo es aditivo y 1.0 aún no se ha publicado.

## 1.0.0-rc.3 — 2026-09-25

- Un mensaje puede ir a **una sola sesión** de un miembro: `Recipient.client_session_id`, junto con
  `handle`. Sirve cuando un miembro tiene varias sesiones abiertas, incluso en el mismo tema. El
  destinatario resuelto la guarda en `Addressee.client_session_id`, y `visibleTo()` la aplica
  (`spec/reglas.md`, Direccionamiento y Visibilidad).
- Cada mensaje dice qué sesión lo envió (`Message.from_client_session_id`), para que la respuesta
  pueda volver a esa sesión. La `client_session_id` deja de ser un dato que nunca sale del servidor.
- La presencia lista las sesiones vivas de cada miembro (`Member.sessions`, `MemberSession`), con su
  tema, repo, rama y hora de conexión, incluidas las de quien pregunta.
- Nuevos vectores de visibilidad y de formato para todo lo anterior. Los existentes no cambian.
- El protocolo sigue siendo `1.0`: todo es aditivo y 1.0 aún no se ha publicado.

## 1.0.0-rc.2 — 2026-09-25

- `Heartbeat` también reenvía `PresenceEvent` a todo el canal, como hacía 0.6 con su presencia
  periódica. Sin eso, las listas de miembros de cada sesión quedaban desactualizadas
  (`spec/reglas.md`, Presencia).
- Los vectores se copian a `ts/vectors/` y se exportan como `@collab/protocol/vectors/*.json`, para
  que quien instala solo `ts/` desde git pueda correrlos.
- Se reexportan los tipos `DescMethod`, `DescMessage`, `DescService` y `DescEnum`.

## 1.0.0-rc.1 — 2026-09-25

Primera versión de `collab.v1`, el protocolo de collab-channel 1.0. Conserva el comportamiento del
protocolo 2 (collab-channel 0.6) y cambia su forma: ver
[`spec/README.md`](spec/README.md#qué-cambia-respecto-del-protocolo-2-collab-channel-06).

- Esquema Protobuf con servicios `ChannelService`, `MembershipService`, `AdminService`,
  `ServerInfoService` y `WebSocketService`.
- Bindings WebSocket y HTTP con JSON de Protobuf; todas las operaciones unarias por HTTP.
- Negociación de versión y capacidades al suscribirse.
- Payloads tipados por tipo de mensaje y códigos de error cerrados.
- Vectores de conformidad de nombres, limpieza de texto, visibilidad, negociación y formato JSON.
