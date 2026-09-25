# Binding WebSocket

Lleva el stream de `ChannelService.Subscribe` y las operaciones unarias de `ChannelService` por un
mismo socket. Los frames son `ClientFrame` y `ServerFrame` (`proto/collab/v1/websocket.proto`) en el
JSON estándar de Protobuf, un frame por mensaje de texto del WebSocket.

## Abrir la conexión

1. Por HTTP, con la credencial del miembro y el contexto de la llamada, pedir un ticket:
   `POST /collab.v1.WebSocketService/IssueTicket` (ver [`http.md`](http.md)).
2. Conectar a `<ws_endpoint>?ticket=<ticket>`.

El ticket es opaco, de un solo uso y vale `WS_TICKET_TTL_SECONDS` (60 s). Lleva dentro el miembro, el
tema y la `client_session_id`, que quedan fijos para toda la conexión. Existe para que el secreto del
miembro nunca aparezca en la URL de un WebSocket, que acaba en los logs de acceso.

## Suscribirse

El **primer frame** debe ser `subscribe`:

```json
{ "requestId": "r1", "subscribe": { "client": { "name": "collab-channel", "version": "1.0.0", "protocol": { "major": 1 } } } }
```

El servidor responde con un frame `hello` (no con un `result`), que lleva el estado, la versión
acordada y las capacidades comunes. Desde ahí llegan los eventos a medida que ocurren: `message`,
`presence`, `claims`, `context`.

Cualquier otro frame antes de `subscribe` recibe un `error` con `ERROR_CODE_BAD_REQUEST`. Si el
servidor no habla la mayor del cliente, responde `ERROR_CODE_UNSUPPORTED_PROTOCOL` y cierra.

## Operaciones

Cada operación unaria es un caso de `ClientFrame.request`. Si el frame lleva `requestId`, la
respuesta llega como `result` con el mismo `requestId` y el caso correspondiente de
`Result.response` (mismo número de campo que la petición). Sin `requestId`, no hay `result`; los
errores se envían igual.

```json
{ "requestId": "r2", "send": { "text": "listo", "to": { "topic": "collab-global" } } }
{ "result": { "requestId": "r2", "send": { "seq": 53, "delivered": 1 } } }
```

Un error es un frame `error` con `code`, `message` y, si la petición tenía, `requestId`.

## Mantener la conexión

- `heartbeat` cada `HEARTBEAT_SECONDS` (30 s). Mantiene al miembro `ONLINE` y evita el corte por
  inactividad.
- El servidor puede cerrar la conexión en cualquier momento (en AWS, API Gateway la corta a las 2 h
  como mucho). El cliente pide otro ticket, reconecta y vuelve a suscribirse con `since` igual al
  último `seq` que recibió, para no perder nada.
- Un frame en una conexión que el servidor ya no conoce recibe `ERROR_CODE_UNKNOWN_CONNECTION`: hay
  que reconectar.
- Si el miembro es revocado, el servidor cierra sus conexiones y responde `ERROR_CODE_REVOKED` a
  cualquier frame. Reintentar no sirve.

## Tamaño

API Gateway limita cada mensaje de WebSocket a 128 KB. Un `PutContext` más grande que eso debe ir por
HTTP, que admite el cuerpo completo (`MAX_CONTEXT_BODY_CHARS`).
