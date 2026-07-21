import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Emit directory-style routes (`out/<route>/index.html`) so static hosts like
  // Cloudflare Pages resolve clean, trailing-slash URLs consistently and don't
  // 404 on `/route` vs `/route.html` mismatches as pages are added.
  trailingSlash: true,
  images: {
    // `output: "export"` has no server to run the Image Optimization API at
    // request time. `next build` only catches the mismatch the moment a page
    // first imports `next/image` (there are none today) — set this now so
    // that day is a no-op instead of a build-breaking surprise. See #218.
    unoptimized: true,
  },
};

export default nextConfig;
