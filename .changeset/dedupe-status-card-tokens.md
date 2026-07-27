---
"landing": patch
---

`error.tsx` and `not-found.tsx` hand-copied four class strings (the centering wrapper, the `panel`-based card frame, the eyebrow-pill tag, and the body copy) that only `panel`/`ctaButton` had actually been extracted from `page.tsx` to guard against drift. Extract the remaining four as `statusCardWrapper`/`statusCard`/`eyebrowPill`/`statusBody` exports (mirroring the existing `panel`/`ctaButton` pattern), have both files and `page.tsx`'s own eyebrow tag reuse them, and add tests asserting the shared tokens instead of a byte-identical copy — no visual or behavior change.
