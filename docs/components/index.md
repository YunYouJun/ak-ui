# 组件与 Playground

在同一个入口中查找可复用的 CSS 模块，或体验 ak-ui 的完整界面。接入项目请从 [AI Skill](../guide/ai-skill)、[CSS Core](../guide/)、[Vue Registry](../registry/) 或 [A2UI（实验）](../guide/a2ui) 开始。

## 完整演示

<div class="ak-entry-grid">
  <a class="ak-entry-card" href="/showcase/">
    <span class="ak-entry-card__channel">TERMINAL / INTERACTIVE</span>
    <strong>主终端 Playground</strong>
    <p>切换职业立绘、配色与精英装饰，调节景深和透视，体验档案、资源浮层与任务弹窗。</p>
    <span class="ak-entry-card__action">打开主终端 →</span>
  </a>
  <a class="ak-entry-card" href="/showcase/fullscreen">
    <span class="ak-entry-card__channel">FULLSCREEN / TERMINAL</span>
    <strong>全屏终端</strong>
    <p>进入完整画布，体验主界面构图与交互。手机请横屏浏览。</p>
    <span class="ak-entry-card__action">进入全屏 →</span>
  </a>
  <a class="ak-entry-card" href="/showcase/loading">
    <span class="ak-entry-card__channel">FULLSCREEN / LOADING</span>
    <strong>全屏加载演示</strong>
    <p>单独查看启动加载画面、进度轨道与状态过渡。</p>
    <span class="ak-entry-card__action">体验加载 →</span>
  </a>
</div>

| 交互实验 | 可以体验什么 |
| --- | --- |
| [景深动画播放器](/showcase/#depth-playground) | 播放、暂停、拖动与循环分层动画，并切回指针控制 |
| [Vue Registry 交互](/registry/#vue-实际渲染) | 按钮事件、数值输入、进度联动、Tabs 和 Segmented |
| [A2UI 实验](/guide/a2ui) | 逐条接收消息、修改指挥代号、回传操作并更新界面；本地模拟，不执行真实部署 |

这里汇集已有的可交互示例，暂不提供在线代码编辑器。主终端素材的来源与许可见 [素材说明](/showcase/artwork)。

## 组件索引

按用途浏览组件预览并复制对应 HTML 源码；色彩与字体规范见本页下方。

| 分组 | 组件 |
| --- | --- |
| 基础规范 | [色彩与字体](#color-色彩) · [辅助类](./ak-helper) · [图标](./ak-icon) |
| 操作与导航 | [按钮](./ak-button) · [按钮组](./ak-button-group) · [表单](./ak-form) · [滑块](./ak-slider) · [终端导航](./ak-tabs) · [分页](./ak-pagination) |
| 布局与容器 | [卡片](./ak-card) · [面板](./ak-panel) · [分割线](./ak-divider) |
| 数据与状态 | [计数器](./ak-counter) · [进度与仪表](./ak-progress) · [理智](./ak-san) · [状态标记](./ak-status) · [关卡](./ak-level) |
| 反馈与浮层 | [对话框](./ak-dialog) · [浮层与提示](./ak-popover) · [战术通知](./ak-notice) · [加载](./ak-loading) |
| 视觉与媒体 | [图像与视频](./ak-media) · [效果](./ak-fx) · [物体](./ak-object) |

## Color 色彩

色彩层级参考游戏中的道具稀有度，并同时导出为 `--ak-color-*` CSS variables。

::: demo foundation/colors
:::

| Variable | Value |
| --- | --- |
| `--ak-color-low` | `#9c9c9c` |
| `--ak-color-basic` | `#d8dd5a` |
| `--ak-color-primary` | `#4aabea` |
| `--ak-color-secondary` | `#cfc2d1` |
| `--ak-color-advanced` | `#f1c644` |

## Typography 字体

标题与正文分别提供衬线和无衬线辅助类。

::: demo foundation/typography
:::

```css
.ak-font-serif {
  font-family: "Noto Serif SC", serif;
}

.ak-font-sans-serif {
  font-family: "Noto Sans SC", Roboto, Arial, sans-serif;
}
```

## 道具色彩参考

<div class="ak-item-palette" role="list" aria-label="道具稀有度色彩参考">
  <figure role="listitem">
    <img src="https://assets.yunyoujun.cn/ak-ui/assets/img/game/foreign-iron-fragments-5260686ebd99.webp" alt="异铁碎片">
    <figcaption>LOW / 低阶</figcaption>
  </figure>
  <figure role="listitem">
    <img src="https://assets.yunyoujun.cn/ak-ui/assets/img/game/basic-combat-record-e9fd4e37ef64.webp" alt="基础作战记录">
    <figcaption>BASIC / 基础</figcaption>
  </figure>
  <figure role="listitem">
    <img src="https://assets.yunyoujun.cn/ak-ui/assets/img/game/primary-combat-record-980d45fd3764.webp" alt="初级作战记录">
    <figcaption>PRIMARY / 初级</figcaption>
  </figure>
  <figure role="listitem">
    <img src="https://assets.yunyoujun.cn/ak-ui/assets/img/game/intermediate-combat-record-cf8323efbbc0.webp" alt="中级作战记录">
    <figcaption>SECONDARY / 中级</figcaption>
  </figure>
  <figure role="listitem">
    <img src="https://assets.yunyoujun.cn/ak-ui/assets/img/game/advanced-combat-record-f13fcd128ec0.webp" alt="高级作战记录">
    <figcaption>ADVANCED / 高级</figcaption>
  </figure>
</div>
