---
title: 官网风格覆盖与示例
description: 明日方舟官网风格的提取覆盖、证据边界、组件组合与动效示例
---

# 官网风格覆盖与示例

**目前是部分提取与独立适配，不能称为“完美提取”。** 2026-09-19 复查了[官网](https://ak.hypergryph.com/#index)六个桌面主区域，以及 390 × 844 竖屏下的情报区和展开菜单。两份公开 CSS 的 SHA-256 与 2026-09-15 的研究记录一致；这不代表官网所有资源和运行逻辑都未改变。

本页将设计依据、现有实现与待补内容分开。原始布局、颜色和字号见[官网 UI 研究](./official-site-study)，新增证据见[复查记录](https://github.com/YunYouJun/ak-ui/blob/master/research/official-site/2026-09-19.json)。

## 检查结论

<div class="official-site-table" role="region" aria-label="提取覆盖对照表，可横向滚动" tabindex="0">

| 维度 | 已有内容 | 本次发现与补充 | 仍有缺口 |
| --- | --- | --- | --- |
| 设计规范 | 颜色角色、几何、排版、密度、响应式与无障碍约定 | Skill 新增官网来源与映射，区分无衬线导航和粗衬线操作标题 | 没有覆盖官网全部页面、状态与素材体系 |
| 组件 | 双语链接导航、新闻列表、内容目录，以及按钮、Tabs、媒体等基础组件 | Skill 新增已有 API 的组合示例与访问路径 | 1.1.0 新增章节导航、移动菜单、档案／媒体画廊；游戏业务与素材仍由产品提供 |
| 动效 | 独立入场、数字增长、照片弧线、指针视差及降级逻辑 | Skill 新增参数、触发方式、清理流程和官网 CSS 动效证据 | 1.1.0 已独立实现章节切换、粒子与真实加载；官网私有着色器及完整时间线未验证 |
| 示例 | 单组件演示与游戏终端 showcase | 新增下方原创产品更新页组合，并集中列出交互演示 | 终端 showcase 不能证明官网首页已经复刻 |

</div>

这里的“已有”表示可复用的 ak-ui 实现，不表示与官网像素或时间线相同。仅安装 skill 时也能读到官网规则、覆盖表、动效参数与 HTML／JavaScript 示例，不必依赖完整仓库。

## 1.1.0 补齐的交互

[打开六章节完整示例 →](/showcase/website) · [组件 API 与复制用法](/components/ak-site)

新增 `/site` 五个独立控制器和 Registry `site`：章节导航支持原生滚轮／触摸、hash／history、位置索引、键盘与焦点；移动菜单使用原生 Dialog；档案／媒体画廊支持选择、滑动、大图和离场媒体暂停；资源加载提供真实任务进度、失败重试和取消；粒子场支持三种形态、暂停、离屏暂停、WebGL／2D／静态降级。示例使用原创 SVG。

旧 `.ak-fx--glow`、`.ak-fx--outline`、`.ak-loading` 和 `.ak-loading-track__runner` 已在 1.1.0 停用减少动态效果模式下的循环。详情见[动效组件](/components/ak-fx)。这些独立实现补齐了可复用能力，仍不代表官网私有着色器或全部转场逐帧一致。

## 组件组合：产品更新情报

`system` 强度，复用 `.ak-nav`、`.ak-news-list` 与 `.ak-button`。示例使用双语层级、非对称版面、细分隔线和局部青色信号；宽容器左右分区，窄容器自然堆叠。内容和排版为独立示例，不使用游戏素材。

<div class="vp-raw">

::: demo site/briefing
:::

</div>

展开源码可复制 HTML 与局部样式；在项目入口导入 `@yunyoujun/ak-ui/style.css`。示例链接指向本站文档，接入其他项目时替换为真实路由，再按实际当前位置设置 `aria-current`。

导航与新闻列表提供原生链接行为。筛选、排序、当前章节同步、折叠菜单仍由调用方负责；不要把静态 CSS 当成这些交互的实现。

## 动效：有依据的观察与适配

<div class="official-site-table" role="region" aria-label="动效证据对照表，可横向滚动" tabindex="0">

| 官网证据 | 提取到的规则 | ak-ui 中的使用方式 |
| --- | --- | --- |
| 导航与更多链接 `.3s` 颜色过渡 | 控件反馈同时改变文字／表面或标记 | 使用现有 `--ak-motion-base`（200ms），明确是适配值 |
| 竖屏菜单 `opacity/transform .2s`，逐项延迟 70ms | 同组内容顺序入场 | 使用 `createEntrance` 显式传入 `duration: 200`、`delay: index * 70`；位移和 easing 仍是适配选择 |
| 首页画布 `scale(1.2 → 1)`、`2s`；标题位移 `1s`；装饰层 `.6s` 淡入 | 主视觉、标题、装饰采用不同节奏 | 只在专题主视觉中选择性使用；未验证完整触发时序和画布内部实现 |

</div>

CSS 来源：[导航与菜单](https://web.hycdn.cn/arknights/official/_next/static/css/144c734e19afaa20.css)、[首页与情报](https://web.hycdn.cn/arknights/official/_next/static/css/6aed155137c3fe93.css)。移动菜单的七项延迟 `0–420ms` 同时由打开前后的 DOM 计算样式确认。源码时长不等于完整播放验证。

下面演示的是 **ak-ui 的独立入场与数字增长扩展**，可修改方向、数值、时长并分别重播；并非官网原版动画。开启系统“减少动态效果”时直接呈现最终状态。

<EffectsPlayground />

`createEntrance` 默认 650ms，`createCountUp` 默认 1000ms；它们不会自动读取 CSS 的 120/200/420ms Token。创建控制器后需调用 `play()`，页面卸载时需调用 `destroy()`。仅添加 `data-ak-enter` 属性不会自动生效；它属于文档示例适配器的约定。完整用法见[效果组件](../components/ak-fx)。

## 更多相关示例

| 需要实现的内容 | 示例 |
| --- | --- |
| 双语导航、当前标记、竖排目录 | [链接导航](../components/ak-nav) |
| 分类、长标题、时间、空状态 | [新闻列表](../components/ak-news-list) |
| 前后照片独立旋入与重播 | [双图弧线入场](../components/ak-media#双图分层弧线入场) |
| 区块入场、数字变化 | [区块入场与数字增长](../components/ak-fx#区块入场与数字增长) |
| 视差层、独立区块重播 | [主终端演示](../showcase/)（游戏界面方向的扩展） |

## 让 Skill 使用这些规则

```text
使用 $ak-ui 的 system 模式，参考官网的双语导航、新闻行和细分隔线，
构建产品更新页。保留品牌，使用真实内容与现有组件。
区分官网观察值与 ak-ui 适配值，并验证窄屏、键盘焦点和减少动态效果。
```

Skill 入口现在能按任务加载：

- `references/official-site.md`：来源、字体角色、响应式原则、动效证据和覆盖表。
- `references/site.md`：1.1.0 交互组件、DOM 契约、生命周期与边界。
- `references/motion.md`：动效选择、参数、触发、生命周期和降级。
- `references/examples.md`：可复制的导航／新闻结构、入场编排和无障碍计数示例。

接入方式见[使用 AI Skill](./ai-skill)。1.1.0 的导航、菜单、画廊、粒子和加载均有实现与回归验证；官网全部状态与内部渲染时间线仍不在已验证范围。
