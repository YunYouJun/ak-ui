# ak-popover 浮层

Popover 与 Tooltip 基于浏览器 [Popover API](https://developer.mozilla.org/docs/Web/API/Popover_API)。打开状态由 `:popover-open` 表达，不维护第二套 JavaScript 状态。

## Popover

::: demo overlay/popover
:::

普通信息浮层使用 `popover` 与 `popovertarget` 即可完成点击打开、轻触外部关闭和 Escape 关闭。支持 CSS Anchor Positioning 的浏览器会按触发元素定位；其他浏览器保持可用的居中回退。

Popover 公开 `--ak-popover-signal` 与 `--ak-popover-info`；Tooltip 可通过 `--ak-tooltip-signal` 调整边框信号色。

## Tooltip

Tooltip 使用 `popover="manual"`，由触发元素的 hover 与 focus 事件调用 `showPopover()` / `hidePopover()`。务必同时支持键盘焦点，并使用 `aria-describedby` 关联说明内容。
