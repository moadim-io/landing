import { describe, expect, it } from "vitest";
import sitemap, { dynamic } from "./sitemap";
import { SITE_URL } from "./site";

describe("sitemap", () => {
  it("includes the canonical site URL", () => {
    const entries = sitemap();

    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({
      url: SITE_URL,
    });
  });

  it("stamps a real lastModified date", () => {
    const [entry] = sitemap();
    // Throw (not a non-null assertion, which lint forbids) so a missing
    // entry fails loudly here instead of silently reaching `toBeInstanceOf`
    // with `undefined`. This also narrows `entry` for TypeScript below.
    if (!entry) {
      throw new Error("sitemap() returned no entries");
    }

    expect(entry.lastModified).toBeInstanceOf(Date);
    expect(Number.isNaN((entry.lastModified as Date).getTime())).toBe(false);
  });

  // Every other metadata route (manifest.test.ts, apple-icon.test.tsx,
  // opengraph-image.test.tsx, twitter-image.test.tsx) already asserts this;
  // sitemap.ts had the identical gap. Metadata routes must opt into static
  // generation under the static export (see AGENTS.md) — if this regresses
  // to the Next.js default, `next build` fails, and this test catches that
  // without a full build.
  it("is force-static so it survives `output: export`", () => {
    expect(dynamic).toBe("force-static");
  });
});
