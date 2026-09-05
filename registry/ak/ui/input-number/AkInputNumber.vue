<script setup lang="ts">
import { computed, watch } from 'vue'

import '@yunyoujun/ak-ui'

const props = withDefaults(defineProps<{
  disabled?: boolean
  label?: string
  max?: number
  maxLabel?: string
  min?: number
  minLabel?: string
  step?: number
}>(), {
  disabled: false,
  label: '数值',
  max: 99,
  maxLabel: '最多',
  min: 0,
  minLabel: '最少',
  step: 1,
})

const model = defineModel<number>({ default: 0 })
const lower = computed(() => Number.isFinite(props.min) ? props.min : 0)
const upper = computed(() => Math.max(lower.value, Number.isFinite(props.max) ? props.max : 99))
const normalizedValue = computed(() => clamp(model.value))
const normalizedStep = computed(() => Number.isFinite(props.step) ? Math.abs(props.step) || 1 : 1)

function clamp(value: number) {
  return Math.min(upper.value, Math.max(lower.value, Number.isFinite(value) ? value : lower.value))
}

function updateValue(value: number) {
  if (!props.disabled)
    model.value = clamp(Number(value.toFixed(12)))
}

watch([model, lower, upper], ([value]) => {
  const nextValue = clamp(value)

  if (nextValue !== value)
    model.value = nextValue
}, { immediate: true })

function onInput(event: Event) {
  const input = event.target as HTMLInputElement
  const value = Number(input.value)

  if (Number.isNaN(value))
    return

  const nextValue = clamp(value)
  updateValue(nextValue)

  if (nextValue !== value)
    input.value = String(nextValue)
}
</script>

<template>
  <div
    class="ak-input-number"
    data-slot="ak-input-number"
    :data-disabled="disabled || undefined"
  >
    <button
      type="button"
      class="ak-input-number__increase"
      aria-label="增加"
      :disabled="disabled || normalizedValue >= upper"
      @click="updateValue(normalizedValue + normalizedStep)"
    >
      <svg class="ak-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M11 5h2v14h-2zM5 11h14v2H5z" />
      </svg>
    </button>
    <button
      type="button"
      class="ak-input-number__decrease"
      aria-label="减少"
      :disabled="disabled || normalizedValue <= lower"
      @click="updateValue(normalizedValue - normalizedStep)"
    >
      <svg class="ak-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 11h14v2H5z" />
      </svg>
    </button>
    <button
      type="button"
      class="ak-input-number__max"
      :disabled="disabled || normalizedValue >= upper"
      @click="updateValue(upper)"
    >
      {{ maxLabel }}
    </button>
    <button
      type="button"
      class="ak-input-number__min"
      :disabled="disabled || normalizedValue <= lower"
      @click="updateValue(lower)"
    >
      {{ minLabel }}
    </button>
    <input
      class="ak-input-number__inner"
      type="number"
      :aria-label="label"
      :disabled="disabled"
      :max="upper"
      :min="lower"
      :step="normalizedStep"
      :value="normalizedValue"
      @input="onInput"
    >
  </div>
</template>
