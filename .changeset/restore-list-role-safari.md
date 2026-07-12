---
"landing": patch
---

Restore the accessible `list` role on the nav, feature-grid, and reading-list `<ul>` elements. Tailwind's Preflight resets `list-style: none` on every `<ul>`, and in Safari/VoiceOver that also strips the implicit `list`/`listitem` role — `role="list"` restores it without changing anything visually.
