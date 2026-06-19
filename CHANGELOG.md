# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- SoftwareApplication JSON-LD structured data so search engines can richly index the app (#9).
- Open Graph and Twitter social-share card for better link previews when the page is shared (#8).

### Changed

- Replaced the create-next-app boilerplate with a real Moadim hero so the landing page reflects the product (#4).
- Replaced the create-next-app boilerplate README with real project documentation (#10).
- Enabled the `no-console` lint rule to keep stray console statements out of the codebase (#6).

### Fixed

- Applied the loaded Geist Sans font to body text so typography renders as intended (#7).
- Shortened and front-loaded the shared meta description (was 189 chars, now 142) so it no longer truncates in search results and social previews; added a build-time length guard (≤160 chars) to keep it that way (#135).
