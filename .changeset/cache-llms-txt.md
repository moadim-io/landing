---
"landing": patch
---

Give `/llms.txt` the same one-day `Cache-Control: public, max-age=86400` rule already applied to `/robots.txt` and `/sitemap.xml` in `public/_headers`. It's crawler-fetched metadata from a stable, unhashed URL exactly like those two, but was left out when the rule group was written — so it silently fell back to the broad `max-age=0, must-revalidate` policy meant for HTML pages, forcing every AI-agent fetch to re-hit the origin instead of using a short-lived cache.
