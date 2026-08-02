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
const normalizedValue = computed(() => clamp(model.value))
const normalizedStep = computed(() => Math.abs(props.step) || 1)

function clamp(value: number) {
  return Math.min(props.max, Math.max(props.min, value))
}

function updateValue(value: number) {
  if (!props.disabled)
    model.value = clamp(value)
}

watch([model, () => props.min, () => props.max], ([value]) => {
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
      :disabled="disabled || normalizedValue >= max"
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
      :disabled="disabled || normalizedValue <= min"
      @click="updateValue(normalizedValue - normalizedStep)"
    >
      <svg class="ak-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 11h14v2H5z" />
      </svg>
    </button>
    <button
      type="button"
      class="ak-input-number__max"
      :disabled="disabled || normalizedValue >= max"
      @click="updateValue(max)"
    >
      {{ maxLabel }}
    </button>
    <button
      type="button"
      class="ak-input-number__min"
      :disabled="disabled || normalizedValue <= min"
      @click="updateValue(min)"
    >
      {{ minLabel }}
    </button>
    <input
      class="ak-input-number__inner"
      type="number"
      :aria-label="label"
      :disabled="disabled"
      :max="max"
      :min="min"
      :step="normalizedStep"
      :value="normalizedValue"
      @input="onInput"
    >
  </div>
</template>

<style>
.ak-input-number[data-slot="ak-input-number"] {
  width: min(390px, 100%);
}

.ak-input-number[data-slot="ak-input-number"] .ak-input-number__inner {
  box-sizing: border-box;
  width: 100%;
}

.ak-input-number[data-slot="ak-input-number"] .ak-icon {
  fill: currentcolor;
}

.ak-input-number[data-slot="ak-input-number"] button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.ak-input-number[data-slot="ak-input-number"][data-disabled] {
  opacity: 0.65;
}
</style>
