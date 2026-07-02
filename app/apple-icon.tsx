import { ImageResponse } from "next/og";

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
          background: "#0a0a0a",
          border: "12px solid #ffd400",
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 800,
            lineHeight: 1,
            color: "#ffd400",
          }}
        >
          M
        </div>
      </div>
    ),
    size,
  );
}
