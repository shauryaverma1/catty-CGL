import hierarchy from './syllabus_hierarchy.json'
import sources from './source_register.json'
import starters from './starter_topic_shortlist.json'

export type MappingStatus = 'verified_official' | 'provisional_previous_cycle' | 'awaiting_official_confirmation' | 'unresolved' | 'out_of_scope' | string
export type SyllabusNode = {
  node_id: string
  parent_id: string | null
  exam: string
  exam_cycle: string
  syllabus_baseline: string
  tier: string | null
  paper: string | null
  section: string | null
  subject: string | null
  topic: string | null
  subtopic: string | null
  official_wording: string
  source_id: string
  source_reference: string
  mapping_status: MappingStatus
  research_notes: string
}
export type SourceRecord = {
  source_id: string
  exam_cycle: string
  publisher: string
  title: string
  document_url: string
  publication_date: string
  document_length_pages: string
  relevant_sections: string
  access_date: string
  inspection_status: string
  official: string
  intended_use: string
  limitations: string
}
export type StarterTopic = {
  rank: number
  topic_id: string
  title: string
  mapping_status: string
  source_id: string
  official_reference: string
  research_effort: string
  visual_lesson_suitability: string
  question_flashcard_opportunities: string
  academic_risks: string
}

// Academic records are imported from source data files, not authored in UI components.
export const syllabusNodes = hierarchy as unknown as SyllabusNode[]
export const sourceRegister = sources as unknown as SourceRecord[]
export const starterTopics = starters as unknown as StarterTopic[]
export const targetExamCycle = '2027'
export const syllabusSourceCycle = '2026'
