import { mkdir, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import process from 'node:process'

import autoprefixer from 'autoprefixer'
import CleanCSS from 'clean-css'
import postcss from 'postcss'
import { compile } from 'sass'

const projectRoot = process.cwd()
const outputDirectory = resolve(projectRoot, 'dist')
const entries = [
  { input: 'src/scss/ak-ui.scss', output: 'ak-ui.css' },
  { input: 'src/scss/ak-tokens.scss', output: 'tokens.css' },
]

await rm(outputDirectory, { recursive: true, force: true })
await mkdir(outputDirectory, { recursive: true })

async function buildEntry({ input, output }) {
  const entry = resolve(projectRoot, input)
  const outputFile = resolve(outputDirectory, output)
  const minifiedOutputFile = outputFile.replace(/\.css$/, '.min.css')
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

  return `${output} (${Buffer.byteLength(minified.styles)} B minified)`
}

const results = await Promise.all(entries.map(buildEntry))
console.log(`Built ${results.join(', ')}`)
