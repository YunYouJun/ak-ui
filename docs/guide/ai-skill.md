---
title: 使用 AI Skill
description: 安装 ak-ui Skill，让 AI 根据项目技术栈接入、扩展和审查 ak-ui 设计语言
---

# 使用 AI Skill

ak-ui Skill 是推荐的接入入口。它会先识别项目已有的框架、样式系统、品牌 Token 和 headless 组件，再选择 CSS Core、Vue Registry 或 Token-only 适配路径。底层仍是稳定、可手动使用的 CSS 接口，不依赖 AI 运行时。

## 安装

使用 Vercel Labs 维护的开放 [Skills CLI](https://github.com/vercel-labs/skills)：

```bash
npx skills add YunYouJun/ak-ui --skill ak-ui
```

命令默认安装到当前项目。如需在所有项目中使用，可添加 `-g`：

```bash
npx skills add YunYouJun/ak-ui --skill ak-ui -g
```

Skills CLI 会为已检测到的 Codex、Claude Code、Cursor 等客户端配置 Skill。具体安装位置和支持范围以 CLI 当前文档为准。

## 使用示例

```text
Use $ak-ui to integrate ak-ui into this project and restyle the dashboard.
Preserve the existing brand and accessible component behavior.
```

```text
使用 $ak-ui，以 accent 模式改造这个页面，保留现有品牌色和布局。
```

```text
使用 $ak-ui 为这个 Reka UI Dialog 添加 ak-ui 风格，
不要替换它的焦点管理和键盘交互。
```

```text
使用 $ak-ui 审查当前页面是否符合 ak-ui 设计契约，只报告问题，不修改代码。
```

## 官网风格与动效示例

参考官网的任务会读取 Skill 内置的来源与覆盖表；涉及入场、计数、相册或视差时，会读取动效参数和生命周期说明。查看[官网风格覆盖与示例](./official-site-examples)，可直接预览产品更新页组合、独立入场与数字增长，以及 1.1.0 的六章节交互示例，并区分独立实现与未验证的官网渲染细节。

```text
使用 $ak-ui，参考官网的双语导航与新闻列表构建产品更新页。
使用现有组件，说明官网观察值与适配值，验证窄屏和减少动态效果。
```

## 风格强度

| 模式 | 适用场景 | 默认影响 |
| --- | --- | --- |
| `accent` | 博客、品牌站、已有成熟设计系统 | 保留布局，只加入 Token、信号、字体层级和克制几何 |
| `system` | 后台、工具、Web 应用 | 完整应用表面、层级、密度、几何和状态，默认模式 |
| `terminal` | 专题页、沉浸式终端、展示项目 | 可重组布局并加入遥测、透视、层次和更明显的动效 |

模式控制风格强度，不等同于亮色或暗色主题。

## Skill 会做什么

- **接入**：选择 `tokens.css`、完整 CSS Core 或 Vue Registry。
- **构建**：优先组合现有组件和真实产品内容。
- **扩展**：为原生元素或任意 unstyled headless primitives 应用 ak-ui 设计契约。
- **审查**：检查 Token、信息层级、状态、响应式、无障碍和素材边界。
- **验证**：在工具允许时检查桌面、移动端、键盘焦点、组件状态和降级动效。

## 保留你的品牌

ak-ui 不要求替换产品身份。Skill 会优先把现有品牌变量映射到语义化 `--ak-*` Token，再应用 ak-ui 的几何、层级、密度与反馈：

```css
.brand-console {
  --ak-font-command: var(--brand-display-font);
  --ak-signal-info: var(--brand-primary);
  --ak-signal-accent: var(--brand-accent);
  --ak-surface-canvas: var(--brand-canvas);
}
```

警告、危险、成功、禁用和焦点等功能角色仍需保持清晰语义与对比度。

## Headless 组件

Skill 优先复用项目已有 headless 库，其次使用浏览器原生语义。只有 Vue 项目确实缺少复杂交互基础时，才按需采用 Reka UI。参阅 [Headless 适配协议](/guide/headless)与 [Reka UI 示例](/guide/reka-ui)。

## 手动接入仍然可用

不使用 AI 时，可以直接安装 [CSS Core](/guide/)、只使用 [设计 Token](/guide/tokens)，或通过 [Vue Registry](/registry/)复制可编辑组件。

::: warning 设计边界
ak-ui 提供的是受《明日方舟》启发的独立设计语言，不以像素级复刻具体游戏界面为目标，也不建议复制游戏 Logo、角色、插画、截图或拆包素材。
:::
