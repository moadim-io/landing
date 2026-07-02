import { describe, expect, it } from "vitest";
import manifest from "./manifest";

describe("manifest", () => {
  it("points its icon at a file the static export actually emits", () => {
    const result = manifest();

    // Regression guard: app/favicon.ico was replaced by app/icon.svg (#161),
    // but this manifest kept referencing the old /favicon.ico path, which
    // never lands in out/ — breaking the PWA install icon on Android/Chrome.
    expect(result.icons).toEqual([
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ]);
  });
});
