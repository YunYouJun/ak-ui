<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import DemoPreview from './DemoPreview.vue'
import buttonExample from '../../../../examples/button/base.html?raw'

const encodedButtonExample = encodeURIComponent(buttonExample.trim())

const { lang } = useData()
const en = computed(() => lang.value === 'en')
const label = (zh: string, english: string) => en.value ? english : zh
const guideLink = computed(() => en.value ? '/en/guide/' : '/guide/ai-skill')
const modules = [
  { code: 'BTN', name: '按钮', english: 'Buttons', description: '行动、确认与快捷操作', englishDescription: 'Actions, confirmations and shortcuts', href: '/components/ak-button' },
  { code: 'CRD', name: '卡片', english: 'Cards', description: '信息容器与选择状态', englishDescription: 'Content containers and selection states', href: '/components/ak-card' },
  { code: 'LVL', name: '关卡', english: 'Levels', description: '作战节点与资源标记', englishDescription: 'Stage nodes and resource markers', href: '/components/ak-level' },
  { code: 'SAN', name: '理智', english: 'Sanity', description: '状态数值与反馈组合', englishDescription: 'Status values and feedback', href: '/components/ak-san' },
  { code: 'FX', name: '效果', english: 'Effects', description: '倾斜、辉光与轮廓', englishDescription: 'Skew, glow and outlines', href: '/components/ak-fx' },
  { code: 'OBJ', name: '物体', english: 'Objects', description: '三维战术地图元素', englishDescription: 'Three-dimensional tactical elements', href: '/components/ak-object' },
]
</script>

<template>
  <div class="ak-home">
    <div class="ak-home__grid" aria-hidden="true"></div>
    <div class="ak-home__ruler" aria-hidden="true">
      <span>00</span><span>12</span><span>24</span><span>36</span><span>48</span><span>60</span>
    </div>

    <section class="ak-hero">
      <div class="ak-hero__brief">
        <p class="ak-kicker"><span>AK-UI / 001</span> AI-READY DESIGN FOUNDATION</p>
        <h1><span>AK</span><i>/</i>UI</h1>
        <p class="ak-hero__lead">{{ label('把受《明日方舟》启发的几何、层级与反馈，变成可融合品牌、可由 AI 编排的样式基础。', 'Geometry, hierarchy and feedback inspired by Arknights. A CSS foundation for your brand, ready for AI-assisted development.') }}</p>

        <div class="ak-hero__actions">
          <a class="ak-action ak-action--primary" :href="guideLink">{{ label('使用 AI Skill', 'Get started') }} <span>→</span></a>
          <a class="ak-action" :href="en ? '/en/components/' : '/components/'">{{ label('浏览组件', 'Browse components') }} <span>↗</span></a>
        </div>

        <dl class="ak-hero__stats">
          <div><dt>RUNTIME</dt><dd>0</dd><small>framework</small></div>
          <div><dt>FORMAT</dt><dd>CSS</dd><small>tokens + core</small></div>
          <div><dt>ENTRY</dt><dd>AI</dd><small>skill + manual</small></div>
        </dl>
      </div>

      <div class="ak-hero__terminal">
        <div class="ak-terminal__caption">
          <span>LIVE INTERFACE</span>
          <span class="ak-terminal__status">ONLINE</span>
        </div>
        <DemoPreview
          id="home/button-base"
          :encoded="encodedButtonExample"
          :height="260"
          :show-code="false"
          aria-hidden="true"
          inert
          surface="color"
          title="Operation controls"
        />
        <div class="ak-terminal__coordinates">
          <span>31°13′12″N</span>
          <span>121°28′48″E</span>
        </div>
        <a class="ak-terminal__link" href="/showcase/">
          <span>{{ label('查看完整演示 →', 'Explore the full demo →') }}</span>
        </a>
      </div>
    </section>

    <section class="ak-fidelity-note" aria-labelledby="fidelity-note-title">
      <p class="ak-section-code">DESIGN SCOPE / 00</p>
      <h2 id="fidelity-note-title">{{ label('约束的是设计语言，', 'A design language,') }}<br>{{ label('不是像素级还原。', 'with room for your brand.') }}</h2>
      <div>
        <p>{{ label('ak-ui 抽象信息层级、工业几何、功能色彩、组件状态与动效节奏，帮助用户构建具有相似气质但品牌、内容和结构独立的产品界面。', 'Build an independent product with industrial geometry, purposeful colors, clear states and measured motion. Keep your own brand, content and structure.') }}</p>
        <a href="/guide/design-language">{{ label('查看 ak-ui 设计契约 →', 'Read the design contract (中文) →') }}</a>
      </div>
    </section>

    <section class="ak-manifesto">
      <header>
        <p class="ak-section-code">DESIGN RECORD / 01</p>
        <h2>{{ label('Token 是 contract，', 'Tokens are the contract.') }}<br>{{ label('框架只是 adapter。', 'Frameworks are adapters.') }}</h2>
      </header>
      <div class="ak-manifesto__body">
        <p>{{ label('每个模块由语义化 HTML、稳定类名和 CSS variables 组成。AI Skill 会优先复用项目已有 primitives，并保留品牌和无障碍行为。', 'Each module combines semantic HTML, stable class names and CSS variables. The AI Skill reuses your existing primitives while preserving brand identity and accessible behavior.') }}</p>
        <div class="ak-manifesto__rule">
          <span>TOKENS</span><i></i><span>PRIMITIVES</span><i></i><span>ANY STACK</span>
        </div>
      </div>
    </section>

    <section class="ak-module-index">
      <header>
        <p class="ak-section-code">TERMINAL INDEX / 02</p>
        <h2>{{ label('界面模块', 'Interface modules') }}</h2>
        <a :href="en ? '/en/components/' : '/components/'">{{ label('打开完整索引 →', 'Open the component index →') }}</a>
      </header>
      <div class="ak-module-grid">
        <a v-for="module in modules" :key="module.code" :href="module.href" class="ak-module-card">
          <span class="ak-module-card__code">{{ module.code }}</span>
          <strong>{{ label(module.name, module.english + ' (中文)') }}</strong>
          <p>{{ label(module.description, module.englishDescription) }}</p>
          <span class="ak-module-card__arrow">↗</span>
        </a>
      </div>
    </section>

    <section class="ak-home__footer">
      <div>
        <span>UNOFFICIAL DESIGN LANGUAGE STUDY</span>
        <strong>AK-UI / DESIGN FOUNDATION</strong>
      </div>
      <a href="https://github.com/YunYouJun/ak-ui">SOURCE ON GITHUB ↗</a>
    </section>
  </div>
