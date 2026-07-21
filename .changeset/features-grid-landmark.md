---
"landing": patch
---

Wrap the homepage feature-cards grid in a `<section aria-label="Features">` so it's a named landmark region, matching the "On loop engineering" and FAQ sections below it. Previously it was an unlabeled `<ul>` that screen-reader landmark navigation skipped entirely.
