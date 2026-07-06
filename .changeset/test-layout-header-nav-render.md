---
"landing": patch
---

Add render tests for the root layout's banner/nav (wordmark link, "Site navigation" landmark, and the Docs/GitHub external links), which previously had no coverage — every existing `layout.test.tsx` case only asserted on the exported `metadata`/`jsonLd` objects, so a dropped href or a nav link that stopped opening safely in a new tab would have passed CI silently.
