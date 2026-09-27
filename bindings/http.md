# Binding HTTP

Lleva **todas las operaciones unarias** de todos los servicios. `Subscribe`, que es un stream, solo
existe en el binding WebSocket.

## Forma de una llamada

```
POST /<paquete>.<Servicio>/<Método>
Content-Type: application/json

<la petición en JSON de Protobuf>
```

Por ejemplo `POST /collab.v1.ChannelService/Send`. La ruta sale del esquema (`rpcPath()` en
`ts/src/http.ts`). Una petición sin campos se envía como `{}`.

- **Éxito:** `200` con la respuesta en JSON de Protobuf.
- **Error:** el status de `httpStatusOf(code)` y un `ErrorDetail` en JSON:
  `{ "code": "ERROR_CODE_NAME_TAKEN", "message": "..." }`.

## Cabeceras

| Cabecera | Cuándo | Contenido |
|---|---|---|
| `x-collab-protocol` | toda llamada salvo `GetServerInfo` | versión del cliente, `<mayor>.<menor>` |
| `x-collab-member`, `x-collab-secret` | llamadas de miembro | la credencial que devolvió `Join` |
| `x-collab-topic`, `x-collab-client-session` | llamadas de miembro | el contexto de la llamada: tema y sesión que llaman |
| `x-collab-admin-key` | `AdminService` | la clave de administración |

El servidor guarda solo el hash del secreto y lo compara en tiempo constante. Una mayor que el
servidor no habla recibe `426` con `ERROR_CODE_UNSUPPORTED_PROTOCOL`.

## Métodos y credenciales

| Método | Credencial |
|---|---|
| `ServerInfoService/GetServerInfo` | ninguna |
| `MembershipService/Join` | ninguna: la invitación es la credencial, y se gasta ahí |
| `AdminService/CreateInvite`, `AdminService/RevokeMember` | clave de administración |
| `WebSocketService/IssueTicket` | miembro |
| `ChannelService/GetState`, `Send`, `Ack`, `Claim`, `Release`, `PutContext`, `GetContext`, `SetPresence`, `History`, `Heartbeat`, `CreateTaskList`, `AddTasks`, `UpdateTask`, `ListTasks` | miembro |

Las operaciones de `ChannelService` por HTTP tienen los mismos efectos que por WebSocket: un `Send`
por HTTP también se reparte en vivo a las conexiones abiertas. HTTP es el camino cuando no hay socket
(un proceso de corta vida, un fallo de conexión) y para cuerpos de más de 128 KB. `GetState` y
`ListTasks` solo existen por HTTP: sus respuestas pueden superar ese tamaño.
