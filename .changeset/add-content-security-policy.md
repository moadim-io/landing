---
"landing": patch
---

Add a strict `Content-Security-Policy` header to `public/_headers`. The site previously shipped no CSP at all, on the mistaken assumption that the inline JSON-LD `<script>` (`JsonLdScript.tsx`) would force `'unsafe-inline'` into `script-src`. It doesn't: per the HTML spec, a `<script>` element only executes — and only counts as a "script" for CSP's `script-src` — when its `type` is empty, a JavaScript MIME type, or `"module"`; `application/ld+json` is none of those, so it's an inert data block regardless of CSP. Every script/style/font on the page is self-hosted under content-hashed `/_next/static/*` URLs, there are no `<form>`s, and nothing fetches cross-origin, so the policy locks `default-src`, `script-src`, `style-src`, `img-src`, `font-src`, and `connect-src` to `'self'`, and denies `object-src`, `base-uri`, `form-action`, and `frame-ancestors` outright.
