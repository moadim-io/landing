import type { MetadataRoute } from "next";
import { execSync } from "node:child_process";

export const dynamic = "force-static";

/**
 * Last-modified date for the landing page, resolved once at build time.
 *
 * Derived from the most recent git commit that touched the page content so the
 * emitted `<lastmod>` tracks real changes instead of a frozen literal that
 * silently goes stale. Falls back to the current build time when git history is
 * unavailable (e.g. a shallow CI checkout or an exported artifact), so the value
 * is never frozen. Resolved at build, not request, time, so it stays compatible
 * with `output: "export"` / `force-static`.
 */
function pageLastModified(): Date {
  try {
    const iso = execSync("git log -1 --format=%cI -- app/page.tsx", {
      encoding: "utf8",
    }).trim();
    if (iso) {
      return new Date(iso);
    }
  } catch {
    // Not a git checkout — fall through to the build timestamp.
  }
  return new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://moadim.io",
      lastModified: pageLastModified(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
