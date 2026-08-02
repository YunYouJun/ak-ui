<script setup lang="ts">
import { computed } from 'vue'
import type { AkSegmentedOption } from './types'

import '@yunyoujun/ak-ui'

const props = defineProps<{
  ariaLabel?: string
  options: AkSegmentedOption[]
}>()

const model = defineModel<string>()
const activeValue = computed(() => model.value ?? props.options[0]?.value ?? '')
</script>

<template>
  <div class="ak-segmented" data-slot="ak-segmented" :aria-label="ariaLabel || 'Options'">
    <button
      v-for="option in options"
      :key="option.value"
      class="ak-segmented__item"
      type="button"
      :aria-pressed="activeValue === option.value"
      @click="model = option.value"
    >
      {{ option.label }}
    </button>
  </div>
</template>
