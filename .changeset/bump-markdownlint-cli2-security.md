---
"landing": patch
---

Bump `markdownlint-cli2` from `^0.22.1` to `^0.23.0` to pull in patched `js-yaml` and `markdown-it` transitive dependencies, fixing two moderate-severity quadratic-complexity ReDoS advisories ([GHSA-h67p-54hq-rp68](https://github.com/advisories/GHSA-h67p-54hq-rp68), [GHSA-6v5v-wf23-fmfq](https://github.com/advisories/GHSA-6v5v-wf23-fmfq)) flagged by `npm audit`. Dev-only tooling dependency; `npm run lint:md` output is unchanged.
