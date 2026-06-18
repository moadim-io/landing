/**
 * Canonical production origin for the site.
 *
 * Single source of truth for every SEO-facing surface (metadataBase,
 * OpenGraph url, JSON-LD url, sitemap, robots). Override per environment
 * with NEXT_PUBLIC_SITE_URL (e.g. preview/staging deploys) without touching code.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://moadim.io";
