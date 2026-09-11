import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const root = fileURLToPath(new URL('../', import.meta.url))
const manifest = JSON.parse(await readFile(resolve(root, 'assets/artwork-manifest.json'), 'utf8'))
const args = process.argv.slice(2)
const upload = args.includes('--upload')
const local = args.includes('--local')
const variantsOnly = args.includes('--webp')
const sourceIndex = args.indexOf('--source-dir')
const sourceValue = sourceIndex >= 0 ? args[sourceIndex + 1] : undefined
if (sourceIndex >= 0 && (!sourceValue || sourceValue.startsWith('--')))
  throw new Error('Missing --source-dir value')
const sourceRoot = sourceValue ? resolve(sourceValue) : resolve(root, 'docs/public')
const assets = manifest.assets.flatMap(asset => [
  ...(variantsOnly ? [] : [asset]),
  ...[asset.webp, asset.thumbnail].filter(Boolean),
])
if (!assets.length)
  throw new Error('No matching assets in the manifest; prepare WebP variants first')
const scriptIndex = args.indexOf('--cos-script')
const cosScript = scriptIndex >= 0 ? args[scriptIndex + 1] : undefined
if (upload && (!cosScript || cosScript.startsWith('--')))
  throw new Error('Upload requires --cos-script /absolute/path/to/cos_node.mjs')
if (upload && local)
  throw new Error('Use --local separately from --upload')

const sha256 = bytes => createHash('sha256').update(bytes).digest('hex')
function verifyBytes(asset, bytes) {
  if (bytes.length !== asset.bytes || sha256(bytes) !== asset.sha256)
    throw new Error(`Checksum mismatch: ${asset.path}`)
}

let count = 0
for (const asset of assets) {
  const path = resolve(sourceRoot, asset.path)
  if (!path.startsWith(sourceRoot + '/'))
    throw new Error('Asset path escaped source directory')
  if (upload || local)
    verifyBytes(asset, await readFile(path))

  if (upload) {
    const result = spawnSync(process.execPath, [resolve(cosScript), 'upload',
      '--bucket', manifest.bucket, '--region', manifest.region,
      '--file', path, '--key', asset.key,
      '--meta', JSON.stringify({ project: 'ak-ui', sha256: asset.sha256 }),
    ], { encoding: 'utf8', timeout: 120000, maxBuffer: 1024 * 1024 })
    let response
    try { response = JSON.parse(result.stdout) } catch { /* Report no raw credential output. */ }
    if (result.status !== 0 || !response?.success)
      throw new Error(`Upload failed for ${asset.path}: ${response?.code || 'COS command failed'}`)
  }

  if (!local) {
    const expected = new URL(asset.key, manifest.baseURL)
    if (asset.url !== expected.href || expected.protocol !== 'https:')
      throw new Error(`Unexpected asset URL: ${asset.path}`)
    const response = await fetch(asset.url, { signal: AbortSignal.timeout(30000), redirect: 'error' })
    if (!response.ok)
      throw new Error(`Public asset unavailable: ${asset.path} (HTTP ${response.status})`)
    verifyBytes(asset, Buffer.from(await response.arrayBuffer()))
    const contentType = response.headers.get('content-type')?.split(';')[0]
    if (contentType !== asset.contentType)
      throw new Error(`Unexpected Content-Type for ${asset.path}: ${contentType}`)
  }
  console.log(`Verified ${++count}/${assets.length}: ${asset.path}`)
}
console.log(local ? 'Local asset checksums verified.' : 'All public COS assets verified; no local files were deleted.')
