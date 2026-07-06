---
"landing": patch
---

Pin the `crate-ci/typos` GitHub Action in `ci.yml`'s spell-check job to a commit SHA (`bee27e3a4fd1ea2111cf90ab89cd076c870fce14`, `v1.48.0`) instead of the floating `v1.48.0` tag. Every other third-party action across the workflows was already SHA-pinned to close this exact supply-chain tampering vector (#342, #350) — this one was missed.
