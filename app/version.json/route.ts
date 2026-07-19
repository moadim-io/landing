import { NextResponse } from "next/server";

// Exposes the commit that produced this build so a human or an automated
// smoke check (see #153) can confirm which commit is actually live at
// https://moadim.io, instead of guessing from a wrangler upload's exit code
// or a <head> diff (#230). `deploy.yml` sets these from GITHUB_SHA /
// GITHUB_REF_NAME; a local `npm run build` falls back to "dev" for both.
export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({
    commit: process.env.NEXT_PUBLIC_BUILD_COMMIT ?? "dev",
    ref: process.env.NEXT_PUBLIC_BUILD_REF ?? "dev",
    builtAt: process.env.NEXT_PUBLIC_BUILD_TIME ?? "dev",
  });
}
