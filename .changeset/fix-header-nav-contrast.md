---
"landing": patch
---

Fix a WCAG 2.1 AA contrast failure in the site header: the "Docs"/"GitHub" nav links used `hover:text-accent` (bright yellow `#ffd400` text) directly on the cream `--background` (`#f4f1e8`), a ~1.27:1 contrast ratio (AA requires 4.5:1 for normal text). Switched to `hover:bg-accent`, the same accent-as-fill pattern already used by the "On loop engineering" reading list, which keeps the existing (already-compliant) text color and highlights with the accent background instead. Also dropped the redundant `text-accent` on the wordmark's trailing period in the header, which had the same low-contrast issue.
