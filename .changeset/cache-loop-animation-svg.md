---
"landing": patch
---

Give `/loop-animation.svg` the same one-day `Cache-Control: public, max-age=86400` rule already applied to `/robots.txt`, `/sitemap.xml`, and `/llms.txt` in `public/_headers`. It's a stable, unhashed URL that can change on a redeploy exactly like those three, but was left off the rule group — so it silently fell back to the broad `max-age=0, must-revalidate` policy meant for HTML pages. That's especially wasteful here since the file is also hotlinked from external READMEs (see `AGENTS.md`/`README.md`), forcing every one of those outside fetches to revalidate with this origin instead of using a short-lived cache.
