---
"landing": patch
---

Bump `@testing-library/jest-dom` from `^6.9.1` to `^7.0.0`. Dev-only test-matcher dependency (`toHaveAttribute`, `toHaveClass`, `toBeInTheDocument`, used throughout `app/**/*.test.tsx`) — the installed `@testing-library/dom@10.4.1` still satisfies 7.0.0's `>=10 <11` peer range, and `npm run test` (126/126) passes unchanged.
