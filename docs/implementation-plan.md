# Implementation Plan

## Current repo state

This repository began empty. The files here are the initial documentation/data-validation foundation, not a claim that a complete website already exists. The project owner has not selected a framework or builder, so this plan is framework-neutral.

## Phase 0 — Inspect and decide

Before selecting a stack, document:
- Existing website/builder, if any; exported code and current deployment URL.
- Whether there is an existing codebase elsewhere that must be preserved.
- Hosting target and build/deploy workflow.
- Whether content is local static JSON or requires user accounts/storage.
- Current design reference and accessibility requirements.

Do not overwrite an existing site or assume a backend is needed. Public access and no cross-device sync currently point toward a static-first approach unless later decisions require more.

## Phase 1 — Data and governance (starter files in this repo)

- Use `docs/research/syllabus_hierarchy.json` as the import source.
- Keep stable `topic_id` identifiers and `parent_id` hierarchy.
- Use `mapping_status` for syllabus confidence and `content_status` for lesson approval. These are independent dimensions.
- Validate unique IDs, parent references, source references, supported statuses and parseable JSON.
- Keep source metadata and editorial groupings distinct from official wording.
- Keep the original CSV alongside JSON for spreadsheet-friendly review.

## Phase 2 — Thin vertical slice

Suggested first implementation:
1. Home page with clear study entry points.
2. Syllabus explorer with collapsible tier/paper/subject/topic tree and status labels.
3. Analogies lesson page using a lesson object validated by `content/schema/lesson.schema.json`.
4. Practice mode that records immediate local answers without requiring accounts.
5. Responsive pastel styling and accessible interactions.
6. Visible source note and “provisional for 2027” caution on mappings based on 2026.

Prefer semantic HTML and data-driven components. Never hard-code the syllabus as separate page markup if it can be rendered from structured data.

## Phase 3 — Review and publication gates

A lesson must not be labelled approved until:
- Source accuracy checked.
- Syllabus mapping checked against the applicable target-cycle notice.
- Every answer independently solved and explanation audited.
- Reviewer, review date and review outcome recorded.
- The lesson’s status is `approved`.
- Any time-sensitive facts have a last-verified date and review due/expiry fields.

If source material is incomplete, use `needs_source` or `needs_syllabus_review`; do not infer approval from a URL being present.

## Phase 4 — QA and release

- Validate all seed data and lesson JSON.
- Check keyboard-only flows, focus visibility, semantic headings/labels, text zoom, reduced motion and color contrast.
- Test mobile and desktop layouts.
- Check links and source URLs.
- Verify error/empty states.
- Verify no lesson with a non-approved content status is shown as approved.
- Verify public-facing copy does not say the 2027 syllabus is confirmed while the mapping is provisional.
- Record build/test results and deploy only after academic and functional sign-off.

## Initial technical baseline

The validation scripts use Node.js built-ins and require Node.js 18+; they do not require a framework. A future frontend may use a framework chosen after Phase 0. Do not add authentication, cloud storage or analytics unless a clear requirement arises.
