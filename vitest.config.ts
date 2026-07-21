import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // `next/font/google` is a Next.js build-time loader, not a runtime
      // module — it throws when imported outside `next build`/`next dev`.
      // Swap in a lightweight stub so files that load Geist fonts (e.g.
      // `app/layout.tsx`) can be imported in tests. See the mock file for
      // details.
      "next/font/google": fileURLToPath(
        new URL("./test/mocks/next-font-google.ts", import.meta.url),
      ),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["node_modules", "out", ".next"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json-summary"],
      // Only measure app/ route & component source — the thing this is meant to
      // surface is an untested branch/file under app/. scripts/verify-export.mjs
      // is deliberately excluded: its own test (scripts/verify-export.test.ts)
      // runs it as a child process, which v8's coverage hook can't see into, so
      // instrumenting it here would just report a misleading 0%.
      include: ["app/**"],
      exclude: ["**/*.test.{ts,tsx}", "test/mocks/**", "**/*.config.{ts,mjs}"],
      // `test:coverage` measuring app/** is only a signal if something actually
      // fails when it drops — without thresholds this command has always exited
      // 0 regardless of what it reports, and CI never ran it in the first place
      // (see ci.yml), so a PR could ship a wholly untested file (as
      // app/version.json/route.ts did) with zero red-CI signal. Floors are set a
      // few points under this repo's current numbers (branches 66.6%, the rest
      // ~95-97%) — enough headroom that fixing that one gap or an incidental
      // dip doesn't flake the build, tight enough to fail on a real regression
      // (e.g. a new untested route or component).
      thresholds: {
        statements: 95,
        branches: 60,
        functions: 90,
        lines: 95,
      },
    },
  },
});
