# Project Status & Release Checklist

**Updated:** 2026-10-27  
**Project:** Purr & Petal — SSC CGL study website  
**Target:** SSC CGL 2027  
**Target date recorded in project handoff:** 31 October 2026

## Current repository state

- [x] GitHub repository initialized.
- [x] Role 02 initial research handoff copied into the repository: status report, source register, topic shortlist and lossless archive of the complete hierarchy JSON.
- [x] Project brief and framework-neutral implementation plan.
- [x] Content mapping and publication governance.
- [x] Lesson schema and one draft Analogies lesson.
- [x] Static HTML/CSS/JavaScript prototype and compact UI seed map.
- [x] Source restoration script, integrity validator, test and GitHub Actions workflow.
- [ ] Restore hierarchy plaintext files in the working checkout and independently audit them.
- [ ] Final target-cycle syllabus verification.
- [ ] Independent lesson answer review and sign-off.
- [ ] Responsive/accessibility browser QA.
- [ ] Deployment target and deployment workflow confirmed.
- [ ] Production release sign-off.

## High-priority work

| Priority | Work item | State | Acceptance evidence |
|---|---|---|---|
| P0 | Check official SSC CGL 2027 notification and corrigenda | Open | Exact official notice URL, inspected sections, review date, and paragraph-by-paragraph comparison with the 2026 baseline |
| P0 | Complete/independently audit all hierarchy mappings | Open | Audit checklist, unresolved node IDs, source/page references and independent reviewer record |
| P0 | Inspect any existing site/builder and deployment setup | Open | Inspection report before replacing or extending an existing implementation |
| P0 | Review the Analogies starter lesson | Draft | Independently solved questions, ambiguity review, mapping review, reviewer and date recorded |
| P0 | Run functional and accessibility QA on the prototype | Open | Test results for mobile/desktop, keyboard flows, focus visibility, semantic structure and data loading |
| P1 | Decide current-affairs source and date-window policy | Open | Policy defining coverage window, reliable sources, last-verified date and expiry/review triggers |
| P1 | Decide whether specialist Tier-II papers are in the first release | Open | Owner decision documented in this file or a later decision record |

## Non-negotiable release gates

1. A 2026 baseline may remain useful, but it must not be presented as the confirmed 2027 syllabus.
2. Every lesson has separate `mapping_status` and `content_status`.
3. A lesson labelled approved must have an independent answer review and a syllabus/source review record. A status string alone is not evidence.
4. General Awareness subtopic groupings are editorial unless SSC explicitly lists them as such.
5. Do not publish current-affairs material without the adopted freshness policy.
6. A green technical test run does not constitute academic approval or accessibility sign-off.

## Notes for the next contributor

The static prototype is deliberately small and framework-free. It does not establish that a previously selected builder or hosting platform was inspected. Before adopting a production architecture, confirm whether a separate implementation already exists and preserve a working backup. The UI seed map is a compact sample; the full hierarchy source must be restored and used before calling the syllabus explorer comprehensive.

The original full hierarchy JSON is preserved in `docs/research/archive/syllabus_hierarchy.json.gz.b64`. The restore script regenerates the CSV export from that JSON, so the CSV reflects the same node data but is not a byte-for-byte archive of the previous CSV file.

## Research baseline and official links

- SSC CGL 2026 notice: https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_cgl_2026.pdf
- SSC syllabus portal: https://ssc.gov.in/for-candidates/syllabus

Research inspection date recorded by Role 02: 2026-10-26. The status means the 2027 notice was not located or verified in that inspection, not a categorical claim that no such notice exists.
