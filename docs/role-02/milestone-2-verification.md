# Milestone 2 syllabus and exam-pattern verification report

**Audit date:** 2026-10-27  
**Authoritative baseline:** SSC CGL 2026 notification, §§13.8–13.11, official PDF pp. 25–37 (PDF pages 24–36): https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_cgl_2026.pdf  
**Status:** Expanded starter hierarchy; not yet certified as a complete verbatim transcription.

## Hierarchy inventory

The current hierarchy contains **193 entries** in `src/data/syllabus_hierarchy.json`; `docs/role-02/syllabus_hierarchy.csv` is synced to it. The set includes exam and subject/container nodes as well as topic/subtopic entries, so 193 is the total number of hierarchy records, not 193 distinct examinable topics. IDs are unique; parent links resolve; every record has the official 2026 notice source ID and a section reference. These structural checks do not prove every official bullet is represented.

The expansion adds missing Tier-I reasoning and quantitative items; Tier-I environment and neighbouring-country scope; Tier-II Mathematical Abilities, Reasoning, English, Computer Knowledge; detailed Statistics; and additional Finance/Economics subtopics. The Tier-II General Awareness scope is represented as a subject/container, not falsely expanded into a new official taxonomy.

## Official exam pattern

The data was checked against §13.8 and §13.9–§13.9.10:
- Tier-I: 4 subjects × 25 questions / 50 marks = 100 questions / 200 marks; 60 minutes with 15-minute timers; 0.50 negative marks per wrong answer. Scribe-eligible timing is 80 minutes, with the notice's compensatory sectional timing.
- Tier-II Paper-I compulsory: Session-I 135 minutes; Section I has Mathematics 30 questions/90 marks and Reasoning 30/90 with 30 minutes per part. Section II has English 45/135 (40 minutes) and General Awareness 25/75 (20 minutes). Section III Computer Knowledge Test 20/60, 15 minutes and qualifying. Session-II DEST is one data-entry task for 15 minutes and qualifying. Paper-I Sections I–III have 1 mark negative marking per wrong answer.
- Tier-II Paper-II Statistics: 100 questions, 200 marks, 120 minutes, 0.50 negative marks per wrong answer; applicable only to candidates applying and shortlisted for the posts in §13.9.3.
- Tier-II Paper-III General Studies (Finance and Economics): 100 questions, 200 marks, 120 minutes, 0.50 negative marks per wrong answer; applicable only to candidates shortlisted for the posts in §13.9.3.
- Papers I, II and III occur in separate shifts/days; Paper-I has two sessions on the same day. Section-level qualifying requirements and post-specific higher standards apply as described in the notice.

Source citations for the displayed scheme: §13.8–§13.8.2, §13.9–§13.9.10; printed pp. 25–30. Scribe compensatory time and specialist-post exceptions must be shown with the notice's caveats rather than generalized.

## Remaining syllabus uncertainties

1. **This hierarchy is still not marked complete.** The notification calls the syllabus “indicative” and contains open-ended wording such as “etc.” and “Other sub-topics, if any.” It does not establish a closed exhaustive topic taxonomy. The new entries map the named bullets, but exact line-by-line reconciliation of every original node and sub-clause still needs a reviewer pass.
2. Tier-I English is intentionally kept at the official broad statement (“correct English, basic comprehension and writing ability”); no official chapter-level list is supplied there.
3. The three `EDITORIAL-GA-*` nodes (Ancient Indian History, Physical Geography, Constitutional topics/Polity) remain editorial groupings with `unresolved` status. They are navigation aids, not official SSC taxonomy.
4. The current hierarchy uses a mix of official phrase-level entries and compact parent/child summaries. Some official bullets are grouped in subtopic strings; do not claim every phrase has its own stable node until the reviewer pass is complete.
5. SSC CGL 2027 syllabus remains unverified. Using 2026 as the 2027-preparation baseline is a project decision only.
6. No lesson, question, explanation or answer is academically approved solely because its syllabus mapping exists.

## Next verification gate

Run CI after the expanded mapping commit, then have a second reviewer compare every source paragraph to the tree, confirm no omissions/duplicates or wrong paper placement, and sign off on the final record count. Do not start a large academic-content batch before that review.


## CI failure found and fix

Run `40408414711` failed in the new test because it incorrectly required every hierarchy node to cite only `SSC-CGL-2026-NOTICE`; the existing source register legitimately includes `SSC-SYLLABUS-PORTAL` for portal-sourced entries. The test was corrected to validate that every node's source ID exists in the source register, while requiring a non-empty source reference. This is a test expectation correction, not a change to source attribution. The corrected run must pass before this blocker is closed.


## Duplicate and hierarchy-parent audit update

