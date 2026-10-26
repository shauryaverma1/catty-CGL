# Content and Academic Governance

## 1. Two separate states

### Syllabus mapping state

Allowed values:
- `verified_official`
- `provisional_previous_cycle`
- `awaiting_official_confirmation`
- `unresolved`
- `out_of_scope`

These describe the mapping of a topic to the relevant exam-cycle syllabus, not lesson quality.

### Lesson/content approval state

Allowed values:
- `draft`
- `needs_source`
- `needs_syllabus_review`
- `needs_answer_review`
- `approved`
- `out_of_scope`
- `needs_update`

These describe editorial review and readiness. A syllabus source never proves an answer or explanation is correct.

## 2. Cycle integrity

At the research handoff dated 2026-10-26, the team had not located or verified the official CGL 2027 notification in the official materials inspected. The latest confirmed baseline in the research package is the 2026 official notice.

Therefore, mappings based on that notice are provisional for a 2027 release, even where the topic itself is directly supported by the 2026 PDF. Do not upgrade a mapping until the applicable 2027 notice and corrigenda have been checked.

## 3. Source record minimum

For each source, retain:
- Stable source ID.
- Official publisher/organization.
- Exact URL.
- Document title and source cycle.
- Publication or notice date when explicitly established.
- Access/inspection date.
- Relevant section, paragraph and printed/PDF page where possible.
- What was actually inspected and limitations.
- Current review state.

Do not treat a planned upload date as proof of a separately signed publication timestamp.

## 4. Lesson review gate

For every lesson, independently review:
1. Syllabus scope and target-cycle mapping.
2. Factual claims and the source supporting each claim.
3. Originality and unambiguous wording of questions.
4. Correct answer and explanation for every choice.
5. Accessibility and clear presentation.
6. Reviewer, date, outcome and notes.

Only `content_status: approved` plus completed review evidence allows the lesson to be presented as approved. A status field alone cannot replace the review record.

## 5. Editorial taxonomy

Navigation groupings such as specific historical eras or polity themes may be useful editorial labels, but must not be presented as the official wording or taxonomy of SSC unless the notice explicitly uses that structure.

## 6. Current affairs and changing facts

Before current-affairs content is in scope, agree a date-window policy. Store source, event date, publication date, last-verified date, review due date and expiry/review status. Use official responsible agencies for government posts, statistics, schemes, budgets and policy rates. Stale material must be marked `needs_update`.

## 7. Revalidation triggers

Re-review impacted mappings or content when:
- SSC publishes the target-cycle notice, corrigendum or clarification.
- An official source changes or is superseded.
- An answer is challenged or a material error is found.
- A time-sensitive fact changes or passes its review/expiry date.
- The frontend schema or import logic changes.
