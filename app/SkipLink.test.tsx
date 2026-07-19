import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SkipLink } from "./SkipLink";

describe("SkipLink", () => {
  it("links to the #main landmark", () => {
    render(<SkipLink />);

    expect(screen.getByRole("link", { name: /skip to content/i })).toHaveAttribute(
      "href",
      "#main",
    );
  });

  it("is visually hidden until focused", () => {
    render(<SkipLink />);

    expect(screen.getByRole("link", { name: /skip to content/i })).toHaveClass(
      "sr-only",
      "focus:not-sr-only",
    );
  });
});
