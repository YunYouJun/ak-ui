---
title: Website coverage and examples
description: Evidence, coverage gaps, component compositions and motion examples from the official website study
---

# Website coverage and examples

**This is a partial extraction and independent adaptation, not a complete reproduction.** On 2026-09-19 we visually revisited all six desktop sections of the [official website](https://ak.hypergryph.com/#index), plus Information and the expanded menu at 390 × 844. The two public CSS hashes still matched the initial study. That does not establish that every resource or runtime behavior is unchanged.

See the [initial study](./official-site-study) and [follow-up evidence](https://github.com/YunYouJun/ak-ui/blob/master/research/official-site/2026-09-19.json).

## Coverage

<div class="official-site-table" role="region" aria-label="Extraction coverage, scroll horizontally" tabindex="0">

| Area | Available | Remaining gap |
| --- | --- | --- |
| Design rules | Hierarchy, signals, geometry, density, responsive and accessibility guidance; skill now includes source mappings and distinct navigation/display font roles | All official pages and states have not been extracted |
| Components | Bilingual links, news rows, directories; buttons, tabs and media primitives | 1.1 adds section navigation, modal menus and archive/media galleries; game-specific assets and business logic remain caller-owned |
| Motion | Entrance, count-up, photo arcs and depth; skill now documents defaults, setup, cleanup and source evidence | 1.1 adds independent navigation, loading and particles; proprietary shaders and complete official timelines remain unverified |
| Examples | Component demos, terminal showcase, the original bulletin composition below | The terminal showcase does not demonstrate official homepage parity |

</div>

The installed skill contains its own evidence summary, coverage table and copyable HTML/JavaScript examples. The entire repository is not required to read that guidance.

## Added in 1.1.0

[Open the six-section showcase](/en/showcase/website) · [Public API and markup](/en/components/ak-site)

Five `/site` controllers and Registry `site` adapters now provide native scrolling with history/focus, modal mobile menus, archive/media galleries, real task progress with retry/cancellation, and original WebGL/2D/static particle fields. The showcase uses Chinese labels and original SVG artwork. Reduced-motion CSS now disables legacy glow, outline and loading loops. These reusable implementations do not claim parity with the source site's private rendering pipeline.

## Original product bulletin

This `system` example composes `.ak-nav`, `.ak-news-list` and `.ak-button`. It uses bilingual hierarchy, an asymmetric content grid, thin separators and a scoped cyan signal, with stacked content in narrow containers. It uses no game artwork.

<div class="vp-raw">

::: demo site/briefing
:::

</div>

Expand the source to copy HTML and local CSS. Import `@yunyoujun/ak-ui/style.css` in the application entry. Replace documentation links with real product routes and set `aria-current` from the actual location. Filtering, sorting, routing, section tracking and mobile-menu behavior remain caller-owned.

## Source motion versus adaptation

The dated [shell CSS](https://web.hycdn.cn/arknights/official/_next/static/css/144c734e19afaa20.css) declares 300ms navigation feedback and 200ms mobile-menu opacity/transform transitions. Computed styles before and after opening the portrait menu show seven delays from 0 to 420ms in 70ms steps. The [page CSS](https://web.hycdn.cn/arknights/official/_next/static/css/6aed155137c3fe93.css) declares a 2s canvas scale, 1s title displacement and delayed 600ms decorative fades. These declarations do not establish the complete runtime timeline.

The following interactive example is an **independent ak-ui extension**. It demonstrates entrance and count-up replay, with final-state rendering for reduced motion. Its controls currently use Chinese labels.

<EffectsPlayground />

`createEntrance` defaults to 650ms and `createCountUp` to 1000ms. They do not automatically read the 120/200/420ms CSS tokens. Explicitly call `play()` after creation and `destroy()` on disposal. The docs-only `data-ak-enter` adapter is not public auto-initialization behavior.

## Related examples

- [Bilingual navigation and directories (中文)](/components/ak-nav)
- [News, long titles and empty state (中文)](/components/ak-news-list)
- [Independent photo arcs (中文)](/components/ak-media)
- [Entrance/count-up APIs (中文)](/components/ak-fx)
- [Terminal depth and regional replay (中文)](/showcase/): a game-interface-inspired extension, not the website layout.

## Skill usage

```text
Use $ak-ui in system mode to build a product updates page using bilingual
navigation, news rows and thin separators. Preserve our brand and real content.
Distinguish source observations from adaptation values, and verify narrow
layouts, keyboard focus and reduced motion.
```

The skill now routes website tasks to `references/official-site.md`, animation tasks to `references/motion.md`, and implementation examples to `references/examples.md`. See [Use the AI Skill](./ai-skill).
