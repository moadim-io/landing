import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFound, { metadata } from "./not-found";
import { eyebrowPill, statusBody, statusCard, statusCardWrapper } from "./page";

describe("not-found metadata", () => {
  it("declares a page-specific title", () => {
    expect(metadata.title).toBe("Page not found");
  });

  // The static export emits a crawlable out/404.html and robots.ts allows
  // everything, so without this the 404 route can get indexed and surface in
  // search results, tripping Google Search Console's "Soft 404" report (see
  // the comment in not-found.tsx). Nothing asserted this before, so a future
  // edit could drop it silently.
  it("tells crawlers not to index the 404 route", () => {
    expect(metadata.robots).toEqual({ index: false });
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

    expect(container.querySelector("main")?.className).toBe(statusCard);
  });

  // Same drift risk as the `panel` guard above, for the rest of the "status
  // off-ramp" chrome this page shares with error.tsx: the outer centering
  // wrapper, the eyebrow tag, and the body copy.
  it("reuses the shared status-card wrapper, eyebrow, and body tokens", () => {
    const { container } = render(<NotFound />);

    expect(container.firstElementChild?.className).toBe(statusCardWrapper);
    expect(screen.getByText("Error 404").className).toBe(eyebrowPill);
    expect(
      screen.getByText(/it may have moved/i).className,
    ).toBe(statusBody);
  });
});
