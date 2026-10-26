#!/usr/bin/env node
/**
 * Lightweight integrity checks for the SSC CGL syllabus seed files.
 * Run from the repository root: node scripts/validate-syllabus.mjs
 * Does not assert 2027 syllabus correctness; it only validates file structure.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const jsonPath = path.join(root, 'docs/research/syllabus_hierarchy.json');
const csvPath = path.join(root, 'docs/research/syllabus_hierarchy.csv');
const failures = [];

function fail(message) { failures.push(message); }
function parseJson(file) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch (error) { fail(`Could not parse ${path.relative(root, file)}: ${error.message}`); return null; }
}

const data = parseJson(jsonPath);
if (!fs.existsSync(csvPath)) fail('Missing docs/research/syllabus_hierarchy.csv');

if (data !== null) {
  const nodes = Array.isArray(data) ? data : (data.nodes ?? data.topics);
  if (!Array.isArray(nodes)) {
    fail('Expected hierarchy JSON to be an array or contain a nodes/topics array.');
  } else {
    const ids = new Set();
    for (const [index, node] of nodes.entries()) {
      const id = node.topic_id ?? node.node_id ?? node.id;
      if (typeof id !== 'string' || id.length === 0) fail(`Node ${index} has no usable topic/node/id.`);
      else if (ids.has(id)) fail(`Duplicate node ID: ${id}`);
      else ids.add(id);
    }
    for (const [index, node] of nodes.entries()) {
      const parent = node.parent_id ?? node.parentId ?? null;
      if (parent && !ids.has(parent)) fail(`Node ${node.topic_id ?? node.node_id ?? node.id ?? index} has missing parent ${parent}`);
      const state = node.mapping_status ?? node.status ?? node.mapping_state;
      const allowed = new Set(['verified_official','provisional_previous_cycle','awaiting_official_confirmation','unresolved','out_of_scope']);
      if (state && !allowed.has(state)) fail(`Unknown mapping state on node ${node.topic_id ?? node.node_id ?? node.id ?? index}: ${state}`);
    }
    console.log(`Hierarchy records examined: ${nodes.length}; unique IDs seen: ${ids.size}`);
  }
}
if (failures.length) {
  console.error('\nValidation failures:');
  for (const item of failures) console.error(`- ${item}`);
  process.exitCode = 1;
} else {
  console.log('Syllabus seed integrity checks passed. This is not an academic verification of the syllabus.');
}
