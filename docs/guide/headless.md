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
