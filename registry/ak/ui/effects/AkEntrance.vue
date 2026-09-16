<script setup lang="ts">
import { onMounted, onScopeDispose, useTemplateRef, watch } from 'vue'
import { createEntrance } from '@yunyoujun/ak-ui/effects'
import type { EntranceController, EntranceOptions } from '@yunyoujun/ak-ui/effects'
import '@yunyoujun/ak-ui'

const props = withDefaults(defineProps<EntranceOptions & { autoplay?: boolean }>(), { autoplay: true })
const root = useTemplateRef<HTMLElement>('root')
let controller: EntranceController | undefined
function replay() { controller?.play(props) }
onMounted(() => {
  controller = createEntrance(root.value!, props)
  if (props.autoplay) replay()
})
watch(() => props.disabled, disabled => { if (disabled) controller?.cancel() })
onScopeDispose(() => controller?.destroy())
defineExpose({ replay })
</script>

<template>
  <div ref="root" class="ak-entrance"><slot /></div>
</template>
