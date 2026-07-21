/**
 * WCAG 2.1 2.4.1 Bypass Blocks: lets keyboard and screen-reader users jump
 * straight to `<main>`, skipping the repeated header/nav on every page.
 *
 * Visually hidden (`sr-only`) until it receives keyboard focus, at which
 * point it becomes the first visible, focusable thing on the page — styled
 * with the same neobrutalist tokens (`--accent`, `--foreground`, hard black
 * border) as the rest of the site so it doesn't look like a stray browser
 * default. The global `:focus-visible` outline rule (see `globals.css`)
 * still applies on top of this.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:border-4 focus:border-black focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-black focus:uppercase focus:tracking-wide focus:text-foreground"
    >
      Skip to content
    </a>
  );
}
