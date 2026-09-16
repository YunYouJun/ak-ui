<script setup lang="ts">
const emit = defineEmits<{ replay: [name: string] }>()
const blocks = ['人物', '博士档案', '语音', '公告', '快捷入口', '资源', '当前行动', '编队与干员', '招募', '任务与基建']
</script>

<template>
  <details class="entrance-controls">
    <summary>区块入场 · 独立重播</summary>
    <div class="entrance-controls__buttons">
      <button v-for="name in blocks" :key="name" class="ak-button" type="button" @click="emit('replay', name)">{{ name }}</button>
    </div>
  </details>
</template>

<style scoped>
.entrance-controls { padding: 16px 20px; }
.entrance-controls__buttons { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
.entrance-controls__buttons .ak-button { width: auto; padding: 8px 16px; }
</style>
