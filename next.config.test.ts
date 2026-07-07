import { describe, expect, it } from "vitest";
import nextConfig from "./next.config";

// `next.config.ts` encodes the three invariants the whole static-export
// deploy model depends on (see AGENTS.md's "Static-export constraint" and the
// inline comments on each field). None of them fail `next build` today, so a
// silent revert of any one is a live-site regression, not a build error:
//
// - `output: "export"` — flipping this away from a static export re-enables
//   SSR/route-handler features the Cloudflare Pages deploy (no Node runtime)
//   can't serve.
// - `trailingSlash: true` — dropping this changes every emitted route from
//   `/foo/index.html` to `/foo.html`, which static hosts resolve differently.
// - `images.unoptimized: true` — there's no `next/image` usage today (see the
//   comment in next.config.ts), so removing this is a no-op build that only
//   breaks the moment a future page imports `next/image` (#218).
describe("next.config", () => {
  it("keeps the static export enabled", () => {
    expect(nextConfig.output).toBe("export");
  });

  it("keeps directory-style trailing-slash routes enabled", () => {
    expect(nextConfig.trailingSlash).toBe(true);
  });

  it("keeps image optimization disabled for the static export", () => {
    expect(nextConfig.images?.unoptimized).toBe(true);
  });
});
