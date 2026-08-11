# ak-ui design language

## Intent

ak-ui is an original design language inspired by the information hierarchy, industrial geometry, and tactical-terminal atmosphere associated with Arknights interfaces. It provides reusable constraints for independent products. It does not aim to reproduce any specific game screen, composition, brand, or asset.

Judge work by conformance to this contract, not by similarity to a screenshot.

## Style intensity

### accent

Preserve the host product's layout and identity. Apply semantic signal colors, strong command typography, visible focus, compact metadata, and at most one restrained cut or line treatment per component.

### system

Use the full component language: layered neutral surfaces, asymmetric emphasis, clipped geometry, dense but legible metadata, functional signals, and decisive interaction feedback. This is the default.

### terminal

Use immersive composition only where the content benefits from it. Add command planes, telemetry, perspective, parallax, or staged motion deliberately. Provide a compact mobile composition rather than shrinking a desktop control room.

## Principles

### Build hierarchy before decoration

Every surface needs a dominant command or value, supporting context, and quiet metadata. Vary size, weight, contrast, alignment, and whitespace before adding borders or glow.

Use short labels, identifiers, counts, timestamps, progress, and state text when they communicate real information. Do not add meaningless serial numbers merely to create atmosphere.

### Use asymmetric, purposeful geometry

Prefer rectangular modules, clipped corners, offset rules, stepped edges, or one slanted axis. Keep the hit area rectangular and large enough even when the visible shape is clipped.

Rounded cards, uniform pill shapes, soft floating shadows, and evenly spaced generic dashboard tiles should not dominate. A small radius is acceptable when required by the host brand or control affordance.

### Treat color as a signal

Build most surfaces from neutral paper, graphite, black, white, and muted gray. Reserve cyan/blue for information, yellow for action or warning, orange for concentrated emphasis, green for success, and red for danger.

Use a label, icon, pattern, or geometry change alongside color. Glows are local feedback, not a permanent background effect.

### Make typography carry structure

Use a heavy serif or strongly weighted display face for major Chinese commands when available. Use a neutral sans face for prose and controls, and monospace for identifiers, telemetry, and aligned values.

Keep command labels compact, data numerals clear, and metadata letter-spaced. Avoid using uppercase, italics, monospace, or extra tracking on every line.

### Layer surfaces, not clutter

Combine paper-like light surfaces and graphite dark surfaces when hierarchy requires contrast. Strong rules, small offsets, and controlled shadows should explain elevation. Do not stack multiple borders, gradients, noise, glow, and bevels on the same element.

### Keep interaction decisive

Hover, press, selection, loading, and focus should change at least two of signal, position, fill, line, or label. Keep transitions quick and mechanical. Preserve a visible keyboard focus indicator that is not hidden by clipping.

## Composition rules

- Align related data to a stable grid, then break the grid only for the primary command or focal object.
- Keep touch targets at least 44 by 44 CSS pixels even in dense layouts.
- Preserve readable line lengths and real whitespace around primary actions.
- Recompose multi-plane terminal layouts for narrow viewports; do not rely on horizontal scrolling.
- Keep overlays above transformed ancestors and verify teleported/portalled content in its actual DOM location.
- Let content determine density. Consumer pages should not inherit showcase-level telemetry by default.

## Brand adaptation

Preserve existing brand colors, typography, and voice when they are intentional. Map them to ak-ui semantic roles, then apply ak-ui geometry, hierarchy, density, and feedback.

Do not force the default cyan/yellow palette onto a recognizable host brand. Do not remap danger, warning, success, and focus roles so aggressively that their meaning or contrast is lost.

## Originality boundary

Use original, licensed, or user-provided imagery. Do not copy or fetch game logos, character art, UI textures, icons, screenshots, audio, or extracted assets. Do not recreate a named game screen pixel for pixel.

An acceptable result should remain recognizably the user's product after removing the ak-ui styling.

## Common failure modes

- A black background with cyan borders and indiscriminate glow.
- Every element clipped, skewed, numbered, uppercase, or monospace.
- Decorative telemetry that competes with actual content.
- Tiny labels and controls justified as “game-like density.”
- A desktop terminal scaled down until it is unusable on mobile.
- Brand colors overwritten instead of mapped to semantic roles.
- Headless behavior replaced by hand-written interaction code for styling convenience.
- Similarity achieved by copying game assets instead of applying the design contract.
