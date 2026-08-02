<script setup lang="ts">
import { computed } from 'vue'
import type { AkNoticeVariant } from './types'

import '@yunyoujun/ak-ui'

const props = withDefaults(defineProps<{
  code?: string
  role?: 'alert' | 'status'
  title?: string
  variant?: AkNoticeVariant
}>(), {
  code: 'RI / INFO',
  role: undefined,
  title: '',
  variant: 'info',
})

const semanticRole = computed(() => props.role ?? (props.variant === 'danger' ? 'alert' : 'status'))
</script>

<template>
  <aside
    class="ak-notice"
    data-slot="ak-notice"
    :class="variant !== 'info' && `ak-notice--${variant}`"
    :data-variant="variant"
    :role="semanticRole"
  >
    <span class="ak-notice__code"><slot name="code">{{ code }}</slot></span>
    <div class="ak-notice__body">
      <strong class="ak-notice__title"><slot name="title">{{ title }}</slot></strong>
      <p class="ak-notice__message"><slot /></p>
    </div>
  </aside>
</template>
