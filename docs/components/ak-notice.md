# ak-notice 战术通知

用于系统消息、作战警告、自动部署偏差和完成反馈。信息层级由左侧信号色承担，不依赖图标才能辨认。

::: demo notice/basic
:::

| Class | Semantic role |
| --- | --- |
| `.ak-notice` | 普通信息，通常使用 `role="status"` |
| `.ak-notice--warning` | 需要留意但不会立刻中断流程 |
| `.ak-notice--danger` | 失败或高优先级错误，通常使用 `role="alert"` |
| `.ak-notice--success` | 操作或任务完成 |

通过 `--ak-notice-signal` 定制信号色。通知正文使用高对比纸面，因此可以放在亮色或图片背景上。
