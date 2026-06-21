/**
 * Canonical, absolute base URL for the deployed site.
 *
 * Single source of truth for the production origin so metadata, the sitemap,
 * robots, and structured data can never drift apart. Import from here instead
 * of hardcoding "https://moadim.io" in individual route/metadata files.
 */
export const SITE_URL = "https://moadim.io";

/**
 * GitHub repository slug (`owner/name`) for the Moadim daemon.
 *
 * Single source of truth for the product's outbound identifiers, mirroring the
 * `SITE_URL` pattern above. Derive the full URLs from these instead of
 * hardcoding `github.com/moadim-io/daemon` or `crates.io/crates/moadim` at each
 * call site, so the repo move or a crate rename is a one-line change here.
 */
export const REPO_SLUG = "moadim-io/daemon";

/** Canonical GitHub repository URL, derived from {@link REPO_SLUG}. */
export const REPO_URL = `https://github.com/${REPO_SLUG}`;

/** Published crate name on crates.io (also the `cargo install` argument). */
export const CRATE_NAME = "moadim";

/** Canonical crates.io page for the published crate, derived from {@link CRATE_NAME}. */
export const CRATE_URL = `https://crates.io/crates/${CRATE_NAME}`;
