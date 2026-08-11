# Reka UI adapter example

Use Reka UI as a Vue behavior and accessibility foundation, not as an ak-ui dependency or visual source. Prefer the project's existing primitive library when one is already present.

Reka UI parts accept classes, expose state through attributes such as `data-state`, and may teleport overlay content to `body`. Preserve those behaviors and style the rendered parts.

## Dialog anatomy

```vue
<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'reka-ui'

import '@yunyoujun/ak-ui/tokens.css'
</script>

<template>
  <DialogRoot>
    <DialogTrigger class="ops-trigger" data-ak-ui="system">
      Open mission briefing
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay class="ops-dialog__overlay" data-ak-ui="system" />
      <DialogContent class="ops-dialog" data-ak-ui="system">
        <span class="ops-dialog__eyebrow">MISSION / 04</span>
        <DialogTitle class="ops-dialog__title">Confirm deployment</DialogTitle>
        <DialogDescription class="ops-dialog__description">
          Review the squad and resources before continuing.
        </DialogDescription>

        <div class="ops-dialog__actions">
          <DialogClose class="ops-dialog__cancel">Cancel</DialogClose>
          <button class="ops-dialog__confirm" type="button">Deploy</button>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
```

The title and description remain Reka parts so screen readers receive the dialog name and context. `DialogPortal`, focus trapping, escape handling, and focus return remain owned by Reka UI.

## Token-based styling

```css
.ops-dialog__overlay {
  position: fixed;
  z-index: 40;
  inset: 0;
  background: rgb(7 9 10 / 72%);
  backdrop-filter: blur(2px);
}

.ops-dialog {
  position: fixed;
  z-index: 41;
  top: 50%;
  left: 50%;
  width: min(32rem, calc(100vw - 2 * var(--ak-space-4)));
  padding: var(--ak-space-6);
  border-left: var(--ak-line-strong) solid var(--ak-signal-action);
  color: var(--ak-text-primary);
  background: var(--ak-surface-raised);
  box-shadow: var(--ak-shadow-panel);
  clip-path: polygon(
    0 0,
    calc(100% - var(--ak-cut-lg)) 0,
    100% var(--ak-cut-lg),
    100% 100%,
    0 100%
  );
  transform: translate(-50%, -50%);
}

.ops-dialog__eyebrow {
  color: var(--ak-signal-info);
  font: 700 var(--ak-type-label-size) / 1 var(--ak-font-mono);
  letter-spacing: var(--ak-type-wide);
}

.ops-dialog__title {
  margin: var(--ak-space-2) 0;
  font: 900 var(--ak-type-title-size) / 1.08 var(--ak-font-command);
  letter-spacing: var(--ak-type-tight);
}

.ops-dialog__description {
  color: var(--ak-text-secondary);
  font-family: var(--ak-font-sans);
}

.ops-dialog__actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--ak-space-2);
  margin-top: var(--ak-space-5);
}

.ops-dialog__cancel,
.ops-dialog__confirm,
.ops-trigger {
  min-height: var(--ak-density-control-height);
  padding-inline: var(--ak-space-4);
  border: var(--ak-line-hairline) solid currentcolor;
  font: 700 var(--ak-type-data-size) / 1 var(--ak-font-sans);
}

.ops-dialog__confirm {
  border-color: var(--ak-signal-action);
  color: var(--ak-text-inverse);
  background: var(--ak-signal-action);
}

.ops-dialog[data-state='open'],
.ops-dialog__overlay[data-state='open'] {
  animation: ak-adapter-enter var(--ak-motion-base) var(--ak-ease-emphasized);
}

.ops-dialog :focus-visible,
.ops-trigger:focus-visible {
  outline: var(--ak-focus-width) solid var(--ak-focus-color);
  outline-offset: var(--ak-focus-offset);
}

@keyframes ak-adapter-enter {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .ops-dialog,
  .ops-dialog__overlay {
    animation: none;
  }
}
```

Put styles for teleported parts in a global stylesheet, use Vue `:deep()`, or place selectors directly on the teleported classes. Do not rely on a scoped ancestor that is absent after teleportation.

## Other primitive mappings

- Tabs: map `TabsTrigger[data-state='active']` to the selected line/fill and preserve arrow-key behavior.
- Select: style trigger, portalled content, viewport, item, and indicator separately; keep typeahead and roving focus.
- Tooltip/Popover: verify collision-aware placement before adding decorative arrows or clipped surfaces.
- Checkbox/Switch: style `data-state='checked' | 'unchecked' | 'indeterminate'`; keep a non-color state mark.
- Accordion: animate measured content height using the primitive's exposed CSS variables when available, with a reduced-motion fallback.

Consult the installed Reka UI version or current official documentation before relying on optional props or library-specific CSS variables.
