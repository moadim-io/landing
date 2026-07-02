import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";
import { CRATE_NAME, CRATE_URL, REPO_URL } from "./site";

describe("Home", () => {
  it("renders the hero headline", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { level: 1, name: /agents on a loop\.?/i }),
    ).toBeInTheDocument();
  });

  it("shows the cargo install command for the published crate", () => {
    render(<Home />);

    expect(screen.getByText(`cargo install ${CRATE_NAME}`)).toBeInTheDocument();
  });

  it("shows the run step after the install command, not just the install", () => {
    render(<Home />);

    // `cargo install` alone only builds the binary — the install card must
    // also surface the run step as its own command line, or visitors are
    // left with an installed-but-not-running daemon.
    const installLine = screen.getByText(`cargo install ${CRATE_NAME}`);
    const installCard = installLine.closest("div");

    if (!installCard) {
      throw new Error("expected the install command to sit inside a card");
    }

    const commandLines = installCard.querySelectorAll(":scope > code");
    expect(commandLines).toHaveLength(2);
    expect(commandLines[1]).toHaveTextContent(CRATE_NAME);
  });

  it("points the GitHub and crates.io CTAs at the canonical URLs", () => {
    render(<Home />);

    expect(
      screen.getByRole("link", { name: /star moadim on github/i }),
    ).toHaveAttribute("href", REPO_URL);
    expect(screen.getByRole("link", { name: /crates\.io/i })).toHaveAttribute(
      "href",
      CRATE_URL,
    );
  });
});
