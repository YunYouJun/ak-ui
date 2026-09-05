<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
const en = computed(() => route.path.startsWith('/en/'))
</script>

<template>
  <main class="ak-not-found" aria-labelledby="not-found-title">
    <p class="ak-not-found__code">404</p>
    <h1 id="not-found-title">{{ en ? 'Page not found' : '没有找到这个页面' }}</h1>
    <p>{{ en ? 'The link may be outdated, or the page may have moved. Continue from the homepage or getting started guide.' : '链接可能已过期，或页面已移动。你可以返回首页，或从接入指南继续浏览。' }}</p>
    <nav :aria-label="en ? 'Continue browsing' : '继续浏览'">
      <a :href="en ? '/en/' : '/'">{{ en ? 'Back to home' : '返回首页' }}</a>
      <a :href="en ? '/en/guide/' : '/guide/'">{{ en ? 'Get started' : '开始使用' }}</a>
    </nav>
  </main>
</template>

<style scoped>
.ak-not-found { max-width: 640px; margin: 64px auto; padding: 32px 24px 80px; color: var(--vp-c-text-1); }
.ak-not-found__code { color: var(--vp-c-brand-1); font: 800 clamp(72px, 15vw, 120px)/1 var(--vp-font-family-mono); }
h1 { margin: 24px 0 16px; font-size: 28px; font-weight: 700; line-height: 1.4; }
p { color: var(--vp-c-text-2); line-height: 1.8; }
nav { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 32px; }
a { padding: 10px 16px; border: 1px solid var(--vp-c-brand-1); color: var(--vp-c-brand-1); font-weight: 600; }
a:hover { background: var(--vp-c-brand-soft); }
a:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 4px; }
</style>
