# ak-loading 加载

::: demo loading/basic
:::

通过 `--ak-loading-color` 设置加载标记颜色。

`ak-loading-track` 提供终端启动时使用的线性 Loading 动效；`ak-loading-screen` 负责全屏背景、品牌区和淡出状态。两者都由 CSS Core 提供，完整主终端只组合这些组件，不维护第二份私有样式。

- `--ak-loading-track-width`：进度轨道宽度
- `--ak-loading-track-duration`：方块往返周期
- `--ak-loading-screen-background`：图片尚未完成时的底色
- `data-state="ready"`：触发全屏 Loading 淡出

## 终端 Loading

Loading 与主终端分开展示，避免文档访问时被过渡动画遮挡。该示例是唯一的完整 Loading 组合实现。

::: demo loading/terminal
:::

[打开全屏 Loading →](/showcase/loading)
