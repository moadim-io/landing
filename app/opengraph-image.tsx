import { ImageResponse } from "next/og";

// Static social-share card, generated at build time (compatible with `output: export`).
export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Moadim — Put your agents on a loop";

export default function OpenGraphImage() {
  return new ImageResponse(
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
          color: "#71717a",
        }}
      >
        Open-source loop engine for AI agents
      </div>
    </div>,
    size,
  );
}
