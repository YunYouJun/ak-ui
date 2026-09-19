---
title: 官网 UI 研究
description: 基于明日方舟官网的可追溯样式观察、组件拆解与 ak-ui Token 映射
---

# 官网 UI 研究

> **2026-09-19 复查：** 两份 CSS 哈希与本记录一致；新增检查六个桌面区域和竖屏菜单，并补充菜单错峰、首页分层过渡的证据。当前结论仍为部分提取。查看[覆盖表与可运行示例](./official-site-examples)。下文保留 2026-09-15 的原始观察。

本轮记录于 **2026-09-15**，观察[明日方舟官网](https://ak.hypergryph.com/)的首页、情报与设定区域。桌面视口为 1280 × 720，竖屏为 390 × 844。结论来自页面视觉、DOM 计算样式和公开 CSS；这不是官方设计规范。

机器可读记录位于仓库的 `research/official-site/2026-09-15.json`，包含来源 URL、解压后 CSS 的 SHA-256、选择器片段、原始单位与视口测量。散列类名仅用于回溯本轮证据，不作为组件接口。

## 这轮学到什么

### 导航的双语层级

桌面导航以窄体英文作为主标签，较小的中文作为补充；当前区域用青色强调。官网声明的英文导航字体是 `Oswald-Medium`，中文是 `SourceHanSans-Medium`。这支持为内容索引采用窄体无衬线展示字，而不是将 ak-ui 的粗衬线操作标题规则应用到所有标题。[来源：导航 CSS](https://web.hycdn.cn/arknights/official/_next/static/css/144c734e19afaa20.css)

迁移时按产品的主要语言建立层级。导航使用原生链接和 `aria-current="location"`（同页区域）或 `aria-current="page"`（独立页面）；选中状态增加下划线或边缘标记，避免只依赖颜色。这是 ak-ui 的适配要求，不是对官网无障碍实现的描述。

### 新闻行的固定槽位

情报区将分类、日期、标题分开排布，用细分隔线形成列表节奏；标题最多展示两行。桌面日期位于标题上方，竖屏则将日期移到右侧。分类信号、内容与时间各自对齐，比给每条新闻添加卡片阴影更适合快速扫描。[来源：情报区域](https://ak.hypergryph.com/#information)

适合提炼的组件结构为 `category + time + title`。标题保持完整的链接文本；CSS 截断不应截掉 DOM 内容。窄屏长标题应允许换行，空间不足时将日期放回下一行。

### 内容目录与页面位置

设定区域使用粗中文标题、较小的英文补充和横向分隔线。右侧页码跟随当前区域变化，承担定位作用。可借鉴为内容目录、章节索引与阅读位置提示；仅在确实存在章节序列时显示编号。[来源：设定区域](https://ak.hypergryph.com/#world)

### 操作反馈与表面

更多情报入口使用实色矩形；小型更多链接采用灰底浅字，悬停规则切换为白底黑字。这里可复用的是前景与背景同时变化的反馈，而不是为所有按钮添加辉光。[来源：页面 CSS](https://web.hycdn.cn/arknights/official/_next/static/css/6aed155137c3fe93.css)

## 源值与适配角色

以下值来自两份公开 CSS：[导航样式](https://web.hycdn.cn/arknights/official/_next/static/css/144c734e19afaa20.css)、[页面样式](https://web.hycdn.cn/arknights/official/_next/static/css/6aed155137c3fe93.css)。映射列是 ak-ui 的设计决策；含义相近不代表默认值相同。

| 观察对象 | 官网源值 | ak-ui 适配 |
| --- | --- | --- |
| 当前导航 | `#19d1ff` | 局部映射 `--ak-signal-info` |
| 新闻分类 | `#18d1ff` | 合并到同一个信息信号角色 |
| 新闻文字 | `#d2d2d2` | `--ak-text-secondary`，结合实际背景检查可读性 |
| 新闻行分隔线 | `1px solid hsla(0,0%,100%,.3)` | 线宽用 `--ak-line-hairline`；颜色作为局部变量 |
| 英文／中文导航字号 | `1.375rem` / `.875rem` | 学习比例，不直接替换全局字号 |
| 日期字体与字距 | `Bender-Regular` / `1px` | 使用 `--ak-font-mono` 的数据角色；不要求相同字体 |
| 标题字距 | `2px` | 仅短标签考虑加宽，长标题保持易读 |
| 桌面新闻行高度 | `6rem` | 改为最小高度，让内容决定最终高度 |
| 更多链接背景 | `#585858` | 组件局部表面变量 |
| 更多链接颜色过渡 | `.3s` | 使用现有 `--ak-motion-base`，无需新增近似时长 |

`#18d1ff` 与 `#19d1ff` 的差异不足以证明两套语义。当前证据也不能推导成功、危险、警告色，更不能证明现有黄色操作 token 来自官网。

## 尺寸与响应式证据

| 测量项（CSS px） | 1280 × 720 | 390 × 844 |
| --- | --- | --- |
| 新闻行高度 | 64 | 59.27 |
| 新闻标题字号 | 12 | 10.4 |
| 日期字号 | 10.67 | 8.32 |

官网使用缩放后的 `rem`，竖屏实测根字号为 `8.32px`，并通过 `@media (orientation: portrait)` 重组布局：新闻行从 `6rem` 改为 `7.125rem`，内容容器使用 `row-reverse`，日期位于右侧。竖屏还将主图放到列表上方，导航折叠为菜单。[来源：页面 CSS](https://web.hycdn.cn/arknights/official/_next/static/css/6aed155137c3fe93.css)

因此不能把源值 `6rem` 理解为固定 96px，也不应把这些偏小的实测字号直接作为通用组件默认值。ak-ui 应保留用户根字号、至少 44px 的交互目标，并根据内容是否放得下选择断点。

## 可复用的组件契约

这些是待实现或供项目自有组件使用的模式，不是新增的 CSS Core / Registry API。

| 模式 | 部件 | 必需状态与行为 | Token 映射 |
| --- | --- | --- | --- |
| 双语导航项 | 主标签、补充标签、当前标记 | 链接、当前、悬停、键盘焦点 | sans、info、focus、space |
| 新闻条目 | 分类、时间、标题、分隔线 | 完整链接文本、换行、焦点 | text、info、hairline、density |
| 内容索引项 | 标题、补充名、分隔线 | 链接或展开按钮，按实际行为选择 | command 或 sans、text、line |
| 更多入口 | 动作文本、方向图标 | 前景／背景反馈、焦点、减少动态效果 | surface、text、motion、focus |
| 章节位置 | 当前章节、总数、名称 | 随真实位置同步；提供文字含义 | data、mono、info |

### 局部组件 Token 配方

下例用于项目自有新闻列表。`--bulletin-*` 是示例的局部变量，不属于公开 `--ak-*` 契约。数值是为了可读性做的适配，不是官网提取值。

```css
.bulletin {
  --bulletin-divider: color-mix(in srgb, var(--ak-text-primary) 30%, transparent);
  --bulletin-row-min-height: 4.5rem;
  --bulletin-category-width: 3rem;
  color: var(--ak-text-primary);
  background: var(--ak-surface-canvas);
}

.bulletin__item {
  display: grid;
  grid-template-columns: var(--bulletin-category-width) minmax(0, 1fr);
  align-items: center;
  gap: var(--ak-space-4);
  min-height: max(var(--ak-density-control-height), var(--bulletin-row-min-height));
  padding-block: var(--ak-space-3);
  border-bottom: var(--ak-line-hairline) solid var(--bulletin-divider);
  color: inherit;
  text-decoration: none;
}

.bulletin__category { color: var(--ak-signal-info); }
.bulletin__title { overflow-wrap: anywhere; }
.bulletin__time {
  color: var(--ak-text-secondary);
  font-family: var(--ak-font-mono);
}
.bulletin__item:hover .bulletin__title { text-decoration: underline; }
.bulletin__item:focus-visible {
  outline: var(--ak-focus-width) solid var(--ak-focus-color);
  outline-offset: var(--ak-focus-offset);
}
```

结构使用原生 `<a class="bulletin__item">`，其中放分类和内容容器，内容容器内放 `<time datetime="…">` 与完整标题。不要给整行添加裁切，以免隐藏焦点轮廓。

## 本轮边界

记录不包含官方素材或字体文件，也没有修改现有公开 token 默认值。字体名称是 CSS 声明，不代表已验证每个字形的实际字体。悬停色与时长通过源码确认，未完整验证动效播放、键盘流程、所有菜单状态或其他页面。

后续实现优先考虑新闻条目与双语导航；先在真实组件中验证可读性、状态和响应式，再决定是否提升为稳定公开 token。继续遵循 [Token 契约](./tokens)与[设计语言](./design-language)。


## 已落地的组件

研究后的第一轮实现采用 `system` 强度，保持现有全局 token 和组件默认行为：

- [ak-news-list 新闻列表](../components/ak-news-list)：独立的内容列表，含空状态和容器响应式布局。
- [ak-nav 链接导航](../components/ak-nav)：原生链接、主副标签、当前标记；竖排变体同时承担内容目录。
- 更多操作、计数和面板切换继续复用 Button、Counter、Tabs。

新增组件只进入 CSS Core；本页上方的原始观察和 `--bulletin-*` 配方保留为研究证据，正式使用以组件文档为准。
