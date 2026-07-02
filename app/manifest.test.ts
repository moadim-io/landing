import { describe, expect, it } from "vitest";
import manifest from "./manifest";
import { description } from "./layout";

describe("manifest", () => {
  it("uses the current site branding, not the pre-rebrand tagline", () => {
    const result = manifest();

    // Regression guard for the "Cron jobs over MCP & REST" copy that used to
    // ship here after the rest of the site (hero, OG/Twitter cards) had
    // already moved to the "loop engine" positioning.
    expect(result.name).toBe("Moadim — Put your agents on a loop");
    expect(result.name).not.toMatch(/cron jobs/i);
    expect(result.description).toBe(description);
  });

  it("matches the site's actual background color instead of an unrelated off-white", () => {
    const result = manifest();

    expect(result.theme_color).toBe("#f4f1e8");
    expect(result.background_color).toBe("#f4f1e8");
  });
});
