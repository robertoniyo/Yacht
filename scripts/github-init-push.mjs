// Create a GitHub repo and push current workspace files using Git Data API (no local git needed)
// Usage (PowerShell):
//   $env:GH_TOKEN = 'YOUR_PAT'
//   node scripts/github-init-push.mjs robertoniyo Yacht "Initial commit" "Robert Oniyo" "robertoniyo@gmail.com"

import fs from 'node:fs'
import path from 'node:path'

const [owner, repoName, commitMessage, authorName, authorEmail] = process.argv.slice(2)

if (!process.env.GH_TOKEN) {
  console.error('Missing GH_TOKEN environment variable')
  process.exit(1)
}
if (!owner || !repoName) {
  console.error('Usage: node scripts/github-init-push.mjs <owner> <repo> [message] [authorName] [authorEmail]')
  process.exit(1)
}

const token = process.env.GH_TOKEN
const message = commitMessage || 'Initial commit'
const name = authorName || 'Automation'
const email = authorEmail || 'automation@example.com'
const apiBase = 'https://api.github.com'

function github(url, init = {}) {
  return fetch(url, {
    ...init,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'yacht-uploader',
      ...(init.headers || {}),
    },
  })
}

const ignoreDirs = new Set([
  '.git', 'node_modules', '.next', '.turbo', '.vercel', 'coverage', 'dist', 'build', 'out'
])
const ignoreFiles = new Set([
  // keep .env example only
])

function isIgnored(rel) {
  if (rel.startsWith('.git/')) return true
  if (rel.startsWith('node_modules/')) return true
  if (rel.startsWith('.next/')) return true
  if (rel.startsWith('.turbo/')) return true
  if (rel.startsWith('.vercel/')) return true
  if (rel.startsWith('coverage/')) return true
  if (rel.startsWith('dist/')) return true
  if (rel.startsWith('build/')) return true
  if (rel.startsWith('out/')) return true
  if (/^\.env(\..+)?$/.test(path.basename(rel)) && path.basename(rel) !== '.env.example') return true
  return false
}

async function walk(dir, baseDir = dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    const rel = path.relative(baseDir, full).replaceAll('\\', '/')
    if (isIgnored(rel)) continue
    if (entry.isDirectory()) {
      files.push(...await walk(full, baseDir))
    } else if (entry.isFile()) {
      files.push({ full, rel })
    }
  }
  return files
}

async function ensureRepo() {
  // Create if missing
  const createRes = await github(`${apiBase}/user/repos`, {
    method: 'POST',
    body: JSON.stringify({ name: repoName, private: false, auto_init: false, description: 'Yacht landing project' }),
  })
  if (createRes.status === 201) {
    return (await createRes.json())
  }
  if (createRes.status === 422) {
    // Already exists; fetch repo
    const repoRes = await github(`${apiBase}/repos/${owner}/${repoName}`)
    if (!repoRes.ok) throw new Error(`Failed to fetch existing repo: ${repoRes.status}`)
    return repoRes.json()
  }
  const errText = await createRes.text()
  throw new Error(`Failed to create repo: ${createRes.status} ${errText}`)
}

async function createBlobs(files) {
  const results = []
  for (const f of files) {
    const content = await fs.promises.readFile(f.full)
    const res = await github(`${apiBase}/repos/${owner}/${repoName}/git/blobs`, {
      method: 'POST',
      body: JSON.stringify({ content: content.toString('base64'), encoding: 'base64' }),
    })
    if (!res.ok) throw new Error(`Blob create failed for ${f.rel}: ${res.status}`)
    const data = await res.json()
    results.push({ path: f.rel, sha: data.sha })
  }
  return results
}

async function createTree(blobRefs, baseTreeSha = undefined) {
  const tree = blobRefs.map((b) => ({ path: b.path, mode: '100644', type: 'blob', sha: b.sha }))
  const body = baseTreeSha ? { base_tree: baseTreeSha, tree } : { tree }
  const res = await github(`${apiBase}/repos/${owner}/${repoName}/git/trees`, {
    method: 'POST',
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`Tree create failed: ${res.status}`)
  return res.json()
}

async function createCommit(message, treeSha, parentShas = []) {
  const res = await github(`${apiBase}/repos/${owner}/${repoName}/git/commits`, {
    method: 'POST',
    body: JSON.stringify({ message, tree: treeSha, parents: parentShas, author: { name, email } }),
  })
  if (!res.ok) throw new Error(`Commit create failed: ${res.status}`)
  return res.json()
}

async function createOrUpdateMainRef(commitSha) {
  // Try to create first
  const create = await github(`${apiBase}/repos/${owner}/${repoName}/git/refs`, {
    method: 'POST',
    body: JSON.stringify({ ref: 'refs/heads/main', sha: commitSha })
  })
  if (create.status === 201) return
  if (create.status === 422) {
    // Update existing
    const update = await github(`${apiBase}/repos/${owner}/${repoName}/git/refs/heads/main`, {
      method: 'PATCH',
      body: JSON.stringify({ sha: commitSha, force: true })
    })
    if (!update.ok) throw new Error(`Failed to update main ref: ${update.status}`)
    return
  }
  const text = await create.text()
  throw new Error(`Failed to create main ref: ${create.status} ${text}`)
}

async function setDefaultBranchMain() {
  const res = await github(`${apiBase}/repos/${owner}/${repoName}`, {
    method: 'PATCH',
    body: JSON.stringify({ default_branch: 'main' })
  })
  if (!res.ok) {
    // Non-fatal
    console.warn('Warning: failed to set default branch to main:', res.status)
  }
}

async function run() {
  const repo = await ensureRepo()
  const cwd = process.cwd()
  const files = await walk(cwd, cwd)
  if (files.length === 0) {
    console.error('No files to upload')
    process.exit(1)
  }

  console.log(`Uploading ${files.length} files to ${owner}/${repoName} ...`)
  const blobs = await createBlobs(files)
  const tree = await createTree(blobs)
  const commit = await createCommit(message, tree.sha, [])
  await createOrUpdateMainRef(commit.sha)
  await setDefaultBranchMain()

  const httpsUrl = `https://github.com/${owner}/${repoName}`
  console.log('Done. Repository URL:', httpsUrl)
}

run().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})


