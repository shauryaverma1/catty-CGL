# Purr & Petal — Role 02 Research Status & Syllabus Mapping
**As of:** 2026-10-26  
**Target cycle:** SSC CGL 2027  
**Website deadline:** 31 October 2026  
**Role:** Syllabus Researcher & Source Librarian  
**Handoff recipient:** Role 01 — Project Manager & Product Lead

## 1. Research status report

**2027 notification:** Not located or verified in the official SSC materials inspected on 2026-10-26. Therefore no item is labelled `verified_official` for the 2027 cycle itself.

**Latest verified baseline:** SSC Combined Graduate Level Examination, 2026 notice. The first page identifies the notice as “Combined Graduate Level Examination, 2026” and says it is to be uploaded on 21 May 2026. The PDF is 132 pages. Relevant syllabus sections §13.8–§13.11 are on printed PDF pages 25–37. Official PDF: https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_cgl_2026.pdf

**Direct inspection:** Opened the official 2026 notice PDF and inspected the Tier-I syllabus (§13.10), Tier-II syllabus (§13.11), detailed Statistics syllabus (§13.11.6), and Finance/Economics syllabus (§13.11.7). The official SSC syllabus portal was also opened; the inspected response displayed no syllabus download data. An official 2024 scheme/syllabus PDF was opened as historical context but not used to assert a complete change comparison.

**Interpretation:** All 2026 mappings in the JSON/CSV are official mappings for 2026. For the 2027 project, these remain `provisional_previous_cycle` until the official 2027 notification and any corrigenda are checked. `verified_official` in the hierarchy denotes direct support by the cited official source and source cycle; it must not be read as confirmation for 2027.

## 2. Official source register

See `source_register.csv` and `syllabus_hierarchy.json`. The key sources are:
- `SSC-CGL-2026-NOTICE`: https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_cgl_2026.pdf
- `SSC-CGL-2024-SYLLABUS`: https://ssc.gov.in/api/attachment/uploads/masterData/Syllabus/CGL-syllabus-169635-.pdf
- `SSC-SYLLABUS-PORTAL`: https://ssc.gov.in/for-candidates/syllabus

Access/inspection date: 2026-10-26. Publication date is recorded as the date stated in the notice (planned upload date) where appropriate; do not confuse it with the research date.

## 3. Syllabus hierarchy — readable summary

### Tier-I (§13.10; printed pages 30–31)
- General Intelligence & Reasoning
- General Awareness
- Quantitative Aptitude
- English Comprehension

### Tier-II Paper-I (§13.11.1–§13.11.5; printed pages 31–33)
- Section-I, Module-I: Mathematical Abilities
- Section-I, Module-II: Reasoning and General Intelligence
- Section-II, Module-I: English Language and Comprehension
- Section-II, Module-II: General Awareness
- Section-III, Module-I: Computer Knowledge/Proficiency
- Section-III, Module-II: Data Entry Speed Test (DEST)

### Tier-II Paper-II (§13.11.6; printed pages 33–35)
Statistics, including collection/presentation, central tendency, dispersion, moments/skewness/kurtosis, correlation/regression, probability, random variables/distributions, sampling, inference, ANOVA, time series and index numbers. Paper eligibility must follow the notice.

### Tier-II Paper-III (§13.11.7; printed pages 35–36)
General Studies—Finance and Economics, including Finance and Accounts, CAG, Finance Commission, economics/microeconomics, demand/supply, production/cost, markets, Indian Economy, reforms, money/banking, budget/fiscal matters, and IT in governance. Paper eligibility must follow the notice.

The JSON/CSV contains a starter hierarchy, not a claim that every official subparagraph has been fully normalized. Full extraction and second-person audit remain open tasks.

## 4. Coverage and change report

No defensible 2025-to-2026 comparison was completed. The SSC 2025 URL encountered through search appeared to resolve to a 2026 notice, so it was not treated as a valid 2025 comparator. The official 2024 syllabus PDF was inspected as historical context, but a complete line-by-line comparison against the 2026 notice has not been completed.

Therefore:
- **Confirmed 2027 changes:** none established.
- **2027 topics added/removed:** unknown.
- **2026 syllabus scope:** directly inspected in the cited sections.
- **Next comparison task:** obtain the applicable 2027 notice when SSC publishes it; compare its syllabus paragraphs against the 2026 notice, logging only evidence-backed differences.

