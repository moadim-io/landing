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

  it("declares a standalone PWA manifest rooted at the site", () => {
    const result = manifest();

    expect(result.start_url).toBe("/");
    expect(result.display).toBe("standalone");
    expect(result.name?.length).toBeGreaterThan(0);
    expect(result.short_name?.length).toBeGreaterThan(0);
  });

  it("shares its background/theme color with the Satori brand constant", () => {
    // Both fields used to carry their own "#f4f1e8" literal, independent of
    // SATORI_BACKGROUND (app/brand-colors.ts) and layout.tsx's viewport
    // themeColor — a rebrand touching only the shared constant would leave
    // the PWA manifest on the stale color. Assert against the constant so
    // that drift fails here instead of shipping silently.
    const result = manifest();

    expect(result.background_color).toBe(SATORI_BACKGROUND);
    expect(result.theme_color).toBe(SATORI_BACKGROUND);
  });

  it("points its icon at a file the export actually ships", () => {
    const [icon] = manifest().icons ?? [];
    // Throw (not a non-null assertion, which lint forbids) so a missing
    // icon entry fails loudly here instead of silently reaching the
    // property assertions below with `undefined`.
    if (!icon) {
      throw new Error("manifest() declared no icons");
    }

    expect(icon.src).toBe("/favicon.ico");
    expect(icon.type).toBe("image/x-icon");
  });
});
