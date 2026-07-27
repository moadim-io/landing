---
"landing": patch
---

Pin the transitive `postcss` dependency to `^8.5.10` via a package.json `overrides` entry. `next@16.2.10` (the latest stable release) bundles `postcss@8.4.31`, which is vulnerable to a CSS-stringify XSS (GHSA-qx2v-qp2m-jg93, `<style>` content not properly escaped). No stable `next` release yet ships a patched `postcss` — only unreleased canary/preview builds do — so the override forces every transitive resolution (including the copy nested under `next`) up to a patched, semver-compatible `8.5.x` without touching `next` itself. `npm audit` now reports 0 vulnerabilities.
