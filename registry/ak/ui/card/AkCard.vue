<script setup lang="ts">
import type { AkCardVariant } from './types'

import '@yunyoujun/ak-ui'

withDefaults(defineProps<{
  as?: string
  variant?: AkCardVariant
}>(), {
  as: 'div',
  variant: 'default',
})
</script>

<template>
  <component
    :is="as"
    data-slot="ak-card"
    :data-variant="variant"
    :class="[
      'ak-card',
      variant !== 'default' && `ak-card--${variant}`,
    ]"
  >
    <slot />
  </component>
</template>
