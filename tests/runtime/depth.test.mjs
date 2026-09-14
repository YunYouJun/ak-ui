import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createDashboardDepth } from '../../src/js/dashboard-depth.mjs'

function fixture() {
  const values = new Map()
  const frames = new Map()
  const motion = Object.assign(new EventTarget(), { matches: false })
  let frame = 0
  const root = Object.assign(new EventTarget(), {
    querySelectorAll: () => [{ dataset: { depth: '1' }, style: { setProperty: (k, v) => values.set(k, v) } }],
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100 }),
    ownerDocument: { defaultView: {
      matchMedia: () => motion,
      requestAnimationFrame: (callback) => { frames.set(++frame, callback); return frame },
      cancelAnimationFrame: id => frames.delete(id),
    } },
  })
  return { root, motion, values, frames }
}

test('pointerleave cancels a queued frame and destroy makes the controller inert', () => {
  const { root, values, frames } = fixture()
  const controller = createDashboardDepth(root)
  root.dispatchEvent(Object.assign(new Event('pointermove'), { clientX: 100, clientY: 100 }))
  assert.equal(frames.size, 1)
  root.dispatchEvent(new Event('pointerleave'))
  assert.equal(frames.size, 0)
  assert.equal(Number(values.get('--ak-layer-x').replace('px', '')), 0)
  controller.destroy()
  controller.destroy()
  controller.render(100, 100)
  root.dispatchEvent(Object.assign(new Event('pointermove'), { clientX: 100, clientY: 100 }))
  assert.equal(frames.size, 0)
  assert.equal(Number(values.get('--ak-layer-x').replace('px', '')), 0)
})

test('live reduced-motion preference resets existing displacement and prevents manual movement', () => {
  const { root, motion, values } = fixture()
  const controller = createDashboardDepth(root)
  controller.render(100, 100)
  assert.equal(values.get('--ak-layer-x'), '-130.00px')
  motion.matches = true
  motion.dispatchEvent(new Event('change'))
  assert.equal(Number(values.get('--ak-layer-x').replace('px', '')), 0)
  controller.render(100, 100)
  assert.equal(Number(values.get('--ak-layer-x').replace('px', '')), 0)
  controller.destroy()
})

test('external playback stays in control when pointer input is disabled', () => {
  const { root, values, frames } = fixture()
  const controller = createDashboardDepth(root, { pointerEnabled: false })
  controller.render(100, 100)
  root.dispatchEvent(Object.assign(new Event('pointermove'), { clientX: 0, clientY: 0 }))
  root.dispatchEvent(new Event('pointerleave'))
  assert.equal(frames.size, 0)
  assert.equal(values.get('--ak-layer-x'), '-130.00px')
  controller.reset()
  assert.equal(Number(values.get('--ak-layer-x').replace('px', '')), 0)
  controller.destroy()
})
