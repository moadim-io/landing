import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

describe("sitemap", () => {
  it("includes the canonical homepage URL", () => {
    expect(sitemap().map((entry) => entry.url)).toContain("https://moadim.io");
  });
});

describe("robots", () => {
  it("references the sitemap and allows crawling", () => {
    const result = robots();
    expect(result.sitemap).toBe("https://moadim.io/sitemap.xml");
    expect(result.rules).toMatchObject({ userAgent: "*", allow: "/" });
  });
});
