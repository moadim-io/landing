import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { SATORI_ACCENT, SATORI_BACKGROUND, SATORI_FOREGROUND } from "./brand-colors";

// brand-colors.ts's own docstring warns that its hex literals "must still be
// kept in sync with `--color-background` / `--color-foreground` /
// `--color-accent` in `app/globals.css` by hand" -- Satori (next/og) resolves
// no CSS, so it can't reference the CSS custom properties directly. Nothing
// enforced that by-hand promise: a rebrand that updates globals.css without
// also touching brand-colors.ts would build and pass lint, but silently ship
// mismatched colors on the OG/Twitter card and Apple touch icon. Parse the
// actual `@theme` block so a drift fails this test instead.
const theme = readFileSync("app/globals.css", "utf8");

function themeColor(token: string): string {
  const match = theme.match(new RegExp(`--color-${token}:\\s*(#[0-9a-fA-F]+);`));
  const hex = match?.[1];
  if (!hex) throw new Error(`--color-${token} not found in app/globals.css`);
  return hex;
}

describe("brand-colors", () => {
  it("keeps SATORI_BACKGROUND in sync with --color-background", () => {
    expect(SATORI_BACKGROUND).toBe(themeColor("background"));
  });

  it("keeps SATORI_FOREGROUND in sync with --color-foreground", () => {
    expect(SATORI_FOREGROUND).toBe(themeColor("foreground"));
  });

  it("keeps SATORI_ACCENT in sync with --color-accent", () => {
    expect(SATORI_ACCENT).toBe(themeColor("accent"));
  });
});
