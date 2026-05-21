import Image from "next/image";

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
            I build the invisible currents beneath modern systems <br />
            where signals scatter, converge, and endure. <br />
            Between machines and language, <br />
            I shape order from blur and uncertainty. <br />
            To me, code is art.
          </p>
    
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <></>
        </div>
      </main>
    </div>
  );
}
