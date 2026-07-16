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
    },
  },
});
