/**
 * Canonical, absolute base URL for the deployed site.
 *
 * Single source of truth for the production origin so metadata, the sitemap,
 * robots, and structured data can never drift apart. Import from here instead
 * of hardcoding "https://moadim.io" in individual route/metadata files.
 */
export const SITE_URL = "https://moadim.io";

/**
 * GitHub `org/repo` slug for the primary (daemon) repository.
 *
 * Single source of truth for the product's repository identity. Derive the
 * GitHub URL from this rather than re-typing the slug at each link.
 */
export const REPO_SLUG = "moadim-io/daemon";

/** Canonical GitHub repository URL, derived from {@link REPO_SLUG}. */
export const GITHUB_URL = `https://github.com/${REPO_SLUG}`;

/**
 * crates.io crate name the daemon publishes under — also the binary installed
 * by `cargo install`. Referencing this in both the install snippet and the
 * crates.io link keeps them from drifting apart.
 */
export const CRATE_NAME = "moadim";

/** Canonical crates.io listing URL, derived from {@link CRATE_NAME}. */
export const CRATES_IO_URL = `https://crates.io/crates/${CRATE_NAME}`;
