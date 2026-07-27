import { defineConfig, globalIgnores } from "eslint/config";
import recommendedIncremental from "eslint-config-agent/recommended-incremental";
import nextPlugin from "@next/eslint-plugin-next";
import jsxA11y from "eslint-plugin-jsx-a11y";

const eslintConfig = defineConfig([
  // eslint-config-agent/recommended-incremental: the divisive strict-mode
  // rules disabled, everything else at warn. See moadim-io/landing#367 — this
  // replaces the hand-rolled no-console/eqeqeq/prefer-const/etc. block below,
  // which duplicated exactly what this shared config already centralizes.
  ...recommendedIncremental,
  // @next/eslint-plugin-next directly, rather than spreading all of
  // eslint-config-next: eslint-config-next's base config registers its own
  // copies of the `react`/`react-hooks`/`import` plugins, which collide with
  // the ones eslint-config-agent already registers under the same names.
  nextPlugin.configs["core-web-vitals"],
  // eslint-config-agent doesn't bundle jsx-a11y; layer its recommended rules
  // in directly.
  jsxA11y.flatConfigs.recommended,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // `npm run test:coverage`'s Istanbul HTML report (gitignored, see
    // .gitignore's `/coverage`) — ESLint's flat config doesn't read
    // .gitignore on its own, so without this, running test:coverage before
    // lint makes `npm run lint` fail on the report's own generated
    // block-navigation.js/sorter.js/prettify.js ("Unused eslint-disable
    // directive" etc.) instead of only ever linting this repo's source.
    "coverage/**",
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
      // eslint-config-agent/recommended-incremental doesn't cover these two
      // yet (tupe12334/eslint-config-agent#246), so keep them as hard errors
      // here. An unawaited / un-`.catch()`ed promise silently swallows
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
    },
  },
]);

export default eslintConfig;
