// Conventional Commits (https://www.conventionalcommits.org) message format,
// enforced in CI (see .github/workflows/ci.yml's "Commit lint" job). This is
// the machine-readable signal (`feat:`, `fix:`, `docs:`, …) an automated
// CHANGELOG generator would need to roll up history — see #181/#125.
const config = {
  extends: ["@commitlint/config-conventional"],
};

export default config;
