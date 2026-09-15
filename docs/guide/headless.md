---
title: Headless 适配协议
description: 将 ak-ui 设计语言应用到任意 unstyled headless 组件库
---

# Headless 适配协议

## 职责边界

| 关注点 | 负责方 |
| --- | --- |
| 语义、ARIA、焦点、键盘输入 | 原生元素或 Headless 基础组件 |
| 受控状态和发出的事件 | 应用或组件已有的 API |
| 几何、表面、排版、动效 | ak-ui CSS 与 Token |
| 产品文案、品牌、信息优先级 | 宿主应用 |

不要为了方便改样式而替换行为。应对渲染出的部件和公开状态属性应用样式。

## 适配流程

1. 梳理基础组件的渲染部件、Portal 行为、状态、CSS 变量与键盘契约。
2. 明确目标组件的结构：根节点、触发器、表面／内容、标题、说明、控件和可选元信息。
3. 保留基础组件必需的部件与无障碍名称。
4. 为渲染出的 DOM 部件添加稳定的项目类名或 `.ak-*` 类名。
5. 将 `data-state`、`data-disabled`、`data-invalid`、`aria-selected` 和 `aria-checked` 等状态属性映射到可见的 ak-ui 状态。
6. 应用语义 Token 和选定的风格强度。
7. 检查实际 Portal／Teleport DOM、焦点顺序、Escape 行为、外部交互和减少动态效果。

## 状态映射

| 基础组件状态 | 必需的视觉表现 |
| --- | --- |
| `open`、`expanded`、`active` | 更强的信号，配合结构或位置变化 |
| `selected`、`checked`、`current` | 持续的填充／线条，以及非颜色指示 |
| `disabled` | 降低强调程度；指针和键盘禁用行为由基础组件负责 |
| `invalid` | 危险信号，配合文字或图标说明 |
| `loading` | 保持尺寸、提供状态文字，避免干扰操作的动效 |
| `focus-visible` | 不被裁切、对比度足够的焦点指示 |

基础组件已经暴露这些状态时，不要另建一套状态存储。

## 样式模式

使用范围明确、按需启用的作用域和语义 Token：

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

对于 Teleport 内容，将启用样式的属性／类名放在传送后的表面自身，或使用全局样式表。不要假设它仍是应用根节点的后代。

## 选择行为基础

按以下顺序优先选择：

1. 项目已经使用的 Headless 库。
2. 能满足交互需求的浏览器原生语义。
3. 用户已经接受、适合当前框架的 Headless 库。
4. Vue 项目缺少复杂交互基础时，采用 Reka UI。

不要为卡片、装饰面板、标签、基础按钮等纯展示组件添加 Headless 依赖。

## 完成标准

适配完成意味着：保留原有行为契约，响应所有相关状态，使用公开 Token，在 Portal 位置中正常显示，适应窄屏，并提供可见的键盘焦点。


## 接口与命名

ak-ui 把 CSS 类名和 `--ak-*` variables 视为公开接口。框架 Adapter 只负责属性、事件与状态映射，不复制另一套视觉系统。

### 类名结构

组件以 `.ak-{component}` 作为根类名，内部元素使用 `__`，状态与外观使用 `--`：

```html
<button class="ak-button ak-button--action">开始行动</button>

<div class="ak-input-number">
  <input class="ak-input-number__inner">
</div>
```

这套命名接近 BEM，但不会为了形式制造没有语义的层级。调用方应依赖公开类名，不要依赖示例页面的布局容器。

### 视觉变量

需要换色、尺寸或背景时，优先覆盖组件公开的 `--ak-*` variables：

```css
.deployment-panel {
  --ak-card-place-color: var(--ak-color-advanced);
  --ak-loading-color: var(--ak-color-primary);
}
```

完整的语义色彩、字体、间距、几何、动效与焦点变量参见[设计 Token](/guide/tokens)。组件专属变量记录在各自页面中。

### Adapter 边界

- CSS Core 是现有官方组件视觉与稳定类名的唯一来源。
- Vue Adapter 可以封装属性、插槽、事件与键盘交互，但不重复声明 `<style>`。
- HTML 与 Vue 使用相同的 `.ak-*` 类名，因此 Core 中的间距、字体和状态修复会同时生效。
- 修改视觉时先覆盖 variables；需要改变结构或行为时，再编辑复制到项目中的 Adapter 源码。
- ak-ui 尚未提供对应组件时，可以为项目已有的 native/headless primitive 编写局部样式，但应复用 `tokens.css` 与 [Headless 适配协议](/guide/headless)。

完整 Vue 示例参阅 [Reka UI 适配示例](./reka-ui)。
