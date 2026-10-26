# Implementation Plan

## Current repository state

The repository started empty and now contains planning documents, a research package, a small framework-free static prototype, a compact UI syllabus seed, draft lesson content, and data-integrity checks. This is a useful starter implementation, not a complete production website. The project owner has not confirmed a separate builder or selected a production framework.

The complete research hierarchy is archived at `docs/research/archive/syllabus_hierarchy.json.gz.b64`. Run `node scripts/restore-research-source.mjs` to create the readable JSON and a spreadsheet-friendly CSV export. The prototype currently uses `public/data/syllabus-seed.json`, a compact 13-item selection, not the complete 61-node hierarchy.

## Phase 0 — Inspect and decide

Before selecting a production stack, document:
- Existing website/builder, if any; exported code and current deployment URL.
- Whether there is an existing codebase elsewhere that must be preserved.
- Hosting target and build/deploy workflow.
- Whether content is local static JSON or requires user accounts/storage.
- Current design reference and accessibility requirements.

Do not overwrite an existing site or assume a backend is needed. Public access and no cross-device sync currently point toward a static-first approach unless later decisions require more.

## Phase 1 — Data and governance

- The full hierarchy uses stable `node_id` and `parent_id` fields. Preserve IDs as content begins referencing them.
- Lesson `topic_id` values refer to hierarchy IDs; the UI seed uses an `id` field for each compact displayed entry.
- Use `mapping_status` for syllabus confidence and `content_status` for lesson approval. These are independent dimensions.
- Validate unique IDs, parent references, source references, supported statuses and parseable JSON.
- Keep official wording, source metadata and editorial groupings distinct.
- The generated CSV export is derived from the hierarchy JSON for spreadsheet-friendly review; JSON is the authoritative full hierarchy source.
- The static UI uses the compact seed intentionally. Before claiming a comprehensive syllabus explorer, integrate the restored full hierarchy and independently verify it.

## Phase 2 — Thin vertical slice

Initial implementation already present in this repository:
1. Home page with friendly entry points and the provisional-cycle notice.
2. Syllabus starter browser grouped by Tier-I and Tier-II papers, with search and status labels.
3. Analogies lesson preview with a visible draft/review warning.
4. Responsive pastel CSS, semantic landmarks, keyboard skip link, focus states and reduced-motion support.
5. Clear project links and official-source link.

Still to implement or verify before production:
- Full 61-node hierarchy integration and expand/collapse navigation.
- Practice mode and local progress storage, if desired.
- Complete source references and better content-level review records.
- Browser-tested mobile/desktop accessibility.
- Deployment setup after hosting decision.

Prefer semantic HTML and data-driven components. Do not hard-code the full syllabus as separate page markup.

## Phase 3 — Review and publication gates

A lesson must not be labelled approved until:
- Source accuracy checked.
- Syllabus mapping checked against the applicable target-cycle notice.
- Every answer independently solved and explanation audited.
- Reviewer, review date and review outcome recorded.
- The lesson's status is `approved`.
- Any time-sensitive facts have a last-verified date and review due/expiry fields.

If source material is incomplete, use `needs_source` or `needs_syllabus_review`; do not infer approval from a URL being present.

## Phase 4 — QA and release

- Validate the hierarchy, UI seed, lesson JSON and schema JSON.
- Check keyboard-only flows, focus visibility, semantic headings/labels, text zoom, reduced motion and color contrast.
- Test mobile and desktop layouts in browsers.
- Check links and source URLs.
- Verify error/empty states and data-loading paths.
- Verify no lesson with a non-approved content status is shown as approved.
- Verify public-facing copy does not say the 2027 syllabus is confirmed while the mapping is provisional.
- Record build/test results and deploy only after academic and functional sign-off.

## Initial technical baseline

The current prototype uses plain HTML, CSS and browser JavaScript, with no framework or external dependency. Validation scripts use Node.js built-ins and require Node.js 18+. A future frontend framework can be selected after Phase 0 if it solves a real requirement. Do not add authentication, cloud storage or analytics unless a clear requirement arises.
