# ak-status 状态标记

用于表达职业、稀有度、部署状态和终端连接状态。`ak-tag` 适合短标签，`ak-status` 适合带说明的实时状态。

::: demo status/basic
:::

## Tag variants

| Class | Use case |
| --- | --- |
| `.ak-tag` | 主状态、职业或默认分类 |
| `.ak-tag--advanced` | 高稀有度、警戒或重要内容 |
| `.ak-tag--danger` | 危险、感染、禁止状态 |
| `.ak-tag--neutral` | 未编入、离线、次要状态 |

通过 `--ak-tag-signal`、`--ak-tag-text` 和 `--ak-tag-surface` 覆盖局部视觉。

## Status variants

`ak-status` 提供 `warning`、`critical` 与 `offline` 修饰类。状态点包含低频脉冲，并自动遵循 `prefers-reduced-motion`。
