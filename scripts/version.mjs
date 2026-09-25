#!/usr/bin/env node
/**
 * Sets the release in the three places it is written:
 *   node scripts/version.mjs 1.0.0
 * The protocol major and minor in ts/src/version.ts follow the release.
 */
import fs from 'node:fs';

const version = process.argv[2];
const match = /^(\d+)\.(\d+)\.\d+(-[0-9A-Za-z.]+)?$/.exec(version ?? '');
if (!match) {
  console.error('Usage: node scripts/version.mjs <major.minor.patch[-pre]>');
  process.exit(1);
}

for (const file of ['package.json', 'ts/package.json']) {
  const json = JSON.parse(fs.readFileSync(file, 'utf8'));
  json.version = version;
  fs.writeFileSync(file, `${JSON.stringify(json, null, 2)}\n`);
}

const source = 'ts/src/version.ts';
fs.writeFileSync(source, fs.readFileSync(source, 'utf8')
  .replace(/PROTOCOL_MAJOR = \d+/, `PROTOCOL_MAJOR = ${match[1]}`)
  .replace(/PROTOCOL_MINOR = \d+/, `PROTOCOL_MINOR = ${match[2]}`)
  .replace(/PROTOCOL_RELEASE = '[^']*'/, `PROTOCOL_RELEASE = '${version}'`));

console.log(`Release ${version} (protocol ${match[1]}.${match[2]}). Now: pnpm build && pnpm test`);
