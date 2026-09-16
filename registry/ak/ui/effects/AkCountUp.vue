<script setup lang="ts">
import { computed, onMounted, onScopeDispose, shallowRef, watch } from 'vue'
import { createCountUp } from '@yunyoujun/ak-ui/effects'
import type { CountUpController } from '@yunyoujun/ak-ui/effects'
import '@yunyoujun/ak-ui'

const props = withDefaults(defineProps<{
  value: number
  from?: number
  duration?: number
  delay?: number
  decimals?: number
  disabled?: boolean
  autoplay?: boolean
}>(), { from: 0, duration: 1000, delay: 0, decimals: 0, disabled: false, autoplay: true })
const target = computed(() => Number.isFinite(props.value) ? props.value : 0)
const digits = computed(() => Math.min(20, Math.max(0, Math.trunc(Number.isFinite(props.decimals) ? props.decimals : 0))))
const displayed = shallowRef(target.value)
const text = computed(() => displayed.value.toFixed(digits.value))
const accessibleText = computed(() => target.value.toFixed(digits.value))
let controller: CountUpController | undefined
function replay() { controller?.play({ ...props, value: target.value }) }
onMounted(() => {
  controller = createCountUp(value => { displayed.value = value }, props)
  if (props.autoplay) replay()
})
watch([target, () => props.disabled, () => props.duration, () => props.delay], () => {
  controller?.play({ ...props, value: target.value, from: displayed.value })
})
onScopeDispose(() => controller?.destroy())
defineExpose({ replay })
</script>

<template>
  <span class="ak-count-up"><span aria-hidden="true">{{ text }}</span><span class="ak-count-up__accessible">{{ accessibleText }}</span></span>
</template>
