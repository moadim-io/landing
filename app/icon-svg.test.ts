import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// app/icon.svg (the site favicon, a file-based metadata route) restates the
// brand palette as literal hex — an SVG favicon can't reference the
// `--color-*` custom properties declared in `app/globals.css`. That's the
// same hand-synced-literal situation `brand-colors.ts` documents and
// `brand-colors.test.ts` guards, and that `public/loop-animation.svg` documents
// and `loop-animation-svg.test.ts` guards — but nothing previously enforced it
// here: a rebrand that updated globals.css without also touching icon.svg
// would pass CI and silently ship a favicon in the old colors.
const svg = readFileSync("app/icon.svg", "utf8");
const css = readFileSync("app/globals.css", "utf8");

function themeColor(token: string): string {
  const value = css.match(
    new RegExp(`--color-${token}:\\s*(#[0-9a-fA-F]{3,8});`),
  )?.[1];
  if (!value) {
    throw new Error(`--color-${token} not found in app/globals.css`);
  }
  return value;
}

describe("app/icon.svg", () => {
  it("restates only --color-accent / --color-foreground from globals.css, and nothing else", () => {
    const accent = themeColor("accent");
    const foreground = themeColor("foreground");

    // Every hex literal in the file must be one of the two theme colors —
    // catches both a stray, unsynced color and a rebrand that moved one of
    // these values in globals.css without updating icon.svg to match.
    const hexLiterals = svg.match(/#[0-9a-fA-F]{3,8}/g) ?? [];
    expect(hexLiterals.length).toBeGreaterThan(0);
    for (const hex of hexLiterals) {
      expect([accent, foreground]).toContain(hex.toLowerCase());
    }

    // And both colors are actually used, in their expected roles.
    expect(svg).toContain(`fill="${accent}"`);
    expect(svg).toContain(`stroke="${foreground}"`);
  });
});
