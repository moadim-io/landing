import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SATORI_ACCENT as ACCENT, SATORI_FOREGROUND as FOREGROUND } from "./brand-colors";

// `next/font` (used by the rest of the site, see layout.tsx) doesn't reach a metadata
// route's `ImageResponse` — Satori needs raw font bytes handed to it directly, so without
// this the icon rendered in Satori's built-in fallback (Noto Sans), not the site's brand
// font, unlike opengraph-image.tsx's identical Satori setup which already vendors this.
const geistBold = readFileSync(join(process.cwd(), "app/fonts/geist-bold.ttf"));

// Apple touch icon for iOS "Add to Home Screen", Safari bookmarks, and the
// link-preview tools that request `apple-touch-icon`. Generated at build time
// (compatible with `output: export`). 180x180 is the modern recommended size;
// iOS scales it down and rounds the corners itself, so we ship a full-bleed
// square with its own background (iOS adds none).
export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // Site palette: black field, accent-yellow mark — matches the
          // neobrutalist favicon (app/icon.svg) and the OG card.
          background: FOREGROUND,
          border: `12px solid ${ACCENT}`,
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 800,
            lineHeight: 1,
            color: ACCENT,
            fontFamily: "Geist",
          }}
        >
          M
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Geist", data: geistBold, weight: 800, style: "normal" }] },
  );
}
