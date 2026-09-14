import { onMounted, onScopeDispose, shallowRef, watch, watchEffect } from 'vue'
import type { Ref } from 'vue'
import { createDashboardDepth } from '@yunyoujun/ak-ui/depth'
import type { DashboardDepthController } from '@yunyoujun/ak-ui/depth'
import { useDepthPlayback } from './useDepthPlayback'

export const defaultDepthSettings = {
  enabled: true,
  maxX: 130,
  maxY: 70,
  background: 0.02,
  character: 0.065,
  interface: 0.12,
  perspective: 30,
  tilt: 10,
}

export type DepthSettings = typeof defaultDepthSettings

export function useShowcaseDepth(target: () => HTMLElement | null | undefined, settings: Ref<DepthSettings>) {
  const reducedMotion = shallowRef(false)
  let controller: DashboardDepthController | undefined
  let root: HTMLElement | null | undefined
  let stop: (() => void) | undefined
  let cleanup: (() => void) | undefined
  let previewPoint = 0

  let playbackTime = 0
  let character: HTMLElement | null = null
  const playback = useDepthPlayback(renderPlayback, () => settings.value.enabled && !reducedMotion.value)

  function renderPlayback(seconds: number) {
    playbackTime = seconds
    if (!root) return
    const phase = seconds / playback.duration * Math.PI * 2
    const rect = root.getBoundingClientRect()
    controller?.render(rect.left + rect.width * (.5 + Math.sin(phase) * .48), rect.top + rect.height * (.5 + Math.sin(phase * 2) * .32))
    if (character) {
      const breath = (1 - Math.cos(seconds * Math.PI)) / 2
      character.style.scale = `${1 + breath * .007} ${1 + breath * .026}`
      character.style.transformOrigin = '50% 100%'
    }
  }

  watch(() => settings.value.enabled && !reducedMotion.value, (allowed) => {
    if (!allowed) playback.stop()
  })

  function preview(direction: number) {
    playback.stop()
    previewPoint = Math.max(-1, Math.min(1, direction))
    if (!root)
      return
    const rect = root.getBoundingClientRect()
    controller?.render(
      rect.left + rect.width * (0.5 + previewPoint * 0.4),
      rect.top + rect.height * (0.5 + previewPoint * 0.4),
    )
  }

  function reset() {
    playback.stop()
    previewPoint = 0
    settings.value = { ...defaultDepthSettings }
    controller?.reset()
  }

  onMounted(() => {
    root = target()
    if (!root)
      return
    const element = root
    character = element.querySelector<HTMLElement>('.ak-dashboard__character')
    const originalScale = character?.style.scale ?? ''
    const originalOrigin = character?.style.transformOrigin ?? ''
    const layers = [...element.querySelectorAll<HTMLElement>('[data-depth]')]
      .map(layer => ({ layer, original: layer.dataset.depth ?? '0' }))
    const originalPerspective = element.style.getPropertyValue('--ak-dashboard-perspective')
    const originalTilt = element.style.getPropertyValue('--ak-dashboard-tilt')
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncPreference = () => { reducedMotion.value = preference.matches }
    syncPreference()
    preference.addEventListener('change', syncPreference)

    stop = watchEffect((onCleanup) => {
      const current = settings.value
      for (const { layer, original } of layers) {
        const depth = layer.classList.contains('ak-dashboard__background-layer')
          ? current.background * (playback.active.value ? -1 : 1)
          : layer.classList.contains('ak-dashboard__character-layer')
            ? current.character
            : Number(original) * current.interface / defaultDepthSettings.interface
        layer.dataset.depth = String(depth)
      }
      element.style.setProperty('--ak-dashboard-perspective', `${current.perspective}em`)
      element.style.setProperty('--ak-dashboard-tilt', `${current.tilt}deg`)
      controller = createDashboardDepth(element, {
        maxX: current.enabled ? current.maxX : 0,
        maxY: current.enabled ? current.maxY : 0,
        respectReducedMotion: true,
        pointerEnabled: !playback.active.value,
      })
      if (playback.active.value) {
        // Reading time here would rebuild the controller on every animation frame.
        renderPlayback(playbackTime)
      }
      else {
        if (character) { character.style.scale = originalScale; character.style.transformOrigin = originalOrigin }
        const rect = element.getBoundingClientRect()
        controller.render(rect.left + rect.width * (.5 + previewPoint * .4), rect.top + rect.height * (.5 + previewPoint * .4))
      }
      const activeController = controller
      onCleanup(() => activeController.destroy())
    }, { flush: 'post' })

    cleanup = () => {
      preference.removeEventListener('change', syncPreference)
      if (character) { character.style.scale = originalScale; character.style.transformOrigin = originalOrigin }
      for (const { layer, original } of layers)
        layer.dataset.depth = original
      for (const [property, value] of [
        ['--ak-dashboard-perspective', originalPerspective],
        ['--ak-dashboard-tilt', originalTilt],
      ]) {
        if (value)
          element.style.setProperty(property, value)
        else
          element.style.removeProperty(property)
      }
    }
  })

  onScopeDispose(() => {
    stop?.()
    cleanup?.()
  })

  return { preview, reset, reducedMotion, playback }
}
