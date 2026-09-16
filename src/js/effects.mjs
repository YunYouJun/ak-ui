const finite = (value, fallback) => Number.isFinite(value) ? value : fallback
const time = (value, fallback) => Math.max(0, finite(value, fallback))

/** Independent entrance; does not overwrite the element's transform. */
export function createEntrance(element, options = {}) {
  const view = element.ownerDocument.defaultView
  const preference = view.matchMedia('(prefers-reduced-motion: reduce)')
  let animation
  let destroyed = false
  function cancel() { animation?.cancel(); animation = undefined }
  function play(next = {}) {
    if (destroyed) return
    options = { ...options, ...next }
    cancel()
    if (preference.matches || options.disabled || !element.animate) return
    const distance = finite(options.distance, 24)
    const offsets = { up: `0 ${distance}px`, down: `0 ${-distance}px`, left: `${-distance}px 0`, right: `${distance}px 0`, fade: '0 0' }
    animation = element.animate([
      { opacity: 0, translate: offsets[options.direction] ?? offsets.up },
      { opacity: 1, translate: '0 0' },
    ], { duration: time(options.duration, 650), delay: time(options.delay, 0), easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'backwards' })
  }
  function changed() { if (preference.matches) cancel() }
  preference.addEventListener('change', changed)
  return { play, cancel, destroy() { destroyed = true; cancel(); preference.removeEventListener('change', changed) } }
}

/** Animate numbers through a callback so frameworks retain ownership of rendering. */
export function createCountUp(render, options = {}, view = globalThis.window) {
  const preference = view.matchMedia('(prefers-reduced-motion: reduce)')
  let frame = 0
  let destroyed = false
  let current = finite(options.value, 0)
  let target = current
  function cancel() { view.cancelAnimationFrame(frame); frame = 0 }
  function finish() { if (destroyed) return; cancel(); current = target; render(current) }
  function play(next = {}) {
    if (destroyed) return
    options = { ...options, ...next }
    cancel()
    const start = finite(options.from, 0)
    target = finite(options.value, 0)
    const duration = time(options.duration, 1000)
    const delay = time(options.delay, 0)
    if (preference.matches || options.disabled || duration === 0) { finish(); return }
    current = start
    render(current)
    const started = view.performance.now() + delay
    function tick(now) {
      const progress = Math.min(1, Math.max(0, (now - started) / duration))
      const eased = 1 - (1 - progress) ** 3
      current = start * (1 - eased) + target * eased
      render(current)
      if (progress < 1) frame = view.requestAnimationFrame(tick)
      else { frame = 0; current = target; render(target) }
    }
    frame = view.requestAnimationFrame(tick)
  }
  function update(value) { play({ value, from: current }) }
  function changed() { if (preference.matches) finish() }
  preference.addEventListener('change', changed)
  return { play, update, finish, destroy() { destroyed = true; cancel(); preference.removeEventListener('change', changed) } }
}
