# 1.0 compatibility and migration

**1.0.0-rc.1** is a release candidate for evaluation before stable 1.0. It preserves the existing CSS, Token, Sass and depth exports.

## Stable 1.x interfaces

- Public package export paths and their purposes.
- Documented `.ak-*` classes and required HTML structure: 218 existing names have a compatibility baseline.
- The 63 foundational `--ak-*` tokens and documented component variables.
- The depth controller's public methods, options and cleanup behavior.
- Published Vue Registry entry names and documented props, slots and events.

Removing or renaming these interfaces requires a major version. Backward-compatible additions use minor versions; fixes use patch versions. Visual corrections can change pixels and should be called out in release notes.

Internal Sass partials, documentation layout, examples, skill wording and the A2UI experiment are outside this API contract.

## Upgrade from 0.2.x

```sh
pnpm add @yunyoujun/ak-ui@1.0.0-rc.1
```

Keep existing imports and class names. Compare copied Registry source instead of overwriting customized components. This candidate normalizes nonfinite numeric values and inverted ranges, improves decimal stepping and tab fallback, and fixes queued depth motion and reduced-motion cleanup.

Test your application's light/dark surfaces, labels, keyboard navigation, overlays and reduced-motion behavior. To roll back, pin `@yunyoujun/ak-ui@0.2.1` and restore your previous Registry source and lockfile.

## Validation and release

Local checks cover package installation and Sass compilation, SSR-safe depth import, Vue consumer types, API baselines, dependency audit and Chromium/Firefox/Playwright WebKit. WebKit is not a real iOS or Safari application test. The library does not claim full WCAG certification.

RC publication uses npm's `next` tag, leaving stable `latest` unchanged. The release workflow requires successful CI for the same commit. Coordinate public Registry deployment with npm availability, and collect real-project feedback before stable 1.0.

See the detailed [release checklist (中文)](/guide/stability) and [migration notes (中文)](/guide/migration-v1).
