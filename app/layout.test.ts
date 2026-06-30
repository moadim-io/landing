import { describe, expect, it } from "vitest";
import { jsonLd, metadata } from "./layout";
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
});

describe("root layout JSON-LD", () => {
  it("identifies the app under the MIT license at the canonical URL", () => {
    expect(jsonLd.url).toBe(SITE_URL);
    expect(jsonLd.license).toBe("https://opensource.org/licenses/MIT");
    expect(jsonLd["@type"]).toBe("SoftwareApplication");
  });
});
