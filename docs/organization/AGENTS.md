# AI employee organization

The Indonesian Quranic Corpus is developed with Claude Code subagents defined in `.claude/agents/`. Each file has YAML frontmatter (`name`, `description`, `tools`) followed by the agent's instructions, the format supported by the installed Claude Code (2.1.316). Agents are invoked by name from the main Claude Code session.

## Core organization (8 employees)

| # | Agent file | Role | Owns | May change |
|---|---|---|---|---|
| 1 | `project-manager.md` | Chief AI Officer / Project Manager | Plans, priorities, `docs/ROADMAP.md`, reviews, final integration decisions | Docs, roadmap |
| 2 | `ui-ux-specialist.md` | UI/UX Design Specialist | Design system, Arabic typography, RTL, responsive layout, accessibility | `index.html` CSS and markup (not data) |
| 3 | `corpus-data-engineer.md` | Corpus Data Engineer | Data model, sources, provenance, consistency, search data, exports, `corpus.json` | Corpus data through scripts, `tools/` |
| 4 | `arabic-linguistics-specialist.md` | Arabic Linguistics Specialist | Morphology, roots, i‘rāb, treebank review, confidence labels | Annotation proposals (applied by the data engineer) |
| 5 | `full-stack-developer.md` | Full-Stack Developer | Frontend features, Worker API, search, visualizations, performance | `index.html` logic, `worker.js`, `wrangler.jsonc` |
| 6 | `qa-engineer.md` | Quality Assurance Engineer | Repeatable tests, regression checks, bug reports | `tests/` |
| 7 | `security-devops-engineer.md` | Security & DevOps Engineer | Security audit, headers, rate limits, secrets, deployment, backups | Reports and proposed patches |
| 8 | `academic-research-specialist.md` | Academic Research Specialist | Methodology, annotation guidelines, provenance, citation, reproducibility | `docs/` |

### Coordination and its platform limit
Claude Code subagents cannot start other subagents. The **main Claude Code session acts as Chief AI Officer** and runs the workflow in `WORKFLOW.md`: it delegates to specialists, collects their reports, and performs final integration. The `project-manager` agent is used for planning, briefs, reviews, and roadmap maintenance.

## Existing specialist helpers (kept, not removed)
Eleven agents created earlier stay available. They are narrower helpers that work under one of the core roles:

| Helper | Works under | Notes |
|---|---|---|
| `fathur.md` | Arabic Linguistics Specialist | Senior naḥw/ṣarf/balāghah reviewer used for QS 97–113 |
| `anotator-irab.md` | Arabic Linguistics Specialist + Corpus Data Engineer | Writes word/segment/i‘rāb/treebank data |
| `leksikograf-akar.md` | Arabic Linguistics Specialist | Root dictionary (`ROOTS`) |
| `penyelaras-terjemahan.md` | Corpus Data Engineer | Translations and `SELARAS` alignment |
| `peneliti-makna-tafsir.md` | Academic Research Specialist | Contextual meaning and sourced tafsir summaries |
| `validator-data.md` | QA Engineer + Corpus Data Engineer | Internal consistency checks (report only) |
| `pengawas-qac.md` | Arabic Linguistics Specialist | Comparison with Quranic Arabic Corpus (report only) |
| `desainer-islami.md` | UI/UX Design Specialist | Islamic visual identity (PR #7) |
| `perancang-ux.md` | UI/UX Design Specialist | Usability audits |
| `pengembang-web.md` | Full-Stack Developer | Earlier web developer brief |
| `penjaga-keamanan.md` | Security & DevOps Engineer | Earlier security brief |

Whether to merge these helpers into the core roles is a roadmap decision for the owner (see `docs/ROADMAP.md`).
