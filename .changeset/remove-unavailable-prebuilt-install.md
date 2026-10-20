---
"landing": patch
---

Stop advertising `cargo binstall moadim` and `npm install -g moadim` on the home page: npm has no moadim package yet and daemon releases carry no binstall archives, so both commands fail or fall back to a source build. `cargo install --locked moadim` stays the install command.
