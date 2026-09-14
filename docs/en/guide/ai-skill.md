---
title: Use the AI Skill
description: Install the ak-ui Skill to integrate, extend and review the design language for your project.
---

# Use the AI Skill

The ak-ui Skill is the recommended entry point. It first identifies your framework, styling system, brand tokens and headless components, then chooses CSS Core, Vue Registry or a token-only adapter. The underlying CSS interface remains stable and usable by hand, with no AI runtime dependency.

## Install

Use the open [Skills CLI](https://github.com/vercel-labs/skills) maintained by Vercel Labs:

```bash
npx skills add YunYouJun/ak-ui --skill ak-ui
```

By default, the command installs into the current project. Add `-g` to use the skill across projects:

```bash
npx skills add YunYouJun/ak-ui --skill ak-ui -g
```

The Skills CLI configures the skill for detected clients such as Codex, Claude Code and Cursor. Consult the CLI's current documentation for installation locations and supported clients.

## Example prompts

```text
Use $ak-ui to integrate ak-ui into this project and restyle the dashboard.
Preserve the existing brand and accessible component behavior.
```

```text
Use $ak-ui in accent mode to restyle this page.
Preserve the existing brand colors and layout.
```

```text
Use $ak-ui to style this Reka UI Dialog.
Preserve its focus management and keyboard interactions.
```

```text
Use $ak-ui to review this page against the ak-ui design contract.
Report findings without changing code.
```

## Style intensity

| Mode | Suitable for | Default effect |
| --- | --- | --- |
| `accent` | Blogs, brand sites, established design systems | Preserve the layout; add tokens, signals, type hierarchy and restrained geometry |
| `system` | Dashboards, tools, web applications | Apply the full surface, hierarchy, density, geometry and state language; the default |
| `terminal` | Special pages, immersive terminals, showcases | May recompose the layout and add telemetry, perspective, layers and more prominent motion |

Intensity controls styling scope; it is independent of light or dark appearance.

## What the Skill does

- **Integrate:** choose `tokens.css`, full CSS Core or Vue Registry.
- **Build:** compose existing components around real product content first.
- **Extend:** apply the design contract to native elements or any unstyled headless primitives.
- **Review:** check tokens, hierarchy, states, responsiveness, accessibility and asset boundaries.
- **Verify:** when tools allow, inspect desktop and mobile layouts, keyboard focus, component states and reduced motion.

## Preserve your brand

ak-ui does not require a new product identity. The Skill maps existing brand variables to semantic `--ak-*` tokens before applying ak-ui geometry, hierarchy, density and feedback:

```css
.brand-console {
  --ak-font-command: var(--brand-display-font);
  --ak-signal-info: var(--brand-primary);
  --ak-signal-accent: var(--brand-accent);
  --ak-surface-canvas: var(--brand-canvas);
}
```

Warning, danger, success, disabled and focus roles must retain clear meaning and contrast.

## Headless components

The Skill prefers your existing headless library, followed by native browser semantics. It considers Reka UI only when a Vue project needs a missing complex interaction foundation. See [Adapting headless components](/en/guide/headless) and the [Reka UI example](/en/guide/reka-ui).

## Manual integration

You can also install [CSS Core](/en/guide/), use only [design tokens](/en/guide/tokens), or copy editable components through [Vue Registry](/en/registry/) without using AI.

::: warning Design boundary
ak-ui provides an independent design language inspired by Arknights. It does not aim to reproduce specific game screens pixel for pixel or recommend copying game logos, characters, illustrations, screenshots or extracted assets.
:::
