import { describe, expect, it } from "vitest";
import { contentType, dynamic, size } from "./icon";

describe("icon route config", () => {
  it("is force-static so it survives `output: export`", () => {
    // Metadata routes must opt into static generation under the static
    // export (see AGENTS.md). If this regresses to the Next.js default,
    // `next build` fails — this test catches that without a full build.
    expect(dynamic).toBe("force-static");
  });

  it("declares a standard favicon size", () => {
    expect(size).toEqual({ width: 32, height: 32 });
  });

  it("serves the icon as a PNG", () => {
    expect(contentType).toBe("image/png");
  });
});
