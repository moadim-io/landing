import type { MetadataRoute } from "next";
import { SITE_TITLE, SITE_DESCRIPTION } from "./site";
import { SATORI_BACKGROUND } from "./brand-colors";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_TITLE,
    short_name: "Moadim",
    description: SITE_DESCRIPTION,
    id: "/",
    start_url: "/",
    display: "standalone",
    background_color: SATORI_BACKGROUND,
    theme_color: SATORI_BACKGROUND,
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      // Android adaptive icons need an explicit maskable entry; the existing
      // centered SVG glyph stays inside the maskable safe zone, so the same
      // asset can be reused instead of adding a second padded icon.
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
