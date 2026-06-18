import type { MetadataRoute } from "next";

// Static web app manifest, emitted at build time as `manifest.webmanifest`
// (compatible with `output: "export"`). Next.js auto-injects the matching
// `<link rel="manifest">` into every page, so no layout change is needed.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Moadim — Cron jobs over MCP & REST",
    short_name: "Moadim",
    description:
      "Moadim is an open-source MCP and REST server for scheduling and managing cron jobs — built for AI agents and developers.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
