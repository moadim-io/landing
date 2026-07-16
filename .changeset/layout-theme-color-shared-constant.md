---
"landing": patch
---

`app/layout.tsx`'s `viewport.themeColor` now imports `SATORI_BACKGROUND` from `app/brand-colors.ts` instead of re-typing its own `"#f4f1e8"` literal. The mobile browser-chrome color (#235) was already correct, but it wasn't guarded against drifting from `--color-background` in `globals.css` the way the Satori-rendered routes are — reusing the shared, test-guarded constant closes that gap. No visual or behavior change.
