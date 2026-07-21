---
"landing": patch
---

Fix `public/llms.txt` claiming a single install command "registers a launchd/systemd service so they survive logout and reboot." Installing the crate only puts the binary on PATH — reboot persistence needs the separate `moadim install` step, as already corrected on the page itself (#238). Added a regression test guarding the corrected wording.
