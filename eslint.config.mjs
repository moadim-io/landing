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
      // Forbid the non-null assertion operator (`foo!.bar`). It silently
      // overrides the type checker's null/undefined safety, so a value the
      // compiler believes is present can still be null at runtime, causing a
      // "cannot read properties of null" crash. Force an explicit guard
      // (early return, optional chaining, or narrowing) instead.
      "@typescript-eslint/no-non-null-assertion": "error",
      // Forbid explicit `any` type annotations, casts, and generics. `any`
      // opts a value out of type-checking entirely — property access, calls,
      // and assignments on it are never verified, and the unsafety silently
      // spreads to everything it touches. Use `unknown` + narrowing, or a
      // precise type, at boundaries instead.
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
]);

export default eslintConfig;
