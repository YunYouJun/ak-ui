import { onScopeDispose, shallowRef } from 'vue'

/** Owns only the playback clock; the showcase owns its DOM and rendering. */
export function useDepthPlayback(render: (seconds: number) => void, allowed: () => boolean) {
  const active = shallowRef(false)
  const playing = shallowRef(false)
  const seconds = shallowRef(0)
  const loop = shallowRef(true)
  const duration = 8
  let frame = 0
  let previous: number | undefined

  function pause() {
    playing.value = false
    if (typeof window !== 'undefined') window.cancelAnimationFrame(frame)
    previous = undefined
  }

  function tick(now: number) {
    if (!allowed()) { pause(); return }
    const delta = previous === undefined ? 0 : Math.min((now - previous) / 1000, .1)
    previous = now
    let next = seconds.value + delta
    if (next >= duration) {
      if (loop.value) next %= duration
      else { seconds.value = duration; render(duration); pause(); return }
    }
    seconds.value = next
    render(next)
    frame = requestAnimationFrame(tick)
  }

  function play() {
    if (!allowed() || playing.value) return
    active.value = true
    if (seconds.value >= duration) seconds.value = 0
    playing.value = true
    frame = requestAnimationFrame(tick)
  }

  function seek(value: number) {
    if (!allowed() || !Number.isFinite(value)) return
    active.value = true
    seconds.value = Math.max(0, Math.min(duration, value))
    previous = undefined
    render(seconds.value)
  }

  function stop() {
    pause()
    seconds.value = 0
    render(0)
    active.value = false
  }

  onScopeDispose(pause)
  return { active, playing, seconds, loop, duration, play, pause, seek, stop }
}
