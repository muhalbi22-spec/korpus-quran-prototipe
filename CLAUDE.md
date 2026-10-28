## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- When graphify-out/graph.json exists, run `graphify query "<question>"` before your first grep, search or source-file read for a codebase question, and put this rule in every subagent prompt that explores code. Read raw files only for lines the graph or an earlier read already located. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
- A committed graphify-out/graph.json is rewritten whole on every build, so a large diff to it in a pull request is expected. Do not flag it as churn or suggest skipping the graph rebuild or its hooks.

## index.html inline JavaScript

The app's JavaScript lives inline in index.html, which Graphify cannot parse. `.claude/scripts/graphify-index-js.py` copies it to `graphify-src/index.html.js` (git-ignored, generated) with the same line numbers, so a graph hit at `graphify-src/index.html.js:L1376` means `index.html:1376`. Edit index.html, never the generated copy. To refresh the graph: `python3 .claude/scripts/graphify-index-js.py && graphify update .`
