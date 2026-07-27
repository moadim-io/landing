import { describe, expect, it } from "vitest";
import manifest, { dynamic } from "./manifest";
import { SITE_TITLE, SITE_DESCRIPTION } from "./site";
import { SATORI_BACKGROUND } from "./brand-colors";

describe("manifest", () => {
  it("shares its name/description with layout.tsx's metadata via site.ts", () => {
    // Before SITE_TITLE/SITE_DESCRIPTION existed, this file carried its own
    // independent copy of both strings — a rebrand of the <title>/meta
    // description in layout.tsx could silently drift from the PWA manifest.
    // Asserting against the shared constants (not a re-typed literal) fails
    // this test the moment either call site stops importing them.
    const result = manifest();

    expect(result.name).toBe(SITE_TITLE);
    expect(result.description).toBe(SITE_DESCRIPTION);
  });


  it("is force-static so it survives `output: export`", () => {
    // Metadata routes must opt into static generation under the static
    // export (see AGENTS.md). If this regresses to the Next.js default,
    // `next build` fails — this test catches that without a full build.
    expect(dynamic).toBe("force-static");
  });

  it("sources its background/theme color from brand-colors.ts, not a re-typed literal", () => {
    // Before this, background_color/theme_color were a third independent
    // copy of the brand background hex (alongside globals.css and
    // brand-colors.ts). A rebrand could update those two and silently miss
    // this one, leaving the PWA install/splash screen stale. Asserting
    // against the shared constant fails the moment manifest.ts stops
    // importing it.
    const result = manifest();

    expect(result.background_color).toBe(SATORI_BACKGROUND);
    expect(result.theme_color).toBe(SATORI_BACKGROUND);
  });

  it("declares a standalone PWA manifest rooted at the site", () => {
    const result = manifest();

    expect(result.start_url).toBe("/");
    expect(result.display).toBe("standalone");
    expect(result.name?.length).toBeGreaterThan(0);
    expect(result.short_name?.length).toBeGreaterThan(0);
  });

  it("pins a stable app id independent of start_url", () => {
    // Without `id`, a future start_url change (e.g. adding a query param
    // or locale prefix) would register as a *new* installed app instead of
    // updating the existing one for users who already installed it.
    const result = manifest();

    expect(result.id).toBe("/");
  });

  it("points its icon at a file the export actually ships", () => {
    const [icon] = manifest().icons ?? [];
    // Throw (not a non-null assertion, which lint forbids) so a missing
    // icon entry fails loudly here instead of silently reaching the
    // property assertions below with `undefined`.
    if (!icon) {
      throw new Error("manifest() declared no icons");
    }

    // app/favicon.ico was replaced by app/icon.svg (#161); the export never
    // emits a /favicon.ico file, so a manifest icon pointing there 404s on
    // any "Add to Home Screen" / PWA install.
    expect(icon.src).toBe("/icon.svg");
    expect(icon.type).toBe("image/svg+xml");
  });
});
