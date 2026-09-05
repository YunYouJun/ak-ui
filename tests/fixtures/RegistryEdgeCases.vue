<script setup lang="ts">
import { ref } from 'vue'
import AkInputNumber from '../../registry/ak/ui/input-number/AkInputNumber.vue'
import AkProgress from '../../registry/ak/ui/progress/AkProgress.vue'
import AkGauge from '../../registry/ak/ui/progress/AkGauge.vue'
import AkTabs from '../../registry/ak/ui/tabs/AkTabs.vue'
import AkSegmented from '../../registry/ak/ui/tabs/AkSegmented.vue'

const value = ref(NaN)
const min = ref(0)
const max = ref(1)
const disabled = ref(false)
const selection = ref('b')
const items = ref([
  { value: 'a', label: 'Alpha', title: 'Alpha panel' },
  { value: 'b', label: 'Beta', title: 'Beta panel' },
  { value: 'c', label: 'Gamma', title: 'Gamma panel' },
])
</script>

<template>
  <section aria-label="Numeric edges">
    <AkInputNumber v-model="value" :min="min" :max="max" :step="0.1" :disabled="disabled" label="Numeric value" />
    <output aria-label="Model value">{{ value }}</output>
    <button @click="min = 10; max = 2">Invert bounds</button>
    <button @click="disabled = !disabled">Toggle disabled</button>
    <AkProgress :value="NaN" :min="min" :max="max" label="Progress edges" />
    <AkGauge :value="Infinity" :min="min" :max="max" label="Gauge edges" />
  </section>
  <section aria-label="Dynamic tabs">
    <AkTabs v-model="selection" :items="items" aria-label="Dynamic list" />
    <AkSegmented v-model="selection" :options="items" aria-label="Dynamic options" />
    <button @click="items = items.filter(item => item.value !== 'b')">Remove Beta</button>
    <button @click="items = []">Remove all</button>
  </section>
</template>
