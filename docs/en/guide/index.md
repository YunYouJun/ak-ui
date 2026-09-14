# Get started

ak-ui separates its Arknights-inspired design language into semantic tokens, CSS Core without a runtime, and Vue adapters you can copy into your project. Start with the [AI Skill](/en/guide/ai-skill) to choose a path for your project, or select a manual integration below.

<div class="ak-entry-grid">
  <a class="ak-entry-card ak-entry-card--ai" href="/en/guide/ai-skill">
    <span class="ak-entry-card__channel">AI SKILL / RECOMMENDED</span>
    <strong>AI-assisted integration</strong>
    <p>Preserve your brand and interaction foundation while AI selects Core, Registry or a headless adapter.</p>
    <span class="ak-entry-card__meta">Agent Skills · any stack</span>
    <span class="ak-entry-card__action">Install the Skill →</span>
  </a>
  <a class="ak-entry-card ak-entry-card--core" href="#install">
    <span class="ak-entry-card__channel">CSS CORE / UNIVERSAL</span>
    <strong>Use CSS directly</strong>
    <p>Copy example HTML and use the same stable classes in Vue, React or native pages.</p>
    <span class="ak-entry-card__meta">0 runtime · CSS / SCSS</span>
    <span class="ak-entry-card__action">Continue to installation ↓</span>
  </a>
  <a class="ak-entry-card ak-entry-card--vue" href="/en/registry/">
    <span class="ak-entry-card__channel">VUE ADAPTER / SOURCE</span>
    <strong>Copy Vue components</strong>
    <p>Install editable source with props, events and v-model through shadcn-vue Registry.</p>
    <span class="ak-entry-card__meta">Vue 3 · editable source</span>
    <span class="ak-entry-card__action">Open the Registry →</span>
  </a>
</div>

<p class="ak-entry-note"><strong>Choosing a path:</strong>Start with the AI Skill. Import <code>tokens.css</code> for the design foundation alone, use full CSS Core for existing modules, or choose Vue Registry for typed interaction wrappers in Vue.</p>

For agent-generated interfaces using structured messages, see the [A2UI experiment](/en/guide/a2ui) for protocol adaptation and an interactive demonstration.

## Install

The commands below pin the **1.0.0** stable release. Stable releases use npm's `latest` tag; `next` is reserved for prereleases.

::: code-group

```bash [pnpm]
pnpm add @yunyoujun/ak-ui@1.0.0
```

```bash [npm]
npm install @yunyoujun/ak-ui@1.0.0
```

```bash [yarn]
yarn add @yunyoujun/ak-ui@1.0.0
```

:::

## Import CSS

```ts
import '@yunyoujun/ak-ui/style.css'
```

To style existing headless components using only tokens:

```ts
import '@yunyoujun/ak-ui/tokens.css'
```

You can also load CSS directly from a CDN:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@yunyoujun/ak-ui@1.0.0/dist/ak-ui.min.css">
```

## Use CSS Core

Every module uses HTML classes as its interface. Copy the corresponding example and override `--ak-*` CSS variables as needed. For custom components, read [Design tokens](/en/guide/tokens) and [Adapting headless components](/en/guide/headless).

::: demo button/base
:::

Browse all modules in the [component index](/en/components/), or install editable adapters with [Vue Registry](/en/registry/) for a Vue project.

::: warning Unofficial project
ak-ui is an unofficial, hobby-driven design language study with no affiliation to Hypergryph. It does not aim to recreate specific game screens. Game names, images and related assets belong to their respective rights holders.
:::

## Language and appearance

The homepage, integration guides, design and development guides, and Registry API have corresponding [Chinese](/guide/) and English pages. The language menu opens the corresponding translation when available, or the target language homepage otherwise. Detailed component references and full-screen demos remain in Chinese and are labeled in English navigation.

The docs support light and dark themes and persist your choice. Component demos retain their intended surfaces. The CSS library does not translate product content or manage application themes: supply localized labels through props, slots and your copied source, and adapt product colors through design tokens.
