import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { compileString, NodePackageImporter } from 'sass'

const root = process.cwd()
const fixture = await mkdtemp(join(tmpdir(), 'ak-ui-package-'))
function run(command, args, cwd = fixture) {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8' })
  assert.equal(result.status, 0, `${command}: ${result.stdout}\n${result.stderr}`)
  return result.stdout
}
try {
  const [packed] = JSON.parse(run('npm', ['pack', '--json', '--ignore-scripts', '--pack-destination', fixture], root))
  const paths = new Set(packed.files.map(file => file.path))
  for (const name of ['dist/ak-ui.css', 'dist/ak-ui.min.css', 'dist/tokens.css', 'dist/tokens.min.css', 'LICENSE'])
    assert.ok(paths.has(name), `Missing package file: ${name}`)
  assert.ok(![...paths].some(path => /^(docs|examples|tests|node_modules)\//.test(path)))
  await writeFile(join(fixture, 'package.json'), '{"private":true,"type":"module"}')
  run('npm', ['install', join(fixture, packed.filename), '--ignore-scripts', '--no-audit', '--no-fund', '--package-lock=false'])
  const installed = join(fixture, 'node_modules/@yunyoujun/ak-ui')
  const manifest = JSON.parse(await readFile(join(installed, 'package.json'), 'utf8'))
  assert.equal(Object.keys(manifest.dependencies ?? {}).length, 0, 'CSS package must have no runtime dependencies')
  function targets(value) { return typeof value === 'string' ? [value] : Object.values(value).flatMap(targets) }
  for (const target of targets(manifest.exports))
    assert.ok((await readFile(resolve(installed, target))).length > 0, `Empty export: ${target}`)
  await writeFile(join(fixture, 'consume.mjs'), `
    import assert from 'node:assert/strict'
    import { createDashboardDepth } from '@yunyoujun/ak-ui/depth'
    import * as site from '@yunyoujun/ak-ui/site'
    import { createEntrance, createCountUp } from '@yunyoujun/ak-ui/effects'
    assert.equal(typeof createEntrance, 'function')
    assert.equal(typeof createCountUp, 'function')
    for (const name of ['createSectionNavigation', 'createMobileMenu', 'createMediaGallery', 'createAssetLoader', 'createParticleField']) assert.equal(typeof site[name], 'function')
    assert.equal(typeof createDashboardDepth, 'function')
    for (const entry of ['', '/style.css', '/style.min.css', '/tokens.css', '/tokens.min.css'])
      assert.ok(import.meta.resolve('@yunyoujun/ak-ui' + entry).endsWith('.css'))
  `)
  run(process.execPath, ['consume.mjs'])
  const sass = compileString('@use "pkg:@yunyoujun/ak-ui/scss";', { importers: [new NodePackageImporter(fixture)] })
  assert.ok(sass.css.includes('.ak-button'))
  console.log(`Verified packed ${manifest.name}@${manifest.version}: ${paths.size} files, CSS exports, Sass compilation and SSR-safe depth/effects/site imports; no runtime dependencies.`)
}
finally { await rm(fixture, { recursive: true, force: true }) }
