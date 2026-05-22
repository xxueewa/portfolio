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
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-600 dark:text-neutral-100 w-[120px] tabular-nums">
                {formatDate(post.metadata.startedAt, false)}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
    )

}