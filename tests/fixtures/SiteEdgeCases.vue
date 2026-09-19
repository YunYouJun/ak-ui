<script setup lang="ts">
import { shallowRef } from 'vue'
import { AkMediaGallery, AkParticleField } from '../../registry/ak/ui/site'

const mounted = shallowRef(true)
const selection = shallowRef(0)
const initial = [
  { id: 'alpha', title: 'Alpha', image: '/examples/site/signal.svg' },
  { id: 'beta', title: 'Beta', image: '/examples/site/terrain.svg' },
  { id: 'gamma', title: 'Gamma', image: '/examples/site/orbit.svg' },
]
const items = shallowRef(initial)
// One second of silent PCM for a real native media lifecycle, without a network source.
const bytes = new Uint8Array(8044).fill(128)
const header = new DataView(bytes.buffer)
for (const [offset, text] of [[0, 'RIFF'], [8, 'WAVE'], [12, 'fmt '], [36, 'data']] as const)
  [...text].forEach((character, index) => bytes[offset + index] = character.charCodeAt(0))
header.setUint32(4, 8036, true); header.setUint32(16, 16, true)
header.setUint16(20, 1, true); header.setUint16(22, 1, true)
header.setUint32(24, 8000, true); header.setUint32(28, 8000, true)
header.setUint16(32, 1, true); header.setUint16(34, 8, true); header.setUint32(40, 8000, true)
const sound = `data:audio/wav;base64,${btoa(String.fromCharCode(...bytes))}`
</script>

<template>
  <div class="vp-raw" style="padding: 2rem; color: #d2d2d2; background: #101214;">
    <button @click="items = items.filter(item => item.id !== 'beta')">Remove Beta</button>
    <button @click="items = initial.slice(0, 1)">Single item</button>
    <button @click="items = []">Remove all</button>
    <button @click="items = initial">Restore items</button>
    <button @click="mounted = !mounted">Toggle mounted</button>
    <output aria-label="Gallery model">{{ selection }}</output>
    <AkMediaGallery v-if="mounted" v-model="selection" :items="items" label="Dynamic gallery" :loop="false">
      <template #media="{ item }">
        <audio v-if="item.id === 'beta'" :src="sound" controls loop muted preload="auto" aria-label="Silent test recording" />
        <img v-else class="ak-gallery__image" :src="item.image" :alt="item.title">
      </template>
    </AkMediaGallery>
    <div style="position: relative; height: 200px;">
      <AkParticleField v-if="mounted" :count="60" />
    </div>
    <div class="ak-fx--glow">Glow</div><div class="ak-fx--outline">Outline</div>
    <div class="ak-loading" /><div class="ak-loading-track"><span class="ak-loading-track__runner" /></div>
  </div>
</template>
