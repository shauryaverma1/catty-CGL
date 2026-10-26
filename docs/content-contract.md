# Content contract and publication boundary

**Status:** Implemented contract; no lesson/question/explanation/flashcard content is imported into learner-facing data by this change.

## Canonical content types and IDs

The canonical runtime contract is implemented in `src/data/contentModel.mjs`, with TypeScript declarations in `src/data/contentModel.d.mts`. Keep syllabus mappings in `src/data/syllabus_hierarchy.json` and sources in `src/data/source_register.json`; do not duplicate either.

Stable content IDs use immutable, lowercase, hyphen-separated IDs with a type prefix:
- `lesson-<topic-slug>-<slug>`
- `question-<topic-slug>-<two-digit-sequence>`
- `explanation-<question-id-suffix>`
- `flashcard-<topic-slug>-<two-digit-sequence>`

These prefixes are a new content-record convention (not a syllabus-node convention). Once referenced, IDs must not change; edits update the record in place.

## Shared required metadata

Every record requires `content_id`, `content_type`, `topic_id`, `target_exam_cycle`, `syllabus_source_cycle`, `content_status`, `academic_review_status`, and nonempty `source_references`. Each source reference contains `source_id` and a precise `reference`; the source ID must exist in the existing source register. Optional audit fields are `reviewer_id`, `reviewed_at`, and `review_notes`.

Use the existing statuses without adding synonyms: `draft`, `needs_source`, `needs_syllabus_review`, `needs_answer_review`, `approved`, `out_of_scope`, `needs_update`. Answer-bearing records additionally require `answer_verification_status` from that same vocabulary.

## Type-specific fields

- **lesson:** `title`; nonempty `sections[]`, each with `heading` and `body`.
- **question:** `prompt`; at least two unique `options[]` entries with `option_id` and `text`; `correct_option_id` matching an option; `explanation_id`; `answer_verification_status`.
- **answer_explanation:** `question_id`, `explanation`, `answer_verification_status`. It must link to an approved question, and a question must link to an approved explanation.
- **flashcard:** `front`, `back`, `answer_verification_status`.

## Validation and publication

`validateContentRecord()` checks record shape, known status values, source-register resolution, canonical syllabus-node resolution, verified syllabus mapping, source-cycle consistency and target-cycle confirmation. This deliberately prevents content targeted to 2027 from being published against only the 2026 syllabus baseline until the target-cycle mapping is confirmed.

`getPublishedContent()` is the centralized publication boundary. It returns only records whose own `content_status` and `academic_review_status` are `approved`, whose metadata validates, and whose answer verification is approved where required. Question/explanation records must be linked and mutually present/approved. Consumers must call this boundary rather than render raw content arrays.

No draft content data file is added to `src/`; there is no content import in the app yet. Keep incoming drafts outside learner-facing imports. This is a frontend publication filter, not access control for private content: never ship confidential drafts in a public frontend bundle.

## Remaining academic policy

The code verifies that a topic's mapping is marked `verified_official` and its source cycle is consistent. For the current 2027 project, the official 2027 notification is not verified, so 2027-targeted content remains blocked by the target-cycle rule. Do not bypass it by changing statuses manually. After Role 02 confirms the applicable syllabus, update the canonical mapping with audit evidence and test the gate again.

The gate validates metadata and workflow state; it does not independently prove factual correctness. Role 06 must review questions, answer keys and explanations before statuses are changed to `approved`.
