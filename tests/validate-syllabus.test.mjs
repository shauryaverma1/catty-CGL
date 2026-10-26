import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();

test('restored syllabus hierarchy JSON parses', () => {
  const file = path.join(root, 'docs/research/syllabus_hierarchy.json');
  assert.ok(fs.existsSync(file), 'restore-research-source.mjs should create hierarchy JSON');
  assert.doesNotThrow(() => JSON.parse(fs.readFileSync(file, 'utf8')));
});

test('syllabus validator passes structural checks', () => {
  const result = spawnSync(process.execPath, ['scripts/validate-syllabus.mjs'], {
    cwd: root, encoding: 'utf8'
  });
  assert.equal(result.status, 0, `stdout: ${result.stdout}\nstderr: ${result.stderr}`);
  assert.match(result.stdout, /integrity checks passed/i);
});

test('UI seed and draft lesson are valid JSON and linked by topic ID', () => {
  const seed = JSON.parse(fs.readFileSync(path.join(root, 'public/data/syllabus-seed.json'), 'utf8'));
  const lesson = JSON.parse(fs.readFileSync(path.join(root, 'content/lessons/analogies.starter.json'), 'utf8'));
  const ids = new Set(seed.groups.flatMap(group => group.items.map(item => item.id)));
  assert.ok(ids.has(lesson.topic_id), `lesson topic ID ${lesson.topic_id} should exist in compact UI seed`);
  assert.equal(lesson.mapping_status, 'provisional_previous_cycle');
  assert.equal(lesson.content_status, 'draft');
  assert.equal(lesson.questions.length, 5);
  assert.ok(lesson.questions.every(question => question.options.length >= 2 && question.explanation));
});

test('static app JavaScript has valid syntax', () => {
  const result = spawnSync(process.execPath, ['--check', 'app.js'], {
    cwd: root, encoding: 'utf8'
  });
  assert.equal(result.status, 0, `stdout: ${result.stdout}\nstderr: ${result.stderr}`);
});

test('lesson schema JSON parses', () => {
  const file = path.join(root, 'content/schema/lesson.schema.json');
  assert.doesNotThrow(() => JSON.parse(fs.readFileSync(file, 'utf8')));
});
