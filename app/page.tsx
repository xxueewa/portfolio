import Image from "next/image";
import { ProjectsList } from "./components/posts"
import { Footer } from "./components/footer"

export default function Home() {
  return (
    <div className="flex flex-col flex-1 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-start justify-between py-32">
        <h1>Xueyan Wang [Evelyn]</h1>
        <div className="flex flex-col items-start gap-6 text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            My Portfolio
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            <span className="text-yellow-400 dark:text-yellow-300">Build</span> the <span className="text-violet-500 dark:text-violet-400">invisible</span> <span className="text-teal-500 dark:text-teal-300">currents</span> beneath <span className="text-violet-500 dark:text-violet-400">modern</span> <span className="text-teal-500 dark:text-teal-300">systems</span> <br />
            Where <span className="text-teal-500 dark:text-teal-300">signals</span> <span className="text-red-500 dark:text-red-400">scatter</span>, <span className="text-yellow-400 dark:text-yellow-300">converge</span>, and endure <br />
            Between <span className="text-teal-500 dark:text-teal-300">machines</span> and <span className="text-violet-500 dark:text-violet-400">language</span> <br />
            <span className="text-yellow-400 dark:text-yellow-300">Shape</span> order from <span className="text-red-500 dark:text-red-400">blur</span> and <span className="text-red-500 dark:text-red-400">uncertainty</span><span className="cursor-blink" />
          </p>
        </div>
        <br />
        <div className="my-8">
          <ProjectsList />
        </div>
        <Footer />
      </main>
    </div>
  );
}
