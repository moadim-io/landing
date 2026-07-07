import type { AnchorHTMLAttributes, ReactNode } from "react";

/**
 * Single source of truth for outbound (new-tab) links.
 *
 * Every link that leaves the site needs the same "open safely in a new tab"
 * triple, and dropping any one of them is a real regression:
 *
 * - `target="_blank"` + `rel="noopener noreferrer"` — without `noopener` the
 *   opened page can reach back through `window.opener` and navigate this tab
 *   (reverse tabnabbing).
 * - a visually-hidden "(opens in a new tab)" suffix — without it screen-reader
 *   users get no warning that focus is about to jump to a new tab (WCAG 3.2.5).
 *
 * Routing every outbound link through this component makes the safe attributes
 * the default and the unsafe path unreachable by omission — mirroring the
 * `ctaButton` / `panel` / `SITE_URL` single-source-of-truth pattern elsewhere.
 *
 * Callers that need extra `rel` tokens (e.g. `nofollow` for third-party blogs)
 * pass them via `relExtra`; the `noopener noreferrer` baseline is always kept.
 *
 * `aria-label` gets the same "unreachable by omission" treatment: an
 * `aria-label` completely replaces an element's accessible name, so the
 * visually-hidden "(opens in a new tab)" suffix below is silently dropped
 * from the accessible name on any link that also sets `aria-label` — the
 * suffix would have to be hand-typed into every such label to not lose the
 * warning. Appending it here instead means a caller's `aria-label` only ever
 * needs to describe the link's destination.
 */
type ExternalLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "target" | "href" | "rel"
> & {
  href: string;
  /** Extra `rel` tokens prepended to the always-on `noopener noreferrer` baseline. */
  relExtra?: string;
  children: ReactNode;
};

export function ExternalLink({
  href,
  relExtra,
  children,
  "aria-label": ariaLabel,
  ...rest
}: ExternalLinkProps) {
  const rel = relExtra
    ? `${relExtra} noopener noreferrer`
    : "noopener noreferrer";

  return (
    <a
      {...rest}
      href={href}
      target="_blank"
      rel={rel}
      aria-label={ariaLabel ? `${ariaLabel} (opens in a new tab)` : undefined}
    >
      {children}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
