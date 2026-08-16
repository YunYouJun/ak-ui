# ak-ui

**English** | [简体中文](./README.zh-CN.md)

[![Docs](https://github.com/YunYouJun/ak-ui/actions/workflows/docs.yml/badge.svg)](https://github.com/YunYouJun/ak-ui/actions/workflows/docs.yml)
[![npm](https://img.shields.io/npm/v/@yunyoujun/ak-ui.svg?style=flat-square)](https://www.npmjs.com/package/@yunyoujun/ak-ui)
[![license](https://img.shields.io/npm/l/@yunyoujun/ak-ui.svg?style=flat-square)](./LICENSE)

An unofficial, Arknights-inspired styling foundation for building original interfaces with AI or by hand. ak-ui provides semantic design tokens, framework-agnostic CSS primitives, component guidelines, and an installable Agent Skill.

- Documentation: <https://ak-ui.yyj.moe>
- Design foundation: tokens, geometry, hierarchy, motion, and interaction states
- Integration: AI Skill, CSS Core, Vue Registry, or any unstyled headless library
- Runtime dependency: none

ak-ui does not aim to reproduce a specific game screen pixel for pixel. It turns the underlying industrial geometry and tactical information language into constraints that can adapt to your own product and brand.

## Use with AI (recommended)

Install the public `ak-ui` Skill with the open [Skills CLI](https://github.com/vercel-labs/skills):

```bash
npx skills add YunYouJun/ak-ui --skill ak-ui
```

Then ask your agent to integrate, build, extend, or review an interface:

```text
Use $ak-ui to integrate the ak-ui design language into this project.
Preserve the existing brand and accessible component behavior.
```

Choose `accent`, `system` (default), or `terminal` to control the style intensity. See the [AI Skill guide](https://ak-ui.yyj.moe/guide/ai-skill) for workflows and examples.

## Manual integration

```bash
pnpm add @yunyoujun/ak-ui
```

Import only the semantic token foundation when styling your own or headless components:

```ts
import '@yunyoujun/ak-ui/tokens.css'
```

Import the full CSS Core when using existing ak-ui classes:

```ts
import '@yunyoujun/ak-ui/style.css'
```

Or use the Sass entry:

```scss
@use '@yunyoujun/ak-ui/scss';
```

CDN usage:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@yunyoujun/ak-ui@latest/dist/ak-ui.min.css">
```

For production, pin an exact version instead of `@latest` to avoid unexpected upgrades.

`tokens.css` only declares namespaced `--ak-*` custom properties. It does not reset global elements. The full CSS Core includes native form controls, `<dialog>`, Popover API surfaces, and the original display, navigation, and feedback modules. Browse the [design token contract](https://ak-ui.yyj.moe/guide/tokens) and complete HTML examples in the [component documentation](https://ak-ui.yyj.moe/components/).

## Vue Registry

Vue users can copy editable adapters into their project with the shadcn-vue CLI:

```bash
pnpm dlx shadcn-vue@latest add https://ak-ui.yyj.moe/r/button.json
pnpm dlx shadcn-vue@latest add https://ak-ui.yyj.moe/r/card.json
pnpm dlx shadcn-vue@latest add https://ak-ui.yyj.moe/r/input-number.json
pnpm dlx shadcn-vue@latest add https://ak-ui.yyj.moe/r/status.json
pnpm dlx shadcn-vue@latest add https://ak-ui.yyj.moe/r/progress.json
pnpm dlx shadcn-vue@latest add https://ak-ui.yyj.moe/r/notice.json
pnpm dlx shadcn-vue@latest add https://ak-ui.yyj.moe/r/tabs.json
```

The copied Vue source imports the framework-agnostic CSS package, so there is no separate ak-ui runtime. See the [Vue Registry guide](https://ak-ui.yyj.moe/registry/) for usage and live examples.

## Design language and headless components

ak-ui separates behavior from presentation. Keep native or headless primitives responsible for semantics, keyboard input, state, and focus; map their rendered parts to ak-ui tokens and geometry. The Skill prefers a project's existing headless library and uses Reka UI only as an optional Vue example.

- [ak-ui design language](https://ak-ui.yyj.moe/guide/design-language)
- [Headless adapter contract](https://ak-ui.yyj.moe/guide/headless)
- [Reka UI example](https://ak-ui.yyj.moe/guide/reka-ui)
- [Quality checklist](https://ak-ui.yyj.moe/guide/quality)

The architecture migration and implementation history are documented in the [project revival log](https://ak-ui.yyj.moe/guide/revival).

## Development

```bash
pnpm install
pnpm dev
```

Useful commands:

```bash
pnpm build               # build dist CSS
pnpm docs:build          # build the VitePress site
pnpm lint                # check SCSS
pnpm test:visual         # quick visual check for the current OS
pnpm test:visual:update:linux # update lossless WebP baselines in the CI-matched Linux container
pnpm test                # run all verification with Linux visual regression
```

The files in `examples/` are the single source for documentation previews, displayed source code, and Playwright browser tests.
Only the desktop and mobile homepage baselines are versioned. Component captures are generated under `test-results/` and uploaded as a 14-day GitHub Actions artifact instead of entering Git history. The homepage baselines use the pinned Playwright Noble container so local updates match the Ubuntu 24.04 CI renderer.

## License

[MIT](./LICENSE)

This is an unofficial interface study with no affiliation to Hypergryph. Arknights and related assets belong to their respective owners. Do not use the Skill to copy game logos, character art, screenshots, or extracted assets.
