import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { buildSyllabusTree, filterSyllabusTree, targetCycleStatus } from '../src/data/syllabusModel.mjs'
const nodes = JSON.parse(await readFile(new URL('../src/data/syllabus_hierarchy.json', import.meta.url), 'utf8'))
const tree = buildSyllabusTree(nodes)
const flatten = (items) => items.flatMap((item) => [item, ...flatten(item.children)])
test('all source nodes render and every parent link resolves', () => {
 assert.equal(flatten(tree).length, nodes.length)
 assert.equal(new Set(nodes.map(n=>n.node_id)).size, nodes.length, 'node IDs must be unique')
 const ids = new Set(nodes.map(n=>n.node_id)); for (const node of nodes) if(node.parent_id) assert.ok(ids.has(node.parent_id), `missing parent for ${node.node_id}`)
 for (const id of ['T1-GIR-ANALOGY','T2-P2-STAT','T2-P3-FE','EDITORIAL-GA-ANCIENT-HISTORY','CGL27-ROOT']) assert.ok(flatten(tree).some(n=>n.node_id===id), `missing expected source node ${id}`)
})
test('search retains matching topics and parent path', () => { const matches=flatten(filterSyllabusTree(tree,'Analogies')); assert.ok(matches.some(n=>n.node_id==='T1-GIR-ANALOGY')); assert.ok(matches.some(n=>n.node_id==='T1-GIR')) })
test('2026 verification is not treated as 2027 confirmation', () => { assert.equal(targetCycleStatus(nodes.find(n=>n.node_id==='T1-GIR-ANALOGY')),'previous-cycle'); assert.equal(targetCycleStatus(nodes.find(n=>n.node_id==='CGL27-ROOT')),'awaiting-2027') })
