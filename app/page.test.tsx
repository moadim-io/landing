import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("Home page", () => {
  it("renders the hero headline", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Cron jobs your agents can actually schedule.",
    );
  });

  it("shows the cargo install command verbatim", () => {
    render(<Home />);
    expect(screen.getByText("cargo install moadim")).toBeInTheDocument();
  });

  it("points a CTA at the daemon repository", () => {
    render(<Home />);
    // Match by href rather than accessible name so the test stays valid
    // regardless of the link's (separately tracked) aria-label wording.
    const daemonLink = screen
      .getAllByRole("link")
      .find(
        (link) =>
          link.getAttribute("href") === "https://github.com/moadim-io/daemon",
      );
    expect(daemonLink).toBeDefined();
  });
});
