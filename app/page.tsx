import Image from "next/image";
import { ProjectsList } from "./components/posts"
import { Footer } from "./components/footer"
import { Badge } from "@/components/ui/badge"
 
export default function Home() {
  return (
    <div className="flex flex-col flex-1 font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-start justify-between py-32">
        <h1>Portfolio</h1>
        <div className="flex flex-col items-start gap-6 text-left">
          <h1 className=" text-3xl font-semibold leading-10 tracking-tight text-brand-ink">
            Hi, I am Xueyan Wang, Evelyn
          </h1>
          <div className="flex gap-2">
            <Badge variant={"outline"}>Java</Badge>
            <Badge variant={"outline"}>Python</Badge>
            <Badge variant={"outline"}>JavaScript</Badge>
            <Badge variant={"outline"}>Distributed System</Badge>
            <Badge variant={"outline"}>Artificial Intelligence</Badge>
          </div>


          <p className="max-w-md text-lg leading-8 text-brand-ink/70">
            <span className="text-brand-amber">Build</span> the <span className="text-brand-blue">invisible</span> <span className="text-brand-blue">currents</span> beneath <span className="text-brand-blue">modern</span> <span className="text-brand-blue">systems</span> <br />
            Where <span className="text-brand-blue">signals</span> <span className="text-brand-coral">scatter</span>, <span className="text-brand-amber">converge</span>, and endure <br />
            Between <span className="text-brand-blue">machines</span> and <span className="text-brand-blue">language</span> <br />
            <span className="text-brand-amber">Shape</span> order from <span className="text-brand-coral">blur</span> and <span className="text-brand-coral">uncertainty</span><span className="cursor-blink" />
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
