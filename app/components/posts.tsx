import Link from 'next/link'
import { getProjects, formatDate } from '../projects/utils'

export function ProjectsList() {
    let allProjects = getProjects()

    return (
    <div>
      {allProjects
        .sort((a, b) => {
          if (
            new Date(a.metadata.startedAt) > new Date(b.metadata.startedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row md:space-x-2">
              <p className="text-brand-ink/60 w-[140px] shrink-0 tabular-nums">
                {formatDate(post.metadata.startedAt, false)}
              </p>
              <p className="text-brand-ink tracking-tight flex-1">
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
    )

}