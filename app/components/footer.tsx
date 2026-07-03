import Link from 'next/link'

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function Footer({ githubHref }: { githubHref?: string }) {
  return (
    <footer className="mt-16 mb-16">
      <ul className="font-sm mt-8 flex flex-col text-brand-ink/60 md:flex-row md:space-x-4 md:space-y-0">
        <li>
          <a
            className="flex items-center transition-all hover:text-brand-ink"
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/xueyan-ww/"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">linkedin</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-brand-ink"
            rel="noopener noreferrer"
            target="_blank"
            href={githubHref ?? "https://github.com/xxueewa"}
          >
            <ArrowIcon />
            <p className="ml-2 h-7">github</p>
          </a>
        </li>
        <li>
          <Link
            className="flex items-center transition-all hover:text-brand-ink"
            href="/projects"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">posts</p>
          </Link>
        </li>
      </ul>
      <p className="mt-8 text-brand-ink/60">
        &copy; {new Date().getFullYear()} MIT Licensed
      </p>
    </footer>
  )
}