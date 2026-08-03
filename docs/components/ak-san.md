# ak-san 理智

::: demo san/basic
:::

`ak-san-container--compact` 提供适合普通卡片与窄屏的信息密度；`ak-san-container--terminal` 则用于主终端的大字号行动入口，并可以直接组合 `ak-command--operation`。

终端版本按“行动水印 + 内容层”的结构组织，内容层再分成理智横幅与作战信息两个区域。横幅使用约 `27.5%` 的 figure track，作战标题与状态沿用 `.ak-command--operation`；间距会随面板容器缩放，无需维护一套仅供 Demo 使用的样式。示例用仓库已有图标和原创生成背景替代游戏素材；完整组合可查看[罗德岛主终端](/showcase/)。
