---
"landing": patch
---

Derive `opengraph-image.tsx`'s `alt` text from `site.ts`'s `SITE_TITLE` instead of a separate hardcoded copy of the same string. `twitter-image.tsx` re-exports this `alt` as-is, so both cards drifted together with `<title>` and the PWA manifest only by luck — a rebrand touching `SITE_TITLE` would have silently left the OG/Twitter card alt text stale, the same drift `SITE_TITLE` was introduced to prevent for `layout.tsx` and `manifest.ts`.
