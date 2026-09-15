# ak-card 卡片

## outline 描边卡片

::: demo card/outline
:::

## stripe 条纹卡片

::: demo card/stripe
:::

## place 人物放置卡片

增加 `tabindex="0"` 可以让卡片通过键盘获得焦点，并保持与鼠标按下相同的选中状态。

用于角色选择时，可在原生 `button` 上使用 `ak-card ak-card--place`，通过 `aria-pressed="true"` 持续显示选中效果。未选中的按钮设置 `aria-pressed="false"`，焦点移动不会改变选择。

::: demo card/place
:::

卡片底部颜色由 `--ak-card-place-color` 控制。
