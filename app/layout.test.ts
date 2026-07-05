import { describe, expect, it } from "vitest";
import { jsonLd, metadata } from "./layout";
import { SITE_URL, REPO_URL, CRATE_URL } from "./site";

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
  const [organization, website, softwareApplication] = jsonLd["@graph"];

  it("identifies the app under the MIT license at the canonical URL", () => {
    expect(softwareApplication.url).toBe(SITE_URL);
    expect(softwareApplication.license).toBe(
      "https://opensource.org/licenses/MIT",
    );
    expect(softwareApplication["@type"]).toBe("SoftwareApplication");
  });

  it("points its GitHub/crates.io identifiers at the shared site.ts constants", () => {
    expect(softwareApplication.sameAs).toEqual([REPO_URL, CRATE_URL]);
    expect(softwareApplication.codeRepository).toBe(REPO_URL);
    expect(softwareApplication.downloadUrl).toBe(CRATE_URL);
  });

  it("declares an Organization node with a logo, referenced by the other nodes", () => {
    expect(organization["@type"]).toBe("Organization");
    expect(organization.url).toBe(SITE_URL);
    expect(organization.logo).toBe(`${SITE_URL}/opengraph-image`);
    expect(website.publisher).toEqual({ "@id": organization["@id"] });
    expect(softwareApplication.publisher).toEqual({
      "@id": organization["@id"],
    });
  });

  it("declares a WebSite node with the site name and canonical URL", () => {
    expect(website["@type"]).toBe("WebSite");
    expect(website.name).toBe("Moadim");
    expect(website.url).toBe(SITE_URL);
  });
});
