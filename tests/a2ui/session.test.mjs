import assert from 'node:assert/strict'
import { test } from 'node:test'
import { getValue } from '@a2ui/web_core/v0_9'
import { createSession } from '../../examples/a2ui/session.mjs'
import { initialMessages, respondToAction, surfaceId, version } from '../../examples/a2ui/scenario.mjs'

test('incremental messages, two-way binding, action context, and agent updates', async () => {
  let resolver
  let action
  const session = createSession({
    onSurface(_id, next) { resolver = next },
    onAction(message) {
      action = message
      respondToAction(message).forEach(session.receive)
    },
  })
  try {
    const messages = initialMessages()
    session.receive(messages[0])
    assert.equal(getValue(resolver.rootNode), undefined)
    session.receive(messages[1])
    assert.equal(getValue(resolver.rootNode), undefined)
    session.receive(messages[2])
    const body = getValue(getValue(resolver.rootNode).props).child
    const nodes = getValue(body.props).children
    getValue(nodes[1].props).value.set('阿米娅')
    const button = getValue(nodes[4].props).children[0]
    getValue(button.props).action()
    // Surface action listeners run asynchronously.
    await new Promise(resolve => setImmediate(resolve))
    assert.equal(action.action.context.callsign, '阿米娅')
    assert.equal(action.action.sourceComponentId, 'deploy')
    assert.equal(getValue(nodes[2].props).value.value, 100)
    assert.equal(getValue(nodes[3].props).text.value, '阿米娅，部署完成')
    assert.equal(getValue(getValue(button.props).child.props).text.value, '再次部署')
    session.receive({ version, deleteSurface: { surfaceId } })
    assert.equal(resolver, undefined)
    assert.equal(session.processor.model.surfacesMap.size, 0)
    initialMessages().forEach(session.receive)
    assert.ok(getValue(resolver.rootNode))
  }
  finally { session.dispose() }
})

test('rejects invalid envelopes, unsupported catalogs, components, and properties', () => {
  const session = createSession()
  try {
    assert.throws(() => session.receive({ version: 'v1.0', deleteSurface: { surfaceId } }))
    assert.throws(() => session.receive({ version, unexpected: {} }))
    assert.throws(() => session.receive({ version, createSurface: { surfaceId, catalogId: 'unknown' } }))
    initialMessages().forEach(session.receive)
    for (const component of [
      { id: 'bad', component: 'Script', code: 'alert(1)' },
      { id: 'bad', component: 'Text', text: 'hello', html: '<script />' },
      { id: 'bad', component: 'Text', text: { call: 'eval', args: {} } },
    ]) {
      assert.throws(() => session.receive({ version, updateComponents: { surfaceId, components: [component] } }))
      assert.equal(session.processor.model.getSurface(surfaceId).componentsModel.get('bad'), undefined)
    }
  }
  finally { session.dispose() }
})

test('buffers missing children and reports cycles without infinite recursion', async () => {
  let resolver
  const errors = []
  const session = createSession({ onSurface(_id, next) { resolver = next }, onError(error) { errors.push(error) } })
  try {
    session.receive(initialMessages()[0])
    session.receive({ version, updateComponents: { surfaceId, components: [
      { id: 'root', component: 'Card', child: 'later' },
    ] } })
    assert.equal(getValue(getValue(resolver.rootNode).props).child.state, 'pending')
    session.receive({ version, updateComponents: { surfaceId, components: [
      { id: 'later', component: 'Text', text: 'arrived' },
    ] } })
    assert.equal(getValue(getValue(getValue(resolver.rootNode).props).child.props).text.value, 'arrived')
    session.receive({ version, updateComponents: { surfaceId, components: [
      { id: 'root', component: 'Card', child: 'root' },
    ] } })
    await new Promise(resolve => setImmediate(resolve))
    assert.equal(getValue(getValue(resolver.rootNode).props).child.state, 'cyclic')
    assert.ok(errors.length > 0)
  }
  finally { session.dispose() }
})
