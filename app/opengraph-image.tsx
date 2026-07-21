import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import {
  SATORI_ACCENT as ACCENT,
  SATORI_BACKGROUND as BACKGROUND,
  SATORI_FOREGROUND as FOREGROUND,
} from "./brand-colors";
import { SITE_TITLE } from "./site";

// `next/font` (used by the rest of the site, see layout.tsx) doesn't reach a metadata
// route's `ImageResponse` — Satori needs raw font bytes handed to it directly, so without
// this the card rendered in Satori's built-in fallback (Noto Sans), not the site's brand
// font. Vendored as a static Bold TTF (app/fonts/GEIST-OFL.txt has the SIL Open Font
// License) rather than fetched from Google Fonts at build time, so this route has no
// network dependency and works offline. A variable-font instance failed to rasterize here
// (Satori couldn't parse its glyph tables), so this is the static weight closest to the
// card's 700/800 text instead.
const geistBold = readFileSync(join(process.cwd(), "app/fonts/geist-bold.ttf"));

// Static social-share card, generated at build time (compatible with `output: export`).
export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Twitter/X's card (twitter-image.tsx) re-exports this alt as-is, so a rebrand only
// needs to change SITE_TITLE once. See site.ts's SITE_TITLE doc comment for the same
// single-source rationale applied to layout.tsx and manifest.ts.
export const alt = SITE_TITLE;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 36,
          padding: "96px",
          background: BACKGROUND,
          color: FOREGROUND,
          // Thick black frame — the neobrutalist border applied to the whole card.
          border: `16px solid ${FOREGROUND}`,
          fontFamily: "Geist",
        }}
      >
        {/* Eyebrow tag: accent fill, hard offset shadow, uppercase — mirrors the hero pill. */}
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            background: ACCENT,
            border: `4px solid ${FOREGROUND}`,
            boxShadow: `8px 8px 0 0 ${FOREGROUND}`,
            padding: "10px 22px",
            fontSize: 30,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
          }}
        >
          Open-source loop engine
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 150,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
          }}
        >
          Moadim
        </div>
        {/* Tagline with "agents" highlighted in accent, mirroring the hero <h1>. */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 56,
            fontWeight: 700,
          }}
        >
          <span>Put your&nbsp;</span>
          <span style={{ background: ACCENT, padding: "0 10px" }}>agents</span>
          <span>&nbsp;on a loop</span>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Geist", data: geistBold, weight: 700, style: "normal" }] },
  );
}