## 5. Mapping states and identifiers

ID convention: `CGL-[cycle]-[tier]-[paper/section]-[subject]-[topic]` or compact stable IDs such as `T1-GIR-ANALOGY`. IDs must remain stable once used by content; changing wording should not silently change the ID. New topic nodes need a unique ID and a parent ID.

Allowed mapping states:
- `verified_official`
- `provisional_previous_cycle`
- `awaiting_official_confirmation`
- `unresolved`
- `out_of_scope`

Separate from content approval states:
- `draft`
- `needs_source`
- `needs_syllabus_review`
- `needs_answer_review`
- `approved`
- `out_of_scope`
- `needs_update`

A source reference proves topic scope only. It does not prove the correctness of a lesson, answer or explanation.

## 6. Starter-topic shortlist

See `starter_topic_shortlist.json`. Recommended first topic: **Tier-I General Intelligence & Reasoning — Analogies**. It is explicitly listed in §13.10.1, bounded enough for a small original lesson, and suitable for independent verification. It remains a previous-cycle mapping for the 2027 project until the applicable notice is checked.

## 7. Changing facts and maintenance

- **Stable historical/math concepts:** verify at creation and during QA; revisit when syllabus changes or a credible correction is found.
- **Current affairs:** require event date, publication date, source, last-verified date, review due date and expiry status. Do not publish as current without a defined editorial date window and a reliable source.
- **Government officeholders, policy rates, budgets, schemes and current statistics:** use the responsible official ministry/agency; mark `needs_update` when a source is superseded or the relevant fact changes.
- **Computer/software guidance:** use official vendor documentation for changing interfaces and security practices.
- **Syllabus structure:** recheck whenever SSC issues a new notice, corrigendum or clarification; mark affected mappings `awaiting_official_confirmation` or `needs_syllabus_review` until reconciled.

Do not treat any review date as proof that a fact was checked unless the audit record exists.

## 8. Academic handoff

**Role 01 — Project Manager:** Track the 2027 notification as a dependency. Treat the 2026 map as provisional for 2027. Keep unresolved items visible and approve scope changes only after evidence review.

**Role 04 — Learning Content Creator:** Choose only mapped nodes. Attach factual sources separately from the syllabus source. Do not begin a full lesson until the mapping has a source ID, paragraph/page and status. Submit all work for independent review.

**Role 05 — Developer:** Import `syllabus_hierarchy.json` as seed data and use `topic_id`/`parent_id` relationships. Keep official wording and editorial labels separate. Enforce publication gates so only content with approved content status and completed review can be shown as approved.

**Role 06 — QA & Academic Auditor:** Verify URL, official publisher, paragraph/page, exact tier/paper and topic boundary. Independently solve questions and validate factual claims. Log reviewer, date, outcome and reason; do not approve based only on a non-empty citation field.

## 9. Outstanding decisions

### Blocks or high priority
1. Who will perform the final independent audit of the hierarchy before release?
2. What source/date-window policy should govern current-affairs content?

### Can wait
1. Which optional editorial groupings should appear in navigation?
2. Whether specialist Tier-II papers will be included in the first release or only represented in the syllabus tree.

## Current research status
- **Verified:** Official SSC CGL 2026 notice and relevant syllabus sections inspected.
- **Provisional:** 2026 mappings for use in the 2027 project.
- **Unresolved:** 2027 notification, amendments, exhaustive topic extraction, and line-by-line prior-cycle comparison.

## Three most important findings
1. The 2026 official notice separates Tier-I, compulsory Tier-II Paper-I, and specialized Tier-II Papers-II and III.
2. The 2027 syllabus must not be labelled verified until the 2027 notice is inspected.
3. Topic mapping and content approval are separate checks.

## Outstanding academic risks
- New 2027 notice or corrigendum could change scope.
- General Awareness requires cautious editorial subdivision.
- Partial extraction can be mistaken for exhaustive coverage unless marked clearly.
- Factual-source validation and independent answer review are still required for each content item.

## Artifacts ready for handoff
- `research_status_report.md`
- `source_register.csv`
- `syllabus_hierarchy.json`
- `syllabus_hierarchy.csv`
- `starter_topic_shortlist.json`

## Next action
**Check SSC's official notice board for the 2027 CGL notification and then run a paragraph-by-paragraph comparison against the 2026 syllabus before changing any 2027 mapping status.**