import { onScopeDispose, shallowRef } from 'vue'
import { effect, getValue } from '@a2ui/web_core/v0_9'
import type { ComponentNode } from '@a2ui/web_core/v0_9'
import { createSession } from '../../../../../examples/a2ui/session.mjs'
import { initialMessages, respondToAction, surfaceId, version } from '../../../../../examples/a2ui/scenario.mjs'

export function useA2uiDemo() {
  const root = shallowRef<ComponentNode>()
  const log = shallowRef<string[]>([])
  const error = shallowRef('')
  const step = shallowRef(0)
  let stopRoot: (() => void) | undefined
  const record = (direction: string, message: unknown) => {
    log.value = [...log.value.slice(-19), `${direction}\n${JSON.stringify(message, null, 2)}`]
  }
  const session = createSession({
    onSurface(_id, resolver) {
      stopRoot?.()
      root.value = undefined
      stopRoot = resolver ? effect(() => { root.value = getValue(resolver.rootNode) }) : undefined
    },
    onAction(message) {
      record('客户端 → 模拟 Agent', message)
      for (const reply of respondToAction(message)) receive(reply)
    },
    onError(message) { error.value = JSON.stringify(message) },
  })
  function receive(message: unknown) {
    try {
      session.receive(message)
      record('模拟 Agent → 客户端', message)
    }
    catch (cause) {
      error.value = cause instanceof Error ? cause.message : String(cause)
    }
  }
  function next() {
    const message = initialMessages()[step.value]
    if (message) { receive(message); step.value++ }
  }
  function reset() {
    if (session.processor.model.getSurface(surfaceId))
      receive({ version, deleteSurface: { surfaceId } })
    log.value = []
    error.value = ''
    step.value = 0
  }
  function load() {
    reset()
    while (step.value < initialMessages().length) next()
  }
  load()
  onScopeDispose(() => { stopRoot?.(); session.dispose() })
  return { root, log, error, step, next, reset, load }
}
