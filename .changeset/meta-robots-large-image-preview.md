---
"landing": patch
---

Declare `metadata.robots` in `app/layout.tsx` (`index, follow` plus a `googleBot` directive with `max-image-preview:large`, `max-snippet:-1`, `max-video-preview:-1`). With no `robots` field set, Google's default `max-image-preview:standard` only ever surfaces a small thumbnail of the Open Graph card in Search/Discover, leaving the existing OG-card investment (brand palette, brand font, correct Content-Type) unpaid-off there. Distinct from `app/robots.ts`, which emits the site-wide robots.txt crawl directive — this is the per-document `<meta name="robots">` indexing/snippet directive (#143).
