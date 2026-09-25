# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

The wire contract of the Cognikas Collab channel, protocol `collab.v1`. It is consumed by
`collab-backend` (the server) and `collab-plugin` (the `collab-channel` Claude Code plugin) as a git
dependency pinned to a tag (`github:cognikas/collab-protocol#<tag>&path:/ts`), never through a
package registry. The previous protocol (2, JSON by hand) lives on in the historic repo
`claude-code-collaboration` and is not compatible with this one.

README, `spec/`, `bindings/` and commit messages are in Spanish. Code comments, including `.proto`
comments, are in English. Changes go through feature branches merged into `main` by PR.

## Commands

```bash
pnpm install
pnpm lint                  # buf lint (STANDARD) + buf format check
pnpm build                 # buf generate → ts/src/gen, tsc → ts/dist
pnpm typecheck && pnpm test
pnpm breaking              # buf breaking (FILE) against the latest stable vX.Y.Z tag
pnpm exec vitest run -t "<name>"
node scripts/version.mjs <x.y.z[-pre]>
```

## Rules

- **Generated code and `ts/dist/` are committed on purpose**, so consumers install without Buf or a
  compiler. Never hand-edit `ts/src/gen/` or `ts/dist/`. After any `.proto` or `ts/src/` change, run
  `pnpm build` and commit the source, `gen/` and `dist/` together.
- **The vectors are the contract.** `vectors/names.json`, `sanitize.json` and `visibility.json` were
  generated from the 0.6 implementation, so v1 behaves exactly like 0.6. Changing an expected output
  changes the protocol's behaviour for every implementation: treat it as a protocol change and
  check `spec/versionado.md`.
- **Compatibility rules** are in `spec/versionado.md`. Readers must ignore unknown fields and enum
  values (`ts/src/json.ts`); anything `pnpm breaking` rejects needs a new major (`collab.v2`).
- **The reference functions** in `ts/src/` (`slug`, `visibleTo`, `cleanLine`/`cleanText`,
  `negotiate`) are the single implementation for TypeScript consumers. The backend imports
  `visibleTo` rather than reimplementing it: it decides both live fan-out and every stored read.
- **Versions** live in three places: `package.json`, `ts/package.json` and `PROTOCOL_RELEASE` in
  `ts/src/version.ts`. `ts/test/versions.test.ts` fails if they drift; use `scripts/version.mjs`.
- `ts/src/sanitize.ts` builds its character classes from code points so the file stays plain ASCII.
  Keep it that way: invisible characters in source are easy to lose or corrupt.
- `.gitattributes` forces LF, since generated files are compared byte for byte.
