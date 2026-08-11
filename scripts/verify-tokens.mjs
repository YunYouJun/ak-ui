import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const projectRoot = process.cwd()
const packageManifest = JSON.parse(await readFile(resolve(projectRoot, 'package.json'), 'utf8'))
const tokensCss = await readFile(resolve(projectRoot, 'dist/tokens.css'), 'utf8')
const coreCss = await readFile(resolve(projectRoot, 'dist/ak-ui.css'), 'utf8')

assert.equal(packageManifest.exports['./tokens.css'], './dist/tokens.css')
assert.equal(packageManifest.exports['./tokens.min.css'], './dist/tokens.min.css')
assert.match(tokensCss, /^:root\s*\{/)
assert.equal(tokensCss.match(/{/g)?.length, 1, 'tokens.css must only contain the :root token block')
assert.equal(tokensCss.match(/}/g)?.length, 1, 'tokens.css must only contain the :root token block')
assert.doesNotMatch(tokensCss, /(?:^|})\s*(?:html|body|button|input|\.|#|\[)/m)
assert.ok(coreCss.startsWith(tokensCss.trim()), 'CSS Core must include the same token block')

const requiredTokens = [
  '--ak-surface-canvas',
  '--ak-surface-panel',
  '--ak-text-primary',
  '--ak-signal-info',
  '--ak-signal-action',
  '--ak-font-command',
  '--ak-space-1',
  '--ak-density-control-height',
  '--ak-line-strong',
  '--ak-cut-md',
  '--ak-shadow-panel',
  '--ak-motion-base',
  '--ak-focus-color',
]

for (const token of requiredTokens) {
  assert.ok(tokensCss.includes(`${token}:`), `Missing public token: ${token}`)
}

console.log(`Verified ${requiredTokens.length} public tokens and the token-only package export.`)
