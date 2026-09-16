import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createCountUp, createEntrance } from '../../src/js/effects.mjs'

function clock() {
  let now = 0
  let id = 0
  const frames = new Map()
  const motion = Object.assign(new EventTarget(), { matches: false })
  const view = {
    matchMedia: () => motion,
    performance: { now: () => now },
    requestAnimationFrame: callback => { frames.set(++id, callback); return id },
    cancelAnimationFrame: key => frames.delete(key),
  }
  function advance(time) {
    now = time
    const pending = [...frames.values()]
    frames.clear()
    pending.forEach(callback => callback(now))
  }
  return { view, frames, motion, advance }
}

test('count retargets from current value, finishes exactly and releases work', () => {
  const c = clock()
  let value
  const count = createCountUp(v => { value = v }, { value: 100, duration: 1000 }, c.view)
  count.play()
  c.advance(500)
  assert.equal(value, 87.5)
  count.update(-10.25)
  assert.equal(value, 87.5)
  assert.equal(c.frames.size, 1)
  c.advance(1500)
  assert.equal(value, -10.25)
  assert.equal(c.frames.size, 0)
  count.play({ from: 0 })
  count.destroy()
  assert.equal(c.frames.size, 0)
  count.play()
  assert.equal(c.frames.size, 0)
})

test('delays, zero duration and live reduced-motion finish without leftover frames', () => {
  const c = clock()
  let value
  const count = createCountUp(v => { value = v }, { value: 42, delay: 200, duration: 1000 }, c.view)
  count.play()
  c.advance(100)
  assert.equal(value, 0)
  c.motion.matches = true
  c.motion.dispatchEvent(new Event('change'))
  assert.equal(value, 42)
  assert.equal(c.frames.size, 0)
  count.play({ value: 13 })
  assert.equal(value, 13)
  c.motion.matches = false
  count.play({ value: 2.5, duration: 0 })
  assert.equal(value, 2.5)
  assert.equal(c.frames.size, 0)
  count.destroy()
})

test('independent entrances cancel only their own animation and respect motion changes', () => {
  const c = clock()
  const animations = []
  const element = { ownerDocument: { defaultView: c.view }, animate: (frames, options) => {
    const animation = { frames, options, cancelled: false, cancel() { this.cancelled = true } }
    animations.push(animation)
    return animation
  } }
  const first = createEntrance(element, { direction: 'right', delay: 200 })
  const second = createEntrance(element)
  first.play()
  second.play()
  first.play()
  assert.equal(animations[0].cancelled, true)
  assert.equal(animations[1].cancelled, false)
  assert.equal(animations[2].frames[0].translate, '24px 0')
  c.motion.matches = true
  c.motion.dispatchEvent(new Event('change'))
  assert.equal(animations[1].cancelled, true)
  assert.equal(animations[2].cancelled, true)
  first.destroy(); second.destroy()
  first.play()
  assert.equal(animations.length, 3)
})
