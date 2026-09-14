# 组件索引

按用途查找可复用的 CSS 模块；色彩与字体规范见本页下方。

| 分组 | 组件 |
| --- | --- |
| 基础规范 | [色彩与字体](#color-色彩) · [辅助类](./ak-helper) · [图标](./ak-icon) |
| 操作与导航 | [按钮](./ak-button) · [按钮组](./ak-button-group) · [表单](./ak-form) · [终端导航](./ak-tabs) · [分页](./ak-pagination) |
| 布局与容器 | [卡片](./ak-card) · [面板](./ak-panel) · [分割线](./ak-divider) |
| 数据与状态 | [计数器](./ak-counter) · [进度与仪表](./ak-progress) · [理智](./ak-san) · [状态标记](./ak-status) · [关卡](./ak-level) |
| 反馈与浮层 | [对话框](./ak-dialog) · [浮层与提示](./ak-popover) · [战术通知](./ak-notice) · [加载](./ak-loading) |
| 视觉与媒体 | [图像与视频](./ak-media) · [效果](./ak-fx) · [物体](./ak-object) |

想看组件如何组合成完整页面？前往 [主界面演示](/showcase/)、[全屏终端](/showcase/fullscreen) 或 [全屏加载演示](/showcase/loading)。

接入项目请从 [AI Skill](../guide/ai-skill)、[CSS Core](../guide/)、[Vue Registry](../registry/) 或 [A2UI（实验）](../guide/a2ui) 开始。

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
