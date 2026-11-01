# Security & DevOps review: korpus-quran-prototipe

Scope: branch `claude/ai-organization` (worker.js, wrangler.jsonc, index.html, full git history on all refs) and production `https://korpus-quran-prototipe.muhalbi22.workers.dev/`. Defensive and read-only: about 8 single requests, no load tests, no repository file changed. Date: 2026-11-01.

## What I verified on production
- `GET /` returns 200 `text/html` with `cache-control: public, max-age=0, must-revalidate` and no CSP, X-Content-Type-Options, Referrer-Policy, frame-ancestors/X-Frame-Options or Permissions-Policy. **Confirmed.**
- `/api/status` and `/api/cari` are public. A cross-origin `Origin:` header gets no `Access-Control-Allow-Origin` back, so other sites cannot *read* the responses, but the requests still run and still cost money. `OPTIONS /api/cari` returns 405. **Confirmed.**
- `POST /api/label` with a wrong key returns 401 `Kunci lab salah.` **Confirmed.**
- `/index.html` returns 307 (asset canonicalisation). `/public/index.html`, `/.git/config` and `/graphify-out/graph.json` return 404, so the source and the graph are not served. **Confirmed.**
- I did not re-measure the ~20 s cold start, because doing so would trigger the expensive work again. The code confirms the cause: 808 texts / BATCH 32 = 26 `AI.run` calls in `ambilIndeks` (worker.js:61-72).

## Findings

### Critical
None. No secret has leaked, no XSS is exploitable and no authentication bypass was found.

### High
**H1. Public AI endpoints have no throttling, so cost and quota can be exhausted.** worker.js:76-117, 229-233.
- Scenario: a script sends random unique queries to `/api/cari`. The per-isolate cache (worker.js:85-86) is bypassed every time, so each request is one bge-m3 call. Every fresh isolate in every colo also re-embeds the whole corpus (26 calls) the first time `/api/cari` or `/api/status` is hit. `HEAD` requests do the same work. On the free plan this burns the daily neuron allowance, and semantic search then returns 502 for everyone. On a paid plan it turns into an open-ended bill.
- Minimal fix:
  - (a) Dashboard: add a WAF rate-limiting rule on `/api/*`. Note that rules on a `*.workers.dev` hostname are limited, so this works best with a custom domain.
  - (b) Repo: add the Workers Rate Limiting binding (`"ratelimits"` in wrangler.jsonc, e.g. 20 requests/min per IP via `cf-connecting-ip`), check it at the top of `cari`/`status`/`labelPadanan` and return 429.
  - (c) Dashboard: set a Workers AI spend or usage alert.
- Effort: S (repo), S (dashboard).

**H2. Every isolate pays the full embedding cost at startup (~20 s latency, 26 AI calls).** worker.js:61-72, 89, 112.
- Scenario: normal traffic across many Cloudflare locations, plus isolate eviction, means the corpus gets re-embedded many times a day. First users wait about 20 s, and if any one of the 26 calls fails, the whole request returns 502 (worker.js:101-105).
- Minimal fix: precompute the vectors offline with a `tools/` script that uses the same model `@cf/baai/bge-m3` and records the model and date. Ship them quantised to int8 (about 808 KB, inside the Worker size limit) or store them in KV/R2. A cleaner long-term option is Workers Vectorize. Each query then needs a single AI call. Re-generate the vectors whenever corpus.json changes; this can be checked in review by comparing a hash of corpus.json stored next to the vectors.
- Effort: M.

### Medium
**M1. The HTML page sends no security headers.**
- Cause: static assets are served by the asset layer before the Worker runs, so worker.js cannot add headers to them.
- Scenario: the page can be framed (clickjacking of the Lab form). It has no defence in depth if a future change introduces an unescaped sink. The full URL is sent as referrer to Google Fonts.
- Minimal fix: add `public/_headers` with:
  - `/*`: `Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- The source file would be a repo `_headers`. The build command (dashboard) must also copy it: `mkdir -p public && cp index.html _headers public/`.
- `'unsafe-inline'` is needed today because of the single inline script (index.html:464) and 30 `style="` attributes. Moving the script to `app.js` would allow `script-src 'self'`. Also add the same nosniff header in `json()` (worker.js:24-28).
- Effort: S (M to remove `'unsafe-inline'` from script-src).

