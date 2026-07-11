import { describe, expect, it } from "vitest";
import TwitterImage, { alt, contentType, dynamic, size } from "./twitter-image";
import OpenGraphImage, {
  alt as ogAlt,
  contentType as ogContentType,
  size as ogSize,
} from "./opengraph-image";

describe("twitter-image route config", () => {
  it("is force-static so it survives `output: export`", () => {
    expect(dynamic).toBe("force-static");
  });

  it("re-exports the exact opengraph-image card, not a drifted copy", () => {
    // twitter-image.tsx intentionally re-exports opengraph-image's config
    // and renderer so the two cards can never fall out of sync. Assert the
    // re-exports, not just equal-looking values, so a future change that
    // hand-copies instead of re-exporting gets caught here.
    expect(TwitterImage).toBe(OpenGraphImage);
    expect(size).toBe(ogSize);
    expect(contentType).toBe(ogContentType);
    expect(alt).toBe(ogAlt);
  });
});
