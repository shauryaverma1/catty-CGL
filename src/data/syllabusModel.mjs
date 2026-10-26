export function buildSyllabusTree(nodes) {
 const byId = new Map()
 for (const node of nodes) byId.set(node.node_id, { ...node, children: [] })
 const roots = []
 for (const node of nodes) { const current = byId.get(node.node_id); if (node.parent_id && byId.has(node.parent_id)) byId.get(node.parent_id).children.push(current); else roots.push(current) }
 return roots
}
export function filterSyllabusTree(nodes, query) {
 const normalized = query.trim().toLocaleLowerCase(); if (!normalized) return nodes
 const visit = (node) => { const children=node.children.map(visit).filter(Boolean); const text=[node.node_id,node.tier,node.paper,node.section,node.subject,node.topic,node.subtopic,node.official_wording,node.source_reference].filter(Boolean).join(' ').toLocaleLowerCase(); return text.includes(normalized)||children.length?{...node,children}:null }
 return nodes.map(visit).filter(Boolean)
}
export function targetCycleStatus(node) {
 if (node.exam_cycle === '2027' || node.mapping_status === 'awaiting_official_confirmation') return 'awaiting-2027'
 if (node.exam_cycle === '2026' && node.mapping_status === 'verified_official') return 'previous-cycle'
 return 'unresolved'
}
