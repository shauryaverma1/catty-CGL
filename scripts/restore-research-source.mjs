#!/usr/bin/env node
/**
 * Restores the original research files from compressed base64 source archives.
 * Run from repository root: node scripts/restore-research-source.mjs
 * Requires Node.js 18+. This writes the two generated files under docs/research/.
 */
import fs from 'node:fs';
import path from 'node:path';
import { gunzipSync } from 'node:zlib';

const root = process.cwd();
const files = [
  {
    archive: 'docs/research/archive/syllabus_hierarchy.json.gz.b64',
    output: 'docs/research/syllabus_hierarchy.json'
  },
  {
    archive: 'docs/research/archive/syllabus_hierarchy.csv.gz.b64',
    output: 'docs/research/syllabus_hierarchy.csv'
  }
];

for (const item of files) {
  const archivePath = path.join(root, item.archive);
  const outputPath = path.join(root, item.output);
  if (!fs.existsSync(archivePath)) {
    console.error(`Missing source archive: ${item.archive}`);
    process.exitCode = 1;
    continue;
  }
  try {
    const encoded = fs.readFileSync(archivePath, 'utf8').trim();
    const restored = gunzipSync(Buffer.from(encoded, 'base64'));
    // Validate JSON before writing; CSV is preserved byte-for-byte from its archive.
    if (item.output.endsWith('.json')) JSON.parse(restored.toString('utf8'));
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, restored);
    console.log(`Restored ${item.output} (${restored.length} bytes)`);
  } catch (error) {
    console.error(`Could not restore ${item.output}: ${error.message}`);
    process.exitCode = 1;
  }
}
