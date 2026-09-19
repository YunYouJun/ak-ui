<script setup lang="ts">
import { onMounted, onScopeDispose, useTemplateRef } from 'vue'
import { createSectionNavigation } from '@yunyoujun/ak-ui/site'
import type { SectionController } from '@yunyoujun/ak-ui/site'
import '@yunyoujun/ak-ui'

const props = withDefaults(defineProps<{ syncHash?: boolean; duration?: number }>(), { syncHash: true, duration: 650 })
const emit = defineEmits<{ change: [id: string, index: number] }>()
const root = useTemplateRef<HTMLElement>('root')
let controller: SectionController | undefined
onMounted(() => { controller = createSectionNavigation(root.value!, { ...props, onChange: (id, index) => emit('change', id, index) }) })
onScopeDispose(() => controller?.destroy())
defineExpose({ navigate: (id: string) => controller?.navigate(id) })
</script>

<template>
  <div ref="root" class="ak-site"><slot /></div>
</template>
