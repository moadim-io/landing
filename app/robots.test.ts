import { describe, expect, it } from "vitest";
import robots, { dynamic } from "./robots";
import { SITE_URL } from "./site";

describe("robots", () => {
  it("allows crawling everything and points at the sitemap", () => {
    const result = robots();

    expect(result.rules).toEqual({ userAgent: "*", allow: "/" });
    expect(result.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
  });

  // Every other metadata route (manifest.test.ts, apple-icon.test.tsx,
  // opengraph-image.test.tsx, twitter-image.test.tsx) already asserts this;
  // robots.ts had the identical gap. Metadata routes must opt into static
  // generation under the static export (see AGENTS.md) — if this regresses
  // to the Next.js default, `next build` fails, and this test catches that
  // without a full build.
  it("is force-static so it survives `output: export`", () => {
    expect(dynamic).toBe("force-static");
  });
});
