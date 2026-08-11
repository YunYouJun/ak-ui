# Adapting headless components

## Ownership boundary

| Concern | Owner |
| --- | --- |
| Semantics, ARIA, focus, keyboard input | Native or headless primitive |
| Controlled state and emitted events | Existing application/component API |
| Geometry, surfaces, typography, motion | ak-ui CSS and tokens |
| Product copy, brand, information priority | Host application |

Do not replace behavior to make styling easier. Style the rendered parts and public state attributes.

## Adapter workflow

1. Inventory the primitive's rendered parts, portal behavior, states, CSS variables, and keyboard contract.
2. Write the intended component anatomy: root, trigger, surface/content, title, description, controls, and optional metadata.
3. Keep the primitive's required parts and accessible names.
4. Add stable project-owned or `.ak-*` classes to rendered DOM parts.
5. Map state attributes such as `data-state`, `data-disabled`, `data-invalid`, `aria-selected`, and `aria-checked` to visible ak-ui states.
6. Apply semantic tokens and the selected style intensity.
7. Verify the real portalled/teleported DOM, focus order, escape behavior, outside interaction, and reduced motion.

## State mapping

| Primitive state | Required visual result |
| --- | --- |
| `open`, `expanded`, `active` | Stronger signal plus a structural or position change |
| `selected`, `checked`, `current` | Persistent fill/line and a non-color indicator |
| `disabled` | Reduced emphasis and disabled pointer/keyboard behavior from the primitive |
| `invalid` | Danger signal plus text or icon explanation |
| `loading` | Preserve dimensions, expose status text, and avoid blocking motion |
| `focus-visible` | Unclipped, high-contrast focus indicator |

Do not invent a new state store when the primitive already exposes these states.

## Styling pattern

Use a narrow opt-in scope and semantic tokens:

```css
[data-ak-ui] .command-option {
  min-height: var(--ak-density-control-height);
  padding: var(--ak-space-3) var(--ak-space-4);
  border: var(--ak-line-hairline) solid transparent;
  color: var(--ak-text-primary);
  background: var(--ak-surface-raised);
  transition:
    background var(--ak-motion-fast) var(--ak-ease-standard),
    transform var(--ak-motion-fast) var(--ak-ease-standard);
}

[data-ak-ui] .command-option[data-state='checked'] {
  border-color: var(--ak-signal-action);
  background: color-mix(in srgb, var(--ak-signal-action) 18%, var(--ak-surface-raised));
  transform: translateX(var(--ak-space-1));
}

[data-ak-ui] .command-option:focus-visible {
  outline: var(--ak-focus-width) solid var(--ak-focus-color);
  outline-offset: var(--ak-focus-offset);
}
```

For teleported content, put the opt-in attribute/class on the teleported surface itself or use a global stylesheet. Do not assume it remains a descendant of the application root.

## Selecting a behavior foundation

Prefer, in order:

1. The headless library already used by the project.
2. Native browser semantics when they satisfy the interaction.
3. A framework-appropriate headless library already accepted by the user.
4. Reka UI for missing complex Vue behavior.

Do not add a headless dependency for cards, decorative panels, labels, basic buttons, or other presentation-only primitives.

## Completion criteria

An adapter is complete only when it preserves the original behavior contract, responds to every relevant state, uses public tokens, survives its portal location, works at narrow widths, and exposes visible keyboard focus.
