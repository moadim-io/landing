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
});
