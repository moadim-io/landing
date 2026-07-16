---
"landing": patch
---

Add render coverage for `app/layout.tsx`'s `RootLayout` component. `layout.test.tsx` previously only asserted the exported `metadata`/`viewport`/`jsonLd` objects — the component itself (the `<html lang>` shell, the `banner` landmark, the wordmark link, the Docs/GitHub nav, and `{children}` rendering) had zero function/statement coverage, so a regression there (a dropped landmark, a broken nav `href`, children silently not rendering) could pass CI undetected.
