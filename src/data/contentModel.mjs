export const CONTENT_STATUSES = Object.freeze([
  'draft',
  'needs_source',
  'needs_syllabus_review',
  'needs_answer_review',
  'approved',
  'out_of_scope',
  'needs_update',
])

export const CONTENT_TYPES = Object.freeze([
  'lesson',
  'question',
  'answer_explanation',
  'flashcard',
])

const STATUS_SET = new Set(CONTENT_STATUSES)
const TYPE_SET = new Set(CONTENT_TYPES)

const nonEmpty = (value) => typeof value === 'string' && value.trim().length > 0
const hasSourceReference = (record, context) =>
  Array.isArray(record.source_references) &&
  record.source_references.length > 0 &&
  record.source_references.every((source) =>
    nonEmpty(source.source_id) &&
    nonEmpty(source.reference) &&
    context.sourcesById.has(source.source_id),
  )

function recordShapeErrors(record) {
  const errors = []
  if (!record || typeof record !== 'object' || Array.isArray(record)) return ['record must be an object']
  if (!nonEmpty(record.content_id)) errors.push('content_id is required')
  if (!TYPE_SET.has(record.content_type)) errors.push('content_type is invalid')
  if (!nonEmpty(record.topic_id)) errors.push('topic_id is required')
  if (!nonEmpty(record.target_exam_cycle)) errors.push('target_exam_cycle is required')
  if (!nonEmpty(record.syllabus_source_cycle)) errors.push('syllabus_source_cycle is required')
  if (!STATUS_SET.has(record.content_status)) errors.push('content_status is invalid')
  if (!STATUS_SET.has(record.academic_review_status)) errors.push('academic_review_status is invalid')
  if (!Array.isArray(record.source_references) || record.source_references.length === 0) {
    errors.push('at least one source_references entry is required')
  }
  if (record.source_references?.some((source) =>
    !nonEmpty(source?.source_id) || !nonEmpty(source?.reference),
  )) errors.push('each source reference needs source_id and reference')

  switch (record.content_type) {
    case 'lesson':
      if (!nonEmpty(record.title)) errors.push('lesson title is required')
      if (!Array.isArray(record.sections) || record.sections.length === 0 ||
        record.sections.some((section) => !nonEmpty(section?.heading) || !nonEmpty(section?.body))) {
        errors.push('lesson sections need at least one heading/body pair')
      }
      break
    case 'question':
      if (!nonEmpty(record.prompt)) errors.push('question prompt is required')
      if (!Array.isArray(record.options) || record.options.length < 2 ||
        record.options.some((option) => !nonEmpty(option?.option_id) || !nonEmpty(option?.text))) {
        errors.push('question needs at least two options with option_id and text')
      }
      if (new Set((record.options || []).map((option) => option.option_id)).size !== (record.options || []).length) {
        errors.push('question option_id values must be unique')
      }
      if (!nonEmpty(record.correct_option_id) ||
        !(record.options || []).some((option) => option.option_id === record.correct_option_id)) {
        errors.push('correct_option_id must match one option')
      }
      if (!nonEmpty(record.explanation_id)) errors.push('question explanation_id is required')
      if (!STATUS_SET.has(record.answer_verification_status)) errors.push('question answer_verification_status is invalid')
      break
    case 'answer_explanation':
      if (!nonEmpty(record.question_id)) errors.push('answer explanation question_id is required')
      if (!nonEmpty(record.explanation)) errors.push('answer explanation text is required')
      if (!STATUS_SET.has(record.answer_verification_status)) errors.push('explanation answer_verification_status is invalid')
      break
    case 'flashcard':
      if (!nonEmpty(record.front)) errors.push('flashcard front is required')
      if (!nonEmpty(record.back)) errors.push('flashcard back is required')
      if (!STATUS_SET.has(record.answer_verification_status)) errors.push('flashcard answer_verification_status is invalid')
      break
  }
  return errors
}

function createContext({ syllabusNodes = [], sourceRegister = [] } = {}) {
  return {
    syllabusById: new Map(syllabusNodes.map((node) => [node.node_id, node])),
    sourcesById: new Map(sourceRegister.map((source) => [source.source_id, source])),
  }
}

/**
 * Validates shape and academic metadata. This does not imply publication approval.
 * target_exam_cycle must match the source cycle until a current-cycle mapping is available.
 */
export function validateContentRecord(record, { syllabusNodes = [], sourceRegister = [] } = {}) {
  const context = createContext({ syllabusNodes, sourceRegister })
  const errors = recordShapeErrors(record)
  if (errors.length) return { valid: false, errors }

  const node = context.syllabusById.get(record.topic_id)
  if (!node) errors.push('topic_id does not resolve to the canonical syllabus hierarchy')
  else {
    if (node.mapping_status !== 'verified_official') errors.push('syllabus mapping is not verified_official')
    if (record.syllabus_source_cycle !== node.exam_cycle) errors.push('syllabus_source_cycle does not match the mapped topic source cycle')
    if (record.target_exam_cycle !== record.syllabus_source_cycle) {
      errors.push('target exam cycle is not confirmed by the syllabus source cycle')
    }
  }

  if (!hasSourceReference(record, context)) {
    errors.push('source_references must resolve to registered source IDs and include precise references')
  }

  if (record.content_type === 'question' || record.content_type === 'answer_explanation' || record.content_type === 'flashcard') {
    if (record.answer_verification_status !== 'approved') errors.push('answer verification is not approved')
  }

  return { valid: errors.length === 0, errors }
}

function approvalErrors(record, context, allRecords) {
  const errors = validateContentRecord(record, context).errors
  if (record.content_status !== 'approved') errors.push('content_status is not approved')
  if (record.academic_review_status !== 'approved') errors.push('academic_review_status is not approved')

  if (record.content_type === 'question') {
    const explanation = allRecords.find((candidate) =>
      candidate.content_type === 'answer_explanation' && candidate.content_id === record.explanation_id,
    )
    if (!explanation || !isContentPublishable(explanation, context, allRecords)) {
      errors.push('linked answer explanation is missing or not publishable')
    }
  }
  if (record.content_type === 'answer_explanation') {
    const question = allRecords.find((candidate) =>
      candidate.content_type === 'question' && candidate.content_id === record.question_id,
    )
    if (!question || question.content_status !== 'approved' || question.academic_review_status !== 'approved') {
      errors.push('linked question is missing or not approved')
    }
  }
  return errors
}

export function isContentPublishable(record, context = {}, allRecords = [record]) {
  if (!record || !TYPE_SET.has(record.content_type)) return false
  return approvalErrors(record, context, allRecords).length === 0
}

/**
 * Single publication boundary for learner-facing consumers. Only valid, fully approved
 * records with their own approvals and required linked records are returned.
 */
export function getPublishedContent(records, context = {}) {
  if (!Array.isArray(records)) return []
  const validRecords = records.filter((record) => record && TYPE_SET.has(record.content_type))
  return validRecords.filter((record) => isContentPublishable(record, context, validRecords))
}

export function getPublishedContentByType(records, contentType, context = {}) {
  if (!TYPE_SET.has(contentType)) return []
  return getPublishedContent(records, context).filter((record) => record.content_type === contentType)
}
