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

/** Canonical GitHub organization profile URL, derived from {@link REPO_SLUG}'s owner. */
export const ORG_URL = `https://github.com/${REPO_SLUG.split("/")[0]}`;

/** Published crate name on crates.io (also the `cargo install` argument). */
export const CRATE_NAME = "moadim";

/** Canonical crates.io page for the published crate, derived from {@link CRATE_NAME}. */
export const CRATE_URL = `https://crates.io/crates/${CRATE_NAME}`;

/**
 * Canonical site title, shared by `<title>`, the Open Graph/Twitter cards,
 * and the PWA manifest's `name` (see `layout.tsx` and `manifest.ts`). Before
 * this constant, `manifest.ts` carried its own independent copy of this exact
 * string — a rebrand of one could silently drift from the other, exactly the
 * failure mode `SITE_URL`/`REPO_URL` above already guard against.
 */
export const SITE_TITLE = "Moadim — Put your agents on a loop";

/**
 * Canonical site description, shared by `<meta name="description">`, the
 * Open Graph/Twitter cards, and the PWA manifest's `description` (see
 * `layout.tsx` and `manifest.ts`). Same single-source rationale as
 * {@link SITE_TITLE}.
 */
export const SITE_DESCRIPTION =
  "Moadim is an open-source loop engine for AI agents. Define a loop — a prompt, a schedule, an agent — and it runs Claude, Codex, or Hermes against your repo on every tick, over MCP and REST.";
