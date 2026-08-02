# ak-form 表单

表单模块直接增强原生控件，不改变表单提交、键盘操作与辅助技术语义。使用 `ak-field` 组织标签与帮助文本，再将样式类挂到对应控件即可。

## Text Input / Textarea

::: demo form/text
:::

输入框与多行文本共享边框、聚焦和禁用状态。校验失败时可在控件上添加 `aria-invalid="true"`，不需要额外 JavaScript。

通过 `--ak-field-signal` 调整输入控件的聚焦信号色。

## Checkbox / Radio / Switch

::: demo form/choice
:::

Checkbox、Radio 与 Switch 都由原生 `<input>` 提供状态。Switch 仍是 checkbox，只需补充 `role="switch"` 与 `ak-choice--switch`。

选择控件可分别通过 `--ak-choice-signal` 与 `--ak-choice-fill` 调整边界和选中填充色。

## Select

::: demo form/select
:::

Select 保留原生选项面板与键盘行为，仅替换闭合状态下的视觉。

## Input Number

::: demo form/input-number
:::