</template>

<style scoped>
.ak-home {
  --home-ink: #111315;
  --home-panel: #202428;
  --home-paper: #f3f4ef;
  --home-yellow: #ffd802;
  --home-bg: #e9ebe7;
  --home-text: #171a1d;
  --home-muted: #596167;
  --home-lead: #30363a;
  --home-copy: #454d52;
  --home-subtle: #626a70;
  --home-accent-text: #806c00;
  --home-blue: #007aa8;
  --home-orange: #c33e05;
  --home-border: #aeb4af;
  --home-grid-line: rgba(17, 19, 21, 0.09);
  --home-action-hover-bg: #111315;
  --home-action-hover-text: #f3f4ef;
  --home-footer-bg: #111315;
  --home-footer-text: #f3f4ef;
  position: relative;
  width: 100%;
  overflow: hidden;
  color: var(--home-text);
  background: var(--home-bg);
  isolation: isolate;
}

:global(.dark .ak-home) {
  --home-bg: #111315;
  --home-text: #f3f4ef;
  --home-muted: #aeb4b9;
  --home-lead: #d7dadd;
  --home-copy: #b8bdc1;
  --home-subtle: #949ba0;
  --home-accent-text: #ffd802;
  --home-blue: #22bbff;
  --home-orange: #f6540e;
  --home-border: #41474c;
  --home-grid-line: rgba(255, 255, 255, 0.1);
  --home-action-hover-bg: #f3f4ef;
  --home-action-hover-text: #111315;
  --home-footer-bg: #f3f4ef;
  --home-footer-text: #111315;
}

.ak-home__grid {
  position: absolute;
  z-index: -2;
  inset: 0;
  opacity: 0.2;
  background-image: linear-gradient(var(--home-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--home-grid-line) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: linear-gradient(to bottom, black, transparent 76%);
}

.ak-home__ruler {
  position: absolute;
  z-index: -1;
  top: 520px;
  left: -7%;
  display: flex;
  width: 116%;
  height: 54px;
  padding: 0 8%;
  color: var(--home-ink);
  background: var(--home-yellow);
  align-items: center;
  justify-content: space-between;
  font: 700 11px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
  transform: rotate(-3deg);
  transform-origin: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.24);
}

