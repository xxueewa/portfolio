import fs from 'fs'
import path from 'path'

type Metadata = {
  title: string
  startedAt: string
  finishedAt: string
  summary: string
  image?: string
}

function parseFrontmatter(raw: string): { metadata: Metadata; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) {
    const titleMatch = raw.match(/^#{1,3}\s+(.+)$/m)
    return {
      metadata: { title: titleMatch?.[1] ?? 'Untitled', startedAt: '', finishedAt: '', summary: '' },
      content: raw,
    }
  }
  const meta: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':')
    if (colon > 0) {
      meta[line.slice(0, colon).trim()] = line.slice(colon + 1).trim()
    }
  }
  return {
    metadata: {
      title: meta.title ?? '',
      startedAt: meta.startedAt ?? '',
      finishedAt: meta.finishedAt ?? '',
      summary: meta.summary ?? '',
      image: meta.image,
    },
    content: match[2],
  }
}

export function getProjects() {
  const assetsDir = path.join(process.cwd(), 'app/projects/assets')
  return fs
    .readdirSync(assetsDir)
    .filter((f) => f.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(assetsDir, filename), 'utf-8')
      const { metadata, content } = parseFrontmatter(raw)
      return { metadata, slug, content }
    })
}

export function getProjectBySlug(slug: string) {
  return getProjects().find((p) => p.slug === slug) ?? null
}

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  let targetDate = new Date(date)

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  let daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  let fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate} (${formattedDate})`
}