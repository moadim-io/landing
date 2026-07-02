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
