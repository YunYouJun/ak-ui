<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'
import { withBase } from 'vitepress'

import akCss from '../../../../src/scss/ak-ui.scss?inline'
import type { ExampleSurface } from '../../../../examples/index'

const props = withDefaults(defineProps<{
  encoded: string
  height?: number
  id?: string
  loading?: 'eager' | 'lazy'
  showCode?: boolean
  surface?: ExampleSurface
  title?: string
}>(), {
  height: 240,
  id: 'demo',
  loading: 'lazy',
  showCode: true,
  surface: 'plain',
  title: 'Example',
})

const slots = useSlots()
const copied = ref(false)
const loaded = ref(false)
const source = computed(() => decodeURIComponent(props.encoded))
const base = withBase('/')

const srcdoc = computed(() => `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <base href="${base}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&family=Noto+Serif+SC:wght@700;900&display=swap">
    <style>
      ${akCss}
      :root { color-scheme: ${props.surface === 'plain' ? 'light' : 'dark'}; }
      html, body { min-height: 100%; }
      body {
        box-sizing: border-box;
        margin: 0;
        min-height: 100vh;
        padding: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 16px;
        overflow: auto;
        color: ${props.surface === 'plain' ? '#111315' : '#f3f4ef'};
        background-color: ${props.surface === 'plain' ? '#f3f4ef' : '#17191c'};
        background-position: center;
        background-size: cover;
      }
      body[data-surface="plain"] {
        background-image: linear-gradient(rgba(17, 19, 21, 0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(17, 19, 21, 0.055) 1px, transparent 1px);
        background-size: 24px 24px;
      }
      body[data-surface="dark"] { background-image: linear-gradient(rgba(8, 10, 12, 0.42), rgba(8, 10, 12, 0.42)), url('/img/bg/dark.jpg'); }
      body[data-surface="dust"] { background-image: linear-gradient(rgba(17, 19, 21, 0.15), rgba(17, 19, 21, 0.15)), url('/img/bg/dust.jpg'); }
      body[data-surface="color"] { background-image: linear-gradient(rgba(7, 11, 14, 0.18), rgba(7, 11, 14, 0.18)), url('/img/bg/chen.jpg'); }
      button, input { font: inherit; }
      button { padding: 0; border: 0; color: inherit; }
      img { max-width: 100%; }
      #tactical-map { width: min(620px, 100%); line-height: 0; }
      #tactical-map .ak-cube { margin: 4px; transform: rotateX(-12deg) rotateY(20deg); }
      @media (max-width: 560px) { body { padding: 18px; } }
    </style>
    <script src="https://at.alicdn.com/t/font_1623879_1wzsjomrpmm.js"><\/script>
  </head>
  <body data-surface="${props.surface}" data-demo="${props.id}">
    ${source.value}
  </body>
</html>`)

async function copySource() {
  await navigator.clipboard.writeText(source.value)
  copied.value = true
  window.setTimeout(() => {
    copied.value = false
  }, 1600)
}
</script>

<template>
  <section
    class="ak-demo-preview"
    :class="[`is-${surface}`, { 'is-loaded': loaded }]"
    :data-demo-id="id"
  >
    <header class="ak-demo-preview__header">
      <span class="ak-demo-preview__signal" aria-hidden="true"></span>
      <span class="ak-demo-preview__index">PREVIEW / {{ id.toUpperCase() }}</span>
      <span class="ak-demo-preview__title">{{ title }}</span>
    </header>

    <div class="ak-demo-preview__stage" :style="{ height: `${height}px` }">
      <iframe
        :title="`${title} preview`"
        :srcdoc="srcdoc"
        :loading="loading"
        sandbox="allow-scripts"
        @load="loaded = true"
      ></iframe>
      <span class="ak-demo-preview__loading">LINKING…</span>
    </div>

    <details v-if="showCode && slots.code" class="ak-demo-preview__source" open>
      <summary>
        <span>SOURCE / HTML</span>
        <button type="button" @click.prevent="copySource">
          {{ copied ? 'COPIED' : 'COPY' }}
        </button>
      </summary>
      <div class="ak-demo-preview__code"><slot name="code" /></div>
    </details>
  </section>
</template>
