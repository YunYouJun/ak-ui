<script setup lang="ts">
import { onMounted, onScopeDispose, useId, useTemplateRef } from 'vue'
import { createMobileMenu } from '@yunyoujun/ak-ui/site'
import type { MenuController } from '@yunyoujun/ak-ui/site'
import '@yunyoujun/ak-ui'

withDefaults(defineProps<{ label?: string; closeLabel?: string }>(), { label: 'Menu', closeLabel: 'Close menu' })
const id = useId()
const trigger = useTemplateRef<HTMLButtonElement>('trigger')
const dialog = useTemplateRef<HTMLDialogElement>('dialog')
let controller: MenuController | undefined
onMounted(() => { controller = createMobileMenu(dialog.value!, { trigger: trigger.value! }) })
onScopeDispose(() => controller?.destroy())
defineExpose({ open: () => controller?.open(), close: () => controller?.close() })
</script>

<template>
  <button ref="trigger" class="ak-site-control ak-site__menu-trigger" type="button" :aria-controls="id" aria-haspopup="dialog" aria-expanded="false">{{ label }}</button>
  <dialog :id="id" ref="dialog" class="ak-site-menu" :aria-label="label">
    <button class="ak-site-control" type="button" data-ak-menu-close autofocus>{{ closeLabel }}</button>
    <nav :aria-label="label"><slot /></nav>
  </dialog>
</template>
