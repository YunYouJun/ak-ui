---
title: Vue Registry API
description: Public Vue component props, slots, models and boundary behavior in 1.x.
---

# Vue Registry API

The Registry provides copyable source for Vue 3.5+. The tables below describe the public 1.x interfaces. Component roots continue forwarding native attributes and events, such as a button's `disabled`, `type` and `@click`. Components share CSS Core without duplicating styles.

## Basic components

| Component | Props (defaults) | Slots |
| --- | --- | --- |
| `AkButton` | `block: boolean` (false); `variant` (default): default / outline / action / advanced / light | default, icon |
| `AkCard` | `as: string` (div); `variant` (default): default / outline / stripe / place | default |
| `AkCardHeader`, `AkCardContent`, `AkCardFooter` | No dedicated props | default |
| `AkCardTitle`, `AkCardDescription` | No dedicated props | default |
| `AkTag` | `variant` (default): default / advanced / danger / neutral | default |
| `AkStatus` | `label: string` (Online); `detail: string` (empty); `variant` (default): default / warning / critical / offline | label, default (detail) |
| `AkNotice` | `code` (RI / INFO), `title` (empty); `variant` (info): info / warning / danger / success; `role`: alert / status | code, title, default (body) |

When `role` is omitted, `AkNotice` uses alert for danger and status otherwise. Consumers should decide whether decorative or continuously displayed content needs a live region.

## Numeric components

`AkInputNumber` uses `v-model<number>` (default 0) and emits values through `update:modelValue`.

| Prop | Default |
| --- | --- |
| `min` / `max` / `step` | 0 / 99 / 1 |
| `disabled` | false |
| `label` | 数值 (Value) |
| `minLabel` / `maxLabel` | 最少 / 最多 (Minimum / Maximum) |

The default labels above are Chinese literals in the component. Pass translated labels for an English product.

Negative steps use their absolute value; zero or nonfinite steps fall back to 1. Values are clamped to the valid range; nonfinite models fall back to the lower bound. Nonfinite min/max values use default bounds; when max is below min, the range collapses to min. Decimal stepping removes common floating-point tails with up to 12 decimal places; it is not arbitrary-precision arithmetic. Disabling the component disables every internal control.

| Component | Props (defaults) | Slots |
| --- | --- | --- |
| `AkProgress` | `min` (0), `max` (100), `value` (0), `label` (Progress), `valueLabel` (empty); `variant` (default): default / warning / danger | label, value |
| `AkGauge` | `min` (0), `max` (100), `value` (0), `label` (Deploy), `unit` (percent); `variant` (default): default / warning | label, unit, default (value) |

Progress components are read-only. Normalization does not mutate parent data. Nonfinite values display the lower bound; invalid bounds use defaults, and inverted ranges collapse to min. A zero-length range has a percentage of 0. ARIA values use the same valid range.

## Navigation components

`AkTabs` requires `items: AkTabsItem[]`. `ariaLabel` defaults to Tabs; `v-model<string>` is optional. Items contain `value`, `label`, `title`, and optional `eyebrow` and `description`. The `panel-${value}` slot receives `{ item }`.

`AkSegmented` requires `options: AkSegmentedOption[]`. `ariaLabel` defaults to Options; `v-model<string>` is optional. Each option contains `value` and `label`. This is a button group using `aria-pressed` to express selection.

Values must be unique. When no model is supplied or the selected value is absent, the visual selection and keyboard entry fall back to the first item without changing the parent model. User activation emits `update:modelValue`. An empty list renders no options.

Tabs activate automatically: Left/Right, Home and End move focus and activate a tab; Tab can enter the visible panel. Hidden panels remain mounted to preserve content state.

## Depth controller

Import `createDashboardDepth(root, options?)` from `@yunyoujun/ak-ui/depth`. The root must be a DOM Element with a document/window. Options are `layerSelector` (`[data-depth]`), `maxX` (130), `maxY` (70) `respectReducedMotion` (true) and `pointerEnabled` (true). Numeric options should be finite.

With `pointerEnabled: false`, no pointer listeners are registered, allowing an external timeline to drive `render()`. Manual rendering still respects reduced motion.

The controller returns `render(clientX, clientY)`, `reset()` and `destroy()`. Reset cancels pending animation and returns offsets to zero. Destroy resets offsets, removes listeners and animation, and can be called repeatedly; a destroyed controller no longer moves elements. The default respects reduced motion and resets offsets when the preference becomes active. Set it to false to manage this yourself.

Vue's `useDashboardDepth(target, options?)` accepts `MaybeRefOrGetter<Element | null | undefined>`. It binds the target available at mount, cleans up on scope disposal and returns `{ reset }`. The target should exist at mount; subsequent DOM replacements are not tracked.
