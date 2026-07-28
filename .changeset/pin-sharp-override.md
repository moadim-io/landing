---
"landing": patch
---

Pin the transitive `sharp` dependency to `^0.35.3` via a package.json `overrides` entry. `next@16.2.10` pulls in `sharp@0.34.5` as an optional dependency for its image-optimization pipeline, and every `sharp` release below `0.35.0` bundles a `libvips` vulnerable to CVE-2026-33327/33328/35590/35591 (GHSA-f88m-g3jw-g9cj). This site sets `images.unoptimized: true` for the static export, so `sharp` is never actually invoked at build or runtime — but it still gets installed transitively, so pinning it removes the vulnerable copy from `node_modules` for defense in depth without touching `next` itself. `npm audit` now reports 2 high-severity findings instead of 4 (the remaining one, a `semver` ReDoS pulled in via `eslint-config-agent`'s own dependency tree, is already covered by a separate open PR).
