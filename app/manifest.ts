import type { MetadataRoute } from "next";

export const dynamic = "force-static";

/**
 * Web app manifest.
 *
 * Next.js serves this at `/manifest.webmanifest` and injects the
 * `<link rel="manifest">` tag automatically, giving the site an installable
 * PWA identity (name, icons, colors) for mobile "Add to Home Screen" and
 * search/installability metadata.
 *
 * `background_color` / `theme_color` track the brand `--background` token in
 * `app/globals.css` (and the `theme-color` viewport export in `app/layout.tsx`)
 * so the splash and chrome stay on-palette.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Moadim — Put your agents on a loop",
    short_name: "Moadim",
    description:
      "Moadim is an open-source loop engine for AI agents. Define a loop — a prompt, a schedule, an agent — and it runs on every tick.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f1e8",
    theme_color: "#f4f1e8",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
