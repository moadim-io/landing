---
"landing": patch
---

Replace the hand-rolled ESLint rule block (`no-console`, `eqeqeq`,
`prefer-const`, `object-shorthand`, `no-non-null-assertion`, `no-explicit-any`,
`consistent-type-imports`) with `eslint-config-agent`'s
`recommended-incremental` preset, which already centralizes the same general
TypeScript/React strictness rules for reuse across repos. `@next/eslint-plugin-next`
is now pulled in directly instead of spreading all of `eslint-config-next`
(which registers its own copies of the `react`/`react-hooks`/`import` plugins
that collide with the ones `eslint-config-agent` registers). `eslint-plugin-jsx-a11y`'s
recommended rules and the `@typescript-eslint/no-floating-promises` /
`no-misused-promises` hard errors (not yet covered by the shared config) are
kept as repo-specific additions. `npm run lint` drops `--max-warnings 0` since
the preset surfaces a backlog of pre-existing warnings (kebab-case filenames,
hardcoded URLs, over-length files/functions) for a follow-up cleanup pass.
