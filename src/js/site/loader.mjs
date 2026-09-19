/** Progress counts settled tasks, never elapsed time or simulated download bytes. */
export function createAssetLoader(onChange = () => {}) {
  let state = { status: 'idle', completed: 0, total: 0, errors: [] }
  let active
  let generation = 0
  let destroyed = false
  const snapshot = () => ({ ...state, errors: [...state.errors] })
  function publish(next) { state = next; if (!destroyed) onChange(snapshot()) }
  function cancel() {
    if (!active) return
    generation++
    active.abort()
    active = undefined
    publish({ ...state, status: 'cancelled' })
  }
  async function load(tasks) {
    if (!Array.isArray(tasks) || tasks.some(task => typeof task !== 'function')) throw new TypeError('Asset tasks must be functions accepting an AbortSignal')
    if (destroyed) return { ...snapshot(), status: 'cancelled' }
    cancel()
    const run = ++generation
    const controller = new AbortController()
    active = controller
    publish({ status: tasks.length ? 'loading' : 'ready', completed: 0, total: tasks.length, errors: [] })
    const cancelled = new Promise(resolve => controller.signal.addEventListener('abort', () => resolve({ status: 'cancelled', completed: 0, total: tasks.length, errors: [] }), { once: true }))
    const complete = Promise.all(tasks.map(async task => {
      let error
      let failed = false
      try { await task(controller.signal) }
      catch (reason) { error = reason; failed = true }
      if (destroyed || run !== generation) return
      const errors = failed ? [...state.errors, error] : state.errors
      const completed = state.completed + 1
      publish({ status: completed === tasks.length ? (errors.length ? 'error' : 'ready') : 'loading', completed, total: tasks.length, errors })
    })).then(() => {
      if (run === generation) active = undefined
      return run === generation ? snapshot() : { status: 'cancelled', completed: 0, total: tasks.length, errors: [] }
    })
    return Promise.race([complete, cancelled])
  }
  return { load, cancel, get state() { return snapshot() }, destroy() { if (destroyed) return; destroyed = true; cancel() } }
}
