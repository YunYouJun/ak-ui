# Motion recipes and lifecycle

These are **ak-ui implementation defaults**, not official-site measurements. See [official-site.md](official-site.md) for the source evidence and remaining extraction gaps.

## Choose the smallest effect

| Purpose | API / class | Defaults and ownership |
| --- | --- | --- |
| Control feedback | `--ak-motion-fast/base/slow` | `120/200/420ms`; CSS tokens, not automatically consumed by JS |
| Independent entrance | `createEntrance` from `@yunyoujun/ak-ui/effects` | `650ms`, delay `0`, distance `24px`, direction `up`; opacity + CSS `translate`, preserves `transform` |
| Changing numeric value | `createCountUp` from the same entry | `1000ms`, delay `0`, from `0`; callback owns display formatting |
| Vue adapters | Registry `AkEntrance`, `AkCountUp` | Mounted playback by default; exposed `replay()`; cleanup on scope disposal |
| Whole album entrance | `.ak-media--album.ak-media--enter` | `--ak-media-enter-duration: 650ms`, `--ak-media-enter-delay: 0ms`; owns `transform` |
| Two independent photo sheets | `.ak-media--album.ak-media--layered.ak-media--split-enter` | Front `760ms / 120ms delay`; back `900ms / 0ms`; each sheet owns its transform |
| Pointer depth | `createDashboardDepth` from `@yunyoujun/ak-ui/depth` | `[data-depth]` layers; maxX `130`, maxY `70`; writes CSS variables, requires consuming CSS |

Source: [effects](https://github.com/YunYouJun/ak-ui/blob/master/src/js/effects.mjs), [media styles](https://github.com/YunYouJun/ak-ui/blob/master/src/scss/_ak-media.scss), [depth](https://github.com/YunYouJun/ak-ui/blob/master/src/js/dashboard-depth.mjs). Verify the installed version when its API differs.

## Entrance and stagger

`createEntrance(element, options)` returns `play(nextOptions?)`, `cancel()`, and `destroy()`. Creation alone does not start playback. Directions describe the initial displacement: `up` starts below, `down` above, `left` to the left, `right` to the right; `fade` has no displacement. Its fixed easing is `cubic-bezier(0.16, 1, 0.3, 1)`.

- Mount on a real DOM element after client render. Server-rendered content should already be visible.
- Call `play()` on the intended event: mount, explicit replay, or intersection. There is no built-in viewport observer or whole-page timeline.
- For stagger, create one controller per region and pass numeric millisecond delays. A short 70ms interval borrows the measured menu rhythm, while a chosen 16px displacement is an adaptation of the source's relative 20% displacement.
- CSS values such as `'200ms'` are not numeric JS options. Resolve tokens to milliseconds explicitly if shared control is needed; do not pass a `var(...)` string.
- Do not animate the same element's `translate` from two controllers. Put separate motion responsibilities on nested wrappers. Media animations already own their `transform`.
- `play()` cancels the previous animation; `cancel()` restores the underlying visible state. Call `destroy()` on unmount/replacement to remove preference listeners.

The docs' `data-ak-enter`, `data-direction`, and `data-delay` attributes are consumed by a docs-specific adapter. Importing the public CSS or effects module does **not** automatically initialize them.

## Numeric updates

`createCountUp(render, options)` returns `play(nextOptions?)`, `update(value)`, `finish()`, and `destroy()`. It uses a cubic ease-out; `update()` starts at the current displayed value. It does not measure download progress or readiness.

Format the callback output, mark the visual interpolation `aria-hidden="true"`, and provide separate static target text. Do not put the per-frame value in an `aria-live` region. Use real task progress for loading UIs; a decorative count-up must not imply that data has finished loading.

The Vue `AkCountUp` adapter provides separate target text. `autoplay=false` disables its initial animation, not subsequent target updates. Both adapters use numeric millisecond `duration`/`delay` props; `AkEntrance` exposes `direction`/`distance`, and `AkCountUp` exposes `value`/`from`/`decimals`.

## Media and depth

For split albums, use `.ak-media__sheet--front` and `.ak-media__sheet--back` inside the layered album. The front sheet defines size; the back sheet stays behind it. The path approximates an arc using transform keyframes and a small overshoot, not a physics simulation. Keep image dimensions stable and leave space for the motion. Decorative duplicates have empty alt text and `aria-hidden="true"`.

Depth only writes `--ak-layer-x` and `--ak-layer-y`; project CSS must apply them (for example through `translate`) or use the existing dashboard classes. Keep `respectReducedMotion: true`. Disable pointer tracking for touch-first compositions, keep text readable, and never require pointer movement to reveal essential content. `destroy()` removes listeners and resets offsets. Numeric depth limits are implementation settings, not official-site measurements.

## Reduced motion and completion

The entrance controller skips playback when reduced motion is active, and cancels on a change to reduce. Count-up immediately renders its target in those cases. The CSS media entrances remove animation under `prefers-reduced-motion: reduce`. Keep their unanimated state complete and visible.

For custom effects, remove displacement, delay and looping; show the final state immediately. Any remaining infinite decorative loop needs a pause mechanism when applicable. Test a preference change during playback, fast replay, target updates, route unmount, and keyboard focus. Do not use screenshot tests with animations disabled as proof of correct timing.

In 1.1.0, legacy `.ak-fx--glow`, `.ak-fx--outline`, `.ak-loading::after` and `.ak-loading-track__runner` stop looping under reduced motion. Earlier versions need a host fallback. Particle fields freeze in place when reduced motion is requested and pause while offscreen or the document is hidden. Menu stagger is skipped, gallery content remains visible, and section navigation finishes immediately.

For `/site` navigation (650ms), section/gallery entrances (420ms) and mobile-menu stagger (200ms + 70ms per item), read [site.md](site.md). These are independent implementation settings; only the menu duration/stagger borrow the measured official CSS rhythm.

Copyable mount and cleanup examples are in [examples.md](examples.md).
