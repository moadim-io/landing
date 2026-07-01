import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFound, { metadata } from "./not-found";

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
});
