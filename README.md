# ak-ui

[![Docs](https://github.com/YunYouJun/ak-ui/actions/workflows/docs.yml/badge.svg)](https://github.com/YunYouJun/ak-ui/actions/workflows/docs.yml)
[![npm](https://img.shields.io/npm/v/@yunyoujun/ak-ui.svg?style=flat-square)](https://www.npmjs.com/package/@yunyoujun/ak-ui)
[![license](https://img.shields.io/npm/l/@yunyoujun/ak-ui.svg?style=flat-square)](./LICENSE)

Framework-agnostic Arknights-inspired CSS interface modules.

- Documentation: <https://ak-ui.yyj.moe>
- Source: SCSS modules and runtime CSS variables
- Runtime dependency: none

## Install

```bash
pnpm add @yunyoujun/ak-ui@next
```

Import the compiled stylesheet:

```ts
import '@yunyoujun/ak-ui/style.css'
```

Or use the Sass entry:

```scss
@use '@yunyoujun/ak-ui/scss';
```

CDN usage:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@yunyoujun/ak-ui@next/dist/ak-ui.min.css">
```

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

This is an unofficial fan project. Arknights and related assets belong to their respective owners.
