import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LoopAnimation } from "./LoopAnimation";

describe("LoopAnimation", () => {
  it("exposes the diagram as a single labeled image", () => {
    render(<LoopAnimation />);

    // role="img" + aria-label makes the whole SVG one atomic image for
    // assistive tech (its internal <text> labels are not announced piecemeal),
    // so the label must narrate the full loop story on its own.
    const diagram = screen.getByRole("img", {
      name: /goals.*routines.*external repositories and tasks/i,
    });

    expect(diagram.tagName.toLowerCase()).toBe("svg");
  });

  it("renders the two repos and both external satellites", () => {
    render(<LoopAnimation />);

    for (const label of ["GOALS", "ROUTINES", "REPO", "TASKS"]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it("labels both rail directions of the loop", () => {
    render(<LoopAnimation />);

    expect(screen.getByText("REFINE")).toBeInTheDocument();
    expect(screen.getByText("PROGRESS")).toBeInTheDocument();
  });

  // The component references `loop-anim-*` classes whose keyframes live in
  // globals.css — nothing else ties the two files together, so a rename on
  // either side would silently leave the diagram frozen. Assert every class
  // used in the markup has both a class definition and a matching @keyframes
  // block (they share a name by convention), mirroring how
  // brand-colors.test.ts guards its own cross-file contract.
  it("keeps every animation class in sync with globals.css", () => {
    const { container } = render(<LoopAnimation />);

    const used = new Set(container.innerHTML.match(/loop-anim-[a-z-]+/g));
    expect(used.size).toBeGreaterThan(0);

    const css = readFileSync(join(__dirname, "globals.css"), "utf8");

    for (const cls of used) {
      expect(css).toContain(`.${cls}`);
      expect(css).toContain(`@keyframes ${cls}`);
    }
  });
});
