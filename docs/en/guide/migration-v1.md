---
title: Upgrade to 1.0
description: Compatibility and validation steps for upgrading from ak-ui 0.2.x to 1.0.
---

# Upgrade to 1.0

This page covers the **1.0.0** stable release. Existing CSS, Token, Sass and depth export paths are unchanged. Compatibility checks cover 218 existing `.ak-*` classes and 63 foundational tokens.

## CSS and token consumers

Install an exact version to avoid changes as distribution tags move:

```bash
pnpm add @yunyoujun/ak-ui@1.0.0
```

Continue using the existing `style.css`, `tokens.css` or `scss` entry. No bulk class-name replacement is needed. Stable releases use npm's `latest` tag; production projects should pin the exact version.

```ts
import '@yunyoujun/ak-ui/tokens.css'
// Or full component styles: import '@yunyoujun/ak-ui/style.css'
```

The token-only entry still contains namespaced variables without element resets. Internal Sass partials are not stable import paths; use the public Sass entry.

## Vue Registry consumers

Update the CSS package, then compare each Vue source file already copied into your project. Do not overwrite customized components directly. Registry entries now point to the stable package version. Coordinate public site deployment with package publication so the site does not reference an unpublished version.

Behavior refinements in 1.0 include:

- Input Number handles NaN/Infinity, inverted bounds and decimal stepping deterministically.
- Progress/Gauge prevent nonfinite values from reaching CSS and ARIA; inverted ranges collapse to their lower bound.
- Tabs fall back to the first item when the selected item is removed or unmatched, and Tab can enter the panel. Segmented adds group semantics.
- Depth cancels queued animation on pointer leave, responds to reduced-motion changes and stops responding after destruction.

Normal valid inputs and existing component interfaces remain unchanged. Code depending on exceptional inputs or movement after destruction should follow the [Registry API](/en/registry/api).

## Validation and rollback

Check light and dark surfaces, layouts, keyboard focus, Dialog/Popover, forms and reduced motion in your own pages. Automation covers Chromium, Firefox and Playwright WebKit; WebKit checks are not Safari application or physical iOS device tests.

To roll back, pin the CSS package to `@yunyoujun/ak-ui@0.2.1` and restore the matching Registry source from your project's version control. Keep the previous lockfile and customized component diffs.

## A2UI

A2UI remains an independent documentation experiment. CSS and Vue Registry consumers do not need to install A2UI or change their project structure. The experimental protocol, catalog and demo code are outside the stable 1.x API.
