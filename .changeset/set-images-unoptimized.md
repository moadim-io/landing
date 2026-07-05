---
"landing": patch
---

Set `images.unoptimized = true` in `next.config.ts`. With `output: "export"` there is no server at runtime to run the Image Optimization API, so `next build` only fails once a page imports `next/image` (there are none today) — this makes that day a no-op instead of a build-breaking surprise.
