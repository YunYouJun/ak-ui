import { createEntrance } from '../effects.mjs'
import { duration, environment } from './shared.mjs'

/** Native dialog owns focus trapping and Escape; presentation owns stagger only. */
export function createMobileMenu(dialog, { trigger, stagger = 70, duration: ms = 200 } = {}) {
  const { view, lifetime } = environment(dialog)
  if (!trigger || typeof dialog.showModal !== 'function') throw new TypeError('A native dialog and trigger button are required')
  const signal = lifetime.signal
  let destroyed = false
  let entrances = []
  let overflow
  let previousFocus
  function clear() { entrances.forEach(entrance => entrance.destroy()); entrances = [] }
  function closed() {
    if (dialog.open) return
    clear()
    trigger.setAttribute('aria-expanded', 'false')
    if (overflow !== undefined) { dialog.ownerDocument.documentElement.style.overflow = overflow; overflow = undefined }
    if (previousFocus?.isConnected && !dialog.ownerDocument.querySelector('dialog[open]')) previousFocus.focus({ preventScroll: true })
    previousFocus = undefined
  }
  function open() {
    if (destroyed || dialog.open) return
    previousFocus = dialog.ownerDocument.activeElement
    if (!previousFocus || previousFocus === dialog.ownerDocument.body || previousFocus === dialog.ownerDocument.documentElement) previousFocus = trigger
    dialog.showModal()
    overflow = dialog.ownerDocument.documentElement.style.overflow
    dialog.ownerDocument.documentElement.style.overflow = 'hidden'
    trigger.setAttribute('aria-expanded', 'true')
    clear()
    entrances = Array.from(dialog.querySelectorAll('[data-ak-menu-item]'), (item, index) => {
      const entrance = createEntrance(item, { direction: 'right', distance: 24, duration: duration(ms, 200), delay: index * duration(stagger, 70) })
      entrance.play()
      return entrance
    })
  }
  function close() { if (dialog.open) { dialog.close(); closed() } }
  trigger.setAttribute('aria-expanded', String(dialog.open))
  trigger.setAttribute('aria-haspopup', 'dialog')
  if (dialog.id) trigger.setAttribute('aria-controls', dialog.id)
  trigger.addEventListener('click', () => dialog.open ? close() : open(), { signal })
  dialog.addEventListener('close', closed, { signal })
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return
    const controls = Array.from(dialog.querySelectorAll('a[href],button,input,select,textarea,[tabindex]'))
      .filter(element => !element.disabled && element.tabIndex >= 0 && element.getClientRects().length)
    const first = controls[0], last = controls.at(-1)
    if (!first) { event.preventDefault(); return }
    if (event.shiftKey && dialog.ownerDocument.activeElement === first) { event.preventDefault(); last.focus() }
    else if (!event.shiftKey && dialog.ownerDocument.activeElement === last) { event.preventDefault(); first.focus() }
  }, { signal })
  dialog.addEventListener('click', event => {
    const control = event.target.closest('[data-ak-menu-close],a[href]')
    if (control && dialog.contains(control)) { close(); return }
    const rect = dialog.getBoundingClientRect()
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) close()
  }, { signal })
  // A desktop breakpoint must not leave an invisible modal trapping focus.
  view.addEventListener('resize', () => { if (dialog.open && !trigger.getClientRects().length) close() }, { signal })
  return {
    open, close,
    get isOpen() { return dialog.open },
    destroy() { if (destroyed) return; close(); clear(); lifetime.abort(); destroyed = true },
  }
}
