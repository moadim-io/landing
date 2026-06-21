import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // `output: "export"` does not auto-disable Next.js's default Image
  // Optimization loader, so the first `next/image` render hard-fails
  // `next build`. Opt out so static export tolerates `next/image`.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
