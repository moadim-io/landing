import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // A static export (`output: "export"`) cannot run Next.js's on-demand Image
  // Optimization API, which needs a server. Without this opt-out the build hard
  // -fails the moment the first `next/image` is added. Disabling optimization
  // makes `next/image` emit a plain, un-optimized `<img>` — the correct mode for
  // a fully static site. See node_modules/next/dist/docs/01-app/02-guides/static-exports.md.
  images: { unoptimized: true },
};

export default nextConfig;
