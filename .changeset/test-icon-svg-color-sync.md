---
"landing": patch
---

Add a regression test that keeps `app/icon.svg`'s (the site favicon) hardcoded `fill`/`stroke` hex literals in sync with the `--color-accent` / `--color-foreground` custom properties in `app/globals.css`. An SVG favicon can't reference CSS custom properties, so it restates the palette as literal hex — the same hand-synced-literal situation already guarded for `app/brand-colors.ts` (`brand-colors.test.ts`) and `public/loop-animation.svg` (`loop-animation-svg.test.ts`), but nothing previously enforced it for the favicon: a rebrand that updated `globals.css` without also touching `icon.svg` would pass CI and silently ship a favicon in the old colors.
