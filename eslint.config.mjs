import { defineConfig, globalIgnores } from "eslint/config";
import recommendedIncremental from "eslint-config-agent/recommended-incremental";
import nextPlugin from "@next/eslint-plugin-next";
import jsxA11y from "eslint-plugin-jsx-a11y";

const eslintConfig = defineConfig([
  // eslint-config-agent/recommended-incremental: the shared config's gentlest
  // on-ramp for an existing codebase. It already covers the generic
  // TypeScript/React strictness this repo used to hand-roll (no-console,
  // prefer-const, object-shorthand, no-non-null-assertion, no-explicit-any,
  // eqeqeq, consistent-type-imports, ...) — the divisive rules pre-disabled
  // and everything else at warn, so adopting it doesn't turn today's
  // backlog into a blocking CI failure.
  // See https://github.com/tupe12334/eslint-config-agent.
  ...recommendedIncremental,
  // Next.js-specific rules, pulled from `@next/eslint-plugin-next` directly
  // rather than spreading all of `eslint-config-next`: the latter registers
  // its own copies of the `react`/`react-hooks`/`import` plugins, which
  // collide with the ones `eslint-config-agent` already registers.
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
  // eslint-config-agent doesn't bundle jsx-a11y, so layer its recommended
  // ruleset on top for markup-level accessibility checks.
  jsxA11y.flatConfigs.recommended,
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
      // eslint-config-agent/recommended-incremental doesn't cover these yet
      // (https://github.com/tupe12334/eslint-config-agent/issues/246), so
      // keep them as hard errors: an unawaited / un-`.catch()`ed promise
      // silently swallows rejections, hiding errors that should crash a
      // build or surface a bug.
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
