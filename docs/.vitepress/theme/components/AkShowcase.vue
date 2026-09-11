<script setup lang="ts">
import { computed, onMounted, ref, shallowRef, watch } from 'vue'

import DemoPreview from './DemoPreview.vue'
import ArtworkPicker from './ArtworkPicker.vue'
import { getShowcaseArtwork, showcaseArtwork } from './showcaseArtwork'
import type { ArtworkTone } from './showcaseArtwork'
import dashboardSource from '../../../../examples/showcase/main.html?raw'
import loadingSource from '../../../../examples/loading/terminal.html?raw'
import DepthControls from './DepthControls.vue'
import { defaultDepthSettings, useShowcaseDepth } from './useShowcaseDepth'

const props = withDefaults(defineProps<{
  kind?: 'dashboard' | 'loading'
  standalone?: boolean
}>(), {
  kind: 'dashboard',
  standalone: false,
})

const example = computed(() => props.kind === 'loading'
  ? {
      encoded: encodeURIComponent(loadingSource.trim()),
      id: 'loading/terminal',
      title: 'Terminal loading screen',
    }
  : {
      encoded: encodeURIComponent(dashboardSource.trim()),
      id: 'showcase/main',
      title: 'Rhodes Island terminal',
    })
const showcaseFrame = ref<HTMLElement>()
const selectedArtwork = shallowRef('tactical')
const artworkTone = shallowRef<ArtworkTone>('role')
const decoratedArtwork = shallowRef(false)
const availableArtwork = computed(() => getShowcaseArtwork(artworkTone.value, decoratedArtwork.value))
const requestedArtwork = computed(() => availableArtwork.value.find(item => item.id === selectedArtwork.value))
const appliedArtwork = shallowRef(showcaseArtwork[0])
const artworkStatus = shallowRef(showcaseArtwork[0].description)

// Update only the two artwork images: keep the terminal DOM, dialogs and depth
// controller alive while trying outfits. Discard stale loads on rapid selection.
onMounted(() => {
  if (props.kind !== 'dashboard')
    return
  watch(requestedArtwork, async (artwork, _previous, onCleanup) => {
    if (!artwork)
      return

    let cancelled = false
    onCleanup(() => { cancelled = true })
    artworkStatus.value = `正在加载小云 · ${artwork.name}…`
    const src = artwork.src
    try {
      const image = new Image()
      image.src = src
      await image.decode()
      if (cancelled)
        return
      showcaseFrame.value?.querySelectorAll<HTMLImageElement>('[data-character-artwork]')
        .forEach(element => { element.src = src })
      appliedArtwork.value = { ...artwork, src }
      artworkStatus.value = `${artwork.name} · ${artwork.palette} · ${artwork.composition} · 在线素材 · ${artwork.description}`
    }
    catch {
      if (!cancelled)
        artworkStatus.value = '立绘加载失败，已保留当前立绘。请选择其他职业或稍后重试。'
    }
  }, { immediate: true })
})

const depthSettings = shallowRef({ ...defaultDepthSettings })
const depth = useShowcaseDepth(
  () => showcaseFrame.value?.querySelector<HTMLElement>('[data-dashboard]'),
  depthSettings,
)
</script>

<template>
  <div ref="showcaseFrame" class="ak-showcase-frame" :class="{ 'is-standalone': standalone }">
    <ArtworkPicker
      v-if="kind === 'dashboard' && !standalone"
      v-model="selectedArtwork"
      v-model:tone="artworkTone"
      v-model:decorated="decoratedArtwork"
      :artworks="availableArtwork"
      :status="artworkStatus"
    />
    <DepthControls
      v-if="kind === 'dashboard' && !standalone"
      v-model="depthSettings"
      :reduced-motion="depth.reducedMotion.value"
      @reset="depth.reset"
      @preview="depth.preview"
    />
    <p v-if="kind === 'dashboard' && !standalone" class="ak-showcase-artwork-path">
      当前素材：<a :href="appliedArtwork.src" target="_blank" rel="noopener">{{ appliedArtwork.src }}</a>
      · <a :href="appliedArtwork.originalSrc" target="_blank" rel="noopener">下载 PNG 原图</a>
    </p>
    <DemoPreview
      :id="example.id"
      :encoded="example.encoded"
      :height="900"
      :source-open="false"
      surface="dark"
      :title="example.title"
    />
  </div>
</template>

<style scoped>
.ak-showcase-artwork-path {
  padding: 0 20px;
  font-size: 13px;
  overflow-wrap: anywhere;
}

.ak-showcase-frame {
  width: min(1440px, 100vw);
  margin: 28px 0 48px 50%;
  transform: translateX(-50%);
}

.ak-showcase-frame :deep(.ak-demo-preview) {
  box-shadow: 18px 22px 0 rgba(0, 0, 0, 0.2);
}

.ak-showcase-frame :deep(.ak-demo-preview__canvas) {
  padding: 0;
  align-items: stretch;
}

.ak-showcase-frame.is-standalone {
  width: 100vw;
  height: 100vh;
  margin: 0;
  transform: none;
}

.ak-showcase-frame.is-standalone :deep(.ak-demo-preview) {
  margin: 0;
  border: 0;
  box-shadow: none;
  clip-path: none;
}

.ak-showcase-frame.is-standalone :deep(.ak-demo-preview__header) {
  display: none;
}

.ak-showcase-frame.is-standalone :deep(.ak-demo-preview__stage) {
  height: 100vh !important;
}

@media (max-width: 640px) {
  .ak-showcase-frame {
    width: 100vw;
    margin-top: 20px;
  }

  .ak-showcase-frame :deep(.ak-demo-preview) {
    margin-right: 0;
    margin-left: 0;
    box-shadow: none;
  }

  .ak-showcase-frame :deep(.ak-demo-preview__stage) {
    height: 844px !important;
  }
}
</style>
