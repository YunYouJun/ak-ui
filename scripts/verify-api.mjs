import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import postcss from 'postcss'

const baseline = JSON.parse(await readFile('tests/public-api.json', 'utf8'))
const manifest = JSON.parse(await readFile('package.json', 'utf8'))
const registry = JSON.parse(await readFile('registry.json', 'utf8'))
const css = await readFile('dist/ak-ui.css', 'utf8')
const classes = new Set()
postcss.parse(css).walkRules(rule => {
  for (const match of rule.selector.matchAll(/\.(ak-[\w-]+)/g)) classes.add(match[1])
})
for (const name of baseline.classes) assert.ok(classes.has(name), `Removed CSS class: ${name}`)
for (const [name, target] of Object.entries(baseline.exports))
  assert.deepEqual(manifest.exports[name], target, `Changed public export: ${name}`)
for (const name of baseline.registry)
  assert.ok(registry.items.some(item => item.name === name), `Removed Registry item: ${name}`)
for (const item of registry.items)
  assert.ok(item.dependencies.includes(`${manifest.name}@${manifest.version}`), `Registry version drift: ${item.name}`)
for (const file of await readdir('docs/components')) {
  if (!file.endsWith('.md')) continue
  const doc = await readFile(`docs/components/${file}`, 'utf8')
  for (const [name] of doc.matchAll(/--ak-[a-z][a-z0-9-]*[a-z0-9]/g))
    assert.ok(css.includes(name), `Undeclared documented variable: ${file}: ${name}`)
}
console.log(`Verified ${classes.size} CSS classes against ${baseline.classes.length} stable names, package exports, Registry versions and documented variables.`)
