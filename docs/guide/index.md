# 使用指南

ak-ui 是一组明日方舟风格的 CSS 界面模块。它不包含运行时，可以用于原生 HTML、Vue、React 或其他前端项目。

## 安装

::: code-group

```bash [pnpm]
pnpm add @yunyoujun/ak-ui
```

```bash [npm]
npm install @yunyoujun/ak-ui
```

```bash [yarn]
yarn add @yunyoujun/ak-ui
```

:::

## 引入 CSS

```ts
import '@yunyoujun/ak-ui/style.css'
```

也可以直接通过 CDN 引入：

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@yunyoujun/ak-ui/dist/ak-ui.min.css">
```

## 开始使用

所有模块都以 HTML 类名作为 interface。复制对应示例，然后按需覆盖 `--ak-*` CSS variables。

::: demo button/base
:::

前往[组件索引](/components/)查看全部模块。

::: warning 非官方项目
ak-ui 是兴趣驱动的界面研究，与鹰角网络没有关联。游戏名称、图像及相关素材的权利归原权利人所有。
:::
