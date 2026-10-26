import type { SyllabusNode, SourceRecord } from './syllabusData'

export type ContentStatus =
  | 'draft'
  | 'needs_source'
  | 'needs_syllabus_review'
  | 'needs_answer_review'
  | 'approved'
  | 'out_of_scope'
  | 'needs_update'

export type ContentType = 'lesson' | 'question' | 'answer_explanation' | 'flashcard'
export type SourceReference = { source_id: string; reference: string }

export type ContentBase = {
  content_id: string
  content_type: ContentType
  topic_id: string
  target_exam_cycle: string
  syllabus_source_cycle: string
  content_status: ContentStatus
  academic_review_status: ContentStatus
  source_references: SourceReference[]
  reviewer_id?: string
  reviewed_at?: string
  review_notes?: string
}

export type LessonContent = ContentBase & {
  content_type: 'lesson'
  title: string
  sections: Array<{ heading: string; body: string }>
}

export type QuestionContent = ContentBase & {
  content_type: 'question'
  prompt: string
  options: Array<{ option_id: string; text: string }>
  correct_option_id: string
  explanation_id: string
  answer_verification_status: ContentStatus
}

export type AnswerExplanationContent = ContentBase & {
  content_type: 'answer_explanation'
  question_id: string
  explanation: string
  answer_verification_status: ContentStatus
}

export type FlashcardContent = ContentBase & {
  content_type: 'flashcard'
  front: string
  back: string
  answer_verification_status: ContentStatus
}

export type LearningContent = LessonContent | QuestionContent | AnswerExplanationContent | FlashcardContent
export type ContentContext = { syllabusNodes?: SyllabusNode[]; sourceRegister?: SourceRecord[] }

export const CONTENT_STATUSES: readonly ContentStatus[]
export const CONTENT_TYPES: readonly ContentType[]
export function validateContentRecord(record: LearningContent | Record<string, unknown>, context?: ContentContext): { valid: boolean; errors: string[] }
export function isContentPublishable(record: LearningContent | Record<string, unknown>, context?: ContentContext, allRecords?: Array<LearningContent | Record<string, unknown>>): boolean
export function getPublishedContent(records: Array<LearningContent | Record<string, unknown>>, context?: ContentContext): Array<LearningContent | Record<string, unknown>>
export function getPublishedContentByType(records: Array<LearningContent | Record<string, unknown>>, contentType: ContentType, context?: ContentContext): Array<LearningContent | Record<string, unknown>>
