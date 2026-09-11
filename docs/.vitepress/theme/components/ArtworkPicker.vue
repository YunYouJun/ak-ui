<script setup lang="ts">
import { computed } from 'vue'
import type { ArtworkTone, ShowcaseArtwork } from './showcaseArtwork'

const selected = defineModel<string>({ required: true })
const tone = defineModel<ArtworkTone>('tone', { required: true })
const decorated = defineModel<boolean>('decorated', { required: true })
const props = defineProps<{ status: string, artworks: ShowcaseArtwork[] }>()
const professions = computed(() => props.artworks.filter(artwork => artwork.id !== 'tactical'))

</script>

<template>
  <section class="artwork-picker" aria-label="小云立绘 Playground">
    <div class="artwork-picker__heading">
      <strong>小云 / 职业立绘</strong>
      <span>选择职业与配色</span>
      <button class="artwork-picker__reset" type="button" :aria-pressed="selected === 'tactical'" @click="selected = 'tactical'">
        原版 TACTICAL
      </button>
    </div>
    <div class="artwork-picker__tones" role="group" aria-label="立绘配色">
      <button class="artwork-picker__tone" type="button" :aria-pressed="tone === 'role'" @click="tone = 'role'">职业配色</button>
      <button class="artwork-picker__tone" type="button" :aria-pressed="tone === 'original'" @click="tone = 'original'">原版蓝白</button>
    </div>
    <label class="artwork-picker__decoration">
      <input v-model="decorated" type="checkbox">
      精英装饰
      <span>八职业配色均可切换；原版蓝白保持纯立绘。</span>
    </label>
    <p v-if="tone === 'original'" class="artwork-picker__series-note">原版蓝白展示初版八职业的服饰与姿势。</p>
    <div class="artwork-picker__grid">
      <button
        v-for="artwork in professions"
        :key="artwork.id"
        class="artwork-picker__card"
        :style="{ '--artwork-color': artwork.color }"
        type="button"
        :aria-pressed="selected === artwork.id"
        @click="selected = artwork.id"
      >
        <span class="artwork-picker__portrait">
          <img :key="artwork.thumbnailSrc" :src="artwork.thumbnailSrc" alt="" loading="lazy" width="1586" height="992">
        </span>
        <strong>{{ artwork.name }}</strong>
        <small>{{ artwork.id.toUpperCase() }}</small>
        <span class="artwork-picker__palette">{{ artwork.palette }}{{ artwork.composition === '精英装饰' ? ' · 精英' : '' }}</span>
      </button>
    </div>
    <p class="artwork-picker__status" role="status">{{ status }}</p>
  </section>
</template>

<style scoped>
.artwork-picker {
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.artwork-picker__heading {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
  align-items: baseline;
  margin-bottom: 16px;
}

.artwork-picker__heading span, .artwork-picker__status {
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.artwork-picker__grid {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: 8px;
}

.artwork-picker__tones {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.artwork-picker__decoration {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 10px;
  margin-bottom: 16px;
  font-size: 13px;
  cursor: pointer;
}

.artwork-picker__decoration input {
  accent-color: #55cfff;
}

.artwork-picker__decoration span {
  color: var(--vp-c-text-2);
  font-size: 12px;
}

.artwork-picker__tone {
  padding: 6px 16px;
  border: 1px solid var(--vp-c-divider);
  font-size: 13px;
  cursor: pointer;
}

.artwork-picker__tone[aria-pressed="true"] {
  color: #a8ddf8;
  background: #243f50;
  border-color: #85cfff;
}

.artwork-picker__tone:focus-visible {
  outline: 2px solid #85cfff;
  outline-offset: 3px;
}

.artwork-picker__card {
  display: grid;
  justify-items: center;
  min-width: 0;
  padding: 0 0 12px;
  border: 1px solid var(--vp-c-divider);
  border-top: 3px solid var(--artwork-color);
  background: linear-gradient(160deg, color-mix(in srgb, var(--artwork-color) 16%, #1b232c), #131a22);
  color: #f4f2ea;
  cursor: pointer;
}

.artwork-picker__card[aria-pressed="true"] {
  border-color: var(--artwork-color);
  box-shadow: inset 0 -3px var(--artwork-color);
  background: linear-gradient(160deg, color-mix(in srgb, var(--artwork-color) 32%, #1b232c), #1b232c);
}

.artwork-picker__card:focus-visible {
  outline: 2px solid var(--artwork-color);
  outline-offset: 3px;
}

.artwork-picker__portrait {
  position: relative;
  display: block;
  width: 100%;
  height: 160px;
  overflow: hidden;
  margin-bottom: 10px;
}

.artwork-picker__portrait img {
  position: absolute;
  top: 0;
  left: 50%;
  width: auto;
  height: 118%;
  max-width: none;
  transform: translateX(-40%);
}

.artwork-picker__palette {
  margin-top: 8px;
  color: var(--artwork-color);
  font-size: 11px;
}

.artwork-picker__reset {
  margin-left: auto;
  padding: 4px 12px;
  border: 1px solid var(--vp-c-divider);
  font-size: 12px;
  cursor: pointer;
}

.artwork-picker__reset[aria-pressed="true"] {
  border-color: #55cfff;
}

.artwork-picker__reset:focus-visible {
  outline: 2px solid #55cfff;
  outline-offset: 3px;
}

@media (max-width: 1000px) {
  .artwork-picker__grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .artwork-picker__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.artwork-picker__card small {
  font-size: 10px;
  letter-spacing: 0.08em;
}

.artwork-picker__status {
  margin: 12px 0 0;
  min-height: 24px;
}

.artwork-picker__series-note {
  margin: 0 0 12px;
  color: var(--vp-c-text-2);
  font-size: 12px;
}
</style>
