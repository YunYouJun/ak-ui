# Website interactions · ak-ui 1.1

These are independent, framework-neutral implementations informed by the official-site study. They do not reproduce proprietary shaders, characters, music or the complete official timeline. Import CSS once and initialize controllers after mounting. All `/site` imports are safe during SSR; DOM controllers need real client elements. Always `destroy()` on unmount. No controller initializes merely because a data attribute exists.

Install `@yunyoujun/ak-ui@^1.1.0`. Vue adapters are available through Registry `site`:

```sh
pnpm dlx shadcn-vue@2.8.2 add https://ak-ui.yyj.moe/r/site.json
```

## Section navigation: portable markup

```html
<div class="ak-site" id="field-notes">
  <header class="ak-site__header">
    <nav class="ak-site__nav" aria-label="Sections">
      <a href="#intro" data-ak-section-link>Intro</a>
      <a href="#details" data-ak-section-link>Details</a>
    </nav>
    <button id="menu-trigger" class="ak-site-control ak-site__menu-trigger"
      aria-controls="site-menu" aria-expanded="false" aria-haspopup="dialog">Menu</button>
    <dialog id="site-menu" class="ak-site-menu" aria-label="Sections">
      <button class="ak-site-control" data-ak-menu-close autofocus>Close</button>
      <nav aria-label="Mobile sections">
        <a href="#intro" data-ak-section-link data-ak-menu-item>Intro</a>
        <a href="#details" data-ak-section-link data-ak-menu-item>Details</a>
      </nav>
    </dialog>
  </header>
  <main class="ak-site__viewport" data-ak-section-viewport tabindex="0" aria-label="Page sections">
    <section id="intro" class="ak-site__section" data-ak-section aria-labelledby="intro-title">
      <div data-ak-section-content><h1 id="intro-title" data-ak-section-heading>Field notes</h1><p>Readable content.</p></div>
    </section>
    <section id="details" class="ak-site__section" data-ak-section aria-labelledby="details-title">
      <div data-ak-section-content><h2 id="details-title" data-ak-section-heading>Details</h2><p>Real product information.</p></div>
    </section>
  </main>
  <span class="ak-site__index" aria-hidden="true"><span data-ak-section-current>01</span> / <span data-ak-section-total>02</span></span>
</div>
```

```js
import '@yunyoujun/ak-ui/style.css'
import { createSectionNavigation, createMobileMenu } from '@yunyoujun/ak-ui/site'

const root = document.querySelector('#field-notes')
const menu = createMobileMenu(root.querySelector('dialog'), {
  trigger: root.querySelector('#menu-trigger'),
})
const sections = createSectionNavigation(root, { duration: 650 })
// Call on component unmount / page disposal:
function dispose() { menu.destroy(); sections.destroy() }
```

`createSectionNavigation(root, { syncHash=true, duration=650, onChange? })` returns `navigate(id, { history='push', focus=true, immediate=false }?)`, `currentId`, `destroy()`. IDs must be unique and nonempty. A root needs one viewport and a fixed set of sections/links; recreate the controller when this structure changes. Sections remain in normal DOM order and may grow taller than the viewport. CSS uses proximity scroll snapping; native wheel/touch input is never prevented. Link navigation can be interrupted by wheel/touch/pointer input. Arrow/Page/Home/End keys navigate only when the viewport itself has focus, leaving nested controls alone. Intentional link navigation focuses the destination heading; scrolling does not steal focus. Passive scrolling replaces history, explicit navigation pushes it, Back/Forward restores matching sections. Set `syncHash:false` for embedded examples or routers that own the hash; only one navigator per document may own it. Invalid or unrelated hashes are ignored.

`createMobileMenu(dialog, { trigger, duration=200, stagger=70 })` returns `open()`, `close()`, `isOpen`, `destroy()`. Native `showModal()` supplies Escape, focus trapping and background inertness. Closing restores previous focus and scroll state. Links and `[data-ak-menu-close]` close the menu; `[data-ak-menu-item]` receives staggered entrance (24px, independent adaptation). Hiding the trigger at a desktop breakpoint closes an open menu. Avoid nested menu dialogs.

## Gallery and archives

`createMediaGallery(root, { initialIndex=0, loop=true, duration=420, onChange? })` returns `select(index, { focus=false, animate=true }?)`, `refresh()`, `open()`, `close()`, `index`, `destroy()`.

The root contains `[data-ak-gallery-stage]`, one uniquely identified `[data-ak-gallery-item]` per entry and one button `[data-ak-gallery-select]` per entry in the same order. Optional buttons: `[data-ak-gallery-prev]`, `[data-ak-gallery-next]`, `[data-ak-gallery-open]`. Optional `[data-ak-gallery-current]` is a polite live counter. Add a native `[data-ak-gallery-dialog]` with an `img` and `[data-ak-gallery-close]` button to enable image expansion. Give dialog and controls accessible names. Arrow/Home/End moves selection and focus within selectors. Horizontal touch swipes select items while vertical scrolling stays native. After replacing items call `refresh()`; it preserves the selected item by ID when possible. Empty galleries report index -1 and disable controls; a single item disables Previous/Next. Native audio/video in hidden items is paused and never autoplayed. Use native media `controls`; playback policy and source loading remain browser-owned.

