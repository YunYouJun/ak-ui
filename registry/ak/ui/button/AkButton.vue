<script setup lang="ts">
import type { AkButtonVariant } from './types'

import '@yunyoujun/ak-ui'

withDefaults(defineProps<{
  block?: boolean
  variant?: AkButtonVariant
}>(), {
  block: false,
  variant: 'default',
})
</script>

<template>
  <button
    type="button"
    data-slot="ak-button"
    :data-variant="variant"
    :class="[
      'ak-button',
      variant !== 'default' && `ak-button--${variant}`,
      { 'ak-button--block': block },
    ]"
  >
    <span v-if="$slots.icon" class="ak-button__icon" data-icon="inline-start">
      <slot name="icon" />
    </span>
    <span class="ak-button__label">
      <slot />
    </span>
  </button>
</template>
