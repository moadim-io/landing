import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Moadim — Cron jobs over MCP & REST",
    short_name: "Moadim",
    description:
      "Moadim is an open-source MCP and REST server for scheduling and managing cron jobs — built for AI agents and developers.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafafa",
    theme_color: "#fafafa",
    icons: [
      // `app/favicon.ico` was replaced by `app/icon.svg` (#161) — Next serves
      // the icon route at `/icon.svg`, not `/favicon.ico`, so this manifest
      // has been pointing PWA installers (Android "Add to Home Screen",
      // Chrome install prompts) at a file that no longer exists in the
      // static export. Point at the icon Next actually emits instead.
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
