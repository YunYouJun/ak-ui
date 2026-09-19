import { createEntrance } from '../effects.mjs'
import { duration, environment, readHash } from './shared.mjs'

/** Native wheel/touch scrolling, with cancellable navigation and history sync. */
export function createSectionNavigation(root, options = {}) {
  const { view, lifetime } = environment(root)
  const viewport = root.querySelector('[data-ak-section-viewport]')
  const sections = Array.from(root.querySelectorAll('[data-ak-section]'))
  if (!viewport || !sections.length || sections.some(s => !s.id) || new Set(sections.map(s => s.id)).size !== sections.length)
    throw new TypeError('Section navigation needs a viewport and uniquely identified sections')
  const preference = view.matchMedia('(prefers-reduced-motion: reduce)')
  const signal = lifetime.signal
  const links = Array.from(root.querySelectorAll('[data-ak-section-link]'))
  const entrances = sections.map(section => createEntrance(section.querySelector('[data-ak-section-content]') || section, { distance: 20, duration: 420 }))
  const originalCurrent = links.map(link => link.getAttribute('aria-current'))
  let current = -1
  let pending = -1
  let frame = 0
  let scrollFrame = 0
  let focusFrame = 0
  let destroyed = false

  function writeHash(index, mode) {
    if (options.syncHash === false || mode === 'none') return
    const url = new URL(view.location.href)
    url.hash = sections[index].id
    if (url.href !== view.location.href) view.history[mode === 'push' ? 'pushState' : 'replaceState'](view.history.state, '', url)
  }
  function activate(index, history = 'replace', animate = true) {
    if (destroyed || index < 0 || index >= sections.length) return
    const changed = index !== current
    current = index
    sections.forEach((section, i) => { section.dataset.active = String(i === index) })
    links.forEach(link => {
      if (readHash(link.hash || '') === sections[index].id) link.setAttribute('aria-current', 'location')
      else link.removeAttribute('aria-current')
    })
    for (const el of root.querySelectorAll('[data-ak-section-current]')) el.textContent = String(index + 1).padStart(2, '0')
    for (const el of root.querySelectorAll('[data-ak-section-total]')) el.textContent = String(sections.length).padStart(2, '0')
    if (changed || history === 'push') writeHash(index, history)
    if (changed) {
      entrances.forEach(entrance => entrance.cancel())
      if (animate) entrances[index].play()
      options.onChange?.(sections[index].id, index)
    }
  }
  function position(index) {
    return viewport.scrollTop + sections[index].getBoundingClientRect().top - viewport.getBoundingClientRect().top - viewport.clientTop
  }
  function stop() {
    view.cancelAnimationFrame(frame)
    view.cancelAnimationFrame(focusFrame)
    frame = focusFrame = 0
    pending = -1
  }
  function navigate(id, { history = 'push', focus = true, immediate = false } = {}) {
    const index = sections.findIndex(section => section.id === id)
    if (destroyed || index < 0) return false
    stop()
    pending = index
    const start = viewport.scrollTop
    const end = Math.max(0, Math.min(position(index), viewport.scrollHeight - viewport.clientHeight))
    const ms = immediate || preference.matches ? 0 : duration(options.duration, 650)
    const started = view.performance.now()
    root.dataset.akNavigating = 'true'
    function finish() {
      viewport.scrollTop = end
      frame = 0
      pending = -1
      delete root.dataset.akNavigating
      activate(index, history)
      if (focus) focusFrame = view.requestAnimationFrame(() => {
        focusFrame = 0
        const heading = sections[index].querySelector('[data-ak-section-heading]') || sections[index]
        if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1')
        heading.focus({ preventScroll: true })
      })
    }
    if (!ms) { finish(); return true }
    function tick(now) {
      const progress = Math.min(1, (now - started) / ms)
      viewport.scrollTop = start + (end - start) * (1 - (1 - progress) ** 3)
      if (progress < 1) frame = view.requestAnimationFrame(tick)
      else finish()
    }
    frame = view.requestAnimationFrame(tick)
    return true
  }
  function fromScroll() {
    if (destroyed || pending !== -1) return
    const threshold = viewport.scrollTop + viewport.clientHeight * 0.35
    let index = 0
    sections.forEach((_, i) => { if (position(i) <= threshold) index = i })
    activate(index)
  }
  function interrupt() {
    if (pending === -1) return
    stop()
    delete root.dataset.akNavigating
    fromScroll()
  }
  function restoreLocation() {
    const id = readHash(view.location.hash) || sections[0].id
    if (sections.some(section => section.id === id)) navigate(id, { history: 'none', focus: false, immediate: true })
  }
  root.addEventListener('click', event => {
    const link = event.target.closest('[data-ak-section-link]')
    if (!link || !root.contains(link) || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target && link.target !== '_self') return
    const url = new URL(link.href, view.location.href)
    if (url.origin !== view.location.origin || url.pathname !== view.location.pathname || url.search !== view.location.search) return
    if (navigate(readHash(url.hash))) event.preventDefault()
  }, { signal })
  viewport.addEventListener('scroll', () => {
    view.cancelAnimationFrame(scrollFrame)
    scrollFrame = view.requestAnimationFrame(() => { scrollFrame = 0; fromScroll() })
  }, { passive: true, signal })
  for (const event of ['wheel', 'touchstart', 'pointerdown']) viewport.addEventListener(event, interrupt, { passive: true, signal })
  viewport.addEventListener('keydown', event => {
    if (event.target !== viewport) return
    const index = pending === -1 ? Math.max(0, current) : pending
    const keys = { ArrowDown: index + 1, PageDown: index + 1, ArrowUp: index - 1, PageUp: index - 1, Home: 0, End: sections.length - 1 }
    if (event.key in keys) {
      event.preventDefault()
      navigate(sections[Math.max(0, Math.min(sections.length - 1, keys[event.key]))].id, { focus: false })
    }
  }, { signal })
  preference.addEventListener('change', () => {
    if (preference.matches && pending !== -1) navigate(sections[pending].id, { history: 'replace', immediate: true })
  }, { signal })
  if (options.syncHash !== false) {
    view.addEventListener('popstate', restoreLocation, { signal })
    view.addEventListener('hashchange', restoreLocation, { signal })
  }
  root.dataset.akSections = 'ready'
  const initial = options.syncHash === false ? -1 : sections.findIndex(section => section.id === readHash(view.location.hash))
  activate(initial < 0 ? 0 : initial, 'none', false)
  if (initial >= 0) navigate(sections[initial].id, { history: 'none', focus: false, immediate: true })
  return {
    navigate,
    get currentId() { return sections[current]?.id },
    destroy() {
      if (destroyed) return
      stop()
      destroyed = true
      lifetime.abort()
      view.cancelAnimationFrame(scrollFrame)
      entrances.forEach(entrance => entrance.destroy())
      delete root.dataset.akSections
      delete root.dataset.akNavigating
      sections.forEach(section => { delete section.dataset.active })
      links.forEach((link, i) => originalCurrent[i] === null ? link.removeAttribute('aria-current') : link.setAttribute('aria-current', originalCurrent[i]))
    },
  }
}
