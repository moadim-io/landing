import { afterEach, describe, expect, it, vi } from "vitest";
import { jsonLd, metadata } from "./layout";
import { SITE_URL } from "./site";

// `verification` is built from env vars read at module load time, so covering
// each combination requires stubbing the env and re-importing the module
// fresh rather than asserting against the already-imported `metadata` above.
// Vars left out of `env` stay unset, matching an unconfigured deploy.
async function importLayoutWithEnv(env: { google?: string; bing?: string }) {
  if (env.google !== undefined) {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION", env.google);
  }
  if (env.bing !== undefined) {
    vi.stubEnv("NEXT_PUBLIC_BING_SITE_VERIFICATION", env.bing);
  }
  vi.resetModules();
  return import("./layout");
}

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

  it("declares an Organization node with a logo, referenced by the other nodes", () => {
    expect(organization["@type"]).toBe("Organization");
    expect(organization.url).toBe(SITE_URL);
    expect(organization.logo).toBe(`${SITE_URL}/opengraph-image`);
    expect(website.publisher).toEqual({ "@id": organization["@id"] });
    expect(softwareApplication.publisher).toEqual({
      "@id": organization["@id"],
    });
  });

  it("links the Organization node to its authoritative GitHub profile via sameAs", () => {
    // Distinct from SoftwareApplication.sameAs (the product's distribution
    // channels): this is what lets search engines resolve the "Moadim"
    // Organization entity to a verifiable external profile.
    expect(organization.sameAs).toEqual(["https://github.com/moadim-io"]);
  });

  it("declares a WebSite node with the site name and canonical URL", () => {
    expect(website["@type"]).toBe("WebSite");
    expect(website.name).toBe("Moadim");
    expect(website.url).toBe(SITE_URL);
  });
});

describe("search-engine verification metadata", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("omits both tags when neither token is configured", async () => {
    const { metadata: unconfigured } = await importLayoutWithEnv({});
    expect(unconfigured.verification).toEqual({ google: undefined });
  });

  it("emits only the Google tag when just that token is configured", async () => {
    const { metadata: googleOnly } = await importLayoutWithEnv({
      google: "google-token",
    });
    expect(googleOnly.verification).toEqual({ google: "google-token" });
  });

  it("emits both tags, nesting Bing under `other`, when both tokens are configured", async () => {
    const { metadata: both } = await importLayoutWithEnv({
      google: "google-token",
      bing: "bing-token",
    });
    expect(both.verification).toEqual({
      google: "google-token",
      other: { "msvalidate.01": "bing-token" },
    });
  });
});
