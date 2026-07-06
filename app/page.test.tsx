import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home, { faqJsonLd } from "./page";
import { CRATE_NAME, CRATE_URL, REPO_URL } from "./site";

describe("Home", () => {
  it("renders the hero headline", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { level: 1, name: /agents on a loop\.?/i }),
    ).toBeInTheDocument();
  });

  it("exposes #main-content as the skip link's target landmark", () => {
    render(<Home />);

    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
  });

  it("shows the locked cargo install command for the published crate", () => {
    render(<Home />);

    expect(
      screen.getByText(`cargo install --locked ${CRATE_NAME}`),
    ).toBeInTheDocument();
  });

  it("surfaces the Unix/tmux/cron-daemon runtime prerequisite next to the install command", () => {
    render(<Home />);

    // Loops fire from the OS crontab inside a tmux session — without a
    // Unix-like OS, tmux, and a cron daemon, `cargo install` succeeds but the
    // daemon never actually runs a loop (#208). This caveat had no test
    // coverage, so a future edit to the install card could drop it silently.
    const installLine = screen.getByText(
      `cargo install --locked ${CRATE_NAME}`,
    );
    const installCard = installLine.closest("div");

    if (!installCard) {
      throw new Error("expected the install command to sit inside a card");
    }

    expect(installCard.textContent).toMatch(/unix-like os/i);
    expect(installCard.textContent).toMatch(/\btmux\b/i);
    expect(installCard.textContent).toMatch(/cron daemon/i);
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

describe("FAQ section", () => {
  it("renders every FAQ question and answer as a definition-list pair", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { level: 2, name: /faq/i }),
    ).toBeInTheDocument();

    for (const { name: question } of faqJsonLd.mainEntity) {
      expect(
        screen.getByText(question, { selector: "dt" }),
      ).toBeInTheDocument();
    }
  });

  // The FAQPage JSON-LD is hand-derived from the same `faqs` data the visible
  // <dl> renders (see page.tsx). Nothing enforces that the two stay in sync —
  // a future edit could update one and miss the other, silently breaking the
  // FAQ rich-result eligibility this markup exists for. Assert they match so
  // that drift fails a test instead of only showing up in Search Console.
  it("keeps the FAQPage JSON-LD in sync with the visible FAQ content", () => {
    const { container } = render(<Home />);

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).not.toBeNull();

    const jsonLd = JSON.parse(script?.innerHTML ?? "null");
    expect(jsonLd).toEqual(faqJsonLd);

    const dtElements = screen.getAllByRole("term");
    const ddElements = screen.getAllByRole("definition");
    expect(dtElements).toHaveLength(jsonLd.mainEntity.length);
    expect(ddElements).toHaveLength(jsonLd.mainEntity.length);

    jsonLd.mainEntity.forEach(
      (
        entry: { name: string; acceptedAnswer: { text: string } },
        i: number,
      ) => {
        expect(dtElements[i]).toHaveTextContent(entry.name);
        expect(ddElements[i]).toHaveTextContent(entry.acceptedAnswer.text);
      },
    );
  });

  it("declares the FAQPage type expected for FAQ rich results", () => {
    expect(faqJsonLd["@type"]).toBe("FAQPage");
    expect(faqJsonLd["@context"]).toBe("https://schema.org");
    expect(faqJsonLd.mainEntity.length).toBeGreaterThan(0);
  });
});
