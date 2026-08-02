<script setup lang="ts">
import type { AkStatusVariant } from './types'

import '@yunyoujun/ak-ui'

withDefaults(defineProps<{
  detail?: string
  label?: string
  variant?: AkStatusVariant
}>(), {
  detail: '',
  label: 'Online',
  variant: 'default',
})
</script>

<template>
  <span
    class="ak-status"
    data-slot="ak-status"
    :data-variant="variant"
    :class="variant !== 'default' && `ak-status--${variant}`"
  >
    <span class="ak-status__signal" aria-hidden="true" />
    <span class="ak-status__label"><slot name="label">{{ label }}</slot></span>
    <span class="ak-status__detail"><slot>{{ detail }}</slot></span>
  </span>
</template>
