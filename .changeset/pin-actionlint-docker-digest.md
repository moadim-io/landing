---
"landing": patch
---

Pin the `rhysd/actionlint` Docker Action in `actionlint.yml` to its image digest (`sha256:b1934ee5f1c509618f2508e6eb47ee0d3520686341fec936f3b79331f9315667`, `1.7.12`) instead of the floating `1.7.12` tag. Every other third-party action across the workflows was already pinned to a commit SHA (or, for this one, an image digest) to close the same supply-chain tampering vector — this Docker-based action was missed when the gate was added in #313.
