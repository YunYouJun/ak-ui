# Component and motion examples

These examples use existing public APIs with original product content. They are adaptations, not an official page reconstruction. Import `@yunyoujun/ak-ui/style.css` in the application's entry; `tokens.css` alone does not style these classes. Replace example routes with real product routes.

## Navigation and news

```html
<section class="product-updates" aria-label="Product updates">
  <nav class="ak-nav" aria-label="Product navigation">
    <a class="ak-nav__link" href="/updates" aria-current="page">
      <span class="ak-nav__label">更新情报</span>
      <span class="ak-nav__description" lang="en">Updates</span>
    </a>
    <a class="ak-nav__link" href="/guide">
      <span class="ak-nav__label">使用指南</span>
      <span class="ak-nav__description" lang="en">Guide</span>
    </a>
  </nav>
  <ul class="ak-news-list" role="list" aria-label="发布记录">
    <li class="ak-news-list__item">
      <a class="ak-news-list__link" href="/updates/navigation">
        <span class="ak-news-list__category">组件</span>
        <span class="ak-news-list__title">导航支持双语标签与内容目录</span>
        <time class="ak-news-list__time" datetime="2026-09-15">2026-09-15</time>
      </a>
    </li>
  </ul>
</section>
```

```css
.product-updates {
  /* Optional local source-inspired accent; preserve a host brand when present. */
  --ak-signal-info: #19d1ff;
  color: var(--ak-text-primary);
  background: var(--ak-surface-canvas);
  padding: var(--ak-space-5);
}
```

Set `aria-current` from the actual route. Use `location` instead of `page` for real in-page locations and synchronize it with navigation. Add `.ak-nav--vertical` for a directory; use a tabs primitive when the interaction switches panels. For no news, render a `.ak-news-list__empty` message rather than an empty linked row.

## Independent entrances with cleanup

Run this after the above markup mounts in a bundler-based application:

```js
import '@yunyoujun/ak-ui/style.css'
import { createEntrance } from '@yunyoujun/ak-ui/effects'

export function mountUpdates(root) {
  const controllers = Array.from(root.querySelectorAll('.ak-news-list__item'), (item, index) =>
    createEntrance(item, {
      direction: 'right', distance: 16, duration: 200, delay: index * 70,
    }),
  )
  const replay = () => controllers.forEach(controller => controller.play())
  replay()
  return {
    replay,
    destroy: () => controllers.forEach(controller => controller.destroy()),
  }
}

// const effects = mountUpdates(document.querySelector('.product-updates'))
// Connect a replay control to effects.replay if useful.
// On route/component disposal: effects.destroy()
```

The 200ms/70ms rhythm is informed by the observed mobile menu; 16px and the controller easing are adaptation choices. This example animates **news rows**, not a complete menu. Keep rows visible without JavaScript; do not add a permanent `opacity: 0` style.

## Accessible numeric updates

```html
<span class="release-count">
  <span data-count-visual aria-hidden="true">24</span>
  <span class="ak-count-up__accessible" data-count-target>24</span>
  published releases
</span>
```

```js
import { createCountUp } from '@yunyoujun/ak-ui/effects'

export function mountReleaseCount(root) {
  const visual = root.querySelector('[data-count-visual]')
  const target = root.querySelector('[data-count-target]')
  const format = new Intl.NumberFormat('en')
  const controller = createCountUp(value => {
    visual.textContent = format.format(Math.round(value))
  }, { value: 24, duration: 1000 })
  controller.play()
  return {
    update(value) {
      const next = Number.isFinite(value) ? value : 0
      target.textContent = format.format(Math.round(next))
      controller.update(next)
    },
    destroy: () => controller.destroy(),
  }
}
```

The target is exposed once, without per-frame announcements. Connect `destroy()` to the host lifecycle. This counter is an ak-ui extension, not a measured official website effect.

## Interactive examples and source

| Example | Preview | Repository source |
| --- | --- | --- |
| Original editorial composition | [Website-style examples](https://ak-ui.yyj.moe/guide/official-site-examples) | `examples/site/briefing.html` |
| Bilingual navigation / vertical directory | [Navigation](https://ak-ui.yyj.moe/components/ak-nav) | `examples/nav/basic.html`, `examples/nav/vertical.html` |
| News / empty state | [News list](https://ak-ui.yyj.moe/components/ak-news-list) | `examples/news-list/basic.html`, `examples/news-list/empty.html` |
| Entrance / count-up with replay | [Effects](https://ak-ui.yyj.moe/components/ak-fx) | `docs/.vitepress/theme/components/EffectsPlayground.vue` |
| Independent photo arcs | [Media](https://ak-ui.yyj.moe/components/ak-media) | `examples/media/layered.html` |
| Pointer depth / regional replay | [Terminal showcase](https://ak-ui.yyj.moe/showcase/) | `examples/showcase/main.html` |

Source paths refer to the [ak-ui repository](https://github.com/YunYouJun/ak-ui), not files guaranteed to exist in a skill-only installation. The self-contained snippets above do not require that checkout. Existing showcase imagery is not part of the transferable design contract.

## Example requests

- “使用 $ak-ui 的 system 模式，参考官网的双语导航、新闻行与细分隔线，构建产品更新页；保留品牌，不使用游戏素材。使用已存在的组件，并指出适配值。”
- “使用 $ak-ui 为三个内容区块增加独立入场和重播；支持减少动态效果，卸载时清理；不要把它描述成官网原版时间线。”
- “使用 $ak-ui 检查官网风格提取覆盖率，分别列出有证据的设计规则、已实现组件、独立扩展动效与待验证行为。”
