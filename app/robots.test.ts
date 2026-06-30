import { describe, expect, it } from "vitest";
import robots from "./robots";
import { SITE_URL } from "./site";

describe("robots", () => {
  it("allows crawling everything and points at the sitemap", () => {
    const result = robots();

    expect(result.rules).toEqual({ userAgent: "*", allow: "/" });
    expect(result.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
  });
});
