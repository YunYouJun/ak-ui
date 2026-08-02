import assert from 'node:assert/strict'
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { basename, dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const registryDir = resolve(projectRoot, 'docs/public/r')
const registry = JSON.parse(await readFile(resolve(projectRoot, 'registry.json'), 'utf8'))
const packageManifest = JSON.parse(await readFile(resolve(projectRoot, 'package.json'), 'utf8'))
const expectedPackageDependency = `${packageManifest.name}@${packageManifest.version}`
const itemNames = registry.items.map(item => item.name)
const expectedVueFiles = registry.items
  .flatMap(item => item.files)
  .filter(file => file.path.endsWith('.vue'))
const expectedFiles = expectedVueFiles
  .map(file => basename(file.path))

for (const item of registry.items) {
  const vueSources = await Promise.all(item.files
    .filter(file => file.path.endsWith('.vue'))
    .map(async file => ({
      path: file.path,
      source: await readFile(resolve(projectRoot, file.path), 'utf8'),
    })))

  assert.ok(
    vueSources.some(file => file.source.includes("import '@yunyoujun/ak-ui'")),
    `${item.name} must import the shared CSS Core`,
  )

  for (const file of vueSources) {
    assert.doesNotMatch(
      file.source,
      /<style(?:\s|>)/i,
      `${file.path} must reuse CSS Core instead of declaring adapter styles`,
    )
  }
}

for (const itemName of itemNames) {
  const item = JSON.parse(await readFile(resolve(registryDir, `${itemName}.json`), 'utf8'))

  assert.equal(item.$schema, 'https://shadcn-vue.com/schema/registry-item.json')
  assert.equal(item.name, itemName)
  assert.equal(item.type, 'registry:ui')
  assert.ok(item.dependencies.includes(expectedPackageDependency))
  assert.ok(item.files.every(file => file.content && file.type === 'registry:ui'))
}

const fixtureRoot = await mkdtemp(join(tmpdir(), 'ak-ui-registry-'))

try {
  const fixtureRegistryDir = resolve(fixtureRoot, 'registry')

  await mkdir(resolve(fixtureRoot, 'src/assets'), { recursive: true })
  await mkdir(fixtureRegistryDir, { recursive: true })
  await writeFile(resolve(fixtureRoot, 'package.json'), `${JSON.stringify({
    name: 'ak-ui-registry-fixture',
    private: true,
    type: 'module',
    packageManager: 'pnpm@10.13.1',
    dependencies: {
      '@yunyoujun/ak-ui': `file:${projectRoot}`,
      vue: '^3.5.40',
    },
    pnpm: {
      overrides: {
        '@yunyoujun/ak-ui': `file:${projectRoot}`,
      },
    },
  }, null, 2)}\n`)
  await writeFile(resolve(fixtureRoot, 'components.json'), `${JSON.stringify({
    $schema: 'https://shadcn-vue.com/schema.json',
    style: 'new-york',
    typescript: true,
    tailwind: {
      config: '',
      css: 'src/assets/main.css',
      baseColor: 'neutral',
      cssVariables: true,
      prefix: '',
    },
    aliases: {
      components: '@/components',
      composables: '@/composables',
      lib: '@/lib',
      ui: '@/components/ui',
      utils: '@/lib/utils',
    },
  }, null, 2)}\n`)
  await writeFile(resolve(fixtureRoot, 'tsconfig.json'), `${JSON.stringify({
    compilerOptions: {
      baseUrl: '.',
      paths: {
        '@/*': ['./src/*'],
      },
    },
  }, null, 2)}\n`)
  await writeFile(resolve(fixtureRoot, 'src/assets/main.css'), '')

  for (const itemName of itemNames) {
    const item = JSON.parse(await readFile(resolve(registryDir, `${itemName}.json`), 'utf8'))
    item.dependencies = item.dependencies.map(dependency => (
      dependency === expectedPackageDependency ? `file:${projectRoot}` : dependency
    ))
    await writeFile(
      resolve(fixtureRegistryDir, `${itemName}.json`),
      `${JSON.stringify(item, null, 2)}\n`,
    )
  }

  const install = spawnSync('pnpm', [
    'exec',
    'shadcn-vue',
    'add',
    ...itemNames.map(itemName => resolve(fixtureRegistryDir, `${itemName}.json`)),
    '--cwd',
    fixtureRoot,
    '--yes',
    '--silent',
  ], {
    cwd: projectRoot,
    encoding: 'utf8',
  })

  assert.equal(install.status, 0, [install.stdout, install.stderr].filter(Boolean).join('\n'))

  const installedFiles = await listFiles(resolve(fixtureRoot, 'src/components/ui'))
  const installedNames = new Set(installedFiles.map(file => file.split('/').at(-1)))

  for (const expectedFile of expectedFiles)
    assert.ok(installedNames.has(expectedFile), `Missing installed registry file: ${expectedFile}`)

  console.log(`Verified ${itemNames.length} registry items and ${expectedFiles.length} installed Vue files.`)
}
finally {
  await rm(fixtureRoot, { recursive: true, force: true })
}

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const path = resolve(directory, entry.name)

    if (entry.isDirectory())
      files.push(...await listFiles(path))
    else
      files.push(path)
  }

  return files
}
