import assert from 'node:assert/strict'
import { test } from 'node:test'
import * as site from '../../src/js/site.mjs'

const deferred = () => { let resolve; const promise = new Promise(r => { resolve = r }); return { promise, resolve } }

test('site module imports without a DOM and exposes five controllers', () => {
  for (const name of ['createSectionNavigation', 'createMobileMenu', 'createMediaGallery', 'createAssetLoader', 'createParticleField']) assert.equal(typeof site[name], 'function')
})

test('asset progress counts real completions and distinguishes failed tasks from readiness', async () => {
  const pending = deferred()
  const states = []
  const loader = site.createAssetLoader(s => states.push(s))
  const result = loader.load([() => pending.promise, () => Promise.reject(undefined), () => 'cached'])
  await new Promise(resolve => setImmediate(resolve))
  assert.equal(loader.state.completed, 2)
  assert.equal(loader.state.status, 'loading')
  assert.equal(loader.state.errors.length, 1)
  pending.resolve()
  assert.equal((await result).status, 'error')
  assert.equal(loader.state.completed, 3)
  assert.deepEqual(states.map(s => s.completed), [0, 1, 2, 3])
  assert.equal((await loader.load([() => 'retried'])).status, 'ready')
  assert.equal((await loader.load([])).status, 'ready')
  assert.equal(loader.state.total, 0)
  loader.destroy()
})

test('superseding, cancelling and disposing settle promptly and suppress stale callbacks', async () => {
  const first = deferred(), second = deferred()
  const states = []
  let firstSignal, secondSignal
  const loader = site.createAssetLoader(s => states.push(s))
  const oldRun = loader.load([signal => { firstSignal = signal; return first.promise }])
  const current = loader.load([signal => { secondSignal = signal; return second.promise }])
  assert.equal((await oldRun).status, 'cancelled')
  assert.equal(firstSignal.aborted, true)
  first.resolve()
  await Promise.resolve()
  assert.equal(loader.state.completed, 0)
  loader.destroy()
  const count = states.length
  assert.equal(secondSignal.aborted, true)
  assert.equal((await current).status, 'cancelled')
  second.resolve()
  await Promise.resolve()
  assert.equal(states.length, count)
  assert.equal((await loader.load([() => { throw new Error('must not run') }])).status, 'cancelled')
  await assert.rejects(loader.load([null]), TypeError)
})
