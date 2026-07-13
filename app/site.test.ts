import { describe, expect, it } from "vitest";
import {
  CRATE_NAME,
  CRATE_URL,
  ORG_URL,
  REPO_SLUG,
  REPO_URL,
  SITE_URL,
  SITE_TITLE,
  SITE_DESCRIPTION,
} from "./site";

describe("site", () => {
  it("declares an absolute https SITE_URL with no trailing slash", () => {
    expect(SITE_URL).toMatch(/^https:\/\/[^/]+$/);
  });

  it("derives REPO_URL from REPO_SLUG", () => {
    expect(REPO_SLUG).toMatch(/^[^/]+\/[^/]+$/);
    expect(REPO_URL).toBe(`https://github.com/${REPO_SLUG}`);
  });

  it("derives ORG_URL from REPO_SLUG's owner segment", () => {
    // Guards the `.split("/")[0]` derivation itself, not just layout.tsx's
    // use of the result: layout.test.ts only asserts the Organization JSON-LD
    // `sameAs` matches whatever ORG_URL happens to be, so it stays green even
    // if this slicing logic regressed to point at the wrong segment or a
    // full repo URL instead of the org profile.
    expect(ORG_URL).toBe(`https://github.com/${REPO_SLUG.split("/")[0]}`);
    expect(ORG_URL).toBe("https://github.com/moadim-io");
  });

  it("derives CRATE_URL from CRATE_NAME", () => {
    expect(CRATE_NAME).not.toHaveLength(0);
    expect(CRATE_URL).toBe(`https://crates.io/crates/${CRATE_NAME}`);
  });

  it("declares a non-empty SITE_TITLE and SITE_DESCRIPTION", () => {
    expect(SITE_TITLE.length).toBeGreaterThan(0);
    expect(SITE_DESCRIPTION.length).toBeGreaterThan(0);
  });

  it("keeps SITE_DESCRIPTION within the social-card truncation budget (#135)", () => {
    // Twitter/X and most link-unfurlers clamp social-card descriptions at
    // ~120-125 characters — the tighter of the two display budgets this
    // string is reused across (Google SERP snippets allow ~155-160). Guards
    // against the description silently regrowing past the point where every
    // surface reusing it verbatim would start truncating.
    expect(SITE_DESCRIPTION.length).toBeLessThanOrEqual(125);
  });
});
