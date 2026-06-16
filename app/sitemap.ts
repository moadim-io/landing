import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://moadim.io",
      lastModified: new Date("2026-06-15"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
