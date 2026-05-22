import Link from 'next/link'
import { formatDate } from '../projects/utils'

export function ProjectsList() {
    let allProjects = [
        {
            metadata: {
                title: 'Project1',
                startedAt: 'March 30, 2026',
                finishedAt: 'Present'
            },
            slug: 'project1',
            content: ''
        },
        {
            metadata: {
                title: 'Project2',
                startedAt: 'April 10, 2026',
                finishedAt: 'Present'
            },
            slug: 'project2',
            content: ''
        },
    ]

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
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
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