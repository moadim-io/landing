import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import AppleIcon, { contentType, dynamic, size } from "./apple-icon";

describe("apple-icon route config", () => {
  it("is force-static so it survives `output: export`", () => {
    // Metadata routes must opt into static generation under the static
    // export (see AGENTS.md). If this regresses to the Next.js default,
    // `next build` fails — this test catches that without a full build.
    expect(dynamic).toBe("force-static");
  });

  it("declares the recommended 180x180 apple-touch-icon size", () => {
    expect(size).toEqual({ width: 180, height: 180 });
  });

  it("serves the icon as a PNG", () => {
    expect(contentType).toBe("image/png");
  });
});

describe("AppleIcon render", () => {
  // Every test above only asserts the exported config constants — none of
  // them call the component. A typo in the Satori JSX/inline style tree (an
  // invalid CSS property, a bad style value) only fails at `next build` time
  // today, exactly the gap opengraph-image.test.tsx's "render" test already
  // closes for that route's identical ImageResponse/Satori setup.
  it("renders the icon without throwing and returns an image response", () => {
    const response = AppleIcon();

    expect(response).toBeInstanceOf(Response);
    expect(response.headers.get("content-type")).toBe(contentType);
  });
});

describe("AppleIcon font", () => {
  // Regression test, same idea as brand-colors.test.ts: `next/font` doesn't reach a
  // metadata route's `ImageResponse`, so without explicitly vendoring Satori-compatible
  // font bytes this route silently falls back to Satori's built-in font (Noto Sans)
  // instead of the brand's Geist, unlike opengraph-image.tsx's identical Satori setup
  // which already does this. Parsing the source (rather than mocking `next/og`) mirrors
  // how this repo already tests other Satori-only concerns.
  const source = readFileSync("app/apple-icon.tsx", "utf8");

  it("vendors the Geist Bold font file", () => {
    expect(source).toMatch(/geist-bold\.ttf/);
  });

  it("passes the vendored font into ImageResponse's fonts option", () => {
    expect(source).toMatch(/fonts:\s*\[\{\s*name:\s*"Geist"/);
  });
});