**M2. The LAB_KEY can be brute-forced and is compared in a non-constant-time way.** worker.js:197-198.
- Scenario: unlimited 401 attempts. A short or human-chosen key can be guessed, which gives access to the generative models (more expensive than embeddings). The plain `!==` comparison is a theoretical timing leak.
- Minimal fix: rate-limit `/api/label` POST (H1b). Compare SHA-256 digests with `crypto.subtle.timingSafeEqual`. Make sure LAB_KEY is at least 32 random characters and rotate it in the dashboard (Settings > Variables and Secrets) if it was ever shared in chat.
- Effort: S.

**M3. There is no observability or alerting.** wrangler.jsonc has no `observability` block, so Workers Logs are off.
- Scenario: a quota exhaustion or AI outage (502s) goes unnoticed.
- Minimal fix:
  - Repo: add `"observability": { "enabled": true, "head_sampling_rate": 1 }`.
  - Dashboard: notifications for Workers AI usage and billing, plus an external uptime check on `/` (not `/api/status`, which is expensive; see M4).
- Effort: S.

**M4. `/api/status` is a public health check that does expensive work.** worker.js:109-117.
- Scenario: an uptime monitor or crawler that polls it forces the full index build on every cold isolate.
- Minimal fix: make `/api/status` report only whether `env.AI` exists and whether the index is already warm (no AI call). If a deep check is needed, put it behind LAB_KEY.
- Effort: S.

**M5. Rollback, backup and release tracking are informal.**
- Scenario: a bad merge to `main` is live within minutes. There are no tags or releases, and Lab annotations exist only in page memory: a reload loses them unless a CSV was downloaded (index.html:4124 and the note in `lab()`).
- Minimal fix:
  - Document the rollback steps: Dashboard > Workers > korpus-quran-prototipe > Deployments > roll back to the previous version (or `wrangler rollback`), then `git revert` on `main` so the next build does not undo the rollback.
  - Tag each production merge (`v2026.11.01`).
  - Enable branch protection on `main` (required PR review).
  - Put a "download CSV before leaving" warning or a `beforeunload` prompt in the Lab.
- Effort: S.

### Low
- **L1. Internal error details leak to the client.** worker.js:103, 115, 217 return `err.message` as `rincian`/`galat`, which can expose Workers AI error codes or quota state. Fix: log the message with `console.error` and return a generic message plus a request id. Keep the details only for authenticated Lab responses. Effort S.
- **L2. `/api/label` GET publishes the prompt, model IDs and options** (worker.js:191-195). This appears intentional (research transparency) and is acceptable; document that it is deliberate. Effort none.
- **L3. Lab POST body size is not capped before `request.json()`** (worker.js:202). This only matters after authentication. Fix: reject a `content-length` above 8 KB. Effort S.
- **L4. CSV formula injection.** `labCsv` (index.html:4145) quotes fields but does not neutralise a leading `= + - @`. A model `alasan` or user input could run a formula when the file is opened in Excel. Fix: prefix such cells with `'`. Effort S.
- **L5. `esc()` (index.html:3645) does not escape `'`.** It is safe today because every interpolated attribute is double-quoted (0 single-quoted `${}` attributes found). Add `'`→`&#39;` as a guard. Effort S.
- **L6. Google Fonts is a third-party dependency** (index.html:9-11). SRI is not possible because the CSS is generated per browser. Visitor IPs and the referrer go to Google, which raises a privacy consideration under Indonesia's UU PDP, and the fonts are a single point of failure for rendering Arabic in Amiri. Fix: self-host the woff2 files in `public/fonts` (OFL licence) and drop googleapis/gstatic from the CSP. Effort M.
- **L7. `compatibility_date` 2025-09-09 is over a year old** (wrangler.jsonc:6). Bump it after a test deploy. Effort S.
- **L8. The query cache is per isolate and unbounded only in key size.** It holds 200 entries of up to 200 characters each and is cleared wholesale (worker.js:98), so memory stays bounded and this is fine. Its hit rate is low. Fix: also use `caches.default` keyed on the normalised `q|k`, with `cache-control: public, max-age=86400`, so repeat queries skip AI calls across isolates. Effort S.

