---
"landing": patch
---

Single-source the site title and description in `app/site.ts` (`SITE_TITLE`, `SITE_DESCRIPTION`) instead of `app/manifest.ts` carrying its own independent copy of both strings. A future rebrand of the `<title>`/meta description in `app/layout.tsx` could previously drift from the PWA manifest without either build or lint catching it.
