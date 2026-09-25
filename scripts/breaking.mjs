#!/usr/bin/env node
/**
 * Runs `buf breaking` against the latest stable release tag (vX.Y.Z), so a
 * change that would break existing clients or servers fails before it ships.
 */
import { execFileSync } from 'node:child_process';

const tags = execFileSync('git', ['tag', '--list', 'v*', '--sort=-v:refname'], { encoding: 'utf8' })
  .split(/\r?\n/)
  .filter((tag) => /^v\d+\.\d+\.\d+$/.test(tag));

if (tags.length === 0) {
  console.log('No stable release yet: nothing to compare against.');
  process.exit(0);
}

console.log(`buf breaking against ${tags[0]}`);
execFileSync('buf', ['breaking', '--against', `.git#tag=${tags[0]}`], { stdio: 'inherit', shell: process.platform === 'win32' });
