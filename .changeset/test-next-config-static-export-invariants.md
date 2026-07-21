---
"landing": patch
---

Add `next.config.test.ts`, covering the three static-export invariants (`output: "export"`, `trailingSlash: true`, `images.unoptimized: true`) that `next.config.ts` depends on. None of these fail `next build` if silently reverted — `images.unoptimized` only breaks the moment a future page imports `next/image` (#218), and the other two only surface as a live-site regression (wrong route shape, or SSR features Cloudflare Pages can't serve), not a build error. This was the only config file in the repo with no test coverage at all.
