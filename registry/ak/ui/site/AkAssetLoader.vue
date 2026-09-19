<script setup lang="ts">
import { onMounted, onScopeDispose, shallowRef, watch } from 'vue'
import { createAssetLoader } from '@yunyoujun/ak-ui/site'
import type { AssetController, AssetState, AssetTask } from '@yunyoujun/ak-ui/site'
import '@yunyoujun/ak-ui'

const props = withDefaults(defineProps<{ tasks: AssetTask[]; label?: string; retryLabel?: string }>(), { label: 'Resources', retryLabel: 'Retry' })
const emit = defineEmits<{ change: [state: AssetState] }>()
const state = shallowRef<AssetState>({ status: 'idle', completed: 0, total: 0, errors: [] })
let controller: AssetController | undefined
function reload() { return controller?.load(props.tasks) }
onMounted(() => {
  controller = createAssetLoader(value => { state.value = value; emit('change', value) })
  reload()
})
watch(() => props.tasks, reload)
onScopeDispose(() => controller?.destroy())
defineExpose({ reload })
</script>

<template>
  <div class="ak-asset-loader" :data-state="state.status" :aria-busy="state.status === 'loading'">
    <progress :aria-label="label" :value="state.completed" :max="state.total || 1" />
    <div class="ak-asset-loader__status" role="status" aria-live="polite">
      <slot :state="state">{{ label }} · {{ state.status }} · {{ state.completed }}/{{ state.total }}</slot>
    </div>
    <button v-if="state.status === 'error'" class="ak-site-control" type="button" @click="reload">{{ retryLabel }}</button>
  </div>
</template>
