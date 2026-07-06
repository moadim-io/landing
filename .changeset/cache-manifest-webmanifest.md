---
"landing": patch
---

Cache `manifest.webmanifest` for a day via `public/_headers`, matching `robots.txt`/`sitemap.xml`. It previously had no explicit rule and fell through to the generic `max-age=0, must-revalidate` policy, so it was never cached at all despite sharing the same stable-URL, changes-only-on-redeploy shape as the other two.
