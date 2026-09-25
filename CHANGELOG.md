# Cambios

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
