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

  it("renders all three feature cards", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { level: 2, name: /a loop runs an agent/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /runs locally, survives reboot/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: /mcp · rest · openapi/i }),
    ).toBeInTheDocument();
  });

  it("renders the loop-engineering reading list as safe, nofollow external links", () => {
    render(<Home />);

    const reads: Array<[source: string, href: string]> = [
      [
        "mindstudio",
        "https://www.mindstudio.ai/blog/what-is-loop-engineering-ai-coding-agents",
      ],
      ["shaam", "https://shaam.blog/articles/loop-engineering-ai-agents"],
      [
        "explainx.ai",
        "https://explainx.ai/blog/what-is-loop-engineering-ai-agents-2026",
      ],
    ];

    for (const [source, href] of reads) {
      const link = screen.getByRole("link", { name: new RegExp(source, "i") });

      expect(link).toHaveAttribute("href", href);
      expect(link).toHaveAttribute("target", "_blank");
      // These are third-party blog posts (not Moadim properties), so the
      // link must stay `nofollow` in addition to the safe-new-tab baseline.
      const rel = link.getAttribute("rel") ?? "";
      expect(rel).toContain("nofollow");
      expect(rel).toContain("noopener");
      expect(rel).toContain("noreferrer");
    }
  });
});
