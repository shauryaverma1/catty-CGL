# Purr & Petal — SSC CGL Study Website

A cute, cozy, academically careful personal study website for SSC CGL preparation. This repository is the source of truth for project documentation, syllabus evidence, study content, and implementation starter files.

## Project status (as of 2026-10-26)

- Target exam cycle: **SSC CGL 2027**
- The syllabus research package currently uses the **official SSC CGL 2026 notice as a provisional prior-cycle baseline**.
- The project team had **not verified an applicable SSC CGL 2027 notification** at the date of the handoff. Do not describe the 2026 mapping as the verified 2027 syllabus.
- First recommended pilot lesson: **Tier-I General Intelligence & Reasoning — Analogies**.
- Content in `content/lessons/analogies.starter.json` is a draft for review, not approved for publication.
- Visual direction: pastel, warm, cozy, cute. Product should remain readable and accessible.

## Repository map

```text
.
├── README.md
├── docs/
│   ├── project-brief.md
│   ├── implementation-plan.md
│   ├── content-governance.md
│   └── research/
│       ├── research_status_report.md
│       ├── source_register.csv
│       ├── syllabus_hierarchy.csv
│       ├── syllabus_hierarchy.json
│       └── starter_topic_shortlist.json
├── content/
│   ├── schema/
│   │   └── lesson.schema.json
│   └── lessons/
│       └── analogies.starter.json
├── scripts/
│   └── validate-syllabus.mjs
└── tests/
    └── validate-syllabus.test.mjs
```

## Quick start

This starter package intentionally does not assume a framework or builder that has not been selected/inspected. Review `docs/implementation-plan.md` before choosing or wiring a runtime. The data files are JSON/CSV and can be imported by a future frontend.

Validate the research data with Node.js 18+:

```bash
node scripts/validate-syllabus.mjs
node --test tests/validate-syllabus.test.mjs
```

## Academic safety rules

1. Keep the source cycle and target cycle distinct. `verified_official` on an item can mean verified against its cited **2026** source; it does not certify the 2027 syllabus.
2. Keep syllabus mapping status separate from content approval status.
3. Do not publish content until its source, answer key, explanations, and syllabus mapping have passed review.
4. Editorial study groupings must not be described as official SSC taxonomy.
5. Current-affairs material must record source, event date, publication date, last-verified date, review due date, and expiry/review status.

## Primary official source currently recorded

SSC Combined Graduate Level Examination, 2026 notice (provisional baseline only):
https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_cgl_2026.pdf

Official SSC syllabus portal (recheck for the target cycle):
https://ssc.gov.in/for-candidates/syllabus

See `docs/research/research_status_report.md` for research limitations and next verification steps.
