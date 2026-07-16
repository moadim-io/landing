---
"landing": patch
---

Remove `changeFrequency`/`priority` from `sitemap.ts` — both are documented by Google and Bing as ignored crawl-ranking hints, so they were inert cruft rather than functioning SEO signals.
