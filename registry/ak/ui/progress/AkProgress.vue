<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import type { AkProgressVariant } from './types'

import '@yunyoujun/ak-ui'

const props = withDefaults(defineProps<{
  label?: string
  max?: number
  min?: number
  value?: number
  valueLabel?: string
  variant?: AkProgressVariant
}>(), {
  label: 'Progress',
  max: 100,
  min: 0,
  value: 0,
  valueLabel: '',
  variant: 'default',
})

const normalizedValue = computed(() => Math.min(props.max, Math.max(props.min, props.value)))
const percentage = computed(() => {
  const range = props.max - props.min
  return range > 0 ? ((normalizedValue.value - props.min) / range) * 100 : 0
})
const progressStyle = computed(() => ({
  '--ak-progress-value': `${percentage.value}%`,
}) as CSSProperties)
</script>

<template>
  <div
    class="ak-progress"
    data-slot="ak-progress"
    role="progressbar"
    :aria-label="label"
    :aria-valuemax="max"
    :aria-valuemin="min"
    :aria-valuenow="normalizedValue"
    :class="variant !== 'default' && `ak-progress--${variant}`"
    :data-variant="variant"
    :style="progressStyle"
  >
    <div class="ak-progress__header">
      <span><slot name="label">{{ label }}</slot></span>
      <span class="ak-progress__value"><slot name="value">{{ valueLabel || `${Math.round(percentage)}%` }}</slot></span>
    </div>
    <div class="ak-progress__track"><span class="ak-progress__fill" /></div>
  </div>
</template>
