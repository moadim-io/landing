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
  },
});
