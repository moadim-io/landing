import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";

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
    // Type-aware linting needs the TypeScript program, which only covers
    // files matched by tsconfig.json's `include` (**/*.ts, **/*.tsx, ...).
    // Scope this block to those extensions so config/script files like this
    // one (eslint.config.mjs) aren't fed through the type checker.
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // An unawaited / un-`.catch()`ed promise silently swallows
      // rejections, hiding errors that should crash a build or surface a
      // bug. Require every promise to be awaited, returned, or explicitly
      // handled (`.catch()` / `void`).
      "@typescript-eslint/no-floating-promises": "error",
      // Passing an `async` function where a `void`-returning callback is
      // expected (event handlers, `Array.prototype.forEach`) drops its
      // returned promise on the floor, silently swallowing rejections the
      // same way. Force the call site to use a non-async callback or
      // handle the promise explicitly.
      "@typescript-eslint/no-misused-promises": "error",
      // Flag a `?.`/non-null-guard branch whose condition the type checker
      // already proves can't be nullish (or is always nullish). Such a
      // check reads as defensive code the type system disagrees with,
      // masking either a stale guard left over from a type change or a
      // wrong assumption about what can flow through. Only checkable with
      // type information, so it lives in this typed-linting block.
      "@typescript-eslint/no-unnecessary-condition": "error",
    },
  },
  {
    rules: {
      // eslint-config-next's core-web-vitals already registers the
      // jsx-a11y plugin but only wires a limited subset of its rules, some
      // at warn. Layer the full recommended ruleset's severities at error
      // (it already registers the plugin, so only pull in its `rules`) so
      // markup-level a11y mistakes fail `npm run lint` instead of landing
      // silently.
      ...jsxA11y.flatConfigs.recommended.rules,
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
      // Require strict equality (`===`/`!==`) instead of loose (`==`/`!=`),
      // which applies JavaScript's type-coercion rules and produces
      // surprising results (`0 == ""`, `[] == false`, `"1" == 1` all `true`).
      // `{ null: "ignore" }` keeps the idiomatic `x == null` nullish check
      // (matches both `null` and `undefined`) allowed.
      eqeqeq: ["error", "always", { null: "ignore" }],
      // Require type-only imports to use `import type`/`import { type X }`.
      // Without this, a symbol imported only for its type still emits as a
      // value import in the compiled output — pulling in a module purely
      // for an erased type instead of dropping the import entirely. See #16.
      // Auto-fixable via `eslint --fix`.
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
]);

export default eslintConfig;
