<script setup lang="ts">
import A2uiNode from './A2uiNode.vue'
import { useA2uiDemo } from './useA2uiDemo'

const { root, log, error, step, next, reset, load } = useA2uiDemo()
</script>

<template>
  <section class="a2ui-demo" aria-label="A2UI 实验终端">
    <p class="a2ui-caption">LOCAL SIMULATION / 本地模拟 Agent</p>
    <div class="a2ui-controls">
      <button class="ak-button" type="button" @click="reset">清空界面</button>
      <button class="ak-button" type="button" :disabled="step >= 3" @click="next">下一条消息（{{ step }}/3）</button>
      <button class="ak-button" type="button" @click="load">重新加载</button>
    </div>
    <p v-if="error" role="alert">{{ error }}</p>
    <A2uiNode v-if="root" :node="root" />
    <p v-else role="status">等待 root 组件。可逐条接收创建界面、数据与组件消息。</p>
    <details class="a2ui-log">
      <summary>查看消息与操作回传</summary>
      <pre v-for="(entry, index) in log" :key="index">{{ entry }}</pre>
    </details>
  </section>
</template>

<style scoped>
.a2ui-demo { margin: 24px 0; min-width: 0; }
.a2ui-caption { color: var(--vp-c-text-2); font-size: 12px; letter-spacing: .08em; }
.a2ui-controls { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; }
.a2ui-log { margin-top: 20px; }
.a2ui-log summary { cursor: pointer; }
.a2ui-log pre { padding: 16px; max-height: 320px; overflow: auto; font-size: 12px; background: var(--vp-code-block-bg); }
</style>
