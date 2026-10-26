import type { SyllabusNode } from './syllabusData'
export type SyllabusTreeNode = SyllabusNode & { children: SyllabusTreeNode[] }
export function buildSyllabusTree(nodes: SyllabusNode[]): SyllabusTreeNode[] {
 const byId = new Map<string, SyllabusTreeNode>()
 for (const node of nodes) byId.set(node.node_id, { ...node, children: [] })
 const roots: SyllabusTreeNode[] = []
 for (const node of nodes) { const current = byId.get(node.node_id)!; if (node.parent_id && byId.has(node.parent_id)) byId.get(node.parent_id)!.children.push(current); else roots.push(current) }
 return roots
}
export function filterSyllabusTree(nodes: SyllabusTreeNode[], query: string): SyllabusTreeNode[] {
 const normalized = query.trim().toLocaleLowerCase(); if (!normalized) return nodes
 const visit = (node: SyllabusTreeNode): SyllabusTreeNode | null => {
  const children = node.children.map(visit).filter((child): child is SyllabusTreeNode => child !== null)
  const text = [node.node_id,node.tier,node.paper,node.section,node.subject,node.topic,node.subtopic,node.official_wording,node.source_reference].filter(Boolean).join(' ').toLocaleLowerCase()
  return text.includes(normalized) || children.length ? { ...node, children } : null
 }
 return nodes.map(visit).filter((node): node is SyllabusTreeNode => node !== null)
}
export function targetCycleStatus(node: SyllabusNode): 'previous-cycle' | 'awaiting-2027' | 'unresolved' {
 if (node.exam_cycle === '2027' || node.mapping_status === 'awaiting_official_confirmation') return 'awaiting-2027'
 if (node.exam_cycle === '2026' && node.mapping_status === 'verified_official') return 'previous-cycle'
 return 'unresolved'
}
