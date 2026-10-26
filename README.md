# Purr & Petal — SSC CGL Study Website

A cute, cozy, academically careful personal SSC CGL study website. This repository holds the project brief, syllabus evidence, review rules, seed content, and an initial static front-end prototype.

## Project status (as of 2026-10-27)

- Target exam cycle: **SSC CGL 2027**.
- The syllabus research package uses the **official SSC CGL 2026 notice as a provisional prior-cycle baseline**.
- The project team had not located or verified the applicable SSC CGL 2027 notification in the official materials inspected for the research handoff. Do not describe the 2026 map as a verified 2027 syllabus.
- A small static prototype is present at `index.html`, with `styles.css` and `app.js`.
- The Analogies lesson in `content/lessons/analogies.starter.json` is **draft**, not approved for publication.
- Visual direction: warm pastels, cozy and cute; readability and accessibility take priority over decoration.

## Repository map

```text
.
├── index.html
├── styles.css
├── app.js
├── public/data/syllabus-seed.json
├── README.md
├── docs/
│   ├── project-brief.md
│   ├── project-status.md
│   ├── implementation-plan.md
│   ├── content-governance.md
│   └── research/
│       ├── research_status_report.md
│       ├── source_register.csv
│       ├── starter_topic_shortlist.json
│       └── archive/syllabus_hierarchy.json.gz.b64
├── content/
│   ├── schema/lesson.schema.json
│   └── lessons/analogies.starter.json
├── scripts/
│   ├── restore-research-source.mjs
│   └── validate-syllabus.mjs
├── tests/validate-syllabus.test.mjs
└── .github/workflows/validate-seed-data.yml
```

The full original 61-node hierarchy JSON is preserved in the compressed Base64 archive under `docs/research/archive/`. The matching CSV is generated from that authoritative JSON when the restore script runs; the CSV is a derived export, not a byte-for-byte archive of the original CSV. The generated plaintext files are not currently committed. Run the restore script to recreate `docs/research/syllabus_hierarchy.json` and `docs/research/syllabus_hierarchy.csv`. The front-end prototype uses the separate, compact starter selection at `public/data/syllabus-seed.json`; it is not exhaustive.

## Run locally

Requires Node.js 18+ for the scripts. To serve the static page locally, run a small web server from the repository root (browsers generally block local JSON fetches from a `file://` URL).

```bash
# Restore the original full research hierarchy JSON and generate CSV
node scripts/restore-research-source.mjs

# Validate hierarchy structure and run tests
node scripts/validate-syllabus.mjs
node --test tests/validate-syllabus.test.mjs

# Serve the prototype locally (Python 3)
python -m http.server 8000
```

Then open `http://localhost:8000`. GitHub Actions runs the restoration and validation checks on pushes and pull requests.

## Academic safety rules

1. Keep source cycle and target cycle distinct. A mapping verified against the **2026** notice does not certify the 2027 syllabus.
2. Keep syllabus mapping status separate from content approval status.
3. Do not publish content as approved until its source, target-cycle mapping, answer key, explanations, and independent reviews pass.
4. Editorial study groupings must not be described as SSC's official taxonomy.
5. Current-affairs content requires a defined date window and source, event date, publication date, last-verified date, review due date, and expiry/review status.

## Primary official sources

SSC Combined Graduate Level Examination, 2026 notice (provisional baseline only):  
https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_cgl_2026.pdf

Official SSC syllabus portal (recheck for the target cycle):  
https://ssc.gov.in/for-candidates/syllabus

See `docs/research/research_status_report.md` for source details, limitations, and next verification steps.
