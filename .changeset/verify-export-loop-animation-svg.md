---
"landing": patch
---

Add `loop-animation.svg` to `scripts/verify-export.mjs`'s `REQUIRED_FILES` allowlist.

This script gates every deploy by asserting specific `public/` files survive the static
export. `loop-animation.svg` is the sole visual in the homepage's "The loop" section
(`app/LoopAnimation.tsx`) and is hotlinked directly from external READMEs, but it was
never added to the list — a silent copy failure would break both with zero CI signal.
No behavior change to the export itself.
