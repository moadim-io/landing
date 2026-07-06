import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFound, { metadata } from "./not-found";

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
});
