import { describe, expect, it } from "vitest";
import {
  CRATE_NAME,
  CRATE_URL,
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

  it("derives CRATE_URL from CRATE_NAME", () => {
    expect(CRATE_NAME).not.toHaveLength(0);
    expect(CRATE_URL).toBe(`https://crates.io/crates/${CRATE_NAME}`);
  });

  it("declares a non-empty SITE_TITLE and SITE_DESCRIPTION", () => {
    expect(SITE_TITLE.length).toBeGreaterThan(0);
    expect(SITE_DESCRIPTION.length).toBeGreaterThan(0);
  });
});
