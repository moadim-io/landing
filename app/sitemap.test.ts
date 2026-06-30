import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";
import { SITE_URL } from "./site";

describe("sitemap", () => {
  it("includes the canonical site URL", () => {
    const entries = sitemap();

    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    });
  });

  it("stamps a real lastModified date", () => {
    const [entry] = sitemap();

    expect(entry.lastModified).toBeInstanceOf(Date);
    expect(Number.isNaN((entry.lastModified as Date).getTime())).toBe(false);
  });
});
