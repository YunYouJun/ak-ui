import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const paths = execFileSync('git', [
  'diff', '--cached', '--name-only', '--diff-filter=ACMR', '-z', '--', 'docs/public/img/',
], { cwd: root, encoding: 'utf8' }).split('\0').filter(Boolean)

if (paths.length) {
  console.error('Documentation media belongs in COS. Remove these additions/changes from the index:')
  console.error(paths.join('\n'))
  console.error('Keep asset URLs and checksums in assets/artwork-manifest.json. Media deletions are allowed.')
  process.exitCode = 1
}
