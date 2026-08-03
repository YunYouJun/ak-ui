const defaultOptions = {
  layerSelector: '[data-depth]',
  maxX: 130,
  maxY: 70,
  respectReducedMotion: true,
}

/**
 * Attach pointer-driven depth variables to a dashboard element.
 * The returned controller owns its listeners and can be safely destroyed.
 *
 * @param {Element} root
 * @param {Partial<typeof defaultOptions>} options
 */
export function createDashboardDepth(root, options = {}) {
  if (!root?.querySelectorAll)
    throw new TypeError('createDashboardDepth requires a root Element')

  const config = { ...defaultOptions, ...options }
  const view = root.ownerDocument?.defaultView

  if (!view)
    throw new TypeError('createDashboardDepth requires an Element attached to a document')

  const layers = Array.from(root.querySelectorAll(config.layerSelector))
  const reduceMotion = view.matchMedia('(prefers-reduced-motion: reduce)')
  let motionFrame = 0

  function render(clientX, clientY) {
    const rect = root.getBoundingClientRect()

    if (!rect.width || !rect.height)
      return

    const x = ((clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((clientY - rect.top) / rect.height - 0.5) * 2

    for (const layer of layers) {
      const depth = Number(layer.dataset.depth || 0)
      layer.style.setProperty('--ak-layer-x', `${(-x * config.maxX * depth).toFixed(2)}px`)
      layer.style.setProperty('--ak-layer-y', `${(-y * config.maxY * depth).toFixed(2)}px`)
    }
  }

  function reset() {
    const rect = root.getBoundingClientRect()
    render(rect.left + rect.width / 2, rect.top + rect.height / 2)
  }

  function onPointerMove(event) {
    if (config.respectReducedMotion && reduceMotion.matches)
      return

    view.cancelAnimationFrame(motionFrame)
    motionFrame = view.requestAnimationFrame(() => render(event.clientX, event.clientY))
  }

  root.addEventListener('pointermove', onPointerMove)
  root.addEventListener('pointerleave', reset)
  reset()

  return {
    render,
    reset,
    destroy() {
      view.cancelAnimationFrame(motionFrame)
      root.removeEventListener('pointermove', onPointerMove)
      root.removeEventListener('pointerleave', reset)
      reset()
    },
  }
}
