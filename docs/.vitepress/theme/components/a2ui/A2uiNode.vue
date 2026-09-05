<script setup lang="ts">
import { computed, shallowRef, watchEffect } from 'vue'
import { effect, getValue, isComponentNode, ResolvedBinding, WritableBinding } from '@a2ui/web_core/v0_9'
import type { ComponentNode, NodeProps } from '@a2ui/web_core/v0_9'

const props = defineProps<{ node: ComponentNode }>()
const values = shallowRef<NodeProps>({})
watchEffect((onCleanup) => {
  const node = props.node
  onCleanup(effect(() => { values.value = getValue(node.props) }))
})
function value(key: string): unknown {
  const entry = values.value[key]
  return entry instanceof ResolvedBinding ? entry.value : entry
}
const children = computed(() => {
  const entries = values.value.children
  return Array.isArray(entries) ? entries.filter(isComponentNode) : []
})
const child = computed(() => isComponentNode(values.value.child) ? values.value.child : undefined)
const progress = computed(() => {
  const numeric = Number(value('value'))
  return Number.isFinite(numeric) ? Math.max(0, Math.min(100, numeric)) : 0
})
function updateInput(event: Event) {
  const binding = values.value.value
  if (binding instanceof WritableBinding)
    binding.set((event.target as HTMLInputElement).value)
}
function activate() {
  const action = values.value.action
  if (typeof action === 'function') action()
}
</script>

<template>
  <span v-if="node.isPlaceholder" class="a2ui-pending">{{ node.state === 'pending' ? '等待组件…' : '组件不可用' }}</span>
  <div v-else-if="node.type === 'Column' || node.type === 'Row'" :class="['a2ui-layout', { 'a2ui-row': node.type === 'Row' }]">
    <A2uiNode v-for="entry in children" :key="entry.instanceId" :node="entry" />
  </div>
  <div v-else-if="node.type === 'Card'" class="ak-card ak-card--outline a2ui-card">
    <A2uiNode v-if="child" :node="child" />
  </div>
  <span v-else-if="node.type === 'Text'" class="a2ui-text">{{ value('text') }}</span>
  <label v-else-if="node.type === 'TextField'" class="ak-field">
    <span class="ak-label">{{ value('label') }}</span>
    <input class="ak-input" type="text" :value="value('value')" :readonly="!(values.value instanceof WritableBinding)" @input="updateInput">
  </label>
  <button v-else-if="node.type === 'Button'" class="ak-button ak-button--action" type="button" @click="activate">
    <span class="ak-button__label"><A2uiNode v-if="child" :node="child" /></span>
  </button>
  <div v-else-if="node.type === 'AkProgress'" class="ak-progress" role="progressbar" :aria-label="String(value('label') ?? '')" :aria-valuenow="progress" :aria-valuemin="0" :aria-valuemax="100" :style="{ '--ak-progress-value': `${progress}%` }">
    <div class="ak-progress__header"><span>{{ value('label') }}</span><span class="ak-progress__value">{{ progress }}%</span></div>
    <div class="ak-progress__track"><span class="ak-progress__fill" /></div>
  </div>
  <span v-else role="alert">未支持的组件：{{ node.type }}</span>
</template>

<style scoped>
.a2ui-layout { display: flex; flex-direction: column; gap: 20px; min-width: 0; }
.a2ui-row { flex-direction: row; flex-wrap: wrap; }
.a2ui-card { padding: 24px; width: 100%; }
.ak-label { color: var(--vp-c-text-1); }
.a2ui-text { overflow-wrap: anywhere; white-space: pre-wrap; }
.a2ui-pending { color: var(--ak-text-secondary); }
</style>
