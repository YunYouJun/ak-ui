<script setup lang="ts">
import { AkSlider } from '../../../../registry/ak/ui/slider'
defineProps<{ playing: boolean, seconds: number, duration: number, disabled: boolean }>()
const loop = defineModel<boolean>('loop', { required: true })
const emit = defineEmits<{ play: [], pause: [], stop: [], seek: [seconds: number] }>()
</script>

<template>
  <section id="depth-playground" class="depth-playback" aria-label="景深动画播放器">
    <strong>景深动画 Playground</strong>
    <p>界面、人物、背景分层运动，搭配人物呼吸。全程保持清晰；暂停后可逐段拖动查看，返回指针模式后恢复鼠标控制。</p>
    <div class="depth-playback__actions">
      <button type="button" :disabled="disabled" @click="playing ? emit('pause') : emit('play')">{{ playing ? '暂停动画' : '播放景深动画' }}</button>
      <button type="button" @click="emit('stop')">返回指针模式</button>
      <label><input v-model="loop" type="checkbox"> 循环播放</label>
      <output aria-live="off">{{ seconds.toFixed(1) }} / {{ duration }} 秒</output>
    </div>
    <AkSlider class="depth-playback__slider" label="景深动画进度" :min="0" :max="duration" :step="0.01" :model-value="seconds" :disabled="disabled" @update:model-value="emit('seek', $event)" />
    <p v-if="disabled" role="status">启用景深且系统未设置减少动态效果时，可以播放动画。</p>
  </section>
</template>

<style scoped>
.depth-playback { padding: 16px 20px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft); }
.depth-playback p { color: var(--vp-c-text-2); font-size: 13px; }
.depth-playback__actions { display: flex; flex-wrap: wrap; align-items: center; gap: 16px; }
.depth-playback button { min-height: 44px; padding: 8px 12px; border: 1px solid var(--vp-c-divider); cursor: pointer; }
.depth-playback button:disabled { opacity: .5; cursor: not-allowed; }
.depth-playback__slider { margin-top: 16px; }
.depth-playback :focus-visible { outline: 2px solid var(--ak-doc-blue); outline-offset: 3px; }
</style>