A structural scan found 13 duplicate topic nodes created during the expansion: 12 repeated Statistics heading nodes and one repeated market-forms node. Their detailed wording was merged into the pre-existing nodes, and the redundant nodes were removed. Five explicit structural containers were added for Tier-I, Tier-II and Tier-II Papers I–III. The hierarchy's top-level subject/module parent assignments were corrected to follow those containers; specialist papers remain separate. The current total is **185 hierarchy records** (not 193); this is a record count including container nodes, not a count of unique examinable topics.

Automated structural scan after correction: 185 records; duplicate IDs: 0; missing parent links: 0; missing source references: 0. Remaining repeated labels such as “General Awareness” across Tier-I and Tier-II are intentional because they are distinct exam components. The three editorial GA groupings remain unresolved. The hierarchy is still **not certified exhaustive**: official paragraph-by-paragraph wording review and independent academic sign-off remain open.


## Exam-pattern independent cross-check

Checked the table against the official PDF's extracted text: §13.8–§13.8.2 (PDF page 25), §13.9 (PDF pages 25–30), especially the scheme table on PDF pages 25–27 and §§13.9.1–13.9.10. The scheme table and prose agree on Tier-I 100/200/60 minutes; Tier-II Paper-I Session-I 135 minutes (60-minute Section I, 60-minute Section II, 15-minute CKT), Session-II 15-minute DEST; Paper-II and III 100 questions/200 marks/120 minutes; penalties 0.50 for Tier-I, 1 mark in Paper-I Sections I–III, and 0.50 in Paper-II/III. Specialist eligibility is §13.9.3; Paper-I compulsory is §13.9.2; CKT and DEST qualifying rules are §§13.9.9–13.9.10. Scribe timings are now represented separately in the structured data: Tier-I 20 minutes per subject; Paper-I Section-I 40 minutes per subject, Section-II English 55 and General Awareness 25, CKT 20, DEST 20 (with the applicable notice conditions). This is a source-based cross-check; an independent human academic sign-off remains outstanding.

## Final record count after deduplication and containers

The current hierarchy is **185 records**, after removing 13 duplicate records and adding five explicit exam tier/paper containers. The 185 count includes structural containers and is not the count of distinct topic names. Duplicate IDs: 0; missing parents: 0; missing source references: 0. There are intentional same-name subject entries across distinct tiers, especially General Awareness. The three editorial GA nodes remain unresolved. A complete human-reviewed line-by-line syllabus certification remains open.


## Independent syllabus line-by-line reconciliation (2026-10-27)

I re-read official §13.10.1–§13.10.5 and §13.11.1–§13.11.8 against the structured records, using the official SSC PDF: https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_cgl_2026.pdf (PDF pp. 31–37; §§13.10–13.11; especially §§13.11.1.1–13.11.7.2.10). This is a separate source-based review, not a second human reviewer sign-off.

### Corrections made during this pass

- Added an omitted explicit Tier-II Paper-I Reasoning topic: **Space visualization** (§13.11.2.1). It was present in Tier-I Reasoning but missing as a Tier-II entry.
- Expanded Tier-II Mathematics wording to name mean, median and mode in Statistics and Probability (§13.11.1.7).
- Expanded Tier-II Trigonometry wording to include the standard-identity example in §13.11.1.6.
- Synced the CSV export to the JSON after these corrections.

### Unresolved grouping/wording issues — do not mark the hierarchy exhaustive

