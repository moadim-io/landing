import { describe, expect, it } from "vitest";
import manifest from "./manifest";

describe("manifest", () => {
  it("declares an installable, standalone web app identity", () => {
    const result = manifest();

    expect(result.name).toBe("Moadim — Cron jobs over MCP & REST");
    expect(result.short_name).toBe("Moadim");
    expect(result.start_url).toBe("/");
    expect(result.display).toBe("standalone");
  });

  it("declares matching background and theme colors", () => {
    const result = manifest();

    expect(result.background_color).toBe(result.theme_color);
  });

  it("declares at least one icon with a size and MIME type", () => {
    const result = manifest();

    expect(result.icons?.length).toBeGreaterThan(0);
    for (const icon of result.icons ?? []) {
      expect(icon.src).toMatch(/^\//);
      expect(icon.sizes).toBeTruthy();
      expect(icon.type).toBeTruthy();
    }
  });
});
