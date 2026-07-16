---
"landing": patch
---

Mark the crates.io version badge `<img>` with `fetchPriority="low"` so React DOM's automatic image preloading no longer hoists a `<link rel="preload" as="image">` for this decorative, third-party (img.shields.io) badge into `<head>` at high priority — that preload was competing with the self-hosted Geist fonts and critical CSS for the page's earliest network slot, ahead of resources that actually gate first paint.
