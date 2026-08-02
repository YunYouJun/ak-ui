# Changelog

## Unreleased

### Changed

- Added tag-driven npm Trusted Publishing with OIDC and automatic provenance.
- Made Registry installation verification resolve unreleased package versions from the local workspace.

## 0.1.0-beta.0 — 2026-08-02

### Added

- Rebuilt the documentation as a custom AK-themed VitePress showcase.
- Added framework-independent HTML examples with live preview and source display.
- Added a shadcn-vue-compatible registry for seven Vue component modules.
- Added status, progress, gauge, notice, tabs, and segmented-control primitives.
- Added Playwright visual regression coverage and downloadable component captures.

### Changed

- Exposed compiled CSS and Sass entry points through package exports.
- Moved production hosting to Cloudflare Pages while retaining `gh-pages` as a fallback.
- Limited GitHub Actions to linting, building, registry verification, and visual testing.

### Fixed

- Corrected light-theme form contrast, homepage color coordination, and divider alignment.
- Kept generated visual captures out of Git history except for the two regression baselines.
