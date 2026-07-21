---
"landing": patch
---

Add a regression test that keeps `app/brand-colors.ts`'s `SATORI_*` hex constants in sync with the `--color-background` / `--color-foreground` / `--color-accent` custom properties in `app/globals.css`. Satori (the `next/og` renderer used by `opengraph-image.tsx` and `apple-icon.tsx`) can't resolve CSS, so `brand-colors.ts` restates the palette as literal hex and its own docstring warns these "must still be kept in sync ... by hand" — nothing previously enforced that promise, so a rebrand that updated `globals.css` without also touching `brand-colors.ts` would pass CI and silently ship mismatched colors on the OG/Twitter card and Apple touch icon.
