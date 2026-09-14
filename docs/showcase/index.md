---
title: 仿罗德岛主终端
description: 使用 ak-ui CSS Core 组合的完整明日方舟主界面示例
aside: false
sidebar: false
---

# 仿罗德岛主终端

[Playground 总览](/playground/) · 完整演示：[主界面](/showcase/) · [全屏终端](/showcase/fullscreen) · [全屏加载](/showcase/loading) · [素材说明](/showcase/artwork)

这是参考 Arknights UI H5、用同一套 ak-ui CSS Core 实现的仿主终端界面：布局以 `1366 × 653` 为设计基准，左右菜单使用真实透视变换，背景、小云立绘、档案、侧栏和指令区按景深响应指针。点击资源、博士档案和任务，可以体验原生 Popover 与 Dialog。菜单采用轻量按压反馈，景深回正使用柔和缓动；弹窗保持视口居中并支持进出场过渡，同时尊重减少动态效果的系统设置。

<AkShowcase />

### 立绘 Playground

点击预览上方的职业卡片，可切换先锋、近卫、重装、狙击、术师、医疗、辅助、特种八套小云立绘；点击「原版」恢复初始战术立绘。主画面与助理缩略图同步更新，菜单、弹窗和景深交互保持可用。v2 分别采用琥珀黄、绯红、钴蓝、橄榄绿、紫罗兰、薄荷绿、玫瑰粉、橙黑配色，并用冲刺、持剑、持盾、跪姿瞄准、悬浮施法等姿态强化小图辨识度。代表色为本项目自定义设计。发卡融入 ak-ui 项目 logo；点击「下载 PNG 原图」可保存未压缩的原始素材。

「职业配色 / 原版蓝白」可在两个系列间切换，并保留所选职业。原版蓝白展示初版八职业的服饰与姿势；职业配色中的近卫与辅助已进一步协调发饰配色、头身光影并修正手臂结构。

「精英装饰」支持全部八职业配色：先锋的部署信标、近卫的断裂钢构与剑势、重装的防御壁垒、狙击的侦察掩体、术师的结晶阵列、医疗的救援工作站、辅助的悬浮档案、特种的机械锚点。勾选后可在同一终端比较纯立绘与带装饰的构图；原版蓝白仍展示纯立绘。装饰与角色一同保留透明背景，适合叠加在终端场景中。

立绘与背景均从 `assets.yunyoujun.cn` 在线加载 WebP；职业卡片使用 640px 缩略图，选中后加载完整尺寸立绘。当前素材链接打开 WebP，「下载 PNG 原图」保留原始素材。切换加载失败时保留已显示的立绘。

先锋回复的是部署费用（DP / Cost）；技力用于技能充能。这里只演示职业立绘与定位，不模拟战斗数值。

### 景深调节

展开预览上方的「景深调节」，可实时修改水平／垂直幅度、背景／人物／界面层强度、透视距离与菜单倾角。先点击「预览左上」或「预览右下」，再拖动滑块，可以在固定方向上比较变化；「回到中心」清除预览位移，「恢复默认参数」恢复全部初始值。

横纵幅度乘以各层强度决定实际位移。界面层强度会按比例调整菜单、档案和项目链接，保留原有层次。关闭「启用指针景深」只关闭动态位移，静态透视仍可调；系统开启减少动态效果时，同样保持动态位移关闭。参数仅影响当前预览，不写入组件默认值。

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

布局比例、菜单材质和透视参数从 [Arknights UI H5](https://ak.2heng.xin/) 及其 [MIT 源码](https://github.com/mashirozx/arknights-ui) 中测量并重新抽象为 token；Demo 使用小云的 AI 辅助战术立绘与无人物工业背景。小云原设由 Ai_Floverse 绘制，人物设定来自 [YunYouJun/yun](https://github.com/YunYouJun/yun)，角色衍生图遵循 CC BY-NC-SA 4.0；代码仍使用 MIT。素材来源及生成提示词见 [素材说明](/showcase/artwork)。

竖屏沿用参考交互，只显示横屏提示；横屏和桌面端保持完整主终端结构。

## Core 接口

- 材质：`--ak-dashboard-paper`、`--ak-dashboard-muted`、`--ak-dashboard-dark`、`--ak-dashboard-cyan`
- 可选纸面纹理：`--ak-dashboard-paper-image`，示例复用仓库已有纹理图
- 强调色：`--ak-dashboard-accent`、`--ak-dashboard-signal`、`--ak-dashboard-info`
- 面板几何：`--ak-dashboard-menu-width`、`--ak-dashboard-menu-height`、`--ak-dashboard-menu-top`、`--ak-dashboard-menu-right`
- 五段节奏：`--ak-dashboard-menu-resource-track`、`--ak-dashboard-menu-operation-track`、`--ak-dashboard-menu-card-inset`、`--ak-dashboard-menu-card-trim`
- CSS 3D：`--ak-dashboard-perspective`、`--ak-dashboard-tilt`、`--ak-layer-x`、`--ak-layer-y`
- 景深控制：原生 `createDashboardDepth()`；Vue Registry `useDashboardDepth()`
- 指令材质：`ak-command--paper / --muted / --dark / --cyan / --operation`
- 终端密度：`ak-counter--terminal`、`ak-counter-group--terminal`、`ak-san-container--terminal`
- 启动状态：`ak-loading-screen`、`ak-loading-track`、`data-state="ready"`

## 动态细节

参考页加载完成后包含前景尘粒、背景与角色分层和透视菜单。本示例补充了不拦截点击的轻量尘粒、低幅菜单景深、纸质面板纹理与斜切语音标签。系统开启减少动态效果后，漂浮和动态位移会停用。背景、小云透明立绘和菜单分别使用 0.02、0.065、0.12 的景深系数；人物层不拦截点击，也不会随背景移动产生原角色重影。
