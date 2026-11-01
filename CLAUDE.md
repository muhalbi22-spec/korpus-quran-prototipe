# Indonesian Quranic Corpus

Academic research platform for Quranic corpus linguistics with Indonesian translations. Production: https://korpus-quran-prototipe.muhalbi22.workers.dev/ (deployed from `main`).

- Architecture: `docs/ARCHITECTURE.md`. Roadmap: `docs/ROADMAP.md`.
- AI employee organization: `docs/organization/AGENTS.md` (8 core agents in `.claude/agents/` plus 11 specialist helpers). The main session acts as Chief AI Officer and follows `docs/organization/WORKFLOW.md`; subagents cannot launch other subagents.
- Use the minimum set of agents for a task; run them in parallel only when they do not touch the same files.

## Integrity rules (always)
1. Quranic Arabic text comes only from Tanzil Uthmani (Ḥafṣ ʿan ʿĀṣim). Never type, correct, or normalize it by hand; editing tools may normalize Arabic to NFC, so write Arabic only through scripts that copy bytes from the source.
2. Never invent Quranic data, translations, tafsir, references, DOIs, or scholarly claims.
3. AI output is a draft; keep the site's "draf, belum divalidasi ahli" status until human experts validate. Distinguish machine suggestions from human-verified annotations.
4. Never expose secrets (`LAB_KEY`, Cloudflare tokens).
5. Do not remove existing functionality without the owner's approval.
6. Before merging: data integrity checks, `node tools/buat-corpus.js --cek`, Playwright smoke test of all tabs, `graphify update .`.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- When graphify-out/graph.json exists, run `graphify query "<question>"` before your first grep, search or source-file read for a codebase question, and put this rule in every subagent prompt that explores code. Read raw files only for lines the graph or an earlier read already located. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
- A committed graphify-out/graph.json is rewritten whole on every build, so a large diff to it in a pull request is expected. Do not flag it as churn or suggest skipping the graph rebuild or its hooks.
