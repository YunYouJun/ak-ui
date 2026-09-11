import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'

const root = resolve(fileURLToPath(new URL('../', import.meta.url)))
const args = process.argv.slice(2)
function option(name) {
  const index = args.indexOf(name)
  const value = index < 0 ? undefined : args[index + 1]
  if (!value || value.startsWith('--'))
    throw new Error(`Required: ${name} /absolute/directory`)
  return resolve(value)
}
const sourceRoot = option('--source-dir')
const outputRoot = option('--output-dir')
if (outputRoot === root || outputRoot.startsWith(root + sep))
  throw new Error('Keep generated media outside the Git repository')
const manifestPath = resolve(root, 'assets/artwork-manifest.json')
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))
const checksum = bytes => createHash('sha256').update(bytes).digest('hex')
const encoderVersion = execFileSync('cwebp', ['-version'], { encoding: 'utf8' }).trim().split('\n')[0]
let before = 0
let after = 0
let thumbnails = 0

for (const asset of manifest.assets) {
  if (asset.contentType !== 'image/png' || asset.bytes < 100_000)
    continue
  const source = resolve(sourceRoot, asset.path)
  if (!source.startsWith(sourceRoot + sep))
    throw new Error(`Invalid source path: ${asset.path}`)
  const bytes = await readFile(source)
  if (bytes.length !== asset.bytes || checksum(bytes) !== asset.sha256)
    throw new Error(`Original checksum mismatch: ${asset.path}`)

  async function encode(thumbnail = false) {
    const path = asset.path.replace(/\.png$/, thumbnail ? '-thumb.webp' : '.webp')
    const output = resolve(outputRoot, path)
    await mkdir(dirname(output), { recursive: true })
    const flags = ['-quiet', '-q', thumbnail ? '85' : '90', '-m', '6', '-sharp_yuv', '-alpha_q', '100', '-metadata', 'none']
    if (thumbnail)
      flags.push('-resize', '640', '0')
    execFileSync('cwebp', [...flags, source, '-o', output], { timeout: 120000 })
    const encoded = await readFile(output)
    if (encoded.length >= bytes.length)
      throw new Error(`WebP is not smaller: ${path}`)
    const sha256 = checksum(encoded)
    const key = `ak-ui/assets/${path.replace(/\.webp$/, `-${sha256.slice(0, 12)}.webp`)}`
    return { path, key, sha256, bytes: encoded.length, url: new URL(key, manifest.baseURL).href, contentType: 'image/webp' }
  }

  asset.webp = await encode()
  if (asset.path.startsWith('img/character/xiaoyun-')) {
    asset.thumbnail = await encode(true)
    thumbnails += asset.thumbnail.bytes
  }
  before += asset.bytes
  after += asset.webp.bytes
  console.log(`${asset.path}: ${asset.bytes} → ${asset.webp.bytes} bytes`)
}
manifest.optimization = { encoder: `cwebp ${encoderVersion}`, quality: 90, alphaQuality: 100, thumbnailQuality: 85, thumbnailWidth: 640 }
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`Display images: ${before} → ${after} bytes; thumbnails: ${thumbnails} bytes. Upload before switching page URLs.`)
