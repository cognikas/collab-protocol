import fs from 'node:fs';
import { describe, expect, it } from 'vitest';
import { PROTOCOL_MAJOR, PROTOCOL_MINOR, PROTOCOL_RELEASE } from '../src/index.js';

const read = (file: string) => JSON.parse(fs.readFileSync(new URL(file, import.meta.url), 'utf8')) as { version: string };

describe('versions', () => {
  it('agree in every place they are written', () => {
    expect(read('../../package.json').version).toBe(PROTOCOL_RELEASE);
    expect(read('../package.json').version).toBe(PROTOCOL_RELEASE);
    expect(PROTOCOL_RELEASE.startsWith(`${PROTOCOL_MAJOR}.${PROTOCOL_MINOR}.`)).toBe(true);
  });

  it('match the schema package suffix', () => {
    expect(fs.existsSync(new URL(`../../proto/collab/v${PROTOCOL_MAJOR}`, import.meta.url))).toBe(true);
  });
});

describe('ts/vectors', () => {
  it('is an exact copy of vectors/, the source', () => {
    const root = new URL('../../vectors/', import.meta.url);
    const copy = new URL('../vectors/', import.meta.url);
    const files = fs.readdirSync(root).filter((name) => name.endsWith('.json')).sort();
    expect(fs.readdirSync(copy).sort()).toEqual(files);
    for (const file of files) {
      expect(fs.readFileSync(new URL(file, copy), 'utf8')).toBe(fs.readFileSync(new URL(file, root), 'utf8'));
    }
  });
});
