import { describe, expect, it } from "vitest";
import OpenGraphImage, {
  alt,
  contentType,
  dynamic,
  size,
} from "./opengraph-image";

describe("opengraph-image route config", () => {
  it("is force-static so it survives `output: export`", () => {
    // Metadata routes must opt into static generation under the static
    // export (see AGENTS.md). If this regresses to the Next.js default,
    // `next build` fails -- this test catches that without a full build.
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

describe("OpenGraphImage render", () => {
  // Every test above only asserts the exported config constants -- none of
  // them call the component. A typo in the Satori JSX/inline style tree (an
  // invalid CSS property, a bad style value) only fails at `next build` time
  // today. Actually invoking the renderer catches that class of bug in
  // `npm test`, seconds before a full build would.
  it("renders the card without throwing and returns an image response", () => {
    const response = OpenGraphImage();

    expect(response).toBeInstanceOf(Response);
    expect(response.headers.get("content-type")).toBe(contentType);
  });
});
