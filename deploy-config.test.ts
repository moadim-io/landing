import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// `public/_headers` and `public/_redirects` are plain text files that
// Cloudflare Pages reads directly from the static export — nothing in the
// build pipeline type-checks or lints their contents (mirrors the concern
// `next.config.test.ts` guards against for `next.config.ts`: a config file
// that doesn't fail `next build` if silently reverted or typo'd). A dropped
// security header, a broken `! Cache-Control` detach, or an un-indented
// header line (Cloudflare requires header lines to be indented under their
// path) would ship straight to production with no red CI run to catch it.

/** Cloudflare `_headers` format: a path line, followed by its indented header lines. */
function parseHeadersFile(text: string): Record<string, string[]> {
  const rules: Record<string, string[]> = {};
  let currentRule: string[] | null = null;
  for (const rawLine of text.split("\n")) {
    const line = rawLine.trimEnd();
    if (!line.trim() || line.trim().startsWith("#")) continue;
    if (!/^\s/.test(line)) {
      currentRule = [];
      rules[line.trim()] = currentRule;
    } else if (currentRule) {
      currentRule.push(line.trim());
    }
  }
  return rules;
}

/** Cloudflare `_redirects` format: `<source> <destination> <status>` per line. */
function parseRedirectsFile(text: string): string[][] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => line.split(/\s+/));
}

const headerRules = parseHeadersFile(readFileSync("public/_headers", "utf8"));
const redirectRules = parseRedirectsFile(
  readFileSync("public/_redirects", "utf8"),
);

describe("public/_headers", () => {
  it("applies the baseline security headers under the catch-all rule", () => {
    expect(headerRules["/*"]).toEqual(
      expect.arrayContaining([
        "Cache-Control: public, max-age=0, must-revalidate",
        "X-Content-Type-Options: nosniff",
        "Referrer-Policy: strict-origin-when-cross-origin",
        "X-Frame-Options: DENY",
        "Permissions-Policy: geolocation=(), camera=(), microphone=()",
        "Cross-Origin-Opener-Policy: same-origin",
      ]),
    );
  });

  it("meets the hstspreload.org submission baseline (2yr max-age, includeSubDomains, preload)", () => {
    // Nothing asserted the actual Strict-Transport-Security value before —
    // the baseline-headers test above only checks the *other* four headers
    // via arrayContaining, so a future edit could drop `preload` (or the
    // whole header) from `/*` silently, quietly opting the site back out of
    // preload-list eligibility with no red CI run to catch it.
    expect(headerRules["/*"]).toEqual(
      expect.arrayContaining([
        "Strict-Transport-Security: max-age=63072000; includeSubDomains; preload",
      ]),
    );
  });

  it("locks the Content-Security-Policy to same-origin, with no unsafe-inline/eval allowance", () => {
    const csp = headerRules["/*"]?.find((line) =>
      line.startsWith("Content-Security-Policy:"),
    );
    expect(csp).toBeDefined();
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).not.toMatch(/unsafe-inline|unsafe-eval/);
  });

  it("caches content-hashed assets and metadata images forever", () => {
    for (const path of ["/_next/static/*", "/icon.svg"]) {
      expect(headerRules[path]).toEqual([
        "! Cache-Control",
        "Cache-Control: public, max-age=31536000, immutable",
      ]);
    }
  });

  it("caches and declares the image/png type for generated metadata images", () => {
    // Unlike /_next/static/* and /icon.svg above, these ship as extensionless
    // files from the static export, so a host can't infer their MIME type from
    // the file extension — Content-Type must be set explicitly here.
    for (const path of ["/opengraph-image", "/twitter-image", "/apple-icon"]) {
      expect(headerRules[path]).toEqual([
        "! Cache-Control",
        "Cache-Control: public, max-age=31536000, immutable",
        "Content-Type: image/png",
      ]);
    }
  });

  it("gives crawler-fetched metadata a one-day cache instead of the no-cache baseline", () => {
    for (const path of ["/robots.txt", "/sitemap.xml", "/llms.txt"]) {
      expect(headerRules[path]).toEqual([
        "! Cache-Control",
        "Cache-Control: public, max-age=86400",
      ]);
    }
  });
});

describe("public/_redirects", () => {
  it("redirects every known non-canonical host to the canonical apex with a permanent redirect", () => {
    expect(redirectRules).toHaveLength(3);
    for (const [, destination, status] of redirectRules) {
      expect(destination).toBe("https://moadim.io/:splat");
      expect(status).toBe("301");
    }
  });

  it("never redirects the canonical apex host itself, to avoid a redirect loop", () => {
    const sources = redirectRules.map(([source]) => source);
    expect(sources.some((source) => source?.startsWith("https://moadim.io/"))).toBe(
      false,
    );
  });
});
