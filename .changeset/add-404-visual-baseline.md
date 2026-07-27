---
"landing": patch
---

Add a Playwright visual-regression baseline for the branded 404 page (`app/not-found.tsx`). Previously only the homepage had a screenshot baseline, so a Tailwind/token refactor could silently break the 404 page's layout while every other gate (lint, unit tests, homepage-only visual diff) stayed green.
