import { A2uiMessageSchema, MessageProcessor, NodeResolver } from '@a2ui/web_core/v0_9'
import { catalog } from './catalog.mjs'
import { version } from './scenario.mjs'

/**
 * Transport-independent demo session. Each receive call accepts one decoded JSON message.
 * @param {{
 *   onSurface?: (id: string, resolver: import('@a2ui/web_core/v0_9').NodeResolver | undefined) => void,
 *   onAction?: (message: { version: 'v0.9.1', action: import('@a2ui/web_core/v0_9').A2uiClientAction }) => void,
 *   onError?: (error: unknown) => void
 * }} options
 */
export function createSession({ onSurface = () => {}, onAction = () => {}, onError = () => {} } = {}) {
  const resolvers = new Map()
  // web_core emits the action payload; transports send the versioned envelope.
  const processor = new MessageProcessor([catalog], action => onAction({ version, action }), { version })
  processor.onSurfaceCreated((surface) => {
    surface.onError.subscribe(onError)
    const resolver = new NodeResolver(surface, catalog)
    resolvers.set(surface.id, resolver)
    onSurface(surface.id, resolver)
  })
  processor.onSurfaceDeleted((id) => {
    resolvers.get(id)?.dispose()
    resolvers.delete(id)
    onSurface(id, undefined)
  })
  return {
    processor,
    /** @param {unknown} raw */
    receive(raw) {
      const message = A2uiMessageSchema.parse(raw)
      if (message.version !== version)
        throw new Error(`This experiment requires ${version}`)
      if ('updateComponents' in message) {
        for (const component of message.updateComponents.components) {
          if (!catalog.components.has(component.component))
            throw new Error(`Unsupported component: ${component.component}`)
        }
      }
      processor.processMessages([message])
    },
    dispose() {
      for (const resolver of resolvers.values()) resolver.dispose()
      resolvers.clear()
      processor.model.dispose()
    },
  }
}
