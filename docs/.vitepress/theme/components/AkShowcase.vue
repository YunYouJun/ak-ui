<script setup lang="ts">
import { computed, ref } from 'vue'

import DemoPreview from './DemoPreview.vue'
import dashboardSource from '../../../../examples/showcase/main.html?raw'
import loadingSource from '../../../../examples/loading/terminal.html?raw'
import { useDashboardDepth } from '../../../../registry/ak/composables/useDashboardDepth'

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

useDashboardDepth(() => showcaseFrame.value?.querySelector('[data-dashboard]'))
</script>

<template>
  <div ref="showcaseFrame" class="ak-showcase-frame" :class="{ 'is-standalone': standalone }">
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
