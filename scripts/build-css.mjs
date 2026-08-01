import { mkdir, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import process from 'node:process'

import autoprefixer from 'autoprefixer'
import CleanCSS from 'clean-css'
import postcss from 'postcss'
import { compile } from 'sass'

const projectRoot = process.cwd()
const entry = resolve(projectRoot, 'src/scss/ak-ui.scss')
const outputDirectory = resolve(projectRoot, 'dist')
const outputFile = resolve(outputDirectory, 'ak-ui.css')
const minifiedOutputFile = resolve(outputDirectory, 'ak-ui.min.css')

await rm(outputDirectory, { recursive: true, force: true })
await mkdir(outputDirectory, { recursive: true })

const compiled = compile(entry, {
  loadPaths: [resolve(projectRoot, 'src/scss')],
  style: 'expanded',
})

const processed = await postcss([autoprefixer]).process(compiled.css, {
  from: entry,
  to: outputFile,
})

const minified = new CleanCSS({ level: 2 }).minify(processed.css)

if (minified.errors.length > 0) {
  throw new Error(minified.errors.join('\n'))
}

await Promise.all([
  writeFile(outputFile, `${processed.css.trim()}\n`),
  writeFile(minifiedOutputFile, `${minified.styles}\n`),
])

const size = Buffer.byteLength(minified.styles)
console.log(`Built dist/ak-ui.css and dist/ak-ui.min.css (${size} B minified)`)
