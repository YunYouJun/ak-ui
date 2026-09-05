import assert from 'node:assert/strict'
import { readFile, readdir, stat } from 'node:fs/promises'
import { resolve, relative, extname } from 'node:path'

const root = resolve('docs/.vitepress/dist')
const origin = 'https://ak-ui.yyj.moe'
const pages = []
async function walk(directory) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, item.name)
    if (item.isDirectory()) await walk(path)
    else if (item.name.endsWith('.html')) pages.push(path)
  }
}
await walk(root)
const contents = new Map(await Promise.all(pages.map(async path => [path, await readFile(path, 'utf8')])))
const failures = new Set()
let count = 0
for (const [page, html] of contents) {
  const base = new URL(relative(root, page), `${origin}/`)
  for (const tag of html.matchAll(/<(?:a|link|img|script|source)\b[^>]*>/gi)) {
    const attribute = tag[0].match(/\b(?:href|src)=["']([^"']+)["']/i)
    if (!attribute) continue
    const url = new URL(attribute[1].replaceAll('&amp;', '&'), base)
    if (url.origin !== origin) continue
    const path = resolve(root, `.${decodeURIComponent(url.pathname)}`)
    assert.ok(path === root || path.startsWith(`${root}/`), 'Link escaped build directory')
    const candidates = extname(path) ? [path] : [path, `${path}.html`, resolve(path, 'index.html')]
    let target
    for (const candidate of candidates) {
      if (await stat(candidate).then(info => info.isFile()).catch(() => false)) { target = candidate; break }
    }
    count++
    const context = `${relative(root, page)} → ${attribute[1]}`
    if (!target) { failures.add(context); continue }
    if (url.hash && contents.has(target)) {
      const id = decodeURIComponent(url.hash.slice(1))
      const targetHtml = contents.get(target)
      if (!targetHtml.includes(`id="${id}"`) && !targetHtml.includes(`name="${id}"`)) failures.add(`${context} (missing anchor)`)
    }
  }
}
assert.equal(failures.size, 0, `Broken built documentation links:\n${[...failures].join('\n')}`)
console.log(`Verified ${count} local links and assets across ${pages.length} built HTML pages, including anchors.`)
