# Project audit, November 2026

Read-only assessment of the Indonesian Quranic Corpus at commit `2fa83fd` (production identical). No code or data was changed during the audit. The prioritized plan is in `docs/ROADMAP.md`.

| Report | Specialist | Headline |
|---|---|---|
| `ui-ux.md` | UI/UX Design Specialist | Solid baseline (AA text contrast, no overflow, keyboard OK). P0: harakat clipped in the surah picker. No permalinks; weak mobile analysis views; control borders below 3:1; brand green too close to the manṣūb case colour. Font hybrid recommended. |
| `data.md` | Corpus Data Engineer | Internal consistency passes (660/660 words). 110/143 verses byte-identical to Tanzil; 32 NFC-normalized, 1 content difference (QS 2:4). Unstable array-position IDs; no schema, validation, or versioning in repo; full Qur'an ≈ 32 MB needs per-surah JSON; precomputed embeddings fix the cold start. |
| `linguistics.md` | Arabic Linguistics Specialist | Trees structurally sound. P0: no per-annotation status/confidence; word-level dependencies cannot express attached pronouns (128 words) and most subjects; hidden/elided elements only in prose. 126 relation strings, 92 class strings. Schema v2 and validation plan proposed. |
| `qa.md` | QA Engineer | 1,386 renders, no unexpected console errors, no overflow. High: Graf akar colours broken for 17 of 21 surahs; Rencana AI tab misstates data handling; first semantic search 13.9 s live. Medium: picker clipping, graph hub mis-click, treebank start position, search race. Test-suite design proposed. |
| `security.md` | Security & DevOps Engineer | No critical issues; no leaked secrets; XSS sinks escaped. High: unthrottled AI endpoints (cost/abuse), cold-start embedding. Medium: no security headers (needs `_headers`), unlimited key guessing, logs off, expensive `/api/status`, no rollback/tag procedure. |
| `academic.md` | Academic Research Specialist | AI involvement not disclosed; agent name "Fathur" can be read as the human researcher; Tanzil terms not met (modified text, missing notice); contradictory/stale statements; thin annotation guidelines; no LICENSE/CITATION/CHANGELOG/README; not yet reproducible. |

Supporting evidence (screenshots, scripts, raw JSON) was produced in the session scratchpad and is not committed; findings cite reproduction steps instead.
