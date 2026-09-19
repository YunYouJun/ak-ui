---
title: Official website UI study
description: Traceable website observations, component patterns, and ak-ui token mappings
---

# Official website UI study

> **2026-09-19 follow-up:** both CSS hashes still match this record. Six desktop sections and the portrait menu were inspected, with additional menu-stagger and hero-layer transition evidence. Extraction remains partial; see [coverage and working examples](./official-site-examples). The original 2026-09-15 observations follow.

Observed **2026-09-15** on the [Arknights website](https://ak.hypergryph.com/), covering Index, Information, and World. Viewports: 1280 × 720 desktop and 390 × 844 portrait. This is an independent study of rendered UI, computed styles, and public CSS, not an official design system.

The repository file `research/official-site/2026-09-15.json` records source URLs, decoded stylesheet SHA-256 hashes, selector fragments, authored units, and viewport measurements. Hashed selectors identify this snapshot only; they are not component APIs.

## Design findings

- **Bilingual navigation:** condensed Latin labels with smaller Chinese labels create a hierarchy. CSS declares `Oswald-Medium` and `SourceHanSans-Medium`. This supports a sans-serif navigation role instead of applying the ak-ui serif command face to every heading. Choose the dominant language for the actual audience. [Navigation CSS](https://web.hycdn.cn/arknights/official/_next/static/css/144c734e19afaa20.css)
- **News rows:** category, date, and title occupy separate slots, with thin separators and two-line titles. Dates sit above titles on desktop and to their right in portrait. Borrow the alignment and scanning rhythm. Preserve full link text even when visually truncating. [Information section](https://ak.hypergryph.com/#information)
- **Content index:** strong Chinese headings, smaller English descriptions, and horizontal rules form a directory. The side counter tracks actual sections. Only use numbering when a real sequence exists. [World section](https://ak.hypergryph.com/#world)
- **Action feedback:** the small more link uses a gray surface and light text; its hover rule changes both to white and black. Borrow the paired foreground/background feedback. [Page CSS](https://web.hycdn.cn/arknights/official/_next/static/css/6aed155137c3fe93.css)

Native links, visible focus, and a non-color current indicator are ak-ui adaptation requirements, not claims about the source site's accessibility. Use `aria-current="location"` for an in-page section or `aria-current="page"` for a separate page.

## Source values and mappings

Values below come from the [navigation stylesheet](https://web.hycdn.cn/arknights/official/_next/static/css/144c734e19afaa20.css) and [page stylesheet](https://web.hycdn.cn/arknights/official/_next/static/css/6aed155137c3fe93.css). Mappings are our recommendations, not exact value equivalence.

| Observation | Authored value | ak-ui adaptation |
| --- | --- | --- |
| Active navigation | `#19d1ff` | Scoped `--ak-signal-info` |
| News category | `#18d1ff` | Consolidate into the same information role |
| News content | `#d2d2d2` | `--ak-text-secondary`, checked against its background |
| News divider | `1px solid hsla(0,0%,100%,.3)` | `--ak-line-hairline` and a local color variable |
| Latin / Chinese navigation size | `1.375rem` / `.875rem` | Borrow the hierarchy, not global sizes |
| Date face / tracking | `Bender-Regular` / `1px` | `--ak-font-mono` as a data role, not the same font |
| Title tracking | `2px` | Restrict extra tracking to short labels |
| Desktop news row | `6rem` | Content-driven minimum height |
| More-link background | `#585858` | Local surface variable |
| More-link color transition | `.3s` | Reuse `--ak-motion-base` |

The two cyan values do not establish two semantic roles. This sample does not establish success, danger, or warning colors, or prove that ak-ui's yellow action token comes from this website.

## Responsive measurements

| Computed CSS pixels | 1280 × 720 | 390 × 844 |
| --- | --- | --- |
| News row height | 64 | 59.27 |
| News title size | 12 | 10.4 |
| Date size | 10.67 | 8.32 |

The site scales its root font; portrait measured `8.32px`. Its `orientation: portrait` rules change row height to `7.125rem`, reverse the content row to place dates on the right, and use `1.25rem` titles with `1.6` line height. The rendered portrait layout stacks artwork above the list and collapses navigation into a menu. [Page CSS](https://web.hycdn.cn/arknights/official/_next/static/css/6aed155137c3fe93.css)

Do not assume the authored `6rem` means 96px or adopt these small computed text sizes as library defaults. Keep user font preferences, at least 44px interaction targets, and content-driven breakpoints. Long titles can move dates onto another line.

## Component contracts

These are patterns for future or project-owned components, not new CSS Core or Registry APIs.

| Pattern | Parts | Required behavior | Token roles |
| --- | --- | --- | --- |
| Bilingual navigation | Main label, supporting label, current marker | Link, current, hover, focus | sans, info, focus, space |
| News row | Category, time, title, divider | Full link text, wrapping, focus | text, info, hairline, density |
| Content index | Title, supporting name, divider | Link or disclosure button as appropriate | command or sans, text, line |
| More action | Label, directional icon | Foreground/background feedback, focus, reduced motion | surface, text, motion, focus |
| Section position | Current, total, name | Synchronize with real location; meaningful text | data, mono, info |

### Local component token recipe

Use a native link containing a category and a content wrapper with `<time datetime="…">` and the full title. These `--bulletin-*` values are adaptation choices, not extracted source values or public ak-ui tokens.

```css
.bulletin {
  --bulletin-divider: color-mix(in srgb, var(--ak-text-primary) 30%, transparent);
  --bulletin-row-min-height: 4.5rem;
  --bulletin-category-width: 3rem;
  color: var(--ak-text-primary);
  background: var(--ak-surface-canvas);
}
.bulletin__item {
  display: grid;
  grid-template-columns: var(--bulletin-category-width) minmax(0, 1fr);
  align-items: center;
  gap: var(--ak-space-4);
  min-height: max(var(--ak-density-control-height), var(--bulletin-row-min-height));
  padding-block: var(--ak-space-3);
  border-bottom: var(--ak-line-hairline) solid var(--bulletin-divider);
  color: inherit;
  text-decoration: none;
}
.bulletin__category { color: var(--ak-signal-info); }
.bulletin__title { overflow-wrap: anywhere; }
.bulletin__time {
  color: var(--ak-text-secondary);
  font-family: var(--ak-font-mono);
}
.bulletin__item:hover .bulletin__title { text-decoration: underline; }
.bulletin__item:focus-visible {
  outline: var(--ak-focus-width) solid var(--ak-focus-color);
  outline-offset: var(--ak-focus-offset);
}
```

Do not clip the entire link and hide its focus outline.

## Limits and next steps

No official assets or font files are included, and existing public token defaults are unchanged. Font declarations do not establish glyph-level font use. Hover values and durations were inspected in CSS; playback, keyboard flows, all menu states, and other pages were not fully audited.

News rows and bilingual navigation are the first implementation candidates. Validate readability, states, and responsive behavior in real components before promoting new public tokens. Follow the [token contract](./tokens) and [design language](./design-language).


## Implemented components

The first implementation uses `system` intensity while preserving global token defaults and existing component behavior:

- [ak-news-list (中文)](/components/ak-news-list): a separate content list with an empty state and container-responsive layout.
- [ak-nav (中文)](/components/ak-nav): native links, primary/supporting labels, a current marker, and a vertical directory variant.
- More actions, counts, and panel switching continue to use Button, Counter, and Tabs.

These additions ship in CSS Core. Earlier observations and the `--bulletin-*` recipe remain research evidence; use the component references for the implemented API.
