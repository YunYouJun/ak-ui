<script setup lang="ts">
import { ref } from 'vue'

import { AkButton } from '../../../registry/ak/ui/button'
import {
  AkCard,
  AkCardContent,
  AkCardDescription,
  AkCardFooter,
  AkCardHeader,
  AkCardTitle,
} from '../../../registry/ak/ui/card'
import { AkInputNumber } from '../../../registry/ak/ui/input-number'
import { AkNotice } from '../../../registry/ak/ui/notice'
import { AkGauge, AkProgress } from '../../../registry/ak/ui/progress'
import { AkStatus, AkTag } from '../../../registry/ak/ui/status'
import { AkSegmented, AkTabs } from '../../../registry/ak/ui/tabs'

const launched = ref(false)
const deploymentCount = ref(3)
const terminalTab = ref('overview')
const operationMode = ref('manual')
const terminalItems = [
  { value: 'overview', label: 'Overview', eyebrow: 'Operation / 4-10', title: 'Fading lights', description: 'Review enemy intel, recommended level and sanity cost before starting.' },
  { value: 'squad', label: 'Squad', eyebrow: 'Squad / E2', title: 'Current squad 12 / 12', description: 'Vanguards and medics are ready. Adjust support units before continuing.' },
  { value: 'reward', label: 'Rewards', eyebrow: 'Reward / Preview', title: 'Regular and first-clear drops', description: 'Complete the operation for a chance to earn battle records, LMD and training materials.' },
]
const operationModes = [
  { value: 'manual', label: 'Manual' },
  { value: 'auto', label: 'Auto' },
  { value: 'series', label: 'Series' },
]
</script>

# Vue Registry

Vue Registry copies lightweight adapter source into your project. Framework-agnostic ak-ui CSS Core continues to provide component visuals.

See [Vue Registry API](/en/registry/api) for complete props, slots, models and boundary behavior. When upgrading from 0.2.x, follow the [1.0 migration guide](/en/guide/migration-v1).

## Style reuse model

| Layer | Responsibility | Shared interface |
| --- | --- | --- |
| CSS Core | Colors, typography, spacing, states and motion | `.ak-*` classes, `--ak-*` variables |
| Vue Adapter | Semantic structure, props, slots, events and keyboard interaction | Emit the matching Core and state classes |
| Documentation theme | Example composition and page layout | Kept outside component implementations |

Vue files do not duplicate component CSS. Changes to `src/scss` produce the same visual result in native HTML and Vue; Registry verification also prevents adapters from reintroducing `<style>`.

## Install components

First [initialize shadcn-vue](https://shadcn-vue.com/docs/installation) in your project:

```bash
pnpm dlx shadcn-vue@latest init
```

Then install the components you need:

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

```bash [Dashboard Depth]
pnpm dlx shadcn-vue@latest add https://ak-ui.yyj.moe/r/dashboard-depth.json
```

:::

## Live Vue rendering

The following examples mount actual Vue components. You can interact with button events and `v-model` bindings.

<div class="ak-registry-lab" data-registry-demo>
  <div class="ak-registry-lab__controls">
    <AkButton variant="action" @click="launched = !launched">
      {{ launched ? 'Operation active' : 'Start operation' }}
    </AkButton>
    <AkButton variant="outline">
      Confirm squad
    </AkButton>
  </div>

  <AkCard class="ak-registry-lab__card" variant="outline">
    <AkCardHeader>
      <AkCardTitle>Deployment protocol / 01</AkCardTitle>
      <AkCardDescription>After copying the source, edit structure, props and interactions directly.</AkCardDescription>
    </AkCardHeader>
    <AkCardContent>
      Current deployment units: <strong data-deployment-count>{{ deploymentCount }}</strong>
    </AkCardContent>
    <AkCardFooter>
      <AkInputNumber v-model="deploymentCount" :max="12" label="Deployment units" min-label="Minimum" max-label="Maximum" />
    </AkCardFooter>
  </AkCard>
</div>

## Data display and terminal navigation

These components also reuse CSS Core; Vue adapters only synchronize values, semantic attributes and interaction state.

<div class="ak-registry-lab" data-registry-extended>
  <div class="ak-registry-lab__tags">
    <AkTag>Vanguard</AkTag>
    <AkTag variant="advanced">Top Operator</AkTag>
    <AkStatus label="Online" detail="Operation terminal connected" />
  </div>

  <div class="ak-registry-lab__metrics">
    <AkProgress :value="deploymentCount" :max="12" label="Deployment" :value-label="`${deploymentCount} / 12`" />
    <AkGauge :value="deploymentCount" :max="12" label="Deploy" unit="units" variant="warning" />
  </div>

  <AkNotice code="CAUTION" title="Deployment units changed" variant="warning">
    Input Number and the progress components share the same queue value and update immediately.
  </AkNotice>

  <AkTabs v-model="terminalTab" aria-label="Operation terminal" :items="terminalItems" />
  <AkSegmented v-model="operationMode" aria-label="Operation mode" :options="operationModes" />
</div>

## Usage

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
    Start operation
  </AkButton>
  <AkInputNumber v-model="count" :max="12" label="Deployment units" min-label="Minimum" max-label="Maximum" />
  <AkTag variant="advanced">Top Operator</AkTag>
  <AkStatus label="Online" detail="Operation terminal connected" />
</template>
```

Components import `@yunyoujun/ak-ui` CSS Core internally. Override `--ak-*` CSS variables first for visual changes. For structure or interaction changes, edit the Vue files copied into your project.

## Reuse depth behavior

The depth algorithm is a framework-agnostic Core capability. Native HTML can create a controller directly and clean it up when the page is disposed:

```ts
import { createDashboardDepth } from '@yunyoujun/ak-ui/depth'

const dashboard = document.querySelector('[data-dashboard]')
if (!dashboard) throw new Error('Dashboard element not found')
const depth = createDashboardDepth(dashboard)

// Call when leaving the SPA page
depth.destroy()
```

Vue projects can install the Registry composable as needed. It handles the Vue lifecycle while calling the same `createDashboardDepth()` for the calculations:

```vue
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useDashboardDepth } from '@/composables/useDashboardDepth'

const dashboard = useTemplateRef<HTMLElement>('dashboard')
useDashboardDepth(dashboard)
</script>

<template>
  <section ref="dashboard" class="ak-dashboard" data-dashboard>
    <div class="ak-dashboard__layer" data-depth="0.08">...</div>
    <div class="ak-dashboard__layer" data-depth="0.2">...</div>
  </section>
</template>
```


## API reference

See [Vue Registry API](./api) for component props, events and slots.
