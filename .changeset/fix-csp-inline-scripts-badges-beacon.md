---
"landing": patch
---

Fix the production CSP breaking the page: hash-allow Next.js's inline bootstrap scripts via a post-build injection step (restoring hydration without `unsafe-inline`), allow img.shields.io so the star/version badges render, and allow the Cloudflare Web Analytics beacon in script-src/connect-src.
