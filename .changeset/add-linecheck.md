---
"landing": patch
---

Add `linecheck` (per-file line-count enforcement) as a new CI job, with a `linecheck.yml` config setting `.tsx` files to warn at 200 lines / error at 460 (above `app/page.tsx`'s current 446, so adoption doesn't fail CI on day one) and `.ts`/`.mjs` files to the 200/400 default.
