import { ImageResponse } from "next/og";

// Branded favicon, generated at build time (compatible with `output: export`).
//
// `app/favicon.ico` cannot be generated from code (Next.js only supports a
// literal `.ico` file for that exact convention), so this repo shipped with
// the default create-next-app scaffold icon — the Next.js logo, not Moadim's
// mark — since the initial commit. Using the `icon` file convention instead
// lets the favicon reuse the same neobrutalist palette as the rest of the
// site (`--foreground` background, `--accent` glyph) via `next/og`, the same
// mechanism already used for `opengraph-image.tsx` / `twitter-image.tsx`.
export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#ffd400",
          fontSize: 24,
          fontWeight: 700,
        }}
      >
        M
      </div>
    ),
    size,
  );
}
