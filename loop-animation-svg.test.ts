import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// public/loop-animation.svg is the single source of truth for the loop
// diagram: the landing page embeds it via <img> (app/LoopAnimation.tsx) and
// READMEs hotlink it. Because it renders inside <img> with no access to the
// site's stylesheet, it restates the brand palette and carries its own
// animation CSS — these tests guard those hand-synced pieces against drift
// (mirroring how brand-colors.test.ts guards its own literals).

// Paths are cwd-relative (vitest runs from the repo root), matching
// brand-colors.test.ts.
const svg = readFileSync("public/loop-animation.svg", "utf8");
const css = readFileSync("app/globals.css", "utf8");

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

  it("defines a @keyframes block for every animation class it uses", () => {
    const classes = new Set(
      [...svg.matchAll(/class="(loop-anim-[a-z-]+)"/g)].map((m) => m[1]),
    );
    const keyframes = new Set(
      [...svg.matchAll(/@keyframes (loop-anim-[a-z-]+)/g)].map((m) => m[1]),
    );

    expect(classes.size).toBeGreaterThan(0);
    expect(classes).toEqual(keyframes);
  });

  it("freezes into a static diagram under prefers-reduced-motion", () => {
    // The site's global reduced-motion rule can't reach inside an <img>, so
    // the SVG has to ship its own equivalent.
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
