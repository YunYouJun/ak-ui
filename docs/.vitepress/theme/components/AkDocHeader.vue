<script setup lang="ts">
import { computed } from 'vue'

// Only the document category strip remounts on navigation. Interactive demos,
// search, and the default theme's focus/scroll management remain untouched.
const props = defineProps<{ path: string }>()
const section = computed(() => {
  const english = props.path.startsWith('en/')
  const area = props.path.replace(/^en\//, '').split('/')[0]
  const labels: Record<string, [string, string]> = {
    guide: ['使用指南', 'Guide'],
    components: ['组件参考', 'Components'],
    registry: ['组件接入', 'Registry'],
    showcase: ['完整演示', 'Showcase'],
  }
  const pair = labels[area] ?? ['文档', 'Documentation']
  return { label: english ? pair[1] : pair[0], code: pair[1].toUpperCase() }
})
</script>

<template>
  <div class="ak-doc-header">
    <span class="ak-doc-header__label">{{ section.label }}</span>
    <span class="ak-doc-header__code" aria-hidden="true">AK / UI <span>//</span> {{ section.code }}</span>
  </div>
</template>

<style scoped>
.ak-doc-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--vp-c-divider);
  animation: ak-doc-label-enter 320ms var(--ak-ease-emphasized) both;
}
.ak-doc-header::after {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 64px;
  height: 2px;
  background: var(--ak-doc-blue);
  content: '';
  transform-origin: left;
  animation: ak-doc-rule-enter 420ms var(--ak-ease-emphasized) both;
}
.ak-doc-header__label { font-size: 12px; font-weight: 700; color: var(--ak-doc-blue); }
.ak-doc-header__code { font: 11px/1.5 var(--vp-font-family-mono); letter-spacing: 0.08em; color: var(--vp-c-text-2); }
.ak-doc-header__code span { margin-inline: 6px; color: var(--ak-doc-blue); }
@keyframes ak-doc-label-enter {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes ak-doc-rule-enter {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
@media (prefers-reduced-motion: reduce) {
  .ak-doc-header, .ak-doc-header::after { animation: none; }
}
</style>
