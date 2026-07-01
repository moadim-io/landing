/**
 * Single source of truth for safely inlining JSON-LD structured data into a
 * `<script type="application/ld+json">` tag.
 *
 * `JSON.stringify` alone is not enough: if any string value inside the data
 * contains a literal "less than" character followed by a tag name (e.g. a
 * closing script tag), it would prematurely close the inline `<script>`
 * element and let an attacker-controlled value break out into HTML.
 * Escaping every "less than" character to its equivalent JSON string escape
 * (Unicode code point U+003C) closes that sink without changing the parsed
 * JSON value — `JSON.parse` decodes the escape back to the original
 * character.
 *
 * Both `app/layout.tsx` (`SoftwareApplication`) and `app/page.tsx`
 * (`FAQPage`) need this same treatment. Routing them through one component
 * means the escape can't be dropped by omission at a new call site, and the
 * behavior gets one test instead of zero — mirroring the `ExternalLink` /
 * `ctaButton` / `SITE_URL` single-source-of-truth pattern used elsewhere in
 * this codebase.
 */
export function toSafeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLdScript({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: toSafeJsonLd(data) }}
    />
  );
}
