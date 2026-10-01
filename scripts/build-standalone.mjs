import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const projectDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outputDirectory = path.join(projectDirectory, 'dist')
const templateOutput = path.join(outputDirectory, 'index.template.html')

function assetPath(reference) {
  const filename = path.basename(new URL(reference, 'https://standalone.invalid/').pathname)
  return path.join(outputDirectory, 'assets', filename)
}

let html = await readFile(templateOutput, 'utf8')
const scriptTag = html.match(/<script\b[^>]*\bsrc="([^"]+)"[^>]*><\/script>/)
if (!scriptTag) throw new Error('Could not find the bundled app script in the Vite output.')

const script = await readFile(assetPath(scriptTag[1]), 'utf8')
const encodedScript = Buffer.from(script).toString('base64')
const standaloneScript = `if (window.__VITE_DEV_SERVER__) {\n  import('/src/main.tsx')\n} else {\n  eval(atob('${encodedScript}'))\n}`
html = html.replace(scriptTag[0], `<script type="module">${standaloneScript}</script>`)

const stylesheetTags = [...html.matchAll(/<link\b(?=[^>]*\brel="stylesheet")(?=[^>]*\bhref="([^"]+)")[^>]*>/g)]
for (const [tag, reference] of stylesheetTags) {
  const stylesheet = await readFile(assetPath(reference), 'utf8')
  html = html.replace(tag, `<style>${stylesheet.replace(/<\/style/gi, (match) => match.replace('/', '\\/'))}</style>`)
}

await writeFile(path.join(outputDirectory, 'index.html'), html)
await writeFile(path.join(projectDirectory, 'index.html'), html)
