import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// public/loop-animation.svg is a standalone, self-contained copy of the
// landing page's loop diagram (app/LoopAnimation.tsx + the loop-anim-*
// keyframes in app/globals.css) so it can be embedded in READMEs, where the
// site's stylesheet isn't available. Nothing but convention ties the copies
// together — these tests make palette or choreography drift fail loudly
// instead of shipping a README diagram that no longer matches the site
// (mirroring how brand-colors.test.ts guards its own hand-synced literals).

const svg = readFileSync(
  join(__dirname, "public", "loop-animation.svg"),
  "utf8",
);
const css = readFileSync(join(__dirname, "app", "globals.css"), "utf8");

function keyframeNames(source: string): Set<string> {
  return new Set(source.match(/@keyframes (loop-anim-[a-z-]+)/g));
}

function themeColor(token: string): string {
  const value = css.match(
    new RegExp(`--color-${token}:\\s*(#[0-9a-f]{3,8})`),
  )?.[1];
  if (!value) {
    throw new Error(`--color-${token} not found in globals.css`);
  }
  return value;
}

describe("public/loop-animation.svg", () => {
  it("restates the brand palette from globals.css, and nothing else", () => {
    // The SVG declares the palette once as --fg/--accent/--bg custom
    // properties; every shape references those (or plain #fff card fill).
    expect(svg).toContain(`--fg: ${themeColor("foreground")}`);
    expect(svg).toContain(`--accent: ${themeColor("accent")}`);
    expect(svg).toContain(`--bg: ${themeColor("background")}`);

    const allowed = new Set([
      themeColor("foreground"),
      themeColor("accent"),
      themeColor("background"),
      "#fff",
    ]);

    for (const hex of svg.match(/#[0-9a-fA-F]{3,8}/g) ?? []) {
      expect(allowed).toContain(hex.toLowerCase());
    }
  });

  it("carries the same animation choreography as globals.css", () => {
    const svgKeyframes = keyframeNames(svg);
    const cssKeyframes = keyframeNames(css);

    expect(svgKeyframes.size).toBeGreaterThan(0);
    expect(svgKeyframes).toEqual(cssKeyframes);
  });

  it("freezes into a static diagram under prefers-reduced-motion", () => {
    // The site relies on the global reduced-motion rule in globals.css; the
    // standalone SVG has to ship its own equivalent since it renders inside
    // <img> with no access to the page stylesheet.
    expect(svg).toMatch(/prefers-reduced-motion:\s*reduce/);
  });

  it("stays self-contained: no scripts or external resources", () => {
    // GitHub renders README SVGs through <img> (via the camo proxy), which
    // silently drops scripts and blocks external fetches — anything relying
    // on them would work locally and break only on GitHub.
    expect(svg).not.toMatch(/<script/i);
    expect(svg).not.toMatch(/href=|xlink:|url\(http|@import|@font-face/i);
  });
});
