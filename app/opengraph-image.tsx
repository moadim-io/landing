import { ImageResponse } from "next/og";
import {
  SATORI_ACCENT as ACCENT,
  SATORI_BACKGROUND as BACKGROUND,
  SATORI_FOREGROUND as FOREGROUND,
} from "./brand-colors";

// Static social-share card, generated at build time (compatible with `output: export`).
export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Moadim — Put your agents on a loop";

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
          fontFamily: "sans-serif",
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
    size,
  );
}
