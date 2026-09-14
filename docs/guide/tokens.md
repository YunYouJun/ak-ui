---
title: 设计 Token
description: ak-ui 的色彩、排版、间距、几何、动效和焦点 Token 契约
---

# ak-ui Token 契约

## 引入方式

使用现有 ak-ui 类名时，引入完整 CSS Core：

```ts
import '@yunyoujun/ak-ui/style.css'
```

为项目自有组件或 Headless 组件编写样式时，可以只引入设计基础：

```ts
import '@yunyoujun/ak-ui/tokens.css'
```

两个入口暴露相同的语义化自定义属性。Token-only 入口不会重置全局元素，也不会自行添加组件样式。

## Token 层级

### 基础色板

`--ak-color-*` 仅用于定义或查看原始色板值。组件规则优先使用语义 Token。

稳定的色板名称包括 `white`、`black`、`blue`、`yellow`、`dark-blue`、`light-blue`、`gray`、`dark`、`low`、`basic`、`primary`、`secondary`、`advanced` 和 `accent`。

### 语义色彩

| 角色 | Token |
| --- | --- |
| 页面画布 | `--ak-surface-canvas` |
| 亮色面板 | `--ak-surface-panel` |
| 弱化面板 | `--ak-surface-muted` |
| 抬升／暗色面板 | `--ak-surface-raised` |
| 深色反向表面 | `--ak-surface-inverse` |
| 主要文字 | `--ak-text-primary` |
| 次要文字 | `--ak-text-secondary` |
| 亮色表面上的文字 | `--ak-text-inverse` |
| 信息 | `--ak-signal-info` |
| 操作／警告 | `--ak-signal-action` |
| 局部强调 | `--ak-signal-accent` |
| 成功 | `--ak-signal-success` |
| 危险 | `--ak-signal-danger` |
| 禁用 | `--ak-signal-disabled` |

### 排版

字体族使用 `--ak-font-sans`、`--ak-font-serif` 和 `--ak-font-mono`；主要操作标题使用 `--ak-font-command`。字号与字距角色包括 `--ak-type-display-size`、`--ak-type-title-size`、`--ak-type-label-size`、`--ak-type-data-size`、`--ak-type-tight` 和 `--ak-type-wide`。

### 间距与密度

重复间距使用 `--ak-space-1` 至 `--ak-space-6`。组件级默认值使用 `--ak-density-control-height` 和 `--ak-density-panel-padding`。即使可见控件更紧凑，交互目标也应至少为 44px。

### 几何与景深

使用 `--ak-line-hairline`、`--ak-line-strong`、`--ak-cut-sm`、`--ak-cut-md`、`--ak-cut-lg` 和 `--ak-radius-subtle`。需要表达层次时，使用 `--ak-shadow-panel`、`--ak-shadow-signal` 和 `--ak-depth-perspective`。

### 动效与焦点

动效使用 `--ak-motion-fast`、`--ak-motion-base`、`--ak-motion-slow`、`--ak-ease-standard` 和 `--ak-ease-emphasized`。可见焦点使用 `--ak-focus-color`、`--ak-focus-width` 和 `--ak-focus-offset`。

## 品牌映射

在满足需求的最小作用域内覆盖语义角色：

```css
.brand-console {
  --ak-font-command: var(--brand-display-font);
  --ak-signal-info: var(--brand-primary);
  --ak-signal-accent: var(--brand-accent);
  --ak-surface-canvas: var(--brand-canvas);
}
```

不要用同一个品牌色替换所有语义角色。操作、危险、成功、禁用和焦点状态仍应能被区分。

## 项目自有组件示例

```css
.deployment-card {
  padding: var(--ak-density-panel-padding);
  border-left: var(--ak-line-strong) solid var(--ak-signal-info);
  color: var(--ak-text-primary);
  background: var(--ak-surface-raised);
  box-shadow: var(--ak-shadow-panel);
  clip-path: polygon(
    0 0,
    calc(100% - var(--ak-cut-md)) 0,
    100% var(--ak-cut-md),
    100% 100%,
    0 100%
  );
}
```

仅在调用方需要独立定制组件时添加组件专属变量，并提供 ak-ui 语义 Token 作为回退：

```css
.deployment-card {
  border-color: var(--deployment-card-signal, var(--ak-signal-info));
}
```

## 使用规则

- 公开 Token 已覆盖的重复设计决策，不要硬编码。
- 不要重新定义公开 `--ak-*` Token 的语义角色。
- 不要让组件样式在运行时依赖 SCSS 变量。
- 不要向 Token-only 入口添加全局重置。
- 单个功能的定制优先使用局部覆盖，不要修改 `:root`。
