import { describe, expect, it } from "vitest";
import { contentType, dynamic, size } from "./apple-icon";

describe("apple-icon route config", () => {
  it("is force-static so it survives `output: export`", () => {
    // Metadata routes must opt into static generation under the static
    // export (see AGENTS.md). If this regresses to the Next.js default,
    // `next build` fails — this test catches that without a full build.
    expect(dynamic).toBe("force-static");
  });

  it("declares the recommended apple-touch-icon dimensions", () => {
    expect(size).toEqual({ width: 180, height: 180 });
  });

  it("serves the icon as a PNG", () => {
    expect(contentType).toBe("image/png");
  });
});
