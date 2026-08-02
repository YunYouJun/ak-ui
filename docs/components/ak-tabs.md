# ak-tabs 终端导航

`ak-tabs` 用于同一任务上下文中的内容切换，`ak-segmented` 用于模式选择。示例包含点击与键盘方向键交互，且不依赖任何框架。

::: demo tabs/basic
:::

## Keyboard

- `ArrowLeft` / `ArrowRight`：切换到相邻标签。
- `Home` / `End`：移动到第一个或最后一个标签。
- 选中项使用 `aria-selected="true"`，面板通过 `aria-controls` 与标签关联。

视觉信号由 `--ak-tabs-signal` 和 `--ak-segmented-signal` 控制。Vue 项目后续可以用同一套 DOM 约定封装受控状态。
