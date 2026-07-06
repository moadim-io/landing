import { describe, expect, it } from "vitest";
import manifest, { dynamic } from "./manifest";

describe("manifest", () => {
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
