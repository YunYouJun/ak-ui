# ak-ui quality checklist

## Contract

- The selected `accent`, `system`, or `terminal` intensity is evident and not exceeded.
- Existing ak-ui primitives are reused before new lookalikes are created.
- Repeated visual decisions use public `--ak-*` tokens.
- User branding is preserved or intentionally mapped to semantic roles.
- Styling is opt-in and does not reset unrelated application elements.
- No game logo, screenshot, character art, texture, icon, audio, or extracted asset was copied or fetched.

## Hierarchy and originality

- The primary command/value is immediately identifiable.
- Metadata supports real content instead of adding decorative noise.
- Geometry is purposeful; not every edge is clipped, skewed, or glowing.
- The result is an original product interface rather than a reconstruction of a named screen.

## Behavior and accessibility

- Semantic/headless behavior, ARIA, focus trapping, focus return, and keyboard controls remain intact.
- Keyboard focus is visible and not clipped.
- Selected, checked, invalid, warning, success, disabled, and loading states use more than color alone.
- Text and controls remain legible at browser zoom and high content density.
- Motion respects `prefers-reduced-motion`.
- Touch targets remain at least 44 by 44 CSS pixels where applicable.

## Responsive and portal behavior

- Inspect at least one desktop and one narrow/mobile viewport.
- Check for horizontal overflow, clipped labels, overlapping actions, and unreadable scaled layouts.
- Recompose immersive terminal layouts for mobile instead of shrinking them.
- Inspect dialogs, popovers, menus, tooltips, and other portalled content in their actual DOM location.

## Interaction states

Exercise the states relevant to the component:

- Rest, hover, active, and focus-visible.
- Open and closed.
- Selected, checked, expanded, or current.
- Disabled and invalid.
- Loading, empty, long-content, and error states.
- Escape, outside interaction, and focus return for overlays.

## Engineering checks

- Run the project's relevant lint, type-check, build, and tests.
- Inspect browser console warnings and errors.
- Prefer a real browser pass over reasoning from source alone.
- When visual tooling is unavailable, state which checks remain manual.
- Summarize the chosen integration path, style intensity, brand mapping, verification, and any remaining limitations.
