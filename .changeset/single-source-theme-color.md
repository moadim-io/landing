---
"landing": patch
---

Single-source the `#f4f1e8` brand background/theme color: `app/manifest.ts` (PWA `background_color`/`theme_color`) and `app/layout.tsx` (viewport `themeColor`) now import `SATORI_BACKGROUND` from `app/brand-colors.ts` instead of each carrying their own copy of the literal. Adds test assertions guarding both call sites against drift if the constant changes, mirroring the existing `SITE_TITLE`/`SITE_DESCRIPTION` pattern.
