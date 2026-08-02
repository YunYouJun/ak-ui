# ak-progress 进度与仪表

用于生命值、技力、理智、部署费用和行动进度。水平进度条适合连续数据，八边形仪表适合突出单个关键数值。

::: demo progress/basic
:::

## Progress

通过 `--ak-progress-value` 设置填充比例，通过 `--ak-progress-signal` 设置状态色。请同时维护 `aria-valuenow`，确保视觉值与无障碍信息一致。

```html
<div class="ak-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="78" style="--ak-progress-value: 78%">
  <!-- header and track -->
</div>
```

## Gauge

`ak-gauge` 使用 `--ak-gauge-value` 与 `--ak-gauge-signal`。默认仪表保持终端深色内核，适合部署、充能和资源百分比。
