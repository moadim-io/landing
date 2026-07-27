---
"landing": patch
---

`app/manifest.ts`'s `background_color`/`theme_color` were a third independent copy of the brand background hex (`"#f4f1e8"`), alongside `app/globals.css`'s `--color-background` and `app/brand-colors.ts`'s `SATORI_BACKGROUND` (the single source of truth for Satori-rendered routes). Import `SATORI_BACKGROUND` instead of re-typing the literal, and assert it in `manifest.test.ts`, so a future rebrand can't update the CSS token and Satori routes while silently leaving the PWA manifest stale.
