#!/usr/bin/env node
/**
 * Copies vectors/*.json into ts/vectors/, so TypeScript consumers that install
 * only the ts/ folder from git can run the same conformance cases. vectors/ at
 * the root stays the source: other languages read it from the repo.
 */
import fs from 'node:fs';
import path from 'node:path';

const from = 'vectors';
const to = path.join('ts', 'vectors');
fs.rmSync(to, { recursive: true, force: true });
fs.mkdirSync(to, { recursive: true });
for (const file of fs.readdirSync(from).filter((name) => name.endsWith('.json'))) {
  fs.copyFileSync(path.join(from, file), path.join(to, file));
}
