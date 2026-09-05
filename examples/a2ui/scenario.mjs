import { catalogId } from './catalog.mjs'

export const surfaceId = 'operation'
export const version = 'v0.9.1'

// One message per step, so the demo can replay incremental delivery without a backend.
export function initialMessages() {
  return [
    { version, createSurface: { surfaceId, catalogId } },
    { version, updateDataModel: { surfaceId, value: {
      callsign: '博士', progress: 25, status: '等待部署指令',
    } } },
    { version, updateComponents: { surfaceId, components: [
      { id: 'root', component: 'Card', child: 'body' },
      { id: 'body', component: 'Column', children: ['title', 'callsign', 'progress', 'status', 'actions'] },
      { id: 'title', component: 'Text', text: 'OPERATION / 部署终端' },
      { id: 'callsign', component: 'TextField', label: '指挥代号', value: { path: '/callsign' } },
      { id: 'progress', component: 'AkProgress', label: '部署进度', value: { path: '/progress' } },
      { id: 'status', component: 'Text', text: { path: '/status' } },
      { id: 'actions', component: 'Row', children: ['deploy'] },
      { id: 'deploy', component: 'Button', child: 'deploy-label', action: {
        event: { name: 'deploy', context: { callsign: { path: '/callsign' } } },
      } },
      { id: 'deploy-label', component: 'Text', text: '执行部署' },
    ] } },
  ]
}

// A deterministic local agent stand-in. No network or real operation is performed.
export function respondToAction(message) {
  if (message.action?.name !== 'deploy' || message.action.surfaceId !== surfaceId)
    return []
  const name = String(message.action.context?.callsign ?? '').trim() || '匿名指挥官'
  return [
    { version, updateDataModel: { surfaceId, path: '/progress', value: 100 } },
    { version, updateDataModel: { surfaceId, path: '/status', value: `${name}，部署完成` } },
    { version, updateComponents: { surfaceId, components: [
      { id: 'deploy-label', component: 'Text', text: '再次部署' },
    ] } },
  ]
}
