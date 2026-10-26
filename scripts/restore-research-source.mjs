#!/usr/bin/env node
/**
 * Restores the full hierarchy JSON from its compressed base64 archive and
 * regenerates the spreadsheet-friendly CSV from the same authoritative data.
 * Run from repository root: node scripts/restore-research-source.mjs
 * Requires Node.js 18+.
 */
import fs from 'node:fs';
import path from 'node:path';
import { gunzipSync } from 'node:zlib';

const root = process.cwd();
const archive = 'docs/research/archive/syllabus_hierarchy.json.gz.b64';
const jsonOutput = 'docs/research/syllabus_hierarchy.json';
const csvOutput = 'docs/research/syllabus_hierarchy.csv';
const columns = [
  'node_id', 'parent_id', 'exam', 'exam_cycle', 'syllabus_baseline',
  'tier', 'paper', 'section', 'subject', 'topic', 'subtopic',
  'official_wording', 'source_id', 'source_reference', 'mapping_status',
  'research_notes'
];

try {
  const archivePath = path.join(root, archive);
  if (!fs.existsSync(archivePath)) throw new Error(`Missing source archive: ${archive}`);
  const encoded = fs.readFileSync(archivePath, 'utf8').trim();
  const restored = gunzipSync(Buffer.from(encoded, 'base64'));
  const nodes = JSON.parse(restored.toString('utf8'));
  if (!Array.isArray(nodes)) throw new Error('Hierarchy JSON must contain a top-level array.');

  const jsonPath = path.join(root, jsonOutput);
  fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
  fs.writeFileSync(jsonPath, restored);
  console.log(`Restored ${jsonOutput} (${restored.length} bytes)`);

  const csvCell = value => {
    if (value === null || value === undefined) return '';
    const text = String(value);
    return /[",\r\n]/.test(text) ? '"' + text.replace(/"/g, '""') + '"' : text;
  };
  const rows = [
    columns,
    ...nodes.map(node => columns.map(column => node[column] ?? ''))
  ];
  const csv = '\uFEFF' + rows.map(row => row.map(csvCell).join(',')).join('\r\n') + '\r\n';
  const csvPath = path.join(root, csvOutput);
  fs.writeFileSync(csvPath, csv, 'utf8');
  console.log(`Regenerated ${csvOutput} from the same ${nodes.length} hierarchy nodes (${Buffer.byteLength(csv, 'utf8')} bytes)`);
} catch (error) {
  console.error(`Could not restore research source: ${error.message}`);
  process.exitCode = 1;
}
