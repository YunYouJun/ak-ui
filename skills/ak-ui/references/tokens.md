# ak-ui token contract

## Imports

Use the full CSS Core when consuming existing ak-ui classes:

```ts
import '@yunyoujun/ak-ui/style.css'
```

Use only the design foundation when styling project-owned or headless components:

```ts
import '@yunyoujun/ak-ui/tokens.css'
```

Both imports expose the same semantic custom properties. The token-only entry must not reset global elements or style components by itself.

## Token layers

### Palette

Use `--ak-color-*` only to define or inspect raw palette values. Prefer semantic tokens in component rules.

Stable palette names include `white`, `black`, `blue`, `yellow`, `dark-blue`, `light-blue`, `gray`, `dark`, `low`, `basic`, `primary`, `secondary`, `advanced`, and `accent`.

### Semantic color

| Role | Token |
| --- | --- |
| Page canvas | `--ak-surface-canvas` |
| Light panel | `--ak-surface-panel` |
| Quiet panel | `--ak-surface-muted` |
| Raised/dark panel | `--ak-surface-raised` |
| Deep inverse surface | `--ak-surface-inverse` |
| Primary text | `--ak-text-primary` |
| Secondary text | `--ak-text-secondary` |
| Text on light surfaces | `--ak-text-inverse` |
| Information | `--ak-signal-info` |
| Action/warning | `--ak-signal-action` |
| Concentrated accent | `--ak-signal-accent` |
| Success | `--ak-signal-success` |
| Danger | `--ak-signal-danger` |
| Disabled | `--ak-signal-disabled` |

### Typography

Use `--ak-font-sans`, `--ak-font-serif`, and `--ak-font-mono` for families. Use `--ak-font-command` for the dominant command face. Size and tracking roles include `--ak-type-display-size`, `--ak-type-title-size`, `--ak-type-label-size`, `--ak-type-data-size`, `--ak-type-tight`, and `--ak-type-wide`.

### Spacing and density

Use `--ak-space-1` through `--ak-space-6` for repeated spacing. Use `--ak-density-control-height` and `--ak-density-panel-padding` for component-level defaults. Preserve a 44px minimum interactive target even when the visible control is denser.

### Geometry and depth

Use `--ak-line-hairline`, `--ak-line-strong`, `--ak-cut-sm`, `--ak-cut-md`, `--ak-cut-lg`, and `--ak-radius-subtle`. Use `--ak-shadow-panel`, `--ak-shadow-signal`, and `--ak-depth-perspective` for deliberate elevation.

### Motion and focus

Use `--ak-motion-fast`, `--ak-motion-base`, `--ak-motion-slow`, `--ak-ease-standard`, and `--ak-ease-emphasized`. Use `--ak-focus-color`, `--ak-focus-width`, and `--ak-focus-offset` for visible focus.

## Brand mapping

Override semantic roles inside the narrowest useful scope:

```css
.brand-console {
  --ak-font-command: var(--brand-display-font);
  --ak-signal-info: var(--brand-primary);
  --ak-signal-accent: var(--brand-accent);
  --ak-surface-canvas: var(--brand-canvas);
}
```

Do not replace every semantic role with one brand color. Keep action, danger, success, disabled, and focus states distinguishable.

## Project-owned component example

```css
.deployment-card {
  padding: var(--ak-density-panel-padding);
  border-left: var(--ak-line-strong) solid var(--ak-signal-info);
  color: var(--ak-text-primary);
  background: var(--ak-surface-raised);
  box-shadow: var(--ak-shadow-panel);
  clip-path: polygon(
    0 0,
    calc(100% - var(--ak-cut-md)) 0,
    100% var(--ak-cut-md),
    100% 100%,
    0 100%
  );
}
```

Use component-specific variables only when callers need to customize that component independently. Give them an ak-ui semantic fallback:

```css
.deployment-card {
  border-color: var(--deployment-card-signal, var(--ak-signal-info));
}
```

## Rules

- Do not hard-code a repeated design decision when a public token covers it.
- Do not redefine public `--ak-*` tokens to mean a different semantic role.
- Do not make component styles depend on SCSS variables at runtime.
- Do not add global resets to the token-only entry.
- Prefer scoped overrides over changing `:root` for one feature.
