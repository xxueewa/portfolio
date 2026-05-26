import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getProjectBySlug, getProjects, formatDate } from '../projects/utils'

const IMAGE_RE = /^!\[([^\]]*)\]\(([^)]+)\)$/
const HTML_IMG_RE = /<img[^>]+src="([^"]+)"[^>]*(?:alt="([^"]*)")?[^>]*\/?>/

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }))
}

function renderMarkdown(content: string) {
  return content.split('\n').map((line, i) => {
    if (line.startsWith('### ')) {
      return <h3 key={i} className="text-lg font-semibold mt-6 mb-2">{line.slice(4)}</h3>
    }
    if (line.startsWith('## ')) {
      return <h2 key={i} className="text-xl font-semibold mt-8 mb-2">{line.slice(3)}</h2>
    }
    if (line.startsWith('# ')) {
      return <h1 key={i} className="text-2xl font-bold mt-8 mb-2">{line.slice(2)}</h1>
    }
    const imgMatch = line.match(IMAGE_RE)
    if (imgMatch) {
      return (
        <div key={i} className="my-4 relative w-full">
          <Image src={imgMatch[2]} alt={imgMatch[1]} width={800} height={450} className="w-full h-auto rounded" />
        </div>
      )
    }
    const htmlImgMatch = line.match(HTML_IMG_RE)
    if (htmlImgMatch) {
      return (
        <div key={i} className="my-4 relative w-full">
          <Image src={htmlImgMatch[1]} alt={htmlImgMatch[2] ?? ''} width={800} height={450} className="w-full h-auto rounded" />
        </div>
      )
    }
    if (line.trim() === '') {
      return <br key={i} />
    }
    return <p key={i} className="text-zinc-600 dark:text-zinc-400 leading-7">{line}</p>
  })
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <section className="pb-32">
      <h1 className="font-semibold text-2xl tracking-tighter">{project.metadata.title}</h1>
      <div className="flex gap-4 mt-2 mb-8 text-sm text-zinc-500 dark:text-zinc-400">
        <span>{formatDate(project.metadata.startedAt)}</span>
        <span>—</span>
        <span>{project.metadata.finishedAt ? formatDate(project.metadata.finishedAt) : 'Present'}</span>
      </div>
      {project.metadata.summary && (
        <p className="mb-8 text-zinc-600 dark:text-zinc-400">{project.metadata.summary}</p>
      )}
      <article className="prose">
        {renderMarkdown(project.content)}
      </article>
    </section>
  )
}
