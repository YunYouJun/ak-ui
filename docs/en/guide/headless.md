---
title: Adapting headless components
description: Apply ak-ui styling while preserving headless behavior and accessibility.
---

<!--@include: ../../../skills/ak-ui/references/headless-components.md-->


## Interfaces and naming

ak-ui treats CSS classes and `--ak-*` variables as public interfaces. Framework adapters handle properties, events and state mapping without copying a second visual system.

### Class structure

Components use `.ak-{component}` as their root class, `__` for internal elements and `--` for states and variants:

```html
<button class="ak-button ak-button--action">Start operation</button>

<div class="ak-input-number">
  <input class="ak-input-number__inner">
</div>
```

This resembles BEM without adding meaningless levels for naming's sake. Consumers should depend on public classes, not the layout containers of example pages.

### Visual variables

To change colors, dimensions or backgrounds, first override the component's public `--ak-*` variables:

```css
.deployment-panel {
  --ak-card-place-color: var(--ak-color-advanced);
  --ak-loading-color: var(--ak-color-primary);
}
```

See [Design tokens](/en/guide/tokens) for semantic color, typography, spacing, geometry, motion and focus variables. Component-specific variables are documented on each component page.

### Adapter boundaries

- CSS Core is the single source of visual styles and stable class names for existing official components.
- Vue adapters may encapsulate props, slots, events and keyboard interaction, but do not redeclare `<style>`.
- HTML and Vue use the same `.ak-*` classes, so Core fixes to spacing, typography and states apply to both.
- Override variables first for visual changes. Edit the copied adapter source when structure or behavior needs to change.
- If ak-ui has no matching component, you may add local styles to an existing native/headless primitive. Reuse `tokens.css` and follow the [headless adapter contract](/en/guide/headless).

See the [Reka UI example](./reka-ui) for a complete Vue implementation.
