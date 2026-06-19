import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Keep stray debug logging out of the shipped landing page.
      // console.warn/console.error remain allowed for intentional diagnostics.
      "no-console": ["error", { allow: ["warn", "error"] }],
      // Ban the `any` escape hatch so the codebase keeps real type safety.
      // `unknown` + narrowing (or a precise type) should be used instead.
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
]);

export default eslintConfig;
