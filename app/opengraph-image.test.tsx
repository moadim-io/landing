import { describe, expect, it } from "vitest";
import { alt, contentType, dynamic, size } from "./opengraph-image";

describe("opengraph-image route config", () => {
  it("is force-static so it survives `output: export`", () => {
    // Metadata routes must opt into static generation under the static
    // export (see AGENTS.md). If this regresses to the Next.js default,
    // `next build` fails — this test catches that without a full build.
    expect(dynamic).toBe("force-static");
  });

  it("declares the standard Open Graph image dimensions", () => {
    expect(size).toEqual({ width: 1200, height: 630 });
  });

  it("serves the image as a PNG", () => {
    expect(contentType).toBe("image/png");
  });

  it("describes the card for assistive technology", () => {
    expect(alt).toMatch(/moadim/i);
    expect(alt.length).toBeGreaterThan(0);
  });
});
