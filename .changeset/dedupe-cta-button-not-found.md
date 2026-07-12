---
"landing": patch
---

refactor: reuse `page.tsx`'s `ctaButton` class string in the 404 page instead of hand-copying it

`not-found.tsx` already imports `panel` from `page.tsx` for its card surface, but its "Back to home"
link hand-copied the same CTA button class string instead of reusing the exported `ctaButton`
constant. Exports `ctaButton` (mirroring the existing `panel` export) and has `not-found.tsx` import
it, so the two neobrutalist CTA buttons on the site can no longer drift apart. No visual or behavior
change.
