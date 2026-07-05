import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RootLayout, { jsonLd, metadata } from "./layout";
import { REPO_URL, SITE_URL } from "./site";

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

  it("declares a WebSite node with the site name and canonical URL", () => {
    expect(website["@type"]).toBe("WebSite");
    expect(website.name).toBe("Moadim");
    expect(website.url).toBe(SITE_URL);
  });
});

// The banner/nav markup below was previously untested — every other test in
// this file only asserts on the exported `metadata`/`jsonLd` objects, never on
// what RootLayout actually renders. A dropped href, a missing aria-label, or a
// nav link that stops opening safely in a new tab would all pass CI silently.
describe("root layout render", () => {
  it("renders a banner landmark with the site wordmark linking home", () => {
    render(
      <RootLayout>
        <div>page content</div>
      </RootLayout>,
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Moadim home" })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("renders the site navigation with safe, correctly-targeted external links", () => {
    render(
      <RootLayout>
        <div>page content</div>
      </RootLayout>,
    );

    expect(
      screen.getByRole("navigation", { name: "Site navigation" }),
    ).toBeInTheDocument();

    const docsLink = screen.getByRole("link", { name: /docs/i });
    expect(docsLink).toHaveAttribute("href", `${REPO_URL}#readme`);
    expect(docsLink).toHaveAttribute("target", "_blank");
    expect(docsLink.getAttribute("rel")).toContain("noopener");
    expect(docsLink.getAttribute("rel")).toContain("noreferrer");

    const githubLink = screen.getByRole("link", { name: /^github/i });
    expect(githubLink).toHaveAttribute("href", REPO_URL);
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink.getAttribute("rel")).toContain("noopener");
    expect(githubLink.getAttribute("rel")).toContain("noreferrer");
  });

  it("renders the page content passed as children", () => {
    render(
      <RootLayout>
        <div>page content</div>
      </RootLayout>,
    );

    expect(screen.getByText("page content")).toBeInTheDocument();
  });
});
