export function environment(element) {
  const view = element?.ownerDocument?.defaultView
  if (!view) throw new TypeError('An element attached to a document is required')
  return { view, lifetime: new view.AbortController() }
}

export const finite = (value, fallback) => Number.isFinite(value) ? value : fallback
export const duration = (value, fallback) => Math.max(0, finite(value, fallback))
export const interactive = element => element?.closest('a,button,input,select,textarea,video,audio,[contenteditable="true"]')

export function readHash(hash) {
  try { return decodeURIComponent(hash.replace(/^#/, '')) }
  catch { return '' }
}
