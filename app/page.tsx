import Image from "next/image";
import { ProjectsList } from "./components/posts"

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
            Build the invisible currents beneath modern systems <br />
            Where signals scatter, converge, and endure. <br />
            Between machines and language, <br />
            Shape order from blur and uncertainty. 
          </p>
        </div>
        <br />
        <div className="my-8">
          <ProjectsList />
        </div>
      </main>
    </div>
  );
}
