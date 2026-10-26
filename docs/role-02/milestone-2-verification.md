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
