import { execFileSync } from "node:child_process";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// Resolved once at build time (static export). Derive <lastmod> from the last
// git commit that touched the page content so it tracks real changes instead
// of a frozen literal. Falls back to build time when git history is
// unavailable (e.g. a shallow or exported tree without .git).
function lastContentChange(): Date {
  try {
    const iso = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", "app/page.tsx"],
      { encoding: "utf8" },
    ).trim();
    if (iso) {
      return new Date(iso);
    }
  } catch {
    // git not available — fall through to build time
  }
  return new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://moadim.io",
      lastModified: lastContentChange(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
