import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();

test('syllabus hierarchy JSON parses', () => {
  const file = path.join(root, 'docs/research/syllabus_hierarchy.json');
  assert.ok(fs.existsSync(file), 'hierarchy JSON should exist');
  assert.doesNotThrow(() => JSON.parse(fs.readFileSync(file, 'utf8')));
});

test('validator runs without reporting structural errors', () => {
  const result = spawnSync(process.execPath, ['scripts/validate-syllabus.mjs'], {
    cwd: root, encoding: 'utf8'
  });
  assert.equal(result.status, 0, `stdout: ${result.stdout}\nstderr: ${result.stderr}`);
  assert.match(result.stdout, /integrity checks passed/i);
});
