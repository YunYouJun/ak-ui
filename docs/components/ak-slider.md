<script setup>
import { ref } from 'vue'
import { AkSlider } from '../../registry/ak/ui/slider'
const value = ref(40)
</script>

# ak-slider 滑块

深色轨道、青蓝进度、底部刻度和方形手柄。使用原生 range，支持拖动、方向键、Home / End 和禁用状态。

<AkSlider v-model="value" label="滑块示例" />

当前数值：{{ value }}

## Vue Registry

```sh
pnpm dlx shadcn-vue@latest add https://ak-ui.yyj.moe/r/slider.json
```

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { AkSlider } from '@/components/ui/slider'
const seconds = ref(0)
</script>

<template>
  <AkSlider v-model="seconds" label="播放进度" :min="0" :max="8" :step="0.01" />
</template>
```

| 属性 | 说明 | 默认值 |
| --- | --- | --- |
| `v-model` | 数值，必填；用户输入时实时更新 | — |
| `label` | 无障碍名称，必填 | — |
| `min` / `max` | 数值范围 | `0` / `100` |
| `step` | 步长，支持小数 | `1` |
| `disabled` | 禁用输入 | `false` |

外部数值会限制到范围内显示，不会自动回写父组件。播放、暂停、数值单位和说明文案由使用方控制。

## CSS Core

原生 `<input type="range" class="ak-slider">` 即可复用样式。通过 `--ak-slider-accent` 自定义强调色，`--ak-slider-fill` 设置已填充百分比（默认 `0%`）；原生接入时需在输入事件中同步填充比例，Vue 组件会自动处理。

[在景深动画中体验](/showcase/#depth-playground)
