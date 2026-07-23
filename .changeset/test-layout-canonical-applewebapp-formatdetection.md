---
"landing": patch
---

Add regression tests asserting `app/layout.tsx`'s `metadata.alternates.canonical`, `metadata.appleWebApp`, and `metadata.formatDetection` — the self-referencing canonical URL, the iOS home-screen presentation (capable/title/statusBarStyle), and the `tel:` auto-detection opt-out. All three fields were set with explanatory comments but had no test coverage, so a future edit could silently regress any of them.
