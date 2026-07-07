import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // `geist/font/sans` / `geist/font/mono` wrap `next/font/local`, a
      // Next.js build-time loader that isn't a plain JS module and throws
      // when imported outside `next build`/`next dev`. Swap in a lightweight
      // stub so files that load Geist fonts (e.g. `app/layout.tsx`) can be
      // imported in tests. See the mock file for details.
      "geist/font/sans": fileURLToPath(
        new URL("./test/mocks/geist-font.ts", import.meta.url),
      ),
      "geist/font/mono": fileURLToPath(
        new URL("./test/mocks/geist-font.ts", import.meta.url),
      ),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["node_modules", "out", ".next"],
  },
});
