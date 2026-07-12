/**
 * Brand hex values for Satori-rendered image routes (`opengraph-image.tsx`,
 * `apple-icon.tsx`).
 *
 * Satori (the `next/og` renderer) resolves no CSS, so these routes can't
 * reference the `--color-*` custom properties declared in `globals.css` and
 * must fall back to literal hex. Before this file, each route redeclared
 * (or, in `apple-icon.tsx`'s case, inlined) the same three values
 * independently — mirroring the `ExternalLink` / `JsonLdScript` / `site.ts`
 * single-source-of-truth pattern used elsewhere, single-sourcing them here
 * means a rebrand is a one-line change instead of a hunt across every
 * Satori route for a stray literal that fell out of sync.
 *
 * These must still be kept in sync with `--color-background` /
 * `--color-foreground` / `--color-accent` in `app/globals.css` by hand.
 */
export const SATORI_BACKGROUND = "#f4f1e8";
export const SATORI_FOREGROUND = "#0a0a0a";
export const SATORI_ACCENT = "#ffd400";