```vue
<script setup lang="ts">
import { shallowRef } from 'vue'
import { AkMediaGallery } from '@/components/ui/site'
const selected = shallowRef(0)
const items = [
  { id: 'north', title: 'Northern station', description: 'Observation archive', image: '/north.webp', alt: 'Northern station exterior' },
  { id: 'south', title: 'Southern station', description: 'Field archive', image: '/south.webp', alt: 'Southern station exterior' },
]
</script>
<template><AkMediaGallery v-model="selected" :items="items" label="Station archive" /></template>
```

`AkMediaGallery` accepts `items` (`id`, `title`, optional `description`, `image`, `alt`), `v-model` index, `label`, `loop`, localized `previousLabel/nextLabel/expandLabel/closeLabel/emptyLabel`. `#media="{ item, index }"` replaces the image (e.g. `<video controls preload="metadata">`); the default slot extends its description. Selection and item updates are reactive; `loop` is a mount-time option. Image dimensions reserve space; provide meaningful alt text. Gallery content is caller-owned, suitable for archive profiles as well as media.

## Real resource progress

```js
import { createAssetLoader } from '@yunyoujun/ak-ui/site'
const loader = createAssetLoader(state => {
  // { status, completed, total, errors }; errors count as settled tasks.
  progress.max = state.total || 1
  progress.value = state.completed
  status.textContent = `${state.status}: ${state.completed}/${state.total}`
})
const tasks = ['/cover.webp', '/map.webp'].map(url => async signal => {
  const response = await fetch(url, { signal })
  if (!response.ok) throw new Error(`Failed: ${response.status}`)
  return response.blob()
})
await loader.load(tasks)
// Retry: loader.load(tasks). Cleanup: loader.destroy().
```

`load(tasks)` accepts functions receiving an `AbortSignal`. It returns the settled state, or a cancelled state if superseded/cancelled. A new run cancels the previous run, ignores stale completions, and starts from zero. `cancel()` aborts pending work; tasks must honor the supplied signal to stop their own network/CPU work. `destroy()` also suppresses future callbacks. Empty tasks complete immediately. Rejections are retained in `errors` and the final status is `error`; no failed batch reports `ready`. Progress measures settled tasks, not byte percentage or elapsed time. Do not use decorative count-up to manufacture readiness.

Vue `AkAssetLoader` takes `tasks`, `label`, `retryLabel`, emits `change(state)`, exposes `reload()`, and provides `{ state }` in the default slot. Changing the task-array reference starts a new run. It renders native progress and retry controls. It is nonblocking: the host decides whether to display an overlay and how to recover from errors.

## Particle backgrounds and fallback

```js
import { createParticleField } from '@yunyoujun/ak-ui/site'
const field = createParticleField(canvas, { pattern: 'wave', count: 360, color: '#19d1ff' })
field.setPattern('orbit') // 'grid' | 'orbit' | 'wave'
field.pause()
field.resume()
// Read field.renderer: 'webgl' | '2d' | 'static'. Dispose with field.destroy().
```

Use `<canvas class="ak-particle-field" aria-hidden="true"></canvas>` inside a positioned container with real dimensions. The field is decorative and never intercepts input. It uses an original point renderer and discrete pattern switching, not the official particle-morphing algorithm. WebGL unavailability falls back to 2D; no usable context or a lost/failed WebGL context displays a CSS field. A restored WebGL context rebuilds buffers. `renderer:'2d'` explicitly selects 2D. Use a fresh canvas when changing renderer because context types cannot be changed on the same canvas.

Count defaults to 360, clamped to 1–4000; color accepts six-digit hex. Canvas resolution caps device pixel ratio at 2. Fields pause offscreen, in hidden documents, when explicitly paused and under reduced motion. `destroy()` releases observers/listeners, animation frames and GL resources. Provide a visible pause/play control for continuous motion.

Vue `AkParticleField` accepts those options; `pattern` and `paused` update reactively. Count, color and renderer are mount-time options; change its Vue `key` to recreate it. `AkSectionNavigator` wraps the section markup and emits `change(id,index)`; exposes `navigate(id)`. Its duration/hash options are mount-time options. `AkMobileMenu` supplies the trigger/dialog and accepts `label` and `closeLabel`; slot links need the data attributes shown above. All adapters import CSS Core and dispose their controllers automatically.

## Validate a composition

Test desktop and portrait, Back/Forward, rapid navigation interruptions, viewport keyboard focus, menu Escape/focus restoration, single/empty galleries, native media pause, error/retry/cancel, no-WebGL fallback, reduced-motion preference changes and unmount. A pretty screenshot alone does not verify these states. Full example: [six-section showcase](https://ak-ui.yyj.moe/showcase/website). Framework-neutral source and types: [site entry](https://github.com/YunYouJun/ak-ui/blob/master/src/js/site.mjs).
