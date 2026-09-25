# Versionado

## Tres números distintos

| Qué | Ejemplo | Dónde vive |
|---|---|---|
| **Protocolo** | `1.0` | Este repo. Mayor = sufijo del paquete Protobuf (`collab.v1`) |
| **Release de este repo** | `1.0.0-rc.1` | `package.json`, `ts/package.json`, `PROTOCOL_RELEASE`. El parche y la pre-release no viajan por la red |
| **Implementaciones** | `collab-channel 1.0.0`, `collab-backend 1.0.0` | Cada repo. Declaran qué versiones del protocolo hablan |

## Qué es mayor y qué es menor

**Menor** (compatible en las dos direcciones):

- Un campo nuevo, una operación nueva, un evento nuevo, un valor nuevo de un enum, un código de error nuevo.
- Subir un límite.
- Una capacidad nueva (ver abajo).

Funciona porque todo lector **ignora los campos y los valores de enum que no conoce**
(`ts/src/json.ts`, casos `tolerated` de `vectors/frames.json`). Un valor de enum desconocido se lee
como sin especificar. Un código de error desconocido se trata como `ERROR_CODE_INTERNAL`.

**Mayor** (paquete nuevo, `collab.v2`):

- Quitar o renombrar un campo, una operación o un valor de enum; cambiar el tipo o el número de un campo.
- Cambiar el significado de algo que ya existía.
- Bajar un límite.

`buf breaking` (`pnpm breaking`) compara cada cambio contra la última release y falla si rompe la
compatibilidad del código generado o del cable. Un cambio que falla ahí es mayor o no entra.

## Negociación

1. El cliente envía su `ClientInfo` (nombre, release, versión de protocolo, capacidades) en
   `SubscribeRequest`, y en HTTP la cabecera `x-collab-protocol: <mayor>.<menor>` en cada llamada.
2. El servidor busca entre las versiones que habla una con la **misma mayor** (`negotiate()`,
   `vectors/negotiation.json`). La versión acordada es esa mayor con la menor más baja de las dos.
3. Si la encuentra, `HelloEvent` lleva la versión acordada y las capacidades comunes. Si no,
   responde `ERROR_CODE_UNSUPPORTED_PROTOCOL` con las mayores que sí habla y, en WebSocket, cierra
   la conexión.

Un cliente puede preguntar antes con `GetServerInfo`, que no necesita credencial.

## Transición entre mayores

Los clientes instalados no se actualizan al mismo tiempo que el servidor. Cuando exista `collab.v2`,
el servidor hablará `v1` y `v2` a la vez durante un periodo de transición anunciado, y
`GetServerInfo.protocols` listará las dos. La fecha de retirada de una mayor se publica en el
`CHANGELOG.md` antes de que ocurra.

## Capacidades

El núcleo del protocolo es lo que toda implementación de una mayor habla. Lo opcional va en
**capacidades**: módulos con nombre (por ejemplo `decisions` o `approvals`), cada uno con su propio
paquete Protobuf (`collab.decisions.v1`). Cada lado declara las que implementa y usa solo las
comunes (`sharedCapabilities()`).

Así, distintas ediciones de Collab hablan la misma mayor con capacidades distintas, y un cliente
sencillo (por ejemplo, para otro agente) puede implementar solo el núcleo. 1.0 no define ninguna
capacidad.

## Compatibilidad

| Protocolo | Servidor | Cliente |
|---|---|---|
| `1.0` | `collab-backend` 1.0.x | `collab-channel` (collab-plugin) 1.0.x |
| protocolo 2 (histórico) | `claude-code-collaboration` 0.6.x | `collab-channel` 0.6.x |

El protocolo 2 no es compatible con `collab.v1` y no se negocia con él: vive en su propio stack
hasta que se retire.
