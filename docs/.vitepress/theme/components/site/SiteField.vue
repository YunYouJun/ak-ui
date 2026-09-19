<script setup lang="ts">
import { shallowRef } from 'vue'
import { AkParticleField } from '../../../../../registry/ak/ui/site'
import type { ParticlePattern } from '@yunyoujun/ak-ui/site'

const paused = shallowRef(false)
const pattern = shallowRef<ParticlePattern>('wave')
const fallback = shallowRef(false)
const patterns: { value: ParticlePattern; label: string }[] = [
  { value: 'wave', label: '波形' }, { value: 'orbit', label: '轨道' }, { value: 'grid', label: '网格' },
]
</script>

<template>
  <AkParticleField :key="String(fallback)" :paused="paused" :pattern="pattern" :renderer="fallback ? '2d' : 'auto'" />
  <div class="ak-site__content">
    <p class="ak-site__eyebrow">04 / WORLD FIELD</p>
    <h2 data-ak-section-heading>看见变化的轨迹。</h2>
    <p>低幅运动保持阅读的平静。离开此章节、隐藏页面或开启系统减少动态效果后，粒子会停止运动。</p>
    <div class="ak-gallery__controls" role="group" aria-label="粒子形态">
      <button v-for="item in patterns" :key="item.value" class="ak-site-control" :aria-pressed="pattern === item.value" @click="pattern = item.value">{{ item.label }}</button>
      <button class="ak-site-control" :aria-pressed="paused" @click="paused = !paused">{{ paused ? '播放粒子' : '暂停粒子' }}</button>
      <button class="ak-site-control" :aria-pressed="fallback" @click="fallback = !fallback">2D 降级预览</button>
    </div>
  </div>
</template>
