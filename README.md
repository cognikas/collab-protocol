# collab-protocol

El contrato del canal de Cognikas Collab: qué se dicen el plugin y el backend, y cómo se comporta
cada uno. Es independiente del transporte: el mismo esquema viaja por WebSocket y HTTP en 1.0, y
podría viajar por gRPC más adelante sin rediseñarlo.

- **Esquema:** [`proto/collab/v1/`](proto/collab/v1/), Protobuf, gestionado con [Buf](https://buf.build).
- **Especificación:** [`spec/`](spec/README.md) (reglas y versionado) y [`bindings/`](bindings/)
  (WebSocket y HTTP).
- **Vectores de conformidad:** [`vectors/`](vectors/), casos en JSON que toda implementación debe
  pasar, en cualquier lenguaje.
- **Paquete TypeScript:** [`ts/`](ts/), `@collab/protocol`: tipos generados, las funciones de
  referencia (nombres, visibilidad, limpieza de texto, negociación) y los límites.

Lo implementan [`collab-backend`](https://github.com/cognikas/collab-backend) (servidor) y
[`collab-plugin`](https://github.com/cognikas/collab-plugin) (cliente, el plugin `collab-channel`
de Claude Code). El protocolo anterior, el 2 de `collab-channel` 0.6, queda como referencia
histórica en `claude-code-collaboration`.

## Usarlo desde otro repo

Sin registro de paquetes: una dependencia git fijada a un tag.

```json
"dependencies": {
  "@collab/protocol": "github:cognikas/collab-protocol#v1.0.0-rc.3&path:/ts"
}
```

El código generado y `ts/dist/` están commiteados, así que quien lo instala no necesita Buf ni
compilar. El lockfile fija el commit exacto.

Como el repo es privado, pnpm lo clona por SSH. En una máquina sin clave SSH en GitHub, una vez:

```bash
git config --global url."https://github.com/".insteadOf "git+ssh://git@github.com/"
git config --global --add url."https://github.com/".insteadOf "ssh://git@github.com/"
```

Así pnpm usa HTTPS con las credenciales que git ya tiene (Git Credential Manager o `gh auth setup-git`).

## Cambiar el protocolo

Requisitos: Node ≥ 20 y pnpm.

```bash
pnpm install
pnpm lint        # buf lint + formato
pnpm build       # buf generate → ts/src/gen, y tsc → ts/dist
pnpm typecheck && pnpm test
pnpm breaking    # buf breaking contra la última release estable
```

1. Editar el `.proto` (y la especificación, si cambia un comportamiento).
2. `pnpm build`, y commitear el `.proto`, `ts/src/gen/` y `ts/dist/` juntos.
3. Decidir si es menor o mayor según [`spec/versionado.md`](spec/versionado.md);
   `pnpm breaking` tiene que pasar para que sea menor.

## Publicar una release

```bash
node scripts/version.mjs 1.0.0   # package.json, ts/package.json y ts/src/version.ts
pnpm build && pnpm test
git commit -am "Release 1.0.0" && git tag v1.0.0 && git push --follow-tags
```

Después, en cada implementación, subir el tag de la dependencia y `pnpm install`.
