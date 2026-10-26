# Milestone 2 syllabus and exam-pattern verification report

**Audit date:** 2026-10-27  
**Working baseline:** SSC CGL 2026 syllabus baseline — used for 2027 preparation  
**Authoritative source:** SSC Combined Graduate Level Examination, 2026 notice, §13.8–§13.11; https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_cgl_2026.pdf  
**Source artifacts:** Role 02 research status report, syllabus CSV, source register CSV, starter shortlist JSON, and syllabus hierarchy JSON.

## Scope and limits

The Role 02 research status report explicitly describes the JSON/CSV as a **starter hierarchy, not an exhaustive normalization of every official syllabus subparagraph**. The current seed contains 61 hierarchy entries. The CSV and JSON contain the same 61 node IDs; IDs are unique, all non-null parents resolve, and all nodes reference source IDs in the source register. These are structural integrity checks, not proof of complete official coverage.

## Exam pattern verified against §13.8–§13.9.10 (printed pages 25–30; PDF pages 24–29)

- **Tier-I:** Four subjects; 25 questions and 50 marks each; 100 questions and 200 marks total; 60 minutes with a 15-minute timer per subject; 0.50 negative marks per wrong answer. Scribe-eligible timing is 80 minutes total under the notice.
- **Tier-II Paper-I:** Compulsory for all posts. Session-I lasts 2 hours 15 minutes and includes Sections I–III. Section I: Mathematical Abilities (30) and Reasoning and General Intelligence (30), 180 marks total, 30 minutes per subject. Section II: English Language and Comprehension (45) and General Awareness (25), 210 marks total, 40 minutes and 20 minutes respectively. Section III Computer Knowledge Test: 20 questions, 60 marks, 15 minutes, qualifying. Session-II DEST: one data-entry task, 15 minutes, qualifying. Sections I, II and III have 1 negative mark per wrong answer. Higher qualifying standards may apply to specified posts.
- **Tier-II Paper-II Statistics:** 100 questions, 200 marks, 2 hours; 0.50 negative marks per wrong answer; only candidates applying and shortlisted for the posts specified in §13.9.3.
- **Tier-II Paper-III General Studies (Finance and Economics):** 100 questions, 200 marks, 2 hours; 0.50 negative marks per wrong answer; only candidates shortlisted for the posts specified in §13.9.3.
- Paper-I runs in two sessions on the same day; Papers I, II and III are conducted in separate shifts/days as specified by the notice.

The exam-pattern data was corrected to include Tier-I negative marking, Tier-II Paper-I section timers (including 40 minutes English and 20 minutes General Awareness), and applicable negative marking. The official notice remains authoritative for compensatory time and post-specific qualifying standards.

## Coverage gaps relative to the official syllabus

These are gaps in the supplied hierarchy, not claims that SSC omitted the material. Keep official wording and editorial expansions separate.

### Tier-I — §13.10.1 General Intelligence & Reasoning
Current seed includes analogies, series, coding/decoding, Venn diagrams/inferences, and a combined critical/emotional/social intelligence item. The official paragraph has a much longer list. The seed does not separately represent at least: space visualization; spatial orientation; problem solving and analysis; judgment and decision making; visual memory; discrimination and observation; relationship concepts; arithmetical reasoning; figural classification; arithmetic number series; non-verbal series; syllogistic reasoning; statement-conclusion; statement-argument; and other listed verbal/non-verbal categories. Re-extract §13.10.1 line by line.

### Tier-I — §13.10.2 General Awareness
Current broad topics include History, Culture, Geography, Economic Scene, General Policy, Scientific Research/everyday science and Current events. The official paragraph also mentions environment and its application to society, everyday scientific observation, and India and neighbouring countries. `EDITORIAL-GA-ANCIENT-HISTORY`, `EDITORIAL-GA-PHYSICAL-GEOGRAPHY`, and `EDITORIAL-GA-CONSTITUTION` are explicitly editorial/unresolved, not official chapter-level SSC taxonomy. Do not promote them to official subtopics without evidence.

### Tier-I — §13.10.3 Quantitative Aptitude
Current nodes include percentage, ratio/proportion, interest, profit/loss/discount, algebraic identities/surds, geometry, trigonometric ratios/heights/distances and charts. The source hierarchy still needs separate mapping/reconciliation for number systems; whole-number/decimal/fraction computation; relationships between numbers; square roots; averages; time and work; time and distance; partnership; mixture and alligation; linear graphs; triangle centres/congruence/similarity; circle chords/tangents/angles/common tangents; quadrilaterals and regular polygons; right-prism/cylinder/cone/sphere/hemisphere and composite mensuration; complementary angles and standard identities; and the detailed chart/graph wording. Reconcile each exact item to §13.10.3 without obscuring it through merged paraphrases.

### Tier-I — §13.10.4 English Comprehension
The seed has only “Basic comprehension and correct English.” Preserve the full official paragraph verbatim. Do not fabricate an official detailed taxonomy where the notice does not provide one.

### Tier-II Paper-I — §13.11.1–§13.11.5
Current data has module/container nodes and summaries, not a complete topic/subtopic expansion for:
- Mathematical Abilities (§13.11.1): number systems, arithmetic operations, algebra, geometry, mensuration, trigonometry, statistics and probability.
- Reasoning and General Intelligence (§13.11.2): the full detailed verbal/non-verbal list.
- English Language and Comprehension (§13.11.3): all official vocabulary, grammar, sentence structure, usage, voice/narration, cloze and comprehension scope.
- General Awareness (§13.11.4): keep separately mapped to Tier-II; do not assume Tier-I mapping alone proves full equivalence.
- Computer Knowledge Test (§13.11.5): expand each official bullet for computer basics, software, internet/email, networking and cybersecurity.
- DEST (§13.9.10): represent as a qualifying skill-test component, not an ordinary academic lesson topic.

### Tier-II Paper-II — §13.11.6 Statistics
The seed contains broad nodes for collection/presentation, central tendency, dispersion, moments/skewness/kurtosis, correlation/regression, probability, random variables/distributions, sampling, inference, ANOVA, time series and index numbers. It is not an exact line-by-line transcription of all official subclauses. Audit every listed sub-item and technique against §13.11.6 before marking this paper exhaustive.

### Tier-II Paper-III — §13.11.7 General Studies (Finance and Economics)
The seed contains Finance and Accounts, CAG, Finance Commission, economics/microeconomics, demand/supply, production/cost, markets, Indian Economy, reforms, money/banking and IT in governance. It still needs a line-by-line check of each official subparagraph, including exact Finance/Accounts scope, constitutional/role details, economics methods/concepts, and all listed Indian Economy, reforms, monetary/fiscal, budget and governance points.

## Content and UI status

- A node's inclusion in the syllabus tree does not imply a lesson exists or is academically approved.
- Lessons, questions, explanations and answers remain unavailable unless both content and academic review are explicitly approved.
- The project owner approved the 2026 baseline for 2027 preparation. This is a project decision, not official SSC confirmation of the 2027 syllabus.
- Do not generate a large content bank until exhaustive extraction and independent audit are complete.

## Required next gate

1. Extract full official wording from §13.10.1–§13.10.4 and §13.11.1–§13.11.7, preserving numbering and headings.
2. Map every official bullet/paragraph to a stable node ID and exact source reference.
3. Keep editorial aliases separate and visibly editorial.
4. Add completeness tests that compare the source paragraph's required topics against normalized data.
5. Have a second reviewer audit exact wording, tier/paper placement, specialist eligibility and exam-pattern values.
