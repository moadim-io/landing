import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Static export ships no image-optimization server, so next/image must run
  // with the unoptimized loader. Without this, the first <Image> added to the
  // site hard-fails `next build`. Set it explicitly so the config matches the
  // documented behavior (see AGENTS.md) and imagery can be added safely.
  images: { unoptimized: true },
};

export default nextConfig;
