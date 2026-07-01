import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Static social-share card, generated at build time (compatible with `output: export`).
export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Moadim — Put your agents on a loop";

// Read the vendored Geist TTFs from the `geist` package rather than fetching
// them over the network, so `next build` stays offline-safe under
// `output: export`. Satori (the renderer behind `ImageResponse`) only
// accepts TTF/OTF/WOFF, not WOFF2, hence the `.ttf` files here.
const geistFontsDir = join(
  process.cwd(),
  "node_modules/geist/dist/fonts/geist-sans",
);
const geistBold = readFileSync(join(geistFontsDir, "Geist-Bold.ttf"));
const geistMedium = readFileSync(join(geistFontsDir, "Geist-Medium.ttf"));
const geistRegular = readFileSync(join(geistFontsDir, "Geist-Regular.ttf"));

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
          padding: "80px",
          background: "#0a0a0a",
          color: "#ededed",
        }}
      >
        <div
          style={{
            fontSize: 128,
            fontWeight: 700,
            letterSpacing: "-0.04em",
          }}
        >
          Moadim
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 48,
            fontWeight: 500,
            color: "#a1a1aa",
          }}
        >
          Put your agents on a loop
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 30,
            fontWeight: 400,
            color: "#71717a",
          }}
        >
          Open-source loop engine for AI agents
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: geistBold, weight: 700, style: "normal" },
        { name: "Geist", data: geistMedium, weight: 500, style: "normal" },
        { name: "Geist", data: geistRegular, weight: 400, style: "normal" },
      ],
    },
  );
}