### Clean / positive
- XSS: every `innerHTML` sink (index.html:3951, 4086, 4183, 4352, 4361, 4570, 4617, 4659, 4660) renders either static corpus constants (`v.ar`, `w.ar`, `d.term`, ids) or values passed through `esc()`. This covers user input (`state.cq`, `state.q`, Lab form), server text (`galat`, `alasan`, `mentah`, `q`) and the prompt, which is set with `textContent`. `h.label` reaches a class attribute but the server restricts it to 3 fixed values.
- Lab key: held only in memory (`state.lab.key`) in a `type=password, autocomplete=off` field. There is no localStorage, sessionStorage or URL use anywhere in index.html, and the key is sent only as the `x-lab-key` header to the same origin.
- Input validation: `q` is 2-200 characters after whitespace collapse, `k` is clamped to 1-15, Lab fields are trimmed and sliced, model choice is allow-listed, the key is checked before the body is parsed, and other methods get 405.
- No CORS headers are sent, so third-party sites cannot read API responses.
- Git history (all refs, 40 commits on this branch): no leaked secrets. A pattern scan for key/token/secret/password assignments, PEM blocks and sk-/ghp_/AKIA formats was negative. `kantor-virtual/api/.env.example` contains placeholders only, and the other hit was file paths. LAB_KEY never appears with a value.

## Fix in the repo vs. configure in the Cloudflare dashboard
| Repo (PR to `main`) | Dashboard (owner only) |
|---|---|
| `_headers` file (M1), nosniff in `json()` | Build command must also copy `_headers` (M1) |
| `ratelimits` binding + 429 handling (H1b, M2) | WAF rate-limiting rule on `/api/*` (needs custom domain for full control) (H1a) |
| Precomputed vectors + loader (H2) | Workers AI usage/billing notifications (H1c, M3) |
| `observability` block, compat date (M3, L7) | Rotate and lengthen LAB_KEY secret (M2) |
| Cheap `/api/status`, generic errors, Cache API (M4, L1, L8) | Rollback via Deployments; GitHub branch protection and tags (M5) |
| timingSafeEqual, body cap, CSV/esc hardening (M2, L3-L5) | External uptime monitor on `/` (M3) |

## Hardening plan (in order)
1. Dashboard, same day: Workers AI usage/billing alerts, rotate LAB_KEY to 32 or more random characters, enable branch protection on `main`.
2. PR 1 (S): rate-limit binding on all `/api/*`, cheap `/api/status`, `timingSafeEqual`, generic error bodies, `observability` enabled.
3. PR 2 (S): `_headers` with CSP and the other headers, plus a build command update in the dashboard. Verify with `curl -I` after deploy.
4. PR 3 (M): precomputed int8 bge-m3 vectors with a corpus hash check, and Cache API for query results.
5. PR 4 (S/M): Lab CSV hardening and an unload warning, `esc` single quote, self-hosted fonts, compat date bump.
6. Write `docs/RUNBOOK.md` (only if the PM approves new docs) with the rollback, tag and secret-rotation steps.

## The 5 most valuable improvements
1. Rate limiting on `/api/*` (binding plus WAF): closes the cost and quota exhaustion risk (H1, M2).
2. Precomputed embeddings: removes the 20 s cold start and 26 calls per isolate, and makes AI cost one call per query (H2).
3. Workers AI usage/billing alerts plus Workers Logs: abuse and outages become visible (M3).
4. `_headers` with CSP, frame-ancestors, nosniff and Referrer-Policy: defence in depth at near-zero cost (M1).
5. A cheap `/api/status`, plus a documented rollback-and-tag procedure: safe monitoring and fast recovery (M4, M5).
