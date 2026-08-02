# ak-dialog 对话框

`ak-dialog` 基于原生 `<dialog>`：浏览器负责顶层渲染、焦点管理、Escape 关闭与背景层，Core 只提供结构样式。

::: demo overlay/dialog
:::

使用 `showModal()` 打开模态对话框；关闭操作可以使用 `method="dialog"` 的表单，因此确认与取消按钮不需要额外事件处理。

```js
const dialog = document.querySelector('#operation-briefing')
dialog.showModal()
```

结构类包括 `ak-dialog__header`、`ak-dialog__title`、`ak-dialog__body` 与 `ak-dialog__footer`。标题应通过 `aria-labelledby` 与对话框关联。

通过 `--ak-dialog-signal` 和 `--ak-dialog-info` 调整边缘状态色与上方信息色。
