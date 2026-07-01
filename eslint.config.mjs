import { defineConfig, globalIgnores } from "eslint/config";
import nextPlugin from "@next/eslint-plugin-next";
import jsxA11y from "eslint-plugin-jsx-a11y";
import agentRecommendedIncremental from "eslint-config-agent/recommended-incremental";

// Next.js-specific rules (no-img-element, no-html-link-for-pages, Core Web
// Vitals, …). Pull the `@next/next` plugin in directly instead of spreading
// `eslint-config-next`, because that preset also bundles its own copy of the
// `react` plugin and ESLint's flat config forbids two configs registering the
// same plugin key — `eslint-config-agent` already provides `react`.
const nextRules = {
  name: "next/core-web-vitals",
  plugins: { "@next/next": nextPlugin },
  rules: {
    ...nextPlugin.configs.recommended.rules,
    ...nextPlugin.configs["core-web-vitals"].rules,
  },
};

const eslintConfig = defineConfig([
  ...agentRecommendedIncremental,
  nextRules,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // eslint-config-agent does not yet ship these two (tracked upstream as
      // https://github.com/tupe12334/eslint-config-agent/issues/246). An
      // unawaited / un-`.catch()`ed promise silently swallows rejections, and
      // an async callback passed where a void-returning one is expected
      // (event handlers, `Array.prototype.forEach`) drops its promise the
      // same way — both were enforced in this repo's old hand-rolled config
      // and are kept here until the shared config covers them.
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
    },
  },
  {
    // eslint-config-agent doesn't bundle eslint-plugin-jsx-a11y, and unlike
    // eslint-config-next it never registers the plugin either — so it must
    // be registered here, not just have its rules spread in.
    plugins: { "jsx-a11y": jsxA11y },
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
    },
  },
]);

export default eslintConfig;
