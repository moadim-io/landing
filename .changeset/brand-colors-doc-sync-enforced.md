---
"landing": patch
---

Fix a stale docstring in `app/brand-colors.ts` that said the Satori hex literals "must still be kept in sync with `--color-background` / `--color-foreground` / `--color-accent` in `app/globals.css` by hand." `brand-colors.test.ts` now parses `globals.css`'s `@theme` block and asserts the constants match, so a drift already fails `npm test` — the docstring was misleading a reader into thinking they needed to manually cross-check on every rebrand. No behavior change.
