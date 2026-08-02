<script setup lang="ts">
import type { AkTagVariant } from './types'

import '@yunyoujun/ak-ui'

withDefaults(defineProps<{
  variant?: AkTagVariant
}>(), {
  variant: 'default',
})
</script>

<template>
  <span
    data-slot="ak-tag"
    :data-variant="variant"
    :class="[
      'ak-tag',
      variant !== 'default' && `ak-tag--${variant}`,
    ]"
  >
    <slot />
  </span>
</template>
