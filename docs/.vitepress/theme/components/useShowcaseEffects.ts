import { onMounted, onScopeDispose } from 'vue'
import { createCountUp, createEntrance } from '@yunyoujun/ak-ui/effects'
import type { CountUpController, EntranceController } from '@yunyoujun/ak-ui/effects'

export function useShowcaseEffects(target: () => HTMLElement | null | undefined) {
  let root: HTMLElement | null | undefined
  const blocks: { element: HTMLElement; controller: EntranceController; delay: number }[] = []
  const counts: { element: HTMLElement; controller: CountUpController; original: string }[] = []
  function replayBlock(name: string, sequence = false) {
    for (const block of blocks) {
      if (block.element.dataset.akEnter === name) {
        block.controller.play({ delay: sequence ? block.delay : 0 })
        for (const count of counts.filter(item => block.element.contains(item.element)))
          count.controller.play({ from: 0, delay: sequence ? block.delay + 150 : 150 })
      }
    }
  }
  function replay() {
    if (!root) return
    root.removeAttribute('data-entrance')
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      void root.offsetWidth
      root.setAttribute('data-entrance', 'playing')
    }
    for (const block of blocks) replayBlock(block.element.dataset.akEnter!, true)
  }
  function ended(event: AnimationEvent) {
    if (event.animationName === 'ak-terminal-overlay') root?.removeAttribute('data-entrance')
  }
  onMounted(() => {
    root = target()
    if (!root) return
    for (const element of root.querySelectorAll<HTMLElement>('[data-ak-enter]')) {
      blocks.push({ element, delay: Number(element.dataset.delay || 0), controller: createEntrance(element, {
        direction: element.dataset.direction as 'left' | 'right' | 'up', duration: 700, distance: 40,
      }) })
    }
    for (const element of root.querySelectorAll<HTMLElement>('[data-count-up]')) {
      const original = element.textContent || '0'
      const value = Number(original)
      const visible = document.createElement('span')
      visible.setAttribute('aria-hidden', 'true')
      const accessible = document.createElement('span')
      accessible.className = 'ak-count-up__accessible'
      accessible.textContent = original
      element.replaceChildren(visible, accessible)
      const controller = createCountUp(number => { visible.textContent = Math.round(number).toString() }, { value, duration: 1100 })
      counts.push({ element, controller, original })
    }
    root.querySelector('[data-entrance-replay]')?.addEventListener('click', replay)
    root.addEventListener('animationend', ended)
    replay()
  })
  onScopeDispose(() => {
    root?.querySelector('[data-entrance-replay]')?.removeEventListener('click', replay)
    root?.removeEventListener('animationend', ended)
    root?.removeAttribute('data-entrance')
    blocks.forEach(item => item.controller.destroy())
    counts.forEach(item => { item.controller.destroy(); item.element.textContent = item.original })
  })
  return { replay, replayBlock }
}
