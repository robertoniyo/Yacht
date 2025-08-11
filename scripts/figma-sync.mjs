// Minimal Figma color style sync → writes CSS variables to src/app/figma-tokens.css
// Usage: FIGMA_TOKEN=... FIGMA_FILE_KEY=... npm run figma:sync

import fs from 'node:fs'
import path from 'node:path'

const projectRoot = process.cwd()
const envPath = path.join(projectRoot, '.env.local')

function applyDotenvIfPresent() {
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/)
    for (const line of lines) {
      if (!line || line.trim().startsWith('#') || !line.includes('=')) continue
      const idx = line.indexOf('=')
      const key = line.slice(0, idx).trim()
      const val = line.slice(idx + 1).trim().replace(/^"|"$/g, '')
      if (!(key in process.env)) process.env[key] = val
    }
  }
}

applyDotenvIfPresent()

const FIGMA_TOKEN = process.env.FIGMA_TOKEN
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY

if (!FIGMA_TOKEN || !FIGMA_FILE_KEY) {
  console.log('[figma-sync] FIGMA_TOKEN and FIGMA_FILE_KEY are required. Skipping.')
  process.exit(0)
}

const headers = { 'X-Figma-Token': FIGMA_TOKEN }

async function fetchJson(url) {
  const res = await fetch(url, { headers })
  if (!res.ok) throw new Error(`Request failed ${res.status}: ${url}`)
  return res.json()
}

function rgbFloatTo255({ r, g, b }) {
  const to255 = (v) => Math.round(Math.max(0, Math.min(1, v)) * 255)
  return `${to255(r)} ${to255(g)} ${to255(b)}`
}

function kebabCase(name) {
  return name
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-zA-Z0-9\-]/g, '')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()
}

function collectNodeIdsByType(styles, type) {
  return Object.entries(styles)
    .filter(([, s]) => s.styleType === type)
    .map(([, s]) => s.node_id)
}

function chunk(arr, size) {
  const out = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

function extractSolidFill(node) {
  // Walk the node tree to find any fills with SOLID color
  const queue = [node]
  while (queue.length) {
    const cur = queue.shift()
    if (cur && cur.fills && Array.isArray(cur.fills)) {
      const solid = cur.fills.find((p) => p.type === 'SOLID' && p.color)
      if (solid) return rgbFloatTo255(solid.color)
    }
    if (cur && cur.children) queue.push(...cur.children)
  }
  return null
}

function nameFromStyle(style) {
  // Prefer slash-based hierarchy to scope design tokens, e.g. Brand/Primary
  return style.name
}

async function main() {
  console.log('[figma-sync] Fetching file…')
  const file = await fetchJson(`https://api.figma.com/v1/files/${FIGMA_FILE_KEY}`)
  const styles = file.styles || {}

  const fillIds = collectNodeIdsByType(styles, 'FILL')
  if (fillIds.length === 0) {
    console.log('[figma-sync] No FILL styles found. Nothing to sync.')
    return
  }

  console.log(`[figma-sync] Found ${fillIds.length} color styles. Fetching nodes…`)
  const colorMap = new Map() // tokenName -> rgb string

  for (const batch of chunk(fillIds, 45)) {
    const idsParam = encodeURIComponent(batch.join(','))
    const nodesResp = await fetchJson(`https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/nodes?ids=${idsParam}`)
    for (const id of batch) {
      const meta = styles[Object.keys(styles).find((k) => styles[k].node_id === id)]
      if (!nodesResp.nodes || !nodesResp.nodes[id] || !meta) continue
      const doc = nodesResp.nodes[id].document
      const rgb = extractSolidFill(doc)
      if (!rgb) continue
      const rawName = nameFromStyle(meta)
      const token = kebabCase(rawName)
      colorMap.set(token, rgb)
    }
  }

  if (colorMap.size === 0) {
    console.log('[figma-sync] No solid color fills discovered. Nothing to write.')
    return
  }

  const lines = []
  lines.push(':root {')
  for (const [token, rgb] of colorMap) {
    lines.push(`  --figma-${token}: ${rgb};`)
  }
  lines.push('}')

  const outDir = path.join(projectRoot, 'src', 'app')
  const outFile = path.join(outDir, 'figma-tokens.css')
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(outFile, lines.join('\n') + '\n', 'utf8')
  console.log(`[figma-sync] Wrote ${colorMap.size} tokens to ${path.relative(projectRoot, outFile)}`)
}

main().catch((err) => {
  console.error('[figma-sync] Error:', err)
  process.exit(1)
})


