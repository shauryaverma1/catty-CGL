import type { SyllabusNode } from './syllabusData'
export type SyllabusTreeNode = SyllabusNode & { children: SyllabusTreeNode[] }
export function buildSyllabusTree(nodes:SyllabusNode[]):SyllabusTreeNode[]
export function filterSyllabusTree(nodes:SyllabusTreeNode[],query:string):SyllabusTreeNode[]
export function targetCycleStatus(node:SyllabusNode):'previous-cycle'|'awaiting-2027'|'unresolved'
