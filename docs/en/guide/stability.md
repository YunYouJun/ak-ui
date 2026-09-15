---
title: 1.0 stability and release checks
description: Stable interfaces, compatibility rules and the release checklist for ak-ui 1.0.
---

# 1.0 stability and release checks

ak-ui 1.0 aims to provide a CSS and design-token foundation suitable for long-term use. Its version expresses an interface compatibility commitment, not coverage of every framework, component or the full A2UI protocol. This page covers the **1.0.0** stable release.

## Stable 1.x interfaces

| Interface | Compatibility commitment |
| --- | --- |
| CSS, Token and Sass export paths in `package.json` | Preserve paths and purposes in 1.x; Sass supports the public entry, not direct imports of internal partials |
| Documented `.ak-*` classes and required HTML structure | Preserve names, purposes and state semantics; follow component docs rather than private example layouts |
| Every `--ak-*` token in `tokens.css` and documented component variables | Preserve names, value types and meanings; token-only adds no element resets or component rules |
| `@yunyoujun/ak-ui/depth` | Preserve declared functions, options, returned controllers and cleanup behavior |
| Published Vue Registry entries | Preserve entry names and documented props, slots and events; copied source is maintained by consumers and is not automatically overwritten |

Removing or renaming interfaces, changing variable types or meanings, or breaking documented structures requires a major release. Backward-compatible components and tokens use minor releases; bug, accessibility and contrast fixes use patch releases. Visual fixes can change pixels and should be described in release notes; screenshots are not guaranteed to remain identical.

The Skill retains its public installation entry, but its prompts and guidance evolve; identical model output is not guaranteed. The documentation theme, demo assets, internal scripts and [A2UI experiment](/en/guide/a2ui) are outside this contract. A2UI's protocol/catalog are versioned independently, so experimental changes do not require CSS Core 2.0.

## Browser and accessibility boundaries

Build targets follow the repository's Browserslist configuration. Automation covers Chromium, Firefox and Playwright WebKit, including desktop/mobile layouts, native Dialog and Popover, focus and keyboard behavior. Only Chromium compares homepage pixel baselines. WebKit engine testing is not equivalent to testing the Safari application, physical iOS devices or every OS version. IE is unsupported. CSS Anchor Positioning is progressive enhancement with a centered fallback.

CSS provides visual states; native elements, Registry adapters or the consumer's headless primitives provide semantics and behavior. Version 1.0 does not claim whole-library WCAG certification. Consumers must retain labels, visible focus, disabled states, reduced motion and usable target sizes.

## Release checklist

- [x] Define stable interfaces, baseline 218 CSS classes, 63 tokens, export paths and Registry entries, and verify documented variables.
- [x] Run the full `pnpm test`: dependency audit, docs build, token contract, npm consumption, Registry, A2UI and Linux visual regression checks pass.
- [x] Include cross-engine page and keyboard checks in continuous testing; add device acceptance checks if a consumer targets physical iOS devices.
- [x] Add real tarball installation, Sass compilation, export consumption and installed Registry type checks; collect real project feedback through the RC.
- [x] Review brand icons and light/dark surfaces; fix homepage pixel baselines to Linux fallback fonts to prevent network-font line-wrap drift.
- [x] Synchronize the package and Registry's pinned dependency to 1.0.0.
- [x] Update Chinese/English READMEs, CHANGELOG, Registry API and the [0.2.x → 1.0 migration guide](/en/guide/migration-v1).
- [ ] Merge final changes into master and verify remote CI has passed for the exact commit to be tagged.
- [ ] Confirm the stable release and create its tag; let the existing workflow perform npm Trusted Publishing and create the GitHub Release.

Stable 1.0.0 uses npm's `latest` tag; `next` is reserved for prereleases. Coordinate the public Registry and npm publication: **do not deploy a candidate Registry to production and leave it waiting for the package release**. The site deploys from master. Before merging, schedule a deployment pause/release window, or retain candidate docs on a preview site; enable the corresponding Registry once the package is published. These instructions do not automatically change external deployment settings.

## Automated verification scope

`typecheck` checks Vue Registry, boundary fixtures and the A2UI Vue layer. `tokens:verify` checks token-only isolation and 63 tokens. `api:verify` checks 218 classes, exports, Registry versions and documented variables. `runtime:verify` checks the depth lifecycle. `package:verify` tests real tarball exports, Sass, SSR import and zero runtime dependencies. `registry:verify` tests installation and types in an independent consumer. A2UI tests cover the local simulation, not real agent/network integration.

## Candidate acceptance record

On 2026-09-06, the full `pnpm test` passed: the dependency audit found no known vulnerabilities, and style checks, Vue/documentation theme types, docs build, 63 tokens, 218 classes, package exports and real tarball consumption, 8 Registry entries and installation of 16 adapter source files passed. Two depth tests and three A2UI tests passed. The pinned Playwright 1.62.1 Linux environment passed 87 Chromium, Firefox and WebKit browser tests, including 15 covering Chinese/English, light/dark appearance, language switching and 404 recovery.

Homepage pixel comparisons use local fallback fonts in the fixed Linux image without relying on Google Fonts availability. Desktop and mobile baselines were updated after three identical captures each. The site retains its network font configuration, and other interaction tests do not intercept fonts. This is a local candidate acceptance record, not a substitute for final-commit remote CI or real consumer feedback.

At that acceptance point, 2,384 local links, assets and anchors across 50 built HTML pages passed verification. New pages on the Cloudflare preview returned 200; missing Chinese/English URLs returned 404 with localized recovery links. English documentation then covered the homepage and core onboarding, while detailed component and API references remained in Chinese.


## Upgrading

See [Upgrade to 1.0](./migration-v1) for the migration checklist.
