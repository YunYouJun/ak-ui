---
title: 升级到 1.0
description: 从 ak-ui 0.2.x 升级到 1.0 的兼容性与验证步骤
---

# 升级到 1.0

本页对应 **1.0.0** 正式版。现有 CSS / Token / Sass / depth 导出路径保持不变，218 个既有 `.ak-*` 类名和 63 个基础 Token 均有兼容性基准检查。

## CSS 与 Token 使用者

固定版本安装，避免随着标签漂移：

```bash
pnpm add @yunyoujun/ak-ui@1.0.0
```

继续使用 `style.css`、`tokens.css` 或 `scss` 原有入口，无需批量替换类名。正式版发布到 npm 的 `latest` 标签；生产环境建议固定精确版本。

```ts
import '@yunyoujun/ak-ui/tokens.css'
// 或完整组件样式：import '@yunyoujun/ak-ui/style.css'
```

Token-only 仍只有命名空间变量，没有元素重置。内部 Sass partial 不属于稳定导入路径，请使用公开 Sass 入口。

## Vue Registry 使用者

先更新 CSS 包，再逐项比较已经复制到消费项目的 Vue 源码。不要直接覆盖自行修改过的组件。Registry 条目现在指向正式包版本；公开站点需要与该包发布同步，避免站点先指向尚未发布的版本。

1.0 的行为收尾包括：

- Input Number 的 NaN/Infinity、反向边界和小数步进获得确定行为。
- Progress/Gauge 的非有限值不再进入 CSS 和 ARIA，反向区间收敛到下界。
- Tabs 在条目删除或 model 无匹配项时回退到首项，面板可通过 Tab 进入；Segmented 补充 group 语义。
- depth 在 pointerleave 时取消排队动画；实时响应减少动效偏好，destroy 后停止响应。

有效的常规输入和原有组件接口不变。依赖上述异常输入或销毁后继续移动的代码应按 [Registry API](/registry/api) 调整。

## 验收与回退

在自己的页面确认明暗背景、布局、键盘焦点、Dialog/Popover、表单和 reduced-motion。自动化覆盖 Chromium、Firefox 与 Playwright WebKit；WebKit 测试不是 Safari 应用或真机 iOS 测试。

回退时固定 CSS 包为 `@yunyoujun/ak-ui@0.2.1`，并从消费项目的版本控制恢复对应 Registry 源码。保留升级前 lockfile 与定制组件差异。

## A2UI

A2UI 继续作为独立文档实验。使用 CSS 或 Vue Registry 不需要安装 A2UI，也不需要修改现有项目结构。实验协议、目录和演示代码不属于 1.x 稳定 API。
