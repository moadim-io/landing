---
"landing": patch
---

Add a regression test asserting `app/not-found.tsx`'s `metadata.robots` is `{ index: false }`. The 404 route relies on this to stay out of search results (avoiding Google Search Console's "Soft 404" report), but nothing asserted it — a future edit could drop it silently.
