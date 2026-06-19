import type { MetadataRoute } from "next";
import { SITE_URL } from "./site";

export const dynamic = "force-static";

// Stamped once at build time (the export is static, so this is the moment the
// site was generated/deployed) instead of a hardcoded literal that silently
// goes stale and misreports freshness to crawlers.
const LAST_MODIFIED = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
