import type { MetadataRoute } from "next";

export const dynamic = "force-static";

/**
 * Web App Manifest (served at /manifest.webmanifest).
 *
 * Gives the site an installable identity and lets mobile browsers theme the
 * address bar / task switcher with the brand palette instead of a default
 * white. Colors mirror the design tokens in globals.css (`--background` /
 * `--accent`) so the manifest can't drift from the rendered page.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Moadim — Put your agents on a loop",
    short_name: "Moadim",
    description:
      "Moadim is an open-source loop engine for AI agents — a prompt, a schedule, an agent, run against your repo on every tick.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f1e8",
    theme_color: "#ffd400",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
