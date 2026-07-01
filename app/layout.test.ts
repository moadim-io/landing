import { describe, expect, it } from "vitest";
import { jsonLd, metadata, viewport } from "./layout";
import { SITE_URL } from "./site";

describe("root layout metadata", () => {
  it("declares the expected title and description", () => {
    expect(metadata.title).toMatchObject({
      default: "Moadim — Put your agents on a loop",
    });
    expect(metadata.description).toMatch(/loop engine for AI agents/i);
  });

  it("declares the canonical site URL as the metadata base", () => {
    expect(metadata.metadataBase?.toString()).toBe(`${SITE_URL}/`);
  });

  it("declares an Open Graph card matching the page title, description, and canonical URL", () => {
    expect(metadata.openGraph).toMatchObject({
      title: "Moadim — Put your agents on a loop",
      description: metadata.description,
      url: SITE_URL,
      siteName: "Moadim",
      type: "website",
      locale: "en_US",
    });
  });

  it("declares a large-image Twitter card matching the page title and description", () => {
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: "Moadim — Put your agents on a loop",
      description: metadata.description,
    });
  });
});

describe("root layout viewport", () => {
  it("locks the color scheme to light so dark-mode browsers don't invert the brand palette", () => {
    expect(viewport.colorScheme).toBe("light");
  });

  it("paints mobile browser chrome in the brand background color", () => {
    expect(viewport.themeColor).toBe("#f4f1e8");
  });
});

describe("root layout JSON-LD", () => {
  it("identifies the app under the MIT license at the canonical URL", () => {
    expect(jsonLd.url).toBe(SITE_URL);
    expect(jsonLd.license).toBe("https://opensource.org/licenses/MIT");
    expect(jsonLd["@type"]).toBe("SoftwareApplication");
  });
});
