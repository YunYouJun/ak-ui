# 接入 ak-ui

ak-ui 把明日方舟风格的界面拆成无运行时的 CSS Core，以及可以直接复制进项目的 Vue Adapter。先选择与你当前项目匹配的接入通道。

<div class="ak-entry-grid">
  <a class="ak-entry-card ak-entry-card--core" href="#安装">
    <span class="ak-entry-card__channel">CSS CORE / UNIVERSAL</span>
    <strong>直接接入样式</strong>
    <p>复制示例 HTML，在 Vue、React 或原生页面中使用同一套稳定类名。</p>
    <span class="ak-entry-card__meta">0 runtime · CSS / SCSS</span>
    <span class="ak-entry-card__action">继续安装 ↓</span>
  </a>
  <a class="ak-entry-card ak-entry-card--vue" href="/registry/">
    <span class="ak-entry-card__channel">VUE ADAPTER / SOURCE</span>
    <strong>复制 Vue 组件</strong>
    <p>通过 shadcn-vue Registry 安装带属性、事件和 v-model 的可编辑源码。</p>
    <span class="ak-entry-card__meta">Vue 3 · editable source</span>
    <span class="ak-entry-card__action">打开 Registry →</span>
  </a>
</div>

<p class="ak-entry-note"><strong>选择建议：</strong>需要跨框架或只想使用视觉样式时选择 CSS Core；Vue 项目希望获得类型和交互封装时选择 Vue Registry。</p>

## 安装

::: code-group

```bash [pnpm]
pnpm add @yunyoujun/ak-ui@next
```

```bash [npm]
npm install @yunyoujun/ak-ui@next
```

```bash [yarn]
yarn add @yunyoujun/ak-ui@next
```

:::

## 引入 CSS

```ts
import '@yunyoujun/ak-ui/style.css'
```

也可以直接通过 CDN 引入：

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@yunyoujun/ak-ui@next/dist/ak-ui.min.css">
```

## 使用 CSS Core

所有模块都以 HTML 类名作为 interface。复制对应示例，然后按需覆盖 `--ak-*` CSS variables。

::: demo button/base
:::

前往[组件索引](/components/)查看全部模块；Vue 项目也可以继续使用 [Vue Registry](/registry/) 安装可编辑 Adapter。

::: warning 非官方项目
ak-ui 是兴趣驱动的界面研究，与鹰角网络没有关联。游戏名称、图像及相关素材的权利归原权利人所有。
:::
