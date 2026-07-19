---
"landing": patch
---

Add `Cross-Origin-Opener-Policy: same-origin` to `public/_headers`' site-wide baseline, isolating the top-level document from cross-origin windows it opens or is opened by (a Spectre-class side-channel mitigation) without affecting the intentional cross-origin hotlinking of `public/loop-animation.svg` from READMEs.
