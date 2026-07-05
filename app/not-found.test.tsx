import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFound, { metadata } from "./not-found";
import { panel } from "./page";

describe("not-found metadata", () => {
  it("declares a page-specific title", () => {
    expect(metadata.title).toBe("Page not found");
  });
});

describe("NotFound", () => {
  it("renders a 404 heading", () => {
    render(<NotFound />);

    expect(
      screen.getByRole("heading", { level: 1, name: "404" }),
    ).toBeInTheDocument();
  });

  it("offers a working link back to the homepage", () => {
    render(<NotFound />);

    expect(
      screen.getByRole("link", { name: /back to home/i }),
    ).toHaveAttribute("href", "/");
  });

  // The 404 card used to hand-copy page.tsx's `panel` surface as a duplicated
  // class string, so a future tweak to the shared neobrutalist panel style
  // could update the rest of the site and silently leave this card behind.
  // Assert it reuses the same exported token instead of a byte-identical copy.
  it("reuses the shared panel surface style instead of a duplicated copy", () => {
    const { container } = render(<NotFound />);

    expect(container.querySelector("main")?.className).toContain(panel);
  });
});
