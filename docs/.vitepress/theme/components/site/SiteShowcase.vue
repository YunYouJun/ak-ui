<script setup lang="ts">
import { AkMobileMenu, AkSectionNavigator } from '../../../../../registry/ak/ui/site'
import SiteArchive from './SiteArchive.vue'
import SiteField from './SiteField.vue'
import SiteLoading from './SiteLoading.vue'

const sections = [
  { id: 'overview', label: '首页' }, { id: 'updates', label: '情报' },
  { id: 'archive', label: '档案' }, { id: 'world', label: '世界' },
  { id: 'media', label: '媒体' }, { id: 'resources', label: '更多' },
]
</script>

<template>
  <AkSectionNavigator class="site-demo vp-raw">
    <header class="ak-site__header">
      <a class="site-demo__brand" href="/guide/official-site-examples.html" aria-label="返回官网风格文档">AK<span> / FIELD NOTES</span></a>
      <nav class="ak-site__nav" aria-label="章节导航">
        <a v-for="section in sections" :key="section.id" :href="`#${section.id}`" data-ak-section-link>{{ section.label }}</a>
      </nav>
      <AkMobileMenu label="打开菜单" close-label="关闭菜单">
        <a v-for="(section, index) in sections" :key="section.id" :href="`#${section.id}`" data-ak-section-link data-ak-menu-item><small>0{{ index + 1 }}</small>{{ section.label }}</a>
      </AkMobileMenu>
    </header>
    <main class="ak-site__viewport" data-ak-section-viewport tabindex="0" aria-label="官网风格示例章节">
      <section id="overview" class="ak-site__section site-demo__hero" data-ak-section aria-labelledby="overview-title">
        <div class="ak-site__content" data-ak-section-content>
          <p class="ak-site__eyebrow">AK-UI / DESIGN STUDY 01</p>
          <h1 id="overview-title" data-ak-section-heading>探索边界，<br>记录未知。</h1>
          <p>FIELD NOTES — 为内容而生的工业界面。<br>细线、留白、冷色信号，以及恰到好处的动态。</p>
          <a class="ak-site-control" href="#updates" data-ak-section-link>进入情报站 ↗</a>
        </div>
        <div class="site-demo__hero-mark" aria-hidden="true">△</div>
        <span class="site-demo__edition">DESIGN SYSTEM / 1.1.0</span>
      </section>
      <section id="updates" class="ak-site__section" data-ak-section aria-labelledby="updates-title">
        <div data-ak-section-content>
          <p class="ak-site__eyebrow">02 / INFORMATION</p><h2 id="updates-title" data-ak-section-heading>情报更新</h2>
          <div class="site-demo__news">
            <a href="/components/ak-site.html"><time>2026.09.19</time><span>公告</span><strong>1.1.0 · 从设计规则到可复用交互</strong><b aria-hidden="true">↗</b></a>
            <a href="/guide/official-site-examples.html"><time>2026.09.19</time><span>研究</span><strong>官网风格覆盖清单与可验证的来源</strong><b aria-hidden="true">↗</b></a>
            <a href="#archive" data-ak-section-link><time>2026.09.19</time><span>档案</span><strong>查看计划档案与媒体画廊</strong><b aria-hidden="true">↗</b></a>
          </div>
        </div>
      </section>
      <section id="archive" class="ak-site__section" data-ak-section aria-labelledby="archive-title">
        <div data-ak-section-content><p class="ak-site__eyebrow">03 / ARCHIVE</p><h2 id="archive-title" data-ak-section-heading>计划档案</h2><SiteArchive /></div>
      </section>
      <section id="world" class="ak-site__section" data-ak-section aria-label="世界观粒子场"><SiteField /></section>
      <section id="media" class="ak-site__section" data-ak-section aria-labelledby="media-title">
        <div data-ak-section-content><p class="ak-site__eyebrow">05 / MEDIA</p><h2 id="media-title" data-ak-section-heading>媒体资料</h2><SiteArchive media /></div>
      </section>
      <section id="resources" class="ak-site__section" data-ak-section aria-labelledby="resources-title">
        <div data-ak-section-content>
          <p class="ak-site__eyebrow">06 / RESOURCE STATUS</p><h2 id="resources-title" data-ak-section-heading>准备好，再出发。</h2>
          <p>进度对应三份示例 SVG 的实际请求完成数。请求失败后可重试，未完成的请求会在组件卸载时取消。</p>
          <SiteLoading />
          <p><a href="/components/ak-site.html">查看组件 API ↗</a> · <a href="/guide/official-site-examples.html">阅读风格审计 ↗</a></p>
        </div>
      </section>
    </main>
    <div class="ak-site__index" aria-hidden="true"><span data-ak-section-current>01</span> / <span data-ak-section-total>06</span></div>
  </AkSectionNavigator>
</template>

<style scoped>
.site-demo { height: 100svh; min-height: 0; }
.site-demo__brand { color: white; font-size: 1.4rem; font-weight: 800; text-decoration: none; white-space: nowrap; }
.site-demo__brand span { color: #a8adb0; font-size: .65rem; font-family: monospace; letter-spacing: .1em; }
.site-demo__hero { background: radial-gradient(ellipse at 80% 45%, #12313b, transparent 65%); }
.site-demo__hero h1 { font-size: clamp(3rem, 7vw, 7rem); line-height: 1.2; }
.site-demo__hero-mark { position: absolute; right: 8%; top: 50%; transform: translateY(-55%) rotate(15deg); color: #19d1ff; opacity: .3; font: 40vw/1 sans-serif; pointer-events: none; }
.site-demo__edition { position: absolute; bottom: 1rem; left: 7%; font: .65rem monospace; letter-spacing: .15em; }
.site-demo__news { border-top: 1px solid #ffffff4d; }
.site-demo__news a { display: grid; grid-template-columns: 7rem 3rem 1fr 1rem; min-height: 5rem; align-items: center; gap: 1rem; border-bottom: 1px solid #ffffff4d; color: inherit; text-decoration: none; }
.site-demo__news a:hover { color: #19d1ff; }
.site-demo__news time { color: #90989d; font: .8rem monospace; }
.site-demo__news span { color: #19d1ff; font-size: .8rem; }
.site-demo__news strong { font-weight: 400; }
.site-demo__reload { margin-top: 1rem; }
@media (max-width: 48rem) {
  .site-demo__news a { grid-template-columns: 6rem 1fr 1rem; padding: 1rem 0; gap: .5rem; }
  .site-demo__news strong { grid-column: 1 / 3; grid-row: 2; line-height: 1.5; }
  .site-demo__news b { grid-column: 3; grid-row: 1 / 3; }
}
</style>
