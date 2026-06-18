/**
 * Single source of truth for the site's public origin.
 *
 * Every SEO-facing surface (metadataBase, OpenGraph url, JSON-LD url, sitemap,
 * robots) must agree on the same base URL. Importing this constant — instead of
 * repeating the literal — keeps them in sync and lets preview/staging deploys
 * override the origin via `NEXT_PUBLIC_SITE_URL` without code edits.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://moadim.io";
