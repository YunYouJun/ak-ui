# Components & Playground

Browse reusable CSS modules and complete ak-ui interface demos from one place. To integrate ak-ui, start with the [AI Skill](/en/guide/ai-skill), [CSS Core](/en/guide/), [Vue Registry](/en/registry/) or [A2UI experiment](/en/guide/a2ui).

## Complete demos

The terminal demos below currently use Chinese interface labels.

<div class="ak-entry-grid">
  <a class="ak-entry-card" href="/showcase/">
    <span class="ak-entry-card__channel">TERMINAL / INTERACTIVE</span>
    <strong>Terminal Playground (中文)</strong>
    <p>Switch artwork, class colors and elite decorations, adjust depth and perspective, and try profile, resource and mission overlays.</p>
    <span class="ak-entry-card__action">Open the terminal →</span>
  </a>
  <a class="ak-entry-card" href="/showcase/fullscreen">
    <span class="ak-entry-card__channel">FULLSCREEN / TERMINAL</span>
    <strong>Fullscreen terminal (中文)</strong>
    <p>Explore the complete canvas and its interactions. Use landscape orientation on a phone.</p>
    <span class="ak-entry-card__action">Enter fullscreen →</span>
  </a>
  <a class="ak-entry-card" href="/showcase/loading">
    <span class="ak-entry-card__channel">FULLSCREEN / LOADING</span>
    <strong>Fullscreen loading (中文)</strong>
    <p>Inspect the startup screen, progress track and state transitions on their own.</p>
    <span class="ak-entry-card__action">Try loading →</span>
  </a>
</div>

| Interactive experiment | What to try |
| --- | --- |
| [Depth animation player (中文)](/showcase/#depth-playground) | Play, pause, scrub and loop layered motion, then return to pointer control |
| [Vue Registry interactions](/en/registry/#live-vue-rendering) | Button events, numeric input, linked progress, Tabs and Segmented |
| [A2UI experiment](/en/guide/a2ui) | Receive messages incrementally, edit a callsign, return actions and update the interface; a local simulation with no real deployment |

This page collects existing interactive examples; it does not provide an online code editor. See [artwork provenance](/showcase/artwork) for terminal asset sources and licenses.

## Component index

Use semantic HTML and the stable `.ak-*` classes from CSS Core. Detailed component references and their live examples currently remain in Chinese; the code works in any framework.

| Group | Components (中文) |
| --- | --- |
| Foundation | [Colors and typography](/components/#color-色彩) · [Helpers](/components/ak-helper) · [Icons](/components/ak-icon) |
| Actions and navigation | [Buttons](/components/ak-button) · [Button groups](/components/ak-button-group) · [Forms](/components/ak-form) · [Link navigation](/components/ak-nav) · [Tabs](/components/ak-tabs) · [Pagination](/components/ak-pagination) |
| Layout and containers | [Cards](/components/ak-card) · [Panels](/components/ak-panel) · [Dividers](/components/ak-divider) |
| Data and states | [News list](/components/ak-news-list) · [Counters](/components/ak-counter) · [Progress and gauge](/components/ak-progress) · [Sanity](/components/ak-san) · [Status](/components/ak-status) · [Levels](/components/ak-level) |
| Feedback and overlays | [Dialog](/components/ak-dialog) · [Popover and tooltip](/components/ak-popover) · [Notices](/components/ak-notice) · [Loading](/components/ak-loading) |
| Visuals and media | [Images and video](/components/ak-media) · [Effects](/components/ak-fx) · [Objects](/components/ak-object) |

Native HTML and headless primitives own keyboard, focus and state behavior. Keep labels, visible focus, reduced-motion support and adequate contrast when customizing the design. See the [design language](/en/guide/design-language), [tokens](/en/guide/tokens) and [headless adapter contract](/en/guide/headless).


[Six-section website showcase](/en/showcase/website) · [Site interaction API](./ak-site)
