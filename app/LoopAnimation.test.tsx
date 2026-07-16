import { existsSync } from "node:fs";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LoopAnimation } from "./LoopAnimation";

describe("LoopAnimation", () => {
  it("embeds the loop diagram SVG with a narrating alt text", () => {
    render(<LoopAnimation />);

    // The SVG is one atomic image (its internal text labels are never
    // exposed to assistive tech), so the alt has to tell the full loop
    // story on its own.
    const diagram = screen.getByRole("img", {
      name: /goals.*routines.*external repositories and tasks/i,
    });

    expect(diagram).toHaveAttribute("src", "/loop-animation.svg");
  });

  it("points at a file that actually exists in public/", () => {
    // The src is a plain string — a rename of public/loop-animation.svg
    // would 404 silently (next build doesn't resolve public/ references).
    // Path is cwd-relative (vitest runs from the repo root), matching
    // brand-colors.test.ts.
    expect(existsSync("public/loop-animation.svg")).toBe(true);
  });

  it("makes the horizontally scrollable wrapper keyboard-focusable", () => {
    // The diagram's `min-w-140` overflows its `overflow-x-auto` wrapper
    // below the sm breakpoint (every phone-width viewport), cropping off
    // the ROUTINES/EXTERNAL half by default. Without an explicit tabIndex,
    // a keyboard-only visitor could never focus the wrapper to scroll it
    // into view — axe-core's "scrollable-region-focusable" check / WCAG
    // 2.1.1 Keyboard.
    render(<LoopAnimation />);

    const scrollRegion = screen.getByRole("img", {
      name: /goals.*routines.*external repositories and tasks/i,
    }).parentElement;

    expect(scrollRegion).toHaveAttribute("tabIndex", "0");
    expect(scrollRegion).toHaveAccessibleName();
  });
});
