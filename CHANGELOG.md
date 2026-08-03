# Changelog

## Unreleased

## 0.2.1 — 2026-08-03

### Added

- Added reusable terminal dashboard, command, counter, sanity, and Loading Core variants.
- Added a complete main-terminal showcase, standalone Loading demo, and generated original terminal artwork.
- Added framework-neutral dashboard depth control with an optional Vue lifecycle adapter.

### Changed

- Reworked the documentation homepage and showcase around the shared CSS Core implementation.
- Separated the main-terminal and Loading examples so both reuse one canonical source without duplicating styles.
- Migrated project configuration to pnpm 11 and refreshed visual regression baselines.

## 0.2.0 — 2026-08-03

### Added

- Added native Text Input, Textarea, Checkbox, Radio, Switch, and Select Core modules.
- Added a native `<dialog>` module with top-layer, backdrop, and reduced-motion styling.
- Added Popover API-based Popover and Tooltip modules with CSS Anchor Positioning enhancement and a centered fallback.
- Added browser interaction coverage for form state, dialog lifecycle, and popover visibility.

### Changed

- Added tag-driven npm Trusted Publishing with OIDC and automatic provenance.
- Made Registry installation verification resolve unreleased package versions from the local workspace.
- Refined the Core color and typography specimens, spacing rhythm, and mobile palette layout.
- Made Vue Registry adapters reuse CSS Core styles instead of shipping duplicate component styles.
- Documented CSS Core as the product surface and Vue Registry as an optional interaction adapter layer.

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
