<script setup lang="ts">
import { computed, nextTick, useId } from 'vue'
import type { AkTabsItem } from './types'

import '@yunyoujun/ak-ui'

const props = defineProps<{
  ariaLabel?: string
  items: AkTabsItem[]
}>()

const model = defineModel<string>()
const instanceId = useId()
const activeValue = computed(() => model.value ?? props.items[0]?.value ?? '')

function activate(value: string) {
  model.value = value
}

function tabId(value: string) {
  return `${instanceId}-tab-${value}`
}

function panelId(value: string) {
  return `${instanceId}-panel-${value}`
}

async function onKeydown(index: number, event: KeyboardEvent) {
  const offset = event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowRight' ? 1 : 0

  if (!offset && event.key !== 'Home' && event.key !== 'End')
    return

  event.preventDefault()
  const nextIndex = event.key === 'Home'
    ? 0
    : event.key === 'End'
      ? props.items.length - 1
      : (index + offset + props.items.length) % props.items.length
  const nextItem = props.items[nextIndex]

  activate(nextItem.value)
  await nextTick()
  document.getElementById(tabId(nextItem.value))?.focus()
}
</script>

<template>
  <section class="ak-tabs" data-slot="ak-tabs">
    <div class="ak-tabs__list" role="tablist" :aria-label="ariaLabel || 'Tabs'">
      <button
        v-for="(item, index) in items"
        :id="tabId(item.value)"
        :key="item.value"
        class="ak-tabs__tab"
        role="tab"
        type="button"
        :aria-controls="panelId(item.value)"
        :aria-selected="activeValue === item.value"
        :tabindex="activeValue === item.value ? 0 : -1"
        @click="activate(item.value)"
        @keydown="onKeydown(index, $event)"
      >
        {{ item.label }}
      </button>
    </div>
    <div
      v-for="item in items"
      v-show="activeValue === item.value"
      :id="panelId(item.value)"
      :key="`${item.value}-panel`"
      class="ak-tabs__panel"
      role="tabpanel"
      :aria-labelledby="tabId(item.value)"
    >
      <span v-if="item.eyebrow" class="ak-tabs__eyebrow">{{ item.eyebrow }}</span>
      <h3 class="ak-tabs__title">{{ item.title }}</h3>
      <p v-if="item.description" class="ak-tabs__description">{{ item.description }}</p>
      <slot :item="item" :name="`panel-${item.value}`" />
    </div>
  </section>
</template>
