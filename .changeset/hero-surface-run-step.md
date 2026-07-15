---
"landing": patch
---

Surface the `moadim` run step in the hero install card (#206). `cargo install --locked moadim` only compiles and installs the binary — nothing starts until `moadim` itself is run, so the page's primary CTA left visitors installed but with no daemon running and no UI at `http://localhost:5784/`. The card now shows both commands, matching the daemon README's install-then-run onboarding.
