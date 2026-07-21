---
"landing": patch
---

Add a regression test asserting the hero install command's decorative `$` prompt stays `aria-hidden` and `select-none`. The comment in `app/page.tsx` explains why this matters — without it, a screen reader would announce "dollar sign" and copying the line would yield a `$`-prefixed command a shell can't run directly — but nothing asserted either attribute, so a future edit to the install card could drop them silently.