1. **Tier-I General Intelligence & Reasoning (§13.10.1):** several official phrases remain grouped into single records (e.g., the three analogy types; series types; folding/pattern completion; matching/coding variants). They map the named list but are not all separate records. The paragraph also uses open-ended “etc.”
2. **Tier-I General Awareness (§13.10.2):** official wording is broad and does not prescribe chapter-level subtopics. EDITORIAL-GA-ANCIENT-HISTORY, EDITORIAL-GA-PHYSICAL-GEOGRAPHY, and EDITORIAL-GA-CONSTITUTION are editorial navigation groupings, not official SSC labels; all three remain unresolved pending explicit editorial rationale and review. The environment/application-to-society and everyday scientific-observation wording should remain visible as parent scope, not be silently replaced by a narrower school-subject taxonomy.
3. **Tier-I Quantitative Aptitude (§13.10.3):** the topic set is covered through grouped entries, but geometry and mensuration have some bundled wording (e.g., circle/chords/tangents and solids). The notice itself repeats “Triangle” and “Circle” across its list; do not turn these repetitions into assumed omissions or deduplicate concepts without preserving scope.
4. **Tier-I English (§13.10.4):** only the broad official statement (“correct English”, basic comprehension and writing ability, etc.) is provided. Any chapter-level English taxonomy would be editorial and must be labeled as such.
5. **Tier-II Mathematical Abilities (§13.11.1.1–13.11.1.7):** each numbered heading is represented as a topic with multiple official subitems in a single subtopic string. This preserves coverage but is not one-record-per-clause. Keep the level-of-difficulty note in §13.11.8 linked to the subject.
6. **Tier-II Reasoning (§13.11.2.1):** the named list is mostly represented as one item per phrase; “Other sub-topics, if any” is explicitly open-ended and cannot be certified exhaustive.
7. **Tier-II English (§13.11.3.1):** some official list items remain grouped (vocabulary/grammar/sentence structure, error/fill blanks, and comprehension passage requirements). Preserve the exact requirement for three or more paragraphs and the passage-type distinction when turning this into content.
8. **Tier-II General Awareness (§13.11.4.1):** this remains a broad official description and not a fixed topic list. Do not invent a supposedly official chapter taxonomy.
9. **Tier-II Computer Knowledge (§13.11.5.1–13.11.5.4):** records use compact summaries of computer basics, software, internet/e-mail, and network/cybersecurity. Review each comma-separated item against the notice before considering the subtopics individually verified.
10. **Tier-II Statistics (§13.11.6.1–13.11.6.12):** each official numbered heading is represented as one topic with a bundled subtopic string. Preserve constraints such as partial/multiple correlation for three variables only, sampling distribution “statement only,” and the stated list of distributions/tests. This is coverage mapping, not a content-level verification of every statistical claim.
11. **Tier-II Finance and Economics (§13.11.7.1–13.11.7.2.10):** parent topics group numerous accounting, Indian economy, and banking clauses. The subtopic strings have not yet received a character-by-character transcription comparison; preserve the explicit 80/120 marks division only in exam-pattern metadata if displayed.
12. **Open-ended syllabus wording:** SSC calls the syllabus “indicative” and uses “etc.” / “Other sub-topics, if any.” There is no defensible basis for claiming a closed, exhaustive syllabus taxonomy.
13. **Exam-cycle limitation:** all mapping checks refer to the 2026 notification. The 2027 notification and any amendments remain unverified; do not label the 2026 baseline as official 2027 syllabus.

### Structural status after the correction

The hierarchy has 186 records including exam-tier/paper containers. This is a record count, not a count of unique examinable topics. Duplicate node IDs: 0; missing parent links: 0; missing source references: 0 in the JSON structural scan. These checks do not resolve the wording/grouping issues above. Status remains **reviewed for known issues; not certified exhaustive**.

## Independent exam-pattern review — scope and conclusion

I independently cross-checked the JSON fields against the official scheme table and §§13.9.1–13.9.10, PDF pp. 25–30: https://ssc.gov.in/api/attachment/uploads/masterData/Notice_of_adv_cgl_2026.pdf. This was a separate source comparison, not a second human reviewer signature.

- **Tier-I:** 4 subjects × 25 questions/50 marks = 100/200; 60 minutes with 15-minute sectional timers; scribe-eligible 80 minutes with 20-minute timers; −0.50 per wrong answer (§§13.8–13.8.2).
- **Tier-II Paper-I:** compulsory for all posts; Session-I is 135 minutes (Section-I 60 minutes/60 questions/180 marks; Section-II 60 minutes/70 questions/210 marks; CKT 15 minutes/20 questions/60 marks). Session-II DEST is 15 minutes, about 2,000 key depressions. Scribe-eligible timing follows the exact sectional compensatory allowances in §13.9 and adds five minutes to DEST. −1 per wrong answer in Sections I–III. All four sections must be qualified separately (§§13.9.2, 13.9.4–13.9.10).
- **CKT:** mandatory for all posts and qualifying; higher qualifying standards apply to specified computer-proficiency posts (§13.9.9).
- **DEST:** qualifying skill test, with post-specific exemptions/standards and scribe compensatory time as detailed in §13.9.10. The notice's exception wording must not be collapsed into a universal exemption.
- **Paper-II Statistics:** 100 questions/200 marks/120 minutes, scribe-eligible 160 minutes, −0.50 per wrong answer; only for candidates who applied and were shortlisted for the specified JSO/Statistical Investigator Grade-II posts and shortlisted in Tier-I (§13.9.3).
- **Paper-III Finance and Economics:** 100 questions/200 marks/120 minutes, scribe-eligible 160 minutes, −0.50 per wrong answer; only for candidates shortlisted in Tier-I for Assistant Audit Officer/Assistant Accounts Officer posts (§13.9.3).
- **Cycle and source:** 2026 notice only; the table is not a verified 2027 pattern.

No numeric discrepancy was identified in the current exam-pattern data in this pass. Remaining review boundary: this is an independent model/source cross-check, not formal sign-off by a second human academic reviewer. The exam pattern should remain clearly sourced to the 2026 notice.

## Publication gate

No lessons, questions, explanations, or flashcards are approved by this audit. Do not publish content until its own source, answer/explanation, and academic review fields are explicitly approved. The starter-topic shortlist remains planning-only.
