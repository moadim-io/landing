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
      // Prefer `const` for bindings that are never reassigned: it signals
      // intent, enables immutability-by-default, and turns any accidental
      // future reassignment into a compile-time error.
      "prefer-const": "error",
      // Require ES6 shorthand for object properties and methods
      // (`{ foo }` over `{ foo: foo }`, `{ fn() {} }` over `{ fn: function () {} }`).
      // Shorthand is more concise, avoids accidental name/value drift, and keeps
      // object literals consistent across the codebase.
      "object-shorthand": ["error", "always"],
    },
  },
]);

export default eslintConfig;
