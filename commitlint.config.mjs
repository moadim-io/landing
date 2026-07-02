// Conventional Commits enforcement. Local hooks can be bypassed, so the CI job
// in .github/workflows/commitlint.yml is the enforcement of record; this config
// is shared by both that job and any local commit-msg hook a contributor wires up.
const config = {
  extends: ["@commitlint/config-conventional"],
};

export default config;
