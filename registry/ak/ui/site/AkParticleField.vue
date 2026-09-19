<script setup lang="ts">
import { onMounted, onScopeDispose, useTemplateRef, watch } from 'vue'
import { createParticleField } from '@yunyoujun/ak-ui/site'
import type { ParticleController, ParticleOptions } from '@yunyoujun/ak-ui/site'
import '@yunyoujun/ak-ui'

const props = defineProps<ParticleOptions>()
const canvas = useTemplateRef<HTMLCanvasElement>('canvas')
let controller: ParticleController | undefined
onMounted(() => { controller = createParticleField(canvas.value!, props) })
watch(() => props.paused, paused => paused ? controller?.pause() : controller?.resume())
watch(() => props.pattern, pattern => { if (pattern) controller?.setPattern(pattern) })
onScopeDispose(() => controller?.destroy())
</script>

<template>
  <canvas ref="canvas" class="ak-particle-field" aria-hidden="true" />
</template>
