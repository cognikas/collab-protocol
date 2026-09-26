# Protocolo del canal — `collab.v1`

Este directorio es la especificación: lo que una implementación debe hacer para hablar con las
demás. El esquema en [`proto/collab/v1/`](../proto/collab/v1/) define **qué** se envía; estos textos
definen **cómo se comporta** cada parte. Si algo no está en el esquema ni aquí, no es parte del
contrato.

| Documento | Contenido |
|---|---|
| [`reglas.md`](reglas.md) | Direccionamiento, visibilidad, cursores, reservas, contexto, presencia, límites y garantías sobre el texto |
| [`versionado.md`](versionado.md) | Versiones, negociación, compatibilidad entre versiones menores, capacidades |
| [`../bindings/websocket.md`](../bindings/websocket.md) | Cómo viajan las operaciones y los eventos por un WebSocket |
| [`../bindings/http.md`](../bindings/http.md) | Cómo viajan las operaciones unarias por HTTP |
| [`../vectors/`](../vectors/) | Casos de conformidad en JSON que toda implementación debe pasar |

## Capas

1. **Modelo** (`model.proto`, `errors.proto`): mensajes, miembros, reservas, contexto, estado, errores.
2. **Operaciones** (`channel.proto`, `membership.proto`, `admin.proto`, `server_info.proto`):
   servicios Protobuf. Se definen como servicios aunque 1.0 no use gRPC, para que gRPC sea un binding
   más y no un rediseño.
3. **Bindings** (`websocket.proto` y `bindings/`): cómo se transporta cada operación. En 1.0 hay dos:
   WebSocket y HTTP, ambos con el JSON estándar de Protobuf.
4. **Reglas y vectores**: el comportamiento que el esquema no puede expresar.

## Conceptos

- **Canal**: el espacio de un equipo. Todo lo que existe (miembros, mensajes, reservas, contexto)
  pertenece a un canal.
- **Miembro** (`member_id`): una credencial, una por instalación de cada desarrollador. La emite
  `Join` al canjear una invitación y la revoca un administrador. Es de quién es un mensaje y para quién.
- **Handle**: cómo se nombra a un miembro al escribirle. Se deriva del nombre visible al unirse
  (`handleOf`), es único en el canal y no cambia.
- **Sesión de cliente** (`client_session_id`): una sesión de agente en marcha de un miembro, por
  ejemplo una sesión de Claude Code. Un miembro puede tener varias a la vez, cada una en su tema.
  El cliente la declara en el contexto de la llamada. Los mensajes (`from_client_session_id`) y la
  presencia (`Member.sessions`) la muestran para que un mensaje pueda ir a una sola sesión
  (`Recipient.client_session_id`). Solo es única dentro de su miembro y no es una credencial.
- **Tema** (`topic`): el tema de una sesión, por ejemplo el repo en el que trabaja. Decide qué
  mensajes, reservas y contexto ve esa sesión. Una sesión tiene un tema fijo mientras dura.
- **Contexto de la llamada**: quién llama y desde dónde. Lo aporta el binding, no la petición: la
  credencial del miembro, el tema de la sesión y su `client_session_id`.

## Qué cambia respecto del protocolo 2 (collab-channel 0.6)

El protocolo 2 era JSON a mano sobre WebSocket y HTTP, definido por los tipos TypeScript de
`claude-code-collaboration`. `collab.v1` conserva su comportamiento y cambia la forma:

- Esquema Protobuf como fuente de verdad, con código generado para cada lenguaje.
- `session_id` pasa a llamarse `member_id` y `cc` pasa a `client_session_id`, que es lo que eran.
- El cliente declara su versión y sus capacidades al suscribirse, y el servidor responde con la
  versión acordada o con `ERROR_CODE_UNSUPPORTED_PROTOCOL`.
- El campo libre `data` de los mensajes se reemplaza por un payload tipado por cada tipo de mensaje.
- Los códigos de error son un enum cerrado.
- Los clientes solo pueden enviar `NOTE`, `QUESTION` y `DONE`. `CLAIM`, `RELEASE` y `CONTEXT` los
  escribe el servidor.
- Todas las operaciones unarias están disponibles por HTTP, no solo tres.
- Las marcas de tiempo son `google.protobuf.Timestamp` en lugar de milisegundos.

Los dos protocolos no conviven en un mismo servidor: 1.0 se despliega como un stack nuevo.
