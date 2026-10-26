import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { buildSyllabusTree, filterSyllabusTree, filterSyllabusByPath, targetCycleStatus, lessonStatus } from '../src/data/syllabusModel.mjs'
const nodes = JSON.parse(await readFile(new URL('../src/data/syllabus_hierarchy.json', import.meta.url), 'utf8'))
const sources = JSON.parse(await readFile(new URL('../src/data/source_register.json', import.meta.url), 'utf8'))
const starters = JSON.parse(await readFile(new URL('../src/data/starter_topic_shortlist.json', import.meta.url), 'utf8'))
const tree = buildSyllabusTree(nodes)
const flatten = (items) => items.flatMap((item) => [item, ...flatten(item.children)])

test('all source hierarchy nodes render, IDs are unique and parent links resolve', () => {
 assert.equal(flatten(tree).length, nodes.length)
 assert.equal(new Set(nodes.map(n=>n.node_id)).size, nodes.length, 'node IDs must be unique')
 const ids = new Set(nodes.map(n=>n.node_id))
 for (const node of nodes) if(node.parent_id) assert.ok(ids.has(node.parent_id), `missing parent for ${node.node_id}`)
 for (const id of ['T1-GIR-ANALOGY','T2-P2-STAT','T2-P3-FE','EDITORIAL-GA-ANCIENT-HISTORY','CGL27-ROOT']) assert.ok(flatten(tree).some(n=>n.node_id===id), `missing expected source node ${id}`)
})

test('search retains matching topics and parent path across official and editorial labels', () => {
 const matches=flatten(filterSyllabusTree(tree,'Analogies'))
 assert.ok(matches.some(n=>n.node_id==='T1-GIR-ANALOGY'))
 assert.ok(matches.some(n=>n.node_id==='T1-GIR'))
 assert.ok(flatten(filterSyllabusTree(tree,'SSC-CGL-2026-NOTICE')).length>0)
})

test('tier, paper and subject filters preserve matching hierarchy paths', () => {
 const paperMatches=flatten(filterSyllabusByPath(tree,{paper:'Paper-II'}))
 assert.ok(paperMatches.some(n=>n.node_id==='T2-P2-STAT'))
 assert.ok(!paperMatches.some(n=>n.node_id==='T2-P3-FE'))
 const subjectMatches=flatten(filterSyllabusByPath(tree,{subject:'General Intelligence & Reasoning'}))
 assert.ok(subjectMatches.some(n=>n.node_id==='T1-GIR-ANALOGY'))
 assert.ok(!subjectMatches.some(n=>n.node_id==='T1-QA-PERCENT'))
 const tierMatches=flatten(filterSyllabusByPath(tree,{tier:'Tier-I'}))
 assert.ok(tierMatches.some(n=>n.node_id==='T1-GIR-ANALOGY'))
 assert.ok(!tierMatches.some(n=>n.node_id==='T2-P2-STAT'))
})

test('2026 verification is not treated as 2027 confirmation', () => {
 assert.equal(targetCycleStatus(nodes.find(n=>n.node_id==='T1-GIR-ANALOGY')),'previous-cycle')
 assert.equal(targetCycleStatus(nodes.find(n=>n.node_id==='CGL27-ROOT')),'awaiting-2027')
 assert.ok(nodes.filter(n=>n.exam_cycle==='2027').every(n=>targetCycleStatus(n)==='awaiting-2027'))
})

test('source register and starter shortlist remain separate, linked academic data', () => {
 assert.equal(sources.length,3)
 assert.equal(starters.length,5)
 const sourceIds=new Set(sources.map(s=>s.source_id))
 for(const node of nodes) assert.ok(sourceIds.has(node.source_id), `source missing for ${node.node_id}: ${node.source_id}`)
 for(const item of starters) assert.ok(nodes.some(n=>n.node_id===item.topic_id), `starter node missing: ${item.topic_id}`)
 assert.ok(sources.some(s=>s.source_id==='SSC-CGL-2026-NOTICE'&&s.document_url.includes('Notice_of_adv_cgl_2026.pdf')))
})

test('topics remain unavailable until both content and academic review are explicitly approved', () => {
 const node=nodes.find(n=>n.node_id==='T1-GIR-ANALOGY')
 assert.equal(lessonStatus(node),'unavailable')
 assert.equal(lessonStatus({...node,content_status:'approved'}),'unavailable')
 assert.equal(lessonStatus({...node,content_status:'approved',academic_review_status:'approved'}),'approved')
})


test('approved working baseline label and exam-pattern structure are source linked', async () => {
 const pattern = JSON.parse(await readFile(new URL('../src/data/exam_pattern_2026.json', import.meta.url), 'utf8'))
 assert.equal(pattern.display_label, 'SSC CGL 2026 syllabus baseline — used for 2027 preparation')
 assert.equal(pattern.source_id, 'SSC-CGL-2026-NOTICE')
 assert.equal(pattern.tiers.length, 4)
 assert.equal(pattern.tiers[0].total_questions, 100)
 assert.equal(pattern.tiers[1].applicability, 'Compulsory for all posts')
 assert.ok(pattern.tiers[2].applicability.includes('Junior Statistical Officer'))
 assert.ok(pattern.tiers[3].applicability.includes('Assistant Audit Officer'))
 const tier1 = pattern.tiers[0]
 assert.equal(tier1.total_questions, 100)
 assert.equal(tier1.negative_marking_per_wrong_answer, 0.5)
 const paper1 = pattern.tiers[1]
 assert.equal(paper1.total_objective_questions, 150)
 assert.equal(paper1.total_objective_marks, 450)
 assert.equal(paper1.sessions[0].sections.find(s=>s.name.includes('English Language')).sectional_minutes, 40)
 assert.equal(paper1.sessions[0].sections.find(s=>s.name.includes('General Awareness')).sectional_minutes, 20)
 assert.equal(paper1.negative_marking.includes('1 mark per wrong answer'), true)
 assert.equal(pattern.tiers[2].negative_marking_per_wrong_answer, 0.5)
 assert.equal(pattern.tiers[3].negative_marking_per_wrong_answer, 0.5)
})


test('expanded syllabus includes directly mapped official sections and stable source references', () => {
 assert.ok(nodes.length >= 180, 'expanded hierarchy should retain the reviewed additions')
 for (const id of ['T1-QA-ADD-MIXTURE','T1-GA-ADD-ENVIRONMENT','T2-P1-MATH-ADD-STAT-PROB','T2-P1-REASON-ADD-SEMANTIC-ANALOGY','T2-P1-ENG-ADD-CLOZE','T2-P1-COMP-ADD-NETWORK-CYBER','T2-P2-STAT-INFERENCE','T2-P3-ADD-DEMAND-ELASTICITY']) {
  assert.ok(nodes.some(n=>n.node_id===id), `missing official syllabus mapping: ${id}`)
 }
 const sourceIds = new Set(sources.map(s=>s.source_id))
 for (const n of nodes) {
  assert.ok(sourceIds.has(n.source_id), `unknown source ID for ${n.node_id}: ${n.source_id}`)
  assert.ok(n.source_reference, `missing source reference for ${n.node_id}`)
 }
})