.ak-home__ruler::before,
.ak-home__ruler::after {
  position: absolute;
  content: '';
  inset: 8px 0 auto;
  height: 1px;
  background: repeating-linear-gradient(90deg, var(--home-ink) 0 1px, transparent 1px 16px);
}

.ak-home__ruler::after { inset: auto 0 8px; }

.ak-hero {
  display: grid;
  min-height: 720px;
  max-width: 1440px;
  margin: 0 auto;
  padding: 104px 48px 118px;
  grid-template-columns: minmax(0, 0.92fr) minmax(480px, 1.08fr);
  gap: 72px;
  align-items: center;
}

.ak-kicker,
.ak-section-code,
.ak-terminal__caption,
.ak-terminal__coordinates,
.ak-hero__stats dt,
.ak-hero__stats small {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.ak-kicker {
  display: flex;
  margin: 0 0 24px;
  color: var(--home-muted);
  font-size: 11px;
  gap: 16px;
  align-items: center;
}

.ak-kicker span {
  padding: 7px 9px;
  color: var(--home-ink);
  background: var(--home-yellow);
  font-weight: 900;
}

.ak-hero h1 {
  display: flex;
  margin: 0;
  align-items: center;
  color: var(--home-text);
  font-family: Syncopate, Arial Black, sans-serif;
  font-size: clamp(72px, 10vw, 152px);
  line-height: 0.78;
  letter-spacing: -0.1em;
  text-transform: uppercase;
}

.ak-hero h1 span { color: var(--home-accent-text); }
.ak-hero h1 i { margin: 0 0.06em; color: var(--home-blue); font-style: normal; font-weight: 400; }

.ak-hero__lead {
  max-width: 550px;
  margin: 40px 0 0;
  color: var(--home-lead);
  font-size: clamp(20px, 2vw, 27px);
  font-weight: 500;
  line-height: 1.55;
}

.ak-hero__actions { display: flex; margin-top: 34px; gap: 12px; }

.ak-action {
  display: inline-flex;
  min-width: 154px;
  padding: 14px 18px;
  border: 1px solid var(--home-border);
  color: var(--home-text);
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  clip-path: polygon(0 0, calc(100% - 13px) 0, 100% 13px, 100% 100%, 0 100%);
  transition: color 160ms ease, background 160ms ease, transform 160ms ease;
}

.ak-action:hover { color: var(--home-action-hover-text); background: var(--home-action-hover-bg); transform: translateY(-2px); }
.ak-action--primary { border-color: var(--home-yellow); color: var(--home-ink); background: var(--home-yellow); }

.ak-hero__stats {
  display: grid;
  max-width: 560px;
  margin: 54px 0 0;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--home-border);
}

.ak-hero__stats div { padding: 16px 14px 0 0; border-right: 1px solid var(--home-border); }
.ak-hero__stats div + div { padding-left: 18px; }
.ak-hero__stats dt { color: var(--home-muted); font-size: 9px; }
.ak-hero__stats dd { margin: 7px 0 2px; color: var(--home-text); font: 900 26px/1 Syncopate, sans-serif; }
.ak-hero__stats small { color: var(--home-muted); font-size: 8px; }

.ak-hero__terminal {
  position: relative;
  padding: 14px;
  border: 1px solid #51575c;
  color: var(--home-paper);
  background: rgba(23, 26, 29, 0.9);
  box-shadow: 24px 28px 0 rgba(0, 0, 0, 0.28);
  clip-path: polygon(0 0, calc(100% - 36px) 0, 100% 36px, 100% 100%, 22px 100%, 0 calc(100% - 22px));
  animation: terminal-enter 700ms cubic-bezier(0.2, 0.75, 0.2, 1) both;
  transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;
}

.ak-hero__terminal:hover {
  border-color: var(--home-blue);
  box-shadow: 24px 28px 0 rgba(0, 0, 0, 0.28), 0 0 28px rgba(34, 187, 255, 0.16);
  transform: translateY(-3px);
}

.ak-hero__terminal:focus-within {
  outline: 2px solid var(--home-yellow);
  outline-offset: 4px;
}

