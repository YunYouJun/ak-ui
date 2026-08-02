<script setup lang="ts">
import type { AkCardVariant } from './types'

import '@yunyoujun/ak-ui'

withDefaults(defineProps<{
  as?: string
  variant?: AkCardVariant
}>(), {
  as: 'div',
  variant: 'default',
})
</script>

<template>
  <component
    :is="as"
    data-slot="ak-card"
    :data-variant="variant"
    :class="[
      'ak-card',
      variant !== 'default' && `ak-card--${variant}`,
    ]"
  >
    <slot />
  </component>
</template>

<style>
.ak-card[data-slot="ak-card"] .ak-card__header {
  display: grid;
  gap: 0.25rem;
}

.ak-card[data-slot="ak-card"] .ak-card__title {
  margin: 0.2rem 0;
  border-bottom: 2px solid currentcolor;
  font-family: "Noto Serif SC", serif;
  font-size: 1.25rem;
  font-weight: 900;
  line-height: 1.3;
}

.ak-card[data-slot="ak-card"] .ak-card__description {
  margin: 0;
  color: currentcolor;
  font-size: 0.875rem;
  line-height: 1.5;
  opacity: 0.68;
}

.ak-card[data-slot="ak-card"] .ak-card__content {
  margin-top: 0.875rem;
}

.ak-card[data-slot="ak-card"] .ak-card__footer {
  display: flex;
  margin-top: 1rem;
  align-items: center;
  gap: 0.75rem;
}
</style>
