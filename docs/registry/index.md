<script setup lang="ts">
import { ref } from 'vue'

import { AkButton } from '../../registry/ak/ui/button'
import {
  AkCard,
  AkCardContent,
  AkCardDescription,
  AkCardFooter,
  AkCardHeader,
  AkCardTitle,
} from '../../registry/ak/ui/card'
import { AkInputNumber } from '../../registry/ak/ui/input-number'
import { AkNotice } from '../../registry/ak/ui/notice'
import { AkGauge, AkProgress } from '../../registry/ak/ui/progress'
import { AkStatus, AkTag } from '../../registry/ak/ui/status'
import { AkSegmented, AkTabs } from '../../registry/ak/ui/tabs'

const launched = ref(false)
const deploymentCount = ref(3)
const terminalTab = ref('overview')
const operationMode = ref('manual')
const terminalItems = [
  { value: 'overview', label: '行动概览', eyebrow: 'Operation / 4-10', title: '灯火将熄', description: '确认敌方情报、推荐等级与理智消耗后开始行动。' },
  { value: 'squad', label: '编队', eyebrow: 'Squad / E2', title: '当前编队 12 / 12', description: '先锋与医疗干员已经就绪，可以继续调整支援单位。' },
  { value: 'reward', label: '报酬', eyebrow: 'Reward / Preview', title: '常规掉落与首次掉落', description: '完成行动后可能获得作战记录、龙门币与培养材料。' },
]
const operationModes = [
  { value: 'manual', label: '手动' },
  { value: 'auto', label: '代理' },
  { value: 'series', label: '连战' },
]
</script>

# Vue Registry

Vue Registry 把轻量 Adapter 源码复制到你的项目中；组件视觉仍由框架无关的 ak-ui CSS Core 提供。

## 样式复用模型

| 模块 | 负责内容 | 复用接口 |
| --- | --- | --- |
| CSS Core | 色彩、字体、间距、状态与动效 | `.ak-*` 类名、`--ak-*` variables |
| Vue Adapter | 语义结构、属性、插槽、事件与键盘交互 | 输出对应的 Core 类名与状态类 |
| 文档主题 | 示例编排和页面布局 | 不进入组件实现 |

Vue 文件不再复制组件 CSS。调整 `src/scss` 后，原生 HTML 与 Vue 组件会获得同一份视觉结果；Registry 校验也会阻止 Adapter 重新引入 `<style>`。

## 安装组件

项目需要先完成 [shadcn-vue 初始化](https://shadcn-vue.com/docs/installation)：

```bash
pnpm dlx shadcn-vue@latest init
```

然后按需安装组件：

::: code-group

```bash [Button]
pnpm dlx shadcn-vue@latest add https://ak-ui.yyj.moe/r/button.json
```

```bash [Card]
pnpm dlx shadcn-vue@latest add https://ak-ui.yyj.moe/r/card.json
```

```bash [Input Number]
pnpm dlx shadcn-vue@latest add https://ak-ui.yyj.moe/r/input-number.json
```

```bash [Status]
pnpm dlx shadcn-vue@latest add https://ak-ui.yyj.moe/r/status.json
```

```bash [Progress]
pnpm dlx shadcn-vue@latest add https://ak-ui.yyj.moe/r/progress.json
```

```bash [Notice]
pnpm dlx shadcn-vue@latest add https://ak-ui.yyj.moe/r/notice.json
```

```bash [Tabs]
pnpm dlx shadcn-vue@latest add https://ak-ui.yyj.moe/r/tabs.json
```

:::

## Vue 实际渲染

下面不是 HTML 字符串预览，而是直接挂载的 Vue 组件。按钮事件与 `v-model` 都可以交互。

<div class="ak-registry-lab" data-registry-demo>
  <div class="ak-registry-lab__controls">
    <AkButton variant="action" @click="launched = !launched">
      {{ launched ? '行动已接管' : '开始行动' }}
    </AkButton>
    <AkButton variant="outline">
      编队确认
    </AkButton>
  </div>

  <AkCard class="ak-registry-lab__card" variant="outline">
    <AkCardHeader>
      <AkCardTitle>部署协议 / 01</AkCardTitle>
      <AkCardDescription>复制源码后可以直接修改结构、属性和交互。</AkCardDescription>
    </AkCardHeader>
    <AkCardContent>
      当前部署单位：<strong data-deployment-count>{{ deploymentCount }}</strong>
    </AkCardContent>
    <AkCardFooter>
      <AkInputNumber v-model="deploymentCount" :max="12" label="部署单位" />
    </AkCardFooter>
  </AkCard>
</div>

## 数据展示与终端导航

新组件继续复用 CSS Core；Vue Adapter 只同步数值、语义属性和交互状态。

<div class="ak-registry-lab" data-registry-extended>
  <div class="ak-registry-lab__tags">
    <AkTag>先锋</AkTag>
    <AkTag variant="advanced">高级资深干员</AkTag>
    <AkStatus label="Online" detail="作战终端已连接" />
  </div>

  <div class="ak-registry-lab__metrics">
    <AkProgress :value="deploymentCount" :max="12" label="Deployment" :value-label="`${deploymentCount} / 12`" />
    <AkGauge :value="deploymentCount" :max="12" label="Deploy" unit="units" variant="warning" />
  </div>

  <AkNotice code="CAUTION" title="部署单位发生变化" variant="warning">
    当前队列由 Input Number 与进度组件共同驱动，数值变化会立即同步。
  </AkNotice>

  <AkTabs v-model="terminalTab" aria-label="作战终端" :items="terminalItems" />
  <AkSegmented v-model="operationMode" aria-label="代理模式" :options="operationModes" />
</div>

## 使用代码

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { AkButton } from '@/components/ui/button'
import { AkInputNumber } from '@/components/ui/input-number'
import { AkStatus, AkTag } from '@/components/ui/status'

const count = ref(3)
</script>

<template>
  <AkButton variant="action">
    开始行动
  </AkButton>
  <AkInputNumber v-model="count" :max="12" label="部署单位" />
  <AkTag variant="advanced">高级资深干员</AkTag>
  <AkStatus label="Online" detail="作战终端已连接" />
</template>
```

组件内部会导入 `@yunyoujun/ak-ui` CSS Core。需要调整视觉时，优先覆盖 `--ak-*` CSS variables；需要调整结构或交互时，直接修改复制到项目中的 Vue 文件。
