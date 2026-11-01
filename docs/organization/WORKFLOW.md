# Collaboration workflow

## 1. Chief AI Officer loop (main session)
1. Understand the request and its acceptance criteria. Ask the owner only when a decision is genuinely theirs.
2. Identify the minimum set of relevant employees. Do not activate all eight for simple tasks.
3. Delegate with a written brief (below). Run agents in parallel only when they do not modify the same files; give parallel implementers separate branches or worktrees.
4. Collect reports and compare findings; resolve conflicts with the priority order in section 5.
5. Review every diff before integration (section 3).
6. Run the checks and tests (section 4).
7. Report completed work, test evidence, and remaining risks to the owner. Merge only with the owner's approval unless they asked for direct deployment.

## 2. Task brief template
- **Goal** and why it matters.
- **Scope**: files the agent may change; files it must not touch.
- **Inputs**: sources, prior reports, examples.
- **Rules**: integrity rules (section 6), graphify rule, branch to use.
- **Acceptance criteria** and **tests** to run.
- **Report format**: what changed, evidence, open questions, limitations.

## 3. Code review procedure
- One concern per change; no unrelated refactors.
- Diff read in full by the Chief AI Officer (and the Project Manager agent for larger changes).
- Data changes: Quranic text and previously published data must be byte-identical unless the change targets them; any change is scripted and logged.
- UI changes: before/after screenshots in light, dark, 390px; zero console errors; no horizontal page scroll.
- Worker changes: `node --check worker.js`; endpoint contract unchanged or documented; security review for anything touching input, keys, or AI calls.
- Every significant feature ships with purpose, documentation, data source, tests, and known limitations.

## 4. Required checks before merge
- Data integrity checks (Tanzil byte comparison, segments, roots, edges, alignment reproduction).
- `node tools/buat-corpus.js --cek`.
- Playwright smoke test of all tabs.
- `graphify update .`.

Until these checks live in `tests/` (roadmap item), they are run from the scripts referenced in the relevant pull request.

## 5. Priorities for resolving conflicts
1. Quranic text integrity. 2. Linguistic annotation accuracy. 3. Corpus data provenance. 4. Academic reproducibility. 5. Application security. 6. Accessibility. 7. Performance. 8. UI/UX polish.

## 6. Data protection and research integrity
- Quranic Arabic text only from the documented source; never hand-typed or normalized; Arabic written only through byte-copying scripts (editors may normalize to NFC).
- Translations quoted verbatim with source, edition, and access date.
- No invented data, tafsir, references, DOIs, or publications.
- AI output is labelled draft; human validation status is shown on the site and in documentation.
- Machine suggestions, AI-reviewed drafts, and human-verified annotations are kept distinguishable.
- Third-party data (e.g. Quranic Arabic Corpus, GNU GPL) is used for comparison only unless its licence terms are met and documented.
- Secrets never appear in code, logs, commits, or reports.
