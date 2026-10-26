import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { getPublishedContent, getPublishedContentByType, validateContentRecord } from '../src/data/contentModel.mjs'

const syllabusNodes = JSON.parse(await readFile(new URL('../src/data/syllabus_hierarchy.json', import.meta.url), 'utf8'))
const sourceRegister = JSON.parse(await readFile(new URL('../src/data/source_register.json', import.meta.url), 'utf8'))
const context = { syllabusNodes, sourceRegister }
const base = {
  topic_id: 'T1-GIR-ANALOGY',
  target_exam_cycle: '2026',
  syllabus_source_cycle: '2026',
  content_status: 'approved',
  academic_review_status: 'approved',
  source_references: [{ source_id: 'SSC-CGL-2026-NOTICE', reference: '§13.10.1 — Analogies syllabus mapping' }],
}
const lesson = (overrides = {}) => ({ content_id: 'lesson-analogies-intro', content_type: 'lesson', ...base, title: 'Analogies', sections: [{ heading: 'Relationship', body: 'Identify the relationship in the first pair.' }], ...overrides })
const explanation = (overrides = {}) => ({ content_id: 'explanation-q1', content_type: 'answer_explanation', ...base, question_id: 'question-analogy-01', explanation: 'The pair shares the same relationship.', answer_verification_status: 'approved', ...overrides })
const question = (overrides = {}) => ({ content_id: 'question-analogy-01', content_type: 'question', ...base, prompt: 'Bird is to nest as bee is to …', options: [{ option_id: 'A', text: 'hive' }, { option_id: 'B', text: 'web' }, { option_id: 'C', text: 'den' }, { option_id: 'D', text: 'burrow' }], correct_option_id: 'A', explanation_id: 'explanation-q1', answer_verification_status: 'approved', ...overrides })
const flashcard = (overrides = {}) => ({ content_id: 'flashcard-analogy-01', content_type: 'flashcard', ...base, front: 'What is an analogy?', back: 'A comparison based on a shared relationship.', answer_verification_status: 'approved', ...overrides })

test('approved records of all four content types can pass the centralized publication gate', () => {
  const records = [lesson(), question(), explanation(), flashcard()]
  const published = getPublishedContent(records, context)
  assert.deepEqual(published.map((record) => record.content_id).sort(), records.map((record) => record.content_id).sort())
  for (const type of ['lesson', 'question', 'answer_explanation', 'flashcard']) {
    assert.equal(getPublishedContentByType(records, type, context).length, 1)
  }
})

test('draft, pending-review, and unapproved records are excluded', () => {
  const records = [
    lesson({ content_id: 'lesson-draft', content_status: 'draft' }),
    lesson({ content_id: 'lesson-review-pending', academic_review_status: 'needs_syllabus_review' }),
    lesson({ content_id: 'lesson-not-approved', content_status: 'needs_update' }),
    question({ content_id: 'question-answer-pending', answer_verification_status: 'needs_answer_review' }),
    flashcard({ content_id: 'flashcard-draft', content_status: 'draft' }),
  ]
  assert.deepEqual(getPublishedContent(records, context), [])
})

test('missing and unregistered source references fail validation and publication', () => {
  const missing = lesson({ source_references: [] })
  const unknown = lesson({ source_references: [{ source_id: 'NO-SUCH-SOURCE', reference: 'p. 1' }] })
  assert.equal(validateContentRecord(missing, context).valid, false)
  assert.equal(validateContentRecord(unknown, context).valid, false)
  assert.deepEqual(getPublishedContent([missing, unknown], context), [])
})

test('unconfirmed target-cycle mapping cannot publish 2027-targeted content from 2026 syllabus data', () => {
  const record = lesson({ target_exam_cycle: '2027' })
  assert.equal(validateContentRecord(record, context).valid, false)
  assert.deepEqual(getPublishedContent([record], context), [])
})

test('invalid topic IDs and incomplete answer/explanation links cannot publish', () => {
  assert.deepEqual(getPublishedContent([lesson({ topic_id: 'NOT-A-SYLLABUS-NODE' })], context), [])
  assert.deepEqual(getPublishedContent([question()], context), [])
  assert.deepEqual(getPublishedContent([explanation()], context), [])
})

test('question and explanation require each other and both must be approved', () => {
  const q = question()
  const e = explanation()
  assert.equal(getPublishedContent([q, e], context).length, 2)
  assert.deepEqual(getPublishedContent([q, explanation({ content_status: 'draft' })], context), [])
  assert.deepEqual(getPublishedContent([question({ content_status: 'draft' }), e], context), [])
})

test('bad option IDs, answer keys, and status strings are rejected', () => {
  assert.equal(validateContentRecord(question({ correct_option_id: 'Z' }), context).valid, false)
  assert.equal(validateContentRecord(question({ options: [{ option_id: 'A', text: 'one' }, { option_id: 'A', text: 'two' }] }), context).valid, false)
  assert.equal(validateContentRecord(lesson({ content_status: 'published' }), context).valid, false)
})
