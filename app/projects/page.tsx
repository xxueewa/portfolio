import { ProjectsList } from '../components/posts'
import { Footer } from '../components/footer'

export const metadata = {
  title: 'Project Posts',
  description: 'Side Projects',
}

export default function Page() {
  return (
    <div className="flex flex-col flex-1 font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-start justify-between py-32">
        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-brand-ink">
            Project Posts
        </h1>
        <br />
        <div className="my-8">
          <ProjectsList />
        </div>
        <Footer />
      </main>
    </div>
  )
}