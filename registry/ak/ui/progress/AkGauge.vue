<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import type { AkGaugeVariant } from './types'

import '@yunyoujun/ak-ui'

const props = withDefaults(defineProps<{
  label?: string
  max?: number
  min?: number
  unit?: string
  value?: number
  variant?: AkGaugeVariant
}>(), {
  label: 'Deploy',
  max: 100,
  min: 0,
  unit: 'percent',
  value: 0,
  variant: 'default',
})

const normalizedValue = computed(() => Math.min(props.max, Math.max(props.min, props.value)))
const percentage = computed(() => {
  const range = props.max - props.min
  return range > 0 ? ((normalizedValue.value - props.min) / range) * 100 : 0
})
const gaugeStyle = computed(() => ({
  '--ak-gauge-value': `${percentage.value}%`,
}) as CSSProperties)
</script>

<template>
  <div
    class="ak-gauge"
    data-slot="ak-gauge"
    role="progressbar"
    :aria-label="label"
    :aria-valuemax="max"
    :aria-valuemin="min"
    :aria-valuenow="normalizedValue"
    :class="variant !== 'default' && `ak-gauge--${variant}`"
    :data-variant="variant"
    :style="gaugeStyle"
  >
    <div class="ak-gauge__content">
      <span class="ak-gauge__label"><slot name="label">{{ label }}</slot></span>
      <strong class="ak-gauge__value"><slot>{{ normalizedValue }}</slot></strong>
      <span class="ak-gauge__unit"><slot name="unit">{{ unit }}</slot></span>
    </div>
  </div>
</template>
