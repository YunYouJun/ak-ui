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

const lower = computed(() => Number.isFinite(props.min) ? props.min : 0)
const upper = computed(() => Math.max(lower.value, Number.isFinite(props.max) ? props.max : 100))
const normalizedValue = computed(() => Math.min(upper.value, Math.max(lower.value,
  Number.isFinite(props.value) ? props.value : lower.value)))
const percentage = computed(() => {
  const range = upper.value - lower.value
  return range > 0 ? ((normalizedValue.value - lower.value) / range) * 100 : 0
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
    :aria-valuemax="upper"
    :aria-valuemin="lower"
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
