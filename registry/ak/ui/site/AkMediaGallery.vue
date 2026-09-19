<script setup lang="ts">
import { onMounted, onScopeDispose, useId, useTemplateRef, watch } from 'vue'
import { createMediaGallery } from '@yunyoujun/ak-ui/site'
import type { GalleryController } from '@yunyoujun/ak-ui/site'
import type { GalleryItem } from './types'
import '@yunyoujun/ak-ui'

const props = withDefaults(defineProps<{
  items: GalleryItem[]
  label?: string
  loop?: boolean
  previousLabel?: string
  nextLabel?: string
  expandLabel?: string
  closeLabel?: string
  emptyLabel?: string
}>(), { label: 'Media gallery', loop: true, previousLabel: 'Previous', nextLabel: 'Next', expandLabel: 'Expand image', closeLabel: 'Close image', emptyLabel: 'No items' })
const model = defineModel<number>({ default: 0 })
const id = useId()
const root = useTemplateRef<HTMLElement>('root')
let controller: GalleryController | undefined
onMounted(() => {
  controller = createMediaGallery(root.value!, { initialIndex: model.value, loop: props.loop, onChange: index => { model.value = index } })
})
watch(model, value => { if (controller && controller.index !== value) controller.select(value) })
watch(() => props.items, () => controller?.refresh(), { deep: true, flush: 'post' })
onScopeDispose(() => controller?.destroy())
</script>

<template>
  <div ref="root" class="ak-gallery" role="region" :aria-label="label" aria-roledescription="carousel">
    <div class="ak-gallery__stage" data-ak-gallery-stage>
      <article v-for="(item, index) in items" :id="`${id}-${item.id}`" :key="item.id" class="ak-gallery__item" data-ak-gallery-item :hidden="index !== model">
        <slot name="media" :item="item" :index="index">
          <img v-if="item.image" class="ak-gallery__image" :src="item.image" :alt="item.alt ?? ''" width="960" height="720" loading="lazy">
        </slot>
        <div><h3>{{ item.title }}</h3><p>{{ item.description }}</p><slot :item="item" :index="index" /></div>
      </article>
      <p v-if="!items.length">{{ emptyLabel }}</p>
    </div>
    <div class="ak-gallery__controls">
      <button class="ak-site-control" type="button" data-ak-gallery-prev :aria-label="previousLabel">←</button>
      <div class="ak-gallery__selectors" role="group" :aria-label="label">
        <button v-for="(item, index) in items" :key="item.id" class="ak-site-control" type="button" data-ak-gallery-select :aria-label="item.title" :aria-pressed="model === index" :tabindex="model === index ? 0 : -1">{{ String(index + 1).padStart(2, '0') }}</button>
      </div>
      <button class="ak-site-control" type="button" data-ak-gallery-next :aria-label="nextLabel">→</button>
      <span data-ak-gallery-current aria-live="polite" aria-atomic="true">{{ items.length ? model + 1 : 0 }} / {{ items.length }}</span>
      <button class="ak-site-control" type="button" data-ak-gallery-open>{{ expandLabel }}</button>
    </div>
    <dialog class="ak-gallery__dialog" data-ak-gallery-dialog :aria-label="expandLabel">
      <button class="ak-site-control" type="button" data-ak-gallery-close autofocus>{{ closeLabel }}</button>
      <img alt="">
    </dialog>
  </div>
</template>
