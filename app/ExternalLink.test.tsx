import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ExternalLink } from "./ExternalLink";

describe("ExternalLink", () => {
  it("opens in a new tab without granting the opened page window.opener access", () => {
    render(<ExternalLink href="https://example.com">Example</ExternalLink>);

    const link = screen.getByRole("link", { name: /example/i });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  it("prepends relExtra tokens ahead of the always-on noopener noreferrer baseline", () => {
    render(
      <ExternalLink href="https://example.com" relExtra="nofollow">
        Example
      </ExternalLink>,
    );

    expect(screen.getByRole("link", { name: /example/i })).toHaveAttribute(
      "rel",
      "nofollow noopener noreferrer",
    );
  });

  it("warns screen-reader users that the link opens in a new tab", () => {
    render(<ExternalLink href="https://example.com">Example</ExternalLink>);

    expect(screen.getByText("(opens in a new tab)")).toHaveClass("sr-only");
  });

  it("still warns screen-reader users when the caller sets aria-label", () => {
    // An `aria-label` fully replaces an element's accessible name, so the
    // visually-hidden "(opens in a new tab)" suffix rendered as a child span
    // is otherwise silently dropped from the name on any labeled link. The
    // component must append the suffix to the label itself instead of
    // relying on every caller to hand-type it.
    render(
      <ExternalLink href="https://example.com" aria-label="Example site">
        Visit
      </ExternalLink>,
    );

    expect(
      screen.getByRole("link", { name: "Example site (opens in a new tab)" }),
    ).toBeInTheDocument();
  });
});
