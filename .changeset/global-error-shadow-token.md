---
"landing": patch
---

Fix `app/global-error.tsx`'s "Try again" button using a raw `shadow-[6px_6px_0_0_#000]` arbitrary value instead of the `shadow-brutal` token from `app/globals.css`'s `@theme` block. This file was missed by the earlier hard-shadow token consolidation (#213) — every other neobrutalist shadow in the app already goes through `shadow-brutal`/`shadow-brutal-lg`. No visual or behavior change.
