<script setup lang="ts">
import { computed } from 'vue'
import '@yunyoujun/ak-ui'

const props = withDefaults(defineProps<{
  label: string
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}>(), { min: 0, max: 100, step: 1, disabled: false })
const model = defineModel<number>({ required: true })
const lower = computed(() => Number.isFinite(props.min) ? props.min : 0)
const upper = computed(() => Math.max(lower.value, Number.isFinite(props.max) ? props.max : 100))
const increment = computed(() => Number.isFinite(props.step) && props.step > 0 ? props.step : 1)
const value = computed(() => Math.min(upper.value, Math.max(lower.value, Number.isFinite(model.value) ? model.value : lower.value)))
const fill = computed(() => upper.value === lower.value ? 0 : (value.value - lower.value) / (upper.value - lower.value) * 100)

function onInput(event: Event) {
  if (!props.disabled)
    model.value = (event.target as HTMLInputElement).valueAsNumber
}
</script>

<template>
  <input
    class="ak-slider"
    data-slot="ak-slider"
    type="range"
    :aria-label="label"
    :min="lower"
    :max="upper"
    :step="increment"
    :value="value"
    :disabled="disabled"
    :style="{ '--ak-slider-fill': `${fill}%` }"
    @input="onInput"
  >
</template>
