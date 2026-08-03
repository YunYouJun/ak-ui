---
title: 罗德岛主终端
description: 使用 ak-ui CSS Core 组合的完整明日方舟主界面示例
aside: false
---

# 罗德岛主终端

这是用同一套 ak-ui CSS Core 重建的主终端界面：布局以 `1366 × 653` 为设计基准，左右菜单使用真实透视变换，背景、档案、侧栏和指令区按景深响应指针。点击资源、博士档案和任务，可以体验原生 Popover 与 Dialog。

<AkShowcase />

[打开全屏终端 →](/showcase/fullscreen)

[单独查看 Loading →](/showcase/loading)

## 复用关系

| 界面区域 | 复用的 Core module |
| --- | --- |
| 顶部资源 | Counter / Counter Group 的 `terminal` 密度 |
| 博士档案 | Dashboard Profile / Popover |
| 助理与公告 | Dashboard Plane / News / Utility |
| 当前行动 | Sanity / Command / Popover |
| 主菜单 | Command / Command Group |
| 每日任务 | Dialog / Progress / Button |
| 景深反馈 | Dashboard Layer / CSS 3D Plane |
| 启动同步 | Loading Screen / Loading Track |

## 由完整界面暴露的缺口

本次把视觉能力收敛进 `ak-dashboard`、`ak-command`、`ak-counter` 和 `ak-san`：前者提供画布、景深和左右透视平面，后三者提供可在其他终端页面复用的材质与密度变体。角色背景、具体文案和任务数据仍属于示例，不进入 Core。

布局比例、菜单材质和透视参数从 [Arknights UI H5](https://ak.2heng.xin/) 及其 [MIT 源码](https://github.com/mashirozx/arknights-ui) 中测量并重新抽象为 token；Demo 沿用 ak-ui 仓库已有角色与背景图片，没有引入参考项目中的游戏拆包素材，也没有复制一套孤立实现。

竖屏沿用参考交互，只显示横屏提示；横屏和桌面端保持完整主终端结构。

## Core 接口

- 材质：`--ak-dashboard-paper`、`--ak-dashboard-muted`、`--ak-dashboard-dark`、`--ak-dashboard-cyan`
- 强调色：`--ak-dashboard-accent`、`--ak-dashboard-signal`、`--ak-dashboard-info`
- 面板几何：`--ak-dashboard-menu-width`、`--ak-dashboard-menu-height`、`--ak-dashboard-menu-top`、`--ak-dashboard-menu-right`
- 五段节奏：`--ak-dashboard-menu-resource-track`、`--ak-dashboard-menu-operation-track`、`--ak-dashboard-menu-card-inset`、`--ak-dashboard-menu-card-trim`
- CSS 3D：`--ak-dashboard-perspective`、`--ak-dashboard-tilt`、`--ak-layer-x`、`--ak-layer-y`
- 景深控制：原生 `createDashboardDepth()`；Vue Registry `useDashboardDepth()`
- 指令材质：`ak-command--paper / --muted / --dark / --cyan / --operation`
- 终端密度：`ak-counter--terminal`、`ak-counter-group--terminal`、`ak-san-container--terminal`
- 启动状态：`ak-loading-screen`、`ak-loading-track`、`data-state="ready"`
