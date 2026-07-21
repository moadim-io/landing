import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";
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
});
