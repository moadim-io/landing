/**
 * Brand hex values shared by call sites that can't resolve CSS custom
 * properties — Satori-rendered image routes (`opengraph-image.tsx`,
 * `apple-icon.tsx`), plus `layout.tsx`'s `viewport.themeColor` (a `<meta>`
 * tag value, not CSS).
 *
 * Satori (the `next/og` renderer) resolves no CSS, and neither does a
 * `<meta name="theme-color">` tag, so these call sites can't reference the
 * `--color-*` custom properties declared in `globals.css` directly and must
 * fall back to literal hex. Before this file, each call site redeclared (or,
 * in `apple-icon.tsx`'s case, inlined) the same values independently —
 * mirroring the `ExternalLink` / `JsonLdScript` / `site.ts`
 * single-source-of-truth pattern used elsewhere, single-sourcing them here
 * means a rebrand is a one-line change instead of a hunt across every call
 * site for a stray literal that fell out of sync.
 *
 * `brand-colors.test.ts` parses `app/globals.css`'s `@theme` block and
 * asserts these stay in sync with `--color-background` / `--color-foreground`
 * / `--color-accent` — a drift fails `npm test`, not just a manual check.
 */
export const SATORI_BACKGROUND = "#f4f1e8";
export const SATORI_FOREGROUND = "#0a0a0a";
export const SATORI_ACCENT = "#ffd400";
