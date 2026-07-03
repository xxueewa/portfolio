import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getProjectBySlug, getProjects, formatDate } from '../projects/utils'
import { Footer } from '../components/footer'
import katex from 'katex'

const IMAGE_RE = /^!\[([^\]]*)\]\(([^)]+)\)$/
const HTML_IMG_RE = /<img[^>]+src="([^"]+)"[^>]*(?:alt="([^"]*)")?[^>]*\/?>/
const BLOCK_MATH_RE = /^\$\$(.+)\$\$$/
const INLINE_MATH_RE = /\$([^$]+)\$/g

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }))
}

function renderKatex(tex: string, displayMode: boolean): string {
  try {
    return katex.renderToString(tex, { displayMode, throwOnError: false })
  } catch {
    return tex
  }
}

function renderInline(text: string): string {
  return text
    .replace(INLINE_MATH_RE, (_, tex) => renderKatex(tex, false))
    .replace(/\*\*([^*]+)\*\*/g, '<span class="font-semibold text-brand-ink">$1</span>')
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
    const blockMathMatch = line.match(BLOCK_MATH_RE)
    if (blockMathMatch) {
      return <div key={i} className="my-4 overflow-x-auto" dangerouslySetInnerHTML={{ __html: renderKatex(blockMathMatch[1], true) }} />
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
    if (line.startsWith('Topics:')) {
      const tags = line.slice('Topics:'.length).split(',').map(t => t.trim()).filter(Boolean)
      return (
        <p key={i} className="leading-7 mb-2">
          <span className="text-brand-ink/50 mr-2">Topics:</span>
          {tags.map((tag, j) => (
            <span key={j} className="text-brand-blue mr-2">{tag}</span>
          ))}
        </p>
      )
    }
    if (line.trim() === '') {
      return <br key={i} />
    }
    return <p key={i} className="text-brand-ink leading-7" dangerouslySetInnerHTML={{ __html: renderInline(line) }} />
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
      <h1 className="font-semibold text-2xl tracking-tighter whitespace-nowrap overflow-x-auto">{project.metadata.title}</h1>
      <div className="flex gap-4 mt-2 mb-8 text-sm text-brand-ink/50 whitespace-nowrap">
        <span>{formatDate(project.metadata.startedAt)}</span>
        <span>—</span>
        <span>{project.metadata.finishedAt ? formatDate(project.metadata.finishedAt) : 'Present'}</span>
      </div>
      {project.metadata.summary && (
        <p className="mb-8 text-brand-ink">{project.metadata.summary}</p>
      )}
      <article className="prose">
        {renderMarkdown(project.content)}
      </article>
      <Footer githubHref={project.metadata.github} />
    </section>
  )
}
