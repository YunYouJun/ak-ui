<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { AkAssetLoader } from '../../../../../registry/ak/ui/site'
import type { AssetTask } from '@yunyoujun/ak-ui/site'

const loader = useTemplateRef<InstanceType<typeof AkAssetLoader>>('loader')
const tasks: AssetTask[] = ['signal', 'terrain', 'orbit'].map(name => async signal => {
  const response = await fetch(`/examples/site/${name}.svg`, { signal, cache: 'force-cache' })
  if (!response.ok) throw new Error(`Asset request failed: ${response.status}`)
  return response.blob()
})
const labels = { idle: '等待加载', loading: '加载中', ready: '资源已就绪', error: '加载失败，请重试', cancelled: '加载已取消' }
</script>

<template>
  <AkAssetLoader ref="loader" :tasks="tasks" label="示例图资源" retry-label="重试加载">
    <template #default="{ state }">{{ labels[state.status] }} · {{ state.completed }}/{{ state.total }}<span v-if="state.errors.length"> · {{ state.errors.length }} 项失败</span></template>
  </AkAssetLoader>
  <button class="ak-site-control site-demo__reload" @click="loader?.reload()">重新加载资源</button>
</template>
