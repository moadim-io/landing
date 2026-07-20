import type { MetadataRoute } from "next";
import { SITE_TITLE, SITE_DESCRIPTION } from "./site";
import { SATORI_BACKGROUND } from "./brand-colors";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_TITLE,
    short_name: "Moadim",
    description: SITE_DESCRIPTION,
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
      // Android's adaptive-icon system crops whatever it's given into a
      // device-specific shape (circle, squircle, rounded square, ...) unless
      // the manifest offers a `purpose: "maskable"` icon, in which case it
      // trusts that icon was designed for cropping instead of padding it
      // onto a plain system-color backdrop. `app/icon.svg`'s "M" glyph sits
      // well inside the maskable safe zone (the centered 80%-diameter circle
      // spec'd at https://www.w3.org/TR/appmanifest/#icon-masks): its path
      // bounding box is x:[7,25] y:[9,24] against a 32x32 viewBox, safe zone
      // x:[3.2,28.8] y:[3.2,28.8] — so the same file can serve both
      // purposes without a second, padded asset. Only the 1px-inset
      // background/border (not "important content" the mask must preserve)
      // gets clipped, which is exactly what a maskable icon expects.
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
