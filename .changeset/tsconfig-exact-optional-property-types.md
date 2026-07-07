---
"landing": patch
---

Enable `exactOptionalPropertyTypes` in `tsconfig.json`. Without it, TypeScript treats an optional property (`foo?: string`) as if it were `foo?: string | undefined`, silently allowing `{ foo: undefined }` to satisfy it — masking the real difference between "not provided" and "explicitly set to undefined" (which matters for things like React props and metadata objects with optional fields). The codebase already type-checks clean under the stricter rule, so this locks in that state with no code changes.