.ak-hero__terminal :deep(.ak-demo-preview) {
  --vp-c-bg-alt: #171a1d;
  --vp-c-divider: #3b4146;
  --vp-c-text-2: #b5bbc0;
  --vp-c-text-3: #838a90;
}

.ak-hero__terminal :deep(.ak-demo-preview.is-color .ak-demo-preview__canvas) {
  background-color: #1a2227;
  background-image:
    linear-gradient(112deg, rgba(5, 9, 11, 0.82) 0 29%, transparent 29% 68%, rgba(5, 9, 11, 0.7) 68%),
    repeating-linear-gradient(0deg, rgba(34, 187, 255, 0.08) 0 1px, transparent 1px 24px),
    repeating-linear-gradient(90deg, rgba(255, 216, 2, 0.06) 0 1px, transparent 1px 24px),
    linear-gradient(135deg, #3b4a52, #101518);
  background-size: cover, 24px 24px, 24px 24px, cover;
}

.ak-hero__terminal::before {
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  width: 42px;
  height: 42px;
  content: '';
  border-left: 1px solid #51575c;
  background: repeating-linear-gradient(-45deg, var(--home-yellow) 0 4px, var(--home-ink) 4px 8px);
}

.ak-terminal__caption,
.ak-terminal__coordinates {
  display: flex;
  min-height: 30px;
  padding: 0 8px;
  color: #949ba0;
  align-items: center;
  justify-content: space-between;
  font-size: 9px;
}

.ak-terminal__status { color: var(--home-blue); }
.ak-terminal__status::before { display: inline-block; width: 6px; height: 6px; margin-right: 7px; content: ''; background: currentColor; box-shadow: 0 0 12px currentColor; }
.ak-terminal__coordinates {
  display: grid;
  border-top: 1px solid #363b3f;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.ak-terminal__coordinates span:nth-child(2) { text-align: center; }

.ak-terminal__link {
  position: absolute;
  z-index: 2;
  inset: 0;
  color: var(--home-paper);
  text-decoration: none;
}

.ak-terminal__link span {
  position: absolute;
  right: 22px;
  bottom: 14px;
  color: var(--home-blue);
  font: 700 9px/1 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;
}

.ak-terminal__link:hover span { color: var(--home-yellow); }

.ak-fidelity-note {
  display: grid;
  max-width: 1240px;
  margin: 40px auto 0;
  padding: 54px 48px;
  color: var(--home-paper);
  background: var(--home-panel);
  box-shadow: 18px 20px 0 rgba(0, 0, 0, 0.18);
  grid-template-columns: 1fr 1fr;
  gap: 90px;
  clip-path: polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%);
}

.ak-fidelity-note .ak-section-code {
  grid-column: 1 / -1;
}

.ak-fidelity-note h2 {
  margin: 0;
  font-size: clamp(30px, 3.4vw, 50px);
  letter-spacing: -0.045em;
  line-height: 1.16;
}

.ak-fidelity-note div {
  padding-top: 4px;
}

.ak-fidelity-note div p {
  margin: 0;
  color: #bdc2c6;
  font-size: 16px;
  line-height: 1.85;
}

.ak-fidelity-note a {
  display: inline-block;
  margin-top: 24px;
  color: var(--home-yellow);
  font: 700 11px/1 ui-monospace, monospace;
  letter-spacing: 0.08em;
  text-decoration: none;
}

.ak-manifesto {
  display: grid;
  max-width: 1240px;
  margin: 40px auto 0;
  padding: 88px 48px;
  grid-template-columns: 1fr 1fr;
  gap: 90px;
  border-top: 1px solid var(--home-border);
}

.ak-section-code { margin: 0 0 18px; color: var(--home-accent-text); font-size: 10px; }
.ak-manifesto h2,
.ak-module-index h2 { margin: 0; font-size: clamp(36px, 4.5vw, 66px); line-height: 1.1; letter-spacing: -0.045em; }
.ak-manifesto__body { padding-top: 36px; }
.ak-manifesto__body > p { max-width: 620px; margin: 0; color: var(--home-copy); font-size: 18px; line-height: 1.85; }

.ak-manifesto__rule { display: flex; margin-top: 42px; align-items: center; color: var(--home-blue); font: 700 10px/1 ui-monospace, monospace; letter-spacing: 0.16em; }
.ak-manifesto__rule i { height: 1px; margin: 0 14px; background: var(--home-border); flex: 1; }

.ak-module-index {
  max-width: 1240px;
  margin: 0 auto;
  padding: 80px 48px 110px;
}

.ak-module-index > header { display: grid; margin-bottom: 34px; grid-template-columns: 1fr auto; align-items: end; }
.ak-module-index > header .ak-section-code { grid-column: 1 / -1; }
.ak-module-index > header > a { color: var(--home-muted); font-size: 13px; text-decoration: none; }
.ak-module-index > header > a:hover { color: var(--home-accent-text); }

.ak-module-grid { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--home-border); border-left: 1px solid var(--home-border); }
.ak-module-card {
  position: relative;
  min-height: 190px;
  padding: 24px;
  border-right: 1px solid var(--home-border);
  border-bottom: 1px solid var(--home-border);
  color: var(--home-text);
  text-decoration: none;
  transition: color 180ms ease, background 180ms ease;
}
.ak-module-card:hover { color: var(--home-ink); background: var(--home-yellow); }
.ak-module-card__code { color: var(--home-blue); font: 700 10px/1 ui-monospace, monospace; letter-spacing: 0.14em; }
.ak-module-card:hover .ak-module-card__code { color: var(--home-orange); }
.ak-module-card strong { display: block; margin-top: 46px; font-size: 24px; }
.ak-module-card p { margin: 8px 36px 0 0; color: var(--home-subtle); font-size: 13px; }
.ak-module-card:hover p { color: #373a3d; }
.ak-module-card__arrow { position: absolute; right: 22px; bottom: 20px; font-size: 22px; }

.ak-home__footer {
  display: flex;
  min-height: 150px;
  padding: 34px max(48px, calc((100% - 1144px) / 2));
  color: var(--home-footer-text);
  background: var(--home-footer-bg);
  align-items: center;
  justify-content: space-between;
}
.ak-home__footer div { display: flex; flex-direction: column; gap: 7px; }
.ak-home__footer span { font: 700 9px/1 ui-monospace, monospace; letter-spacing: 0.16em; }
.ak-home__footer strong { font-family: Syncopate, sans-serif; }
.ak-home__footer a { color: inherit; font: 700 11px/1 ui-monospace, monospace; letter-spacing: 0.1em; text-decoration: none; }

@keyframes terminal-enter {
  from { opacity: 0; transform: translate3d(36px, 18px, 0) skewY(1deg); }
  to { opacity: 1; transform: translate3d(0, 0, 0) skewY(0); }
}

@media (max-width: 980px) {
  .ak-hero { min-height: auto; padding-top: 88px; grid-template-columns: 1fr; gap: 60px; }
  .ak-hero__terminal { max-width: 720px; }
  .ak-home__ruler { top: 610px; }
  .ak-manifesto { grid-template-columns: 1fr; gap: 10px; }
  .ak-fidelity-note { grid-template-columns: 1fr; gap: 20px; }
}

@media (max-width: 720px) {
  .ak-hero,
  .ak-fidelity-note,
  .ak-manifesto,
  .ak-module-index { padding-right: 20px; padding-left: 20px; }
  .ak-hero { padding-top: 72px; padding-bottom: 92px; }
  .ak-kicker { align-items: flex-start; flex-direction: column; }
  .ak-hero h1 { font-size: clamp(64px, 24vw, 104px); }
  .ak-hero__lead { font-size: 18px; }
  .ak-hero__actions { align-items: stretch; flex-direction: column; }
  .ak-hero__stats { grid-template-columns: 1fr; }
  .ak-hero__stats div { display: grid; padding: 12px 0; grid-template-columns: 1fr auto; border-right: 0; border-bottom: 1px solid var(--home-border); }
  .ak-hero__stats div + div { padding-left: 0; }
  .ak-hero__stats dd { grid-row: 1 / 3; grid-column: 2; }
  .ak-module-index > header { grid-template-columns: 1fr; gap: 18px; }
  .ak-module-grid { grid-template-columns: 1fr; }
  .ak-home__footer { padding: 32px 20px; align-items: flex-start; flex-direction: column; gap: 30px; }
}

@media (prefers-reduced-motion: reduce) {
  .ak-hero__terminal { animation: none; }
  .ak-hero__terminal:hover { transform: none; }
  .ak-action,
  .ak-module-card { transition: none; }
}
</style>
