# ak-fx 效果

效果类可以与按钮、卡片等模块组合使用。

## glow 辉光

使用 `--ak-fx-glow-color` 调整辉光颜色。

::: demo fx/glow
:::

## outline 轮廓

使用 `--ak-outline-color` 调整轮廓颜色。

::: demo fx/outline
:::

## skew 倾斜

::: demo fx/skew
:::

## 区块入场与数字增长

<EffectsPlayground />

区块与数字可各自重播。在动画中修改目标值，会从当前显示值平滑过渡到新值，支持负数、倒数与小数。屏幕阅读器读取目标值，不逐帧播报。开启系统「减少动态效果」后直接呈现最终状态；组件卸载时会释放动画与监听器。

### Vue Registry

```sh
pnpm dlx shadcn-vue@latest add https://ak-ui.yyj.moe/r/effects.json
```

```vue
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { AkEntrance, AkCountUp } from '@/components/ui/effects'
const panel = useTemplateRef('panel')
const count = useTemplateRef('count')
</script>

<template>
  <button @click="panel?.replay()">重播区块</button>
  <button @click="count?.replay()">重播数字</button>
  <AkEntrance ref="panel" direction="right" :delay="150" :duration="650">
    龙门币 <AkCountUp ref="count" :value="1000" :duration="1200" />
  </AkEntrance>
</template>
```

`AkEntrance` 的默认插槽承载任意区块，`AkCountUp` 只负责数值，单位由外部提供。

| 组件 | 属性 | 默认值 / 说明 |
| --- | --- | --- |
| 两者 | `duration` / `delay` | 毫秒；入场默认 650，数字默认 1000，延迟默认 0 |
| 两者 | `autoplay` / `disabled` | 自动播放默认 true；禁用默认 false，禁用直接显示最终状态 |
| 两者 | `replay()` | 通过组件 ref 独立重播；修改入场配置后重播生效 |
| AkEntrance | `direction` | `up`（默认）、`down`、`left`、`right`、`fade`；表示初始偏移方向，up 从下方入场 |
| AkEntrance | `distance` | 初始偏移像素，默认 24；不修改原有 transform |
| AkCountUp | `value` / `from` | 目标数值必填；首次播放和重播的起点默认 0 |
| AkCountUp | `decimals` | 小数位，默认 0，范围 0–20 |

`autoplay=false` 只关闭首次播放；后续数值变化仍会动画更新。零时长直接完成，非法数值回退为 0，负时长和负延迟按 0 处理。

### 原生 JavaScript

无需 Vue，控制器可用于任意 HTML 区块：

```js
import { createEntrance, createCountUp } from '@yunyoujun/ak-ui/effects'
const entrance = createEntrance(document.querySelector('.panel'), { direction: 'right', delay: 150 })
const count = createCountUp(value => {
  document.querySelector('.number').textContent = value.toFixed(0)
}, { value: 1000, duration: 1200 })
entrance.play()
count.play()
count.update(1500) // 从当前显示值开始
// 销毁页面时释放动画及系统偏好监听
entrance.destroy()
count.destroy()
```

控制器创建后显式调用 `play()`。数字控制器只输出数值，无障碍文本由使用方维护；Vue 组件已内置目标值的静态朗读文本。

[主终端独立区块演示](/showcase/)：展开「区块入场 · 独立重播」，可分别重播人物、博士档案、公告、资源、行动和菜单；区块内的数字同步重播。原生 HTML 示例使用 `data-ak-enter`、`data-direction`、`data-delay` 标注编排，由文档的 Vue 生命周期适配器连接上述控制器。
