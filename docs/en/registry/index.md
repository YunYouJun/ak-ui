# Vue Registry

Install editable Vue 3 components with shadcn-vue. The copied source imports the CSS package; it does not add a separate ak-ui runtime.

```sh
pnpm add @yunyoujun/ak-ui@1.0.0-rc.1
pnpm dlx shadcn-vue@latest add https://ak-ui.yyj.moe/r/button.json
```

Available entries: `button`, `card`, `input-number`, `status`, `progress`, `notice`, `tabs`, and `dashboard-depth`. Replace `button.json` in the command with the entry you need.

```vue
<script setup lang="ts">
import { AkButton } from '@/components/ui/button'
</script>

<template>
  <AkButton>Continue</AkButton>
</template>
```

Check your shadcn-vue aliases and installation output for the actual destination path. Source belongs to your application after installation; compare changes before updating a customized component.

See the [live Registry examples (中文)](/registry/) and the [complete props, slots and model API (中文)](/registry/api). Translate visible labels through slots and documented props; accessible labels in copied source can also be adapted to your product language.

The public Registry's pinned CSS dependency must be available on npm before consumers install it. See [compatibility and migration](/en/guide/stability).
