# ak-icon 图标

::: info 开发分支预览
本页图标优化从 **1.0.0** 正式版开始提供，包括 `ak-icon--stroke` 与新增的 `--ak-icon-*` 变量；继续兼容 `ak-icon`、`ak-icon--stuff` 和 `--icon-border-color`。
:::

图标负责快速传达动作、状态和资源类别。`ak-icon` 统一 SVG 的尺寸、基线和颜色继承；线性图标加上 `ak-icon--stroke`，材料徽章使用 `ak-icon--stuff`。

本页示例使用内联 SVG，复制后即可显示，无需加载远程图标脚本。这些示意图形用于展示样式，不是完整的游戏素材库。

## 基础图标

同一组图标使用 `24 × 24` 的坐标系与一致线宽。用 `--ak-icon-size` 调整显示尺寸，用父元素的 `color` 控制颜色。

::: demo icon/basic
:::

```html
<svg class="ak-icon ak-icon--stroke" viewBox="0 0 24 24"
     aria-hidden="true" style="--ak-icon-size: 24px; color: #007aa8;">
  <circle cx="12" cy="12" r="7" />
  <path d="M12 2v3m0 14v3M2 12h3m14 0h3" />
</svg>
```

填充图标只需 `ak-icon`；`ak-icon--stroke` 会设置 `fill: none`、圆角线端与 `currentColor` 描边，不应加在多色插画上。已有的 Iconfont `<use href="#symbol-id">` 仍可使用，但需要消费项目自行提供对应的 SVG symbol。

## 材料徽章

细环边、深色内衬与适度留白让材料轮廓更清晰。四种配色展示同一组件的定制方式；名称承担资源识别，不仅靠颜色区分。

::: demo icon/stuff
:::

徽章默认直径 `5rem`，内部图形占直径的约 58%，不会再放大到环边外。名称与说明放在外部，SVG 本身作为装饰隐藏。

## 操作与状态

文字按钮用于主要动作；纯图标按钮需要明确的无障碍名称。点击「锁定目标」或使用键盘激活，状态文字会同步变化；右侧图标按钮用于重置。

::: demo icon/actions
:::

- 有文字标签时，为 SVG 添加 `aria-hidden="true"`，避免重复朗读。
- 纯图标按钮使用 `aria-label`，并保留原生 `<button>` 的键盘交互。
- 独立传达信息的 SVG 使用 `role="img"` 和 `aria-label`，或关联唯一的 `<title>`。
- 调整图标尺寸不等于扩大点击区域；操作按钮建议至少保留 `44 × 44px` 的目标尺寸。

## 样式变量

| 变量 | 默认值 | 用途 |
| --- | --- | --- |
| `--ak-icon-size` | `1em` | 基础图标的宽高，默认随文字字号缩放 |
| `--ak-icon-stuff-size` | `5rem` | 材料徽章的直径 |
| `--ak-icon-stuff-color` | `#d8dd5a` | 材料环边与默认图形颜色 |
| `--ak-icon-stuff-background` | `#171d22` | 材料内衬的底色 |
| `--icon-border-color` | `#d8dd5a` | 兼容旧用法；未设置新配色变量时作为回退 |

新配色变量优先于 `--icon-border-color`。业务图形可以继续使用自己的颜色；现有 `ak-icon`、`ak-icon--stuff` 类名和旧变量保持可用。
