# Cambios

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
