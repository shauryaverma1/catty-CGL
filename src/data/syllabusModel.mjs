export function buildSyllabusTree(nodes) {
 const byId = new Map()
 for (const node of nodes) byId.set(node.node_id, { ...node, children: [] })
 const roots = []
 for (const node of nodes) { const current = byId.get(node.node_id); if (node.parent_id && byId.has(node.parent_id)) byId.get(node.parent_id).children.push(current); else roots.push(current) }
 return roots
}
export function filterSyllabusTree(nodes, query) {
 const normalized = query.trim().toLocaleLowerCase()
 if (!normalized) return nodes
 const visit = (node) => {
  const children=node.children.map(visit).filter(Boolean)
  const text=[node.node_id,node.exam_cycle,node.syllabus_baseline,node.tier,node.paper,node.section,node.subject,node.topic,node.subtopic,node.official_wording,node.source_id,node.source_reference,node.mapping_status,node.research_notes].filter(Boolean).join(' ').toLocaleLowerCase()
  return text.includes(normalized)||children.length?{...node,children}:null
 }
 return nodes.map(visit).filter(Boolean)
}
export function filterSyllabusByPath(nodes, {tier='All tiers', paper='All papers', subject='All subjects'}={}) {
 const visit = (node) => {
  const children=node.children.map(visit).filter(Boolean)
  const tierMatch=tier==='All tiers'||node.tier===tier||children.length>0
  const paperMatch=paper==='All papers'||node.paper===paper||children.length>0
  const subjectMatch=subject==='All subjects'||node.subject===subject||children.length>0
  const selfMatches=(tier==='All tiers'||node.tier===tier)&&(paper==='All papers'||node.paper===paper)&&(subject==='All subjects'||node.subject===subject)
  if (!selfMatches && !children.length) return null
  if (!tierMatch||!paperMatch||!subjectMatch) return null
  return {...node,children}
 }
 return nodes.map(visit).filter(Boolean)
}
export function targetCycleStatus(node) {
 if (node.exam_cycle === '2027' || node.mapping_status === 'awaiting_official_confirmation') return 'awaiting-2027'
 if (node.exam_cycle === '2026' && node.mapping_status === 'verified_official') return 'previous-cycle'
 return 'unresolved'
}
export function lessonStatus(node) {
 if (node.content_status === 'approved' && node.academic_review_status === 'approved') return 'approved'
 return 'unavailable'
}
