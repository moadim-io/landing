import type { MetadataRoute } from "next";
import { description } from "./layout";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    // Keep in sync with the current positioning in `layout.tsx`'s `metadata`
    // export — this previously shipped the pre-rebrand "Cron jobs over MCP &
    // REST" tagline after the hero/OG/Twitter copy had already moved on.
    name: "Moadim — Put your agents on a loop",
    short_name: "Moadim",
    description,
    start_url: "/",
    display: "standalone",
    // Match the site's actual neobrutalist background (`--background` in
    // globals.css, also used as `viewport.themeColor` in layout.tsx) instead
    // of an unrelated off-white that never appears anywhere else on the site.
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
