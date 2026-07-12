---
"landing": patch
---

Enable `@typescript-eslint/no-unnecessary-condition` and fix the one existing violation: a redundant `?.` before `.trim()` in `page.test.tsx` — the type checker already proves `textContent` can't be nullish once the preceding `prompt?.` guard passes, so the second optional-chain operator was dead defensive code. Locks in the zero-violation state going forward.
