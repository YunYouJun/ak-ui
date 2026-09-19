import { createEntrance } from '../effects.mjs'
import { duration, environment, finite, interactive } from './shared.mjs'

/** Button-based gallery; caller supplies content and native audio/video controls. */
export function createMediaGallery(root, options = {}) {
  const { lifetime } = environment(root)
  const signal = lifetime.signal
  const dialog = root.querySelector('[data-ak-gallery-dialog]')
  let items = []
  let buttons = []
  let entrances = []
  let selected = -1
  let selectedId
  let destroyed = false
  let pointer
  let returnFocus
  function close() { if (dialog?.open) dialog.close() }
  function select(value, { focus = false, animate = true } = {}) {
    if (destroyed || !items.length) return false
    const raw = Math.trunc(finite(value, 0))
    const index = options.loop === false ? Math.max(0, Math.min(items.length - 1, raw)) : ((raw % items.length) + items.length) % items.length
    const changed = index !== selected
    selected = index
    selectedId = items[index].id
    items.forEach((item, i) => {
      item.hidden = i !== index
      if (i !== index) item.querySelectorAll('video,audio').forEach(media => { if (!media.paused) media.pause() })
    })
    buttons.forEach((button, i) => {
      button.setAttribute('aria-pressed', String(i === index))
      button.tabIndex = i === index ? 0 : -1
      if (items[i]?.id) button.setAttribute('aria-controls', items[i].id)
    })
    for (const el of root.querySelectorAll('[data-ak-gallery-current]')) el.textContent = `${index + 1} / ${items.length}`
    for (const button of root.querySelectorAll('[data-ak-gallery-prev]')) button.disabled = items.length < 2 || options.loop === false && index === 0
    for (const button of root.querySelectorAll('[data-ak-gallery-next]')) button.disabled = items.length < 2 || options.loop === false && index === items.length - 1
    for (const button of root.querySelectorAll('[data-ak-gallery-open]')) button.disabled = !dialog || !items[index].querySelector('img')
    if (focus) buttons[index]?.focus({ preventScroll: true })
    if (changed) {
      close()
      entrances.forEach(entrance => entrance.cancel())
      if (animate) entrances[index].play({ duration: duration(options.duration, 420) })
      options.onChange?.(index)
    }
    return true
  }
  function refresh() {
    if (destroyed) return
    entrances.forEach(entrance => entrance.destroy())
    items = Array.from(root.querySelectorAll('[data-ak-gallery-item]'))
    buttons = Array.from(root.querySelectorAll('[data-ak-gallery-select]'))
    entrances = items.map(item => createEntrance(item, { direction: 'right', distance: 20 }))
    const preserved = selectedId ? items.findIndex(item => item.id === selectedId) : -1
    const next = preserved >= 0 ? preserved : Math.max(0, Math.min(items.length - 1, selected < 0 ? finite(options.initialIndex, 0) : selected))
    selected = -1
    if (items.length) select(next, { animate: false })
    else {
      close(); selectedId = undefined
      for (const el of root.querySelectorAll('[data-ak-gallery-current]')) el.textContent = '0 / 0'
      for (const button of root.querySelectorAll('[data-ak-gallery-prev],[data-ak-gallery-next],[data-ak-gallery-open]')) button.disabled = true
      options.onChange?.(-1)
    }
    root.dataset.akGallery = items.length ? 'ready' : 'empty'
  }
  function open() {
    if (destroyed || !dialog || dialog.open) return
    const source = items[selected]?.querySelector('img')
    const image = dialog.querySelector('img')
    if (!source || !image) return
    image.src = source.currentSrc || source.src
    image.alt = source.alt
    returnFocus = root.querySelector('[data-ak-gallery-open]') || root.ownerDocument.activeElement
    dialog.showModal()
  }
  dialog?.addEventListener('close', () => {
    if (!dialog.open && !destroyed && returnFocus?.isConnected && !root.ownerDocument.querySelector('dialog[open]')) {
      returnFocus.focus({ preventScroll: true })
      returnFocus = undefined
    }
  }, { signal })
  root.addEventListener('click', event => {
    const button = event.target.closest('button')
    if (!button || !root.contains(button) || button.disabled) return
    if (button.hasAttribute('data-ak-gallery-select')) select(buttons.indexOf(button))
    else if (button.hasAttribute('data-ak-gallery-prev')) select(selected - 1)
    else if (button.hasAttribute('data-ak-gallery-next')) select(selected + 1)
    else if (button.hasAttribute('data-ak-gallery-open')) open()
    else if (button.hasAttribute('data-ak-gallery-close')) close()
  }, { signal })
  root.addEventListener('keydown', event => {
    if (!buttons.includes(event.target)) return
    const keys = { ArrowRight: selected + 1, ArrowDown: selected + 1, ArrowLeft: selected - 1, ArrowUp: selected - 1, Home: 0, End: items.length - 1 }
    if (event.key in keys) { event.preventDefault(); select(keys[event.key], { focus: true }) }
  }, { signal })
  const stage = root.querySelector('[data-ak-gallery-stage]')
  stage?.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'touch' || interactive(event.target)) return
    pointer = { id: event.pointerId, x: event.clientX, y: event.clientY }
  }, { passive: true, signal })
  stage?.addEventListener('pointerup', event => {
    if (!pointer || pointer.id !== event.pointerId) return
    const x = event.clientX - pointer.x
    const y = event.clientY - pointer.y
    pointer = undefined
    if (Math.abs(x) > 60 && Math.abs(x) > Math.abs(y) * 1.5) select(selected + (x < 0 ? 1 : -1))
  }, { passive: true, signal })
  stage?.addEventListener('pointercancel', () => { pointer = undefined }, { signal })
  refresh()
  return {
    select, refresh, open, close,
    get index() { return selected },
    destroy() {
      if (destroyed) return
      close()
      destroyed = true
      lifetime.abort()
      entrances.forEach(entrance => entrance.destroy())
      items.forEach(item => item.querySelectorAll('video,audio').forEach(media => { if (!media.paused) media.pause() }))
      delete root.dataset.akGallery
    },
  }
}
