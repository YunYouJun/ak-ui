# ak-ui

[English](./README.md) | **简体中文**

[![Docs](https://github.com/YunYouJun/ak-ui/actions/workflows/docs.yml/badge.svg)](https://github.com/YunYouJun/ak-ui/actions/workflows/docs.yml)
[![npm](https://img.shields.io/npm/v/@yunyoujun/ak-ui.svg?style=flat-square)](https://www.npmjs.com/package/@yunyoujun/ak-ui)
[![license](https://img.shields.io/npm/l/@yunyoujun/ak-ui.svg?style=flat-square)](./LICENSE)

一个非官方、受《明日方舟》启发的开放样式基础，帮助你通过 AI 或手动方式构建原创界面。ak-ui 提供语义化设计 Token、框架无关的 CSS primitives、组件规范和可安装的 Agent Skill。

- 文档：<https://ak-ui.yyj.moe>
- 设计基础：Token、几何、信息层级、动效与交互状态
- 接入方式：AI Skill、CSS Core、Vue Registry 或任意 unstyled headless 库
- 运行时依赖：无

ak-ui 不以像素级复刻某个游戏页面为目标，而是把工业几何和战术信息语言抽象为可融合到用户产品与品牌中的设计约束。

运行时生成界面可体验 [A2UI 实验](https://ak-ui.yyj.moe/guide/a2ui)：基于官方协议处理器的本地模拟，不增加 CSS 包的运行时依赖。稳定接口范围与收尾事项见 [1.0 发布检查](https://ak-ui.yyj.moe/guide/stability)。

稳定版：**1.0.0**。从 0.2.x 升级请参阅 [迁移指南](https://ak-ui.yyj.moe/guide/migration-v1)，组件接口见 [Vue Registry API](https://ak-ui.yyj.moe/registry/api)。

## 使用 AI（推荐）

使用开放的 [Skills CLI](https://github.com/vercel-labs/skills) 安装公开 `ak-ui` Skill：

```bash
npx skills add YunYouJun/ak-ui --skill ak-ui
```

然后让 Agent 接入、构建、扩展或审查界面：

```text
使用 $ak-ui 将 ak-ui 设计语言接入当前项目，
保留现有品牌和组件的无障碍交互。
```

可以使用 `accent`、`system`（默认）或 `terminal` 控制风格强度。完整工作流与示例参阅 [AI Skill 指南](https://ak-ui.yyj.moe/guide/ai-skill)。

## 手动接入

```bash
pnpm add @yunyoujun/ak-ui
```

包统一发布到 [npm](https://www.npmjs.com/package/@yunyoujun/ak-ui)。`latest` 对应稳定版；试用发布候选版请使用 `pnpm add @yunyoujun/ak-ui@next`。历史 GitHub Packages 条目已删除，npm 是唯一包发布源。

只需要为自定义或 headless 组件提供设计基础时，引入语义 Token：

```ts
import '@yunyoujun/ak-ui/tokens.css'
```

使用现有 ak-ui 类名时，引入完整 CSS Core：

```ts
import '@yunyoujun/ak-ui/style.css'
```

或者使用 Sass 入口：

```scss
@use '@yunyoujun/ak-ui/scss';
```

通过 CDN 使用：

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@yunyoujun/ak-ui@latest/dist/ak-ui.min.css">
```

生产环境建议将 `@latest` 替换为具体版本号，以避免意外升级。

`tokens.css` 只声明带命名空间的 `--ak-*` 变量，不会重置全局元素。完整 CSS Core 除原有展示、导航与反馈模块外，还包含原生表单控件、`<dialog>` 和 Popover API 界面。你可以查阅[设计 Token 契约](https://ak-ui.yyj.moe/guide/tokens)，并在[组件文档](https://ak-ui.yyj.moe/components/)中浏览完整的 HTML 示例源码。

## Vue Registry

Vue 用户可以通过 shadcn-vue CLI 将可编辑的适配组件复制到项目中：

```bash
pnpm dlx shadcn-vue@latest add https://ak-ui.yyj.moe/r/button.json
pnpm dlx shadcn-vue@latest add https://ak-ui.yyj.moe/r/card.json
pnpm dlx shadcn-vue@latest add https://ak-ui.yyj.moe/r/input-number.json
pnpm dlx shadcn-vue@latest add https://ak-ui.yyj.moe/r/status.json
pnpm dlx shadcn-vue@latest add https://ak-ui.yyj.moe/r/progress.json
pnpm dlx shadcn-vue@latest add https://ak-ui.yyj.moe/r/notice.json
pnpm dlx shadcn-vue@latest add https://ak-ui.yyj.moe/r/tabs.json
```

复制后的 Vue 源码会引入与框架无关的 CSS 包，因此不需要额外的 ak-ui 运行时。使用方式和在线示例请参阅 [Vue Registry 指南](https://ak-ui.yyj.moe/registry/)。

## 设计语言与 Headless 组件

ak-ui 将行为和视觉分离。原生或 headless primitives 继续负责语义、键盘交互、状态和焦点；适配层只将渲染结构映射到 ak-ui Token 与几何规则。Skill 会优先复用项目已有 headless 库，Reka UI 只是可选的 Vue 示例。

- [ak-ui 设计语言](https://ak-ui.yyj.moe/guide/design-language)
- [Headless 适配协议](https://ak-ui.yyj.moe/guide/headless)
- [Reka UI 示例](https://ak-ui.yyj.moe/guide/reka-ui)
- [质量检查清单](https://ak-ui.yyj.moe/guide/quality)

架构迁移和实现历程记录在[项目复活日志](https://ak-ui.yyj.moe/guide/revival)中。

## 开发

```bash
pnpm install
pnpm dev
```

常用命令：

```bash
pnpm build               # 构建 dist CSS
pnpm docs:build          # 构建 VitePress 站点
pnpm lint                # 检查 SCSS
pnpm test:visual         # 在当前系统运行 Chromium、Firefox、WebKit 检查
pnpm test:visual:update:linux # 在与 CI 匹配的 Linux 容器中更新无损 WebP 基准图
pnpm test                # 运行全部验证，包括 Linux 视觉回归测试
```

首次在本机运行浏览器测试前执行 `pnpm exec playwright install chromium firefox webkit`。只有 Chromium 使用首页像素基准；Firefox/WebKit 验证页面、交互与布局。

`examples/` 中的文件是文档预览、展示源码与 Playwright 浏览器测试的唯一数据源。
仓库只记录桌面端与移动端首页的基准图。组件截图生成在 `test-results/` 中，并作为保留 14 天的 GitHub Actions 构建产物上传，不会写入 Git 历史。首页基准图使用固定版本的 Playwright Noble 容器生成，以确保本地更新结果与 Ubuntu 24.04 CI 渲染环境一致。

## OIDC 发布流程

仓库已有 [Release 工作流](.github/workflows/release.yml)，通过 npm Trusted Publishing（OIDC）发布，无需长期 npm Token。它已成功发布 `1.0.0`，并生成 provenance 来源证明。

1. 更新包版本和 Registry 中的对应依赖，将发布提交合入 `master`。
2. 等待同一提交的 CI 全部通过。
3. 创建并推送对应的 `v<version>` 标签，触发包验证、OIDC 发布和 GitHub Release notes。

预发布版本进入 `next`，稳定版本进入 `latest`。npm 可信发布者配置需匹配本仓库及 `release.yml` 文件名；修改身份配置时参阅 [npm 官方文档](https://docs.npmjs.com/trusted-publishers/)。

## 许可证

[MIT](./LICENSE)

这是一个与鹰角网络无关联的非官方界面研究项目。明日方舟及相关素材的权利归其各自权利人所有。请勿使用 Skill 复制游戏 Logo、角色插画、截图或拆包素材。
