# ak-ui 复活记录

ak-ui 在 2019 年最后一天创建，最早是一组用于练习和复刻明日方舟界面语言的 SCSS 模块。2026 年重新打开仓库时，原有组件仍然有辨识度，但文档、部署和使用方式已经停留在上一代前端生态。

这次工作不是把旧代码全部推倒重写，而是保留它最有价值的部分：切角、警示色、状态层级和游戏界面气质，再为它补上一套可以继续迭代的现代基建。

<div class="ak-revival-log" aria-label="项目时间线">
  <div class="ak-revival-log__item">
    <time>2019.12</time>
    <strong>PROJECT INIT</strong>
    <span>创建仓库，确定 ak-ui 与 SCSS 模块方向。</span>
  </div>
  <div class="ak-revival-log__item">
    <time>2020.01—04</time>
    <strong>COMPONENT PHASE</strong>
    <span>完成按钮、卡片、地图物体、理智、关卡和分页等早期组件。</span>
  </div>
  <div class="ak-revival-log__item">
    <time>2020—23</time>
    <strong>MAINTENANCE</strong>
    <span>少量依赖维护，主要设计与文档进入休眠。</span>
  </div>
  <div class="ak-revival-log__item is-active">
    <time>2026.08</time>
    <strong>REACTIVATED</strong>
    <span>迁移 VitePress、重做作品站、接入 Registry、视觉测试和 Cloudflare Pages。</span>
  </div>
</div>

## 为什么重新开始

旧项目的问题不是“没有组件”，而是缺少一条从设计、示例、文档到发布的稳定路径：

- VuePress 站点与旧依赖难以继续维护。
- 示例与截图各自维护，容易出现展示内容和测试内容不一致。
- 组件只有 CSS 类名，Vue 用户需要重复包装交互和类型。
- 旧部署依赖 GitHub Pages，预览、域名和 CI 职责混在一起。
- 截图产物曾进入 Git 流量路径，影响日常推送体验。

因此重启的重点不是追逐组件数量，而是先把项目变成一个能够稳定生长的系统。

## 新架构

```text
src/scss/* ───────────────→ dist/ak-ui.css
      │                          │
      │                          └──→ Vue Registry adapters
      │
examples/*.html ──────────→ DemoPreview + displayed source
      │
      └───────────────────→ Playwright visual captures

GitHub ──→ CI checks ──→ Cloudflare Pages Git deployment
```

核心约束保持简单：

| Layer | Responsibility |
| --- | --- |
| CSS Core | 视觉、稳定类名和 `--ak-*` variables，不包含运行时 |
| HTML examples | 文档预览、显示源码和浏览器截图的唯一输入 |
| Vue Registry | 属性、插槽、事件、键盘交互和类型，可复制后修改 |
| VitePress theme | ak-ui 专属作品站与文档信息架构 |
| Playwright | 复用真实示例验证布局、交互和视觉结果 |
| Cloudflare Pages | 承接 Git 部署、预览地址和自定义域名 |

## 实现历程

### 1. VuePress → VitePress

站点迁移到 VitePress，并重写首页与文档主题。首页不使用默认 Hero 模板，而是围绕罗德岛终端、警示标尺和 Live Interface 构建自己的视觉叙事，同时支持协调的亮色与暗色模式。

### 2. 示例成为单一事实来源

所有组件示例迁移为 `examples/*.html`。`DemoPreview` 直接渲染这些文件并显示同一份源码，Playwright 也从相同清单逐个截图，因此不再维护文档示例、测试页面和截图页面三份副本。

### 3. 截图退出日常 Git 历史

组件截图在测试时生成，作为短期 CI Artifact 保存；仓库只保留桌面与移动首页两张视觉回归基准。这样仍能发现首页级视觉变化，又不会让几十张组件截图持续扩大推送流量。

### 4. CSS Core + Vue Registry

框架无关 CSS 继续作为视觉核心。Vue 用户可以通过 shadcn-vue CLI 把 Adapter 源码复制到项目中，获得类型、`v-model`、事件和键盘交互，同时保留直接修改源码的自由。

Registry 构建物由配置自动生成，验证脚本会创建临时消费项目并真实执行安装，避免出现“JSON 能生成，但用户项目装不上”的假成功。

### 5. CI 与部署分离

GitHub Actions 只负责 lint、构建、Registry 安装验证和 Playwright；Cloudflare Pages 通过 Git 集成负责站点部署。`pages.dev` 用于先行验证，自定义域名作为正式入口，旧 GitHub Pages 分支暂时保留为回退。

### 6. 继续补充视觉语汇

重启后的第一批新增组件聚焦于状态表达和终端反馈：Status/Tag、Progress/Gauge、Notice/Alert、Tabs/Segmented。它们既提供框架无关 HTML，也提供 Vue Adapter，并统一遵循可访问语义和 reduced-motion。

## 这次刻意没有做什么

- 没有把 ak-ui 改造成绑定 Vue 的运行时组件库。
- 没有一次性追求几十个通用组件。
- 没有把所有截图继续提交进仓库。
- 没有让 GitHub Actions 同时承担测试与生产部署。
- 没有隐藏旧代码，而是逐步为原有视觉补齐稳定 API。

## 下一阶段

接下来会优先组合更具明日方舟辨识度的业务组件，例如 Operation Card、Stage Node 与 Operator Card；同时补齐现有组件的 focus、disabled、键盘交互和 CSS variables 契约，再准备新的 npm 预览版本。

如果你也在维护一个休眠多年的个人项目，这次重启带来的最大经验是：先恢复反馈循环和发布路径，再扩充功能。能够持续验证的小项目，比一次性完成的“大重写”更容易真正活下来。

::: warning 非官方项目
ak-ui 是兴趣驱动的界面研究，与鹰角网络没有关联。游戏名称、图像及相关素材的权利归原权利人所有。
:::
