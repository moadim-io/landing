import { render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import RootLayout, { jsonLd, metadata, viewport } from "./layout";
import { ORG_URL, REPO_URL, CRATE_URL, SITE_URL } from "./site";

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

  it("opts into indexing and large Google image/video previews", () => {
    // Distinct from app/robots.ts (the site-wide robots.txt crawl
    // directive): this is the per-document <meta name="robots"> tag. With
    // nothing set here, Google defaults to max-image-preview:standard and
    // only ever shows a small OG-card thumbnail in Search/Discover. See #143.
    expect(metadata.robots).toMatchObject({
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    });
  });

  it("declares a self-referencing canonical URL", () => {
    // Without this, search engines have no signal that "/" is the
    // authoritative URL for the homepage's content.
    expect(metadata.alternates?.canonical).toBe("/");
  });

  it("configures a chromeless, branded iOS home-screen presentation", () => {
    // Silently regressing any of these fields falls back to Safari's default
    // "Add to Home Screen" chrome/title instead of the standalone Moadim app
    // experience these three fields opt into.
    expect(metadata.appleWebApp).toMatchObject({
      capable: true,
      title: "Moadim",
      statusBarStyle: "default",
    });
  });

  it("opts identifier-like body text out of iOS's tap-to-call rewriting", () => {
    // Without this, mobile Safari heuristically turns strings like
    // "moadim-io/daemon" into tap-to-call `tel:` links.
    expect(metadata.formatDetection).toEqual({ telephone: false });
  });

  it("omits the Bing verification tag when its token is unset", () => {
    // The default test env has no NEXT_PUBLIC_BING_SITE_VERIFICATION, so
    // `metadata` (imported once, above) already reflects the unconfigured case.
    expect(metadata.verification).toEqual({ google: undefined });
  });
});

describe("root layout Bing site verification", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("emits the Bing verification tag when its token is set at build time", async () => {
    // `googleSiteVerification`/`bingSiteVerification` are read from
    // `process.env` at module load, so exercising the "token is set" branch
    // requires stubbing the env and re-importing a fresh module instance —
    // the `metadata` imported at the top of this file was already evaluated
    // with the token unset.
    vi.stubEnv("NEXT_PUBLIC_BING_SITE_VERIFICATION", "bing-token-123");
    vi.resetModules();
    const { metadata: metadataWithBingToken } = await import("./layout");

    expect(metadataWithBingToken.verification).toEqual({
      google: undefined,
      other: { "msvalidate.01": "bing-token-123" },
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
  const [organization, website, softwareApplication] = jsonLd["@graph"];

  it("identifies the app under the MIT license at the canonical URL", () => {
    expect(softwareApplication.url).toBe(SITE_URL);
    expect(softwareApplication.license).toBe(
      "https://opensource.org/licenses/MIT",
    );
    expect(softwareApplication["@type"]).toBe("SoftwareApplication");
  });

  it("points the SoftwareApplication image at the real opengraph-image route", () => {
    // The static export emits this route as `opengraph-image` with no extension
    // (see scripts/verify-export.mjs) — a hardcoded ".png" 404s in production.
    expect(softwareApplication.image).toBe(`${SITE_URL}/opengraph-image`);
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
    expect(organization.sameAs).toEqual([ORG_URL]);
  });

  it("points the SoftwareApplication node at the product's real distribution channels", () => {
    // Regression guard: these must come from site.ts's REPO_URL/CRATE_URL, not hardcoded
    // literals — a repo move or crate rename would otherwise silently leave stale URLs
    // here with no test failure to catch it.
    expect(softwareApplication.sameAs).toEqual([REPO_URL, CRATE_URL]);
    expect(softwareApplication.codeRepository).toBe(REPO_URL);
    expect(softwareApplication.downloadUrl).toBe(CRATE_URL);
  });

  it("declares a WebSite node with the site name and canonical URL", () => {
    expect(website["@type"]).toBe("WebSite");
    expect(website.name).toBe("Moadim");
    expect(website.url).toBe(SITE_URL);
  });
});

// The rest of this file only ever imports RootLayout's exported metadata/
// jsonLd/viewport objects — the component itself (the <html>/<body> shell,
// the banner landmark, the wordmark link, and the Docs/GitHub nav) had no
// render coverage, so a regression there (a dropped landmark, a broken nav
// href, {children} no longer rendering) could pass CI undetected.
describe("root layout render", () => {
  it("renders the html element in English", () => {
    render(
      <RootLayout>
        <p>page content</p>
      </RootLayout>,
    );

    expect(document.documentElement.lang).toBe("en");
  });

  it("gives assistive tech a banner landmark with a link back home", () => {
    render(
      <RootLayout>
        <p>page content</p>
      </RootLayout>,
    );

    const homeLink = screen.getByRole("link", { name: "Moadim home" });
    // <header> only exposes the implicit `banner` landmark role when it
    // isn't nested inside <main>/<article>/etc. — querying by that role
    // (not just the <header> tag) guards against that silently changing.
    expect(screen.getByRole("banner")).toContainElement(homeLink);
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("links Docs and GitHub to the daemon repo as safe outbound links", () => {
    render(
      <RootLayout>
        <p>page content</p>
      </RootLayout>,
    );

    // Scoped to the header nav: the footer also links to GitHub (see
    // layout.tsx's footer), so an unscoped getByRole("link", { name:
    // /^github/i }) matches both and throws. This test only cares about
    // the header nav's Docs/GitHub links.
    const nav = within(screen.getByRole("navigation", { name: "Site navigation" }));

    const docsLink = nav.getByRole("link", { name: /docs/i });
    expect(docsLink).toHaveAttribute("href", `${REPO_URL}#readme`);
    expect(docsLink).toHaveAttribute("target", "_blank");
    expect(docsLink).toHaveAttribute("rel", "noopener noreferrer");

    const githubLink = nav.getByRole("link", { name: /^github/i });
    expect(githubLink).toHaveAttribute("href", REPO_URL);
    expect(githubLink).toHaveAttribute("target", "_blank");
  });

  it("renders the skip-to-content link", () => {
    render(
      <RootLayout>
        <p>page content</p>
      </RootLayout>,
    );

    expect(
      screen.getByRole("link", { name: /skip to content/i }),
    ).toHaveAttribute("href", "#main");
  });

  it("renders its children", () => {
    render(
      <RootLayout>
        <p>page content</p>
      </RootLayout>,
    );

    expect(screen.getByText("page content")).toBeInTheDocument();
  });

  it("stamps the footer copyright with the current year, not a frozen literal", () => {
    render(
      <RootLayout>
        <p>page content</p>
      </RootLayout>,
    );

    // A hardcoded year (e.g. "© 2026") would silently go stale every January;
    // deriving it from the build-time clock (mirroring sitemap.ts's
    // `lastModified`) keeps it correct on every future redeploy.
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByRole("contentinfo"),
    ).toHaveTextContent(`© ${currentYear} Moadim`);
  });
});
