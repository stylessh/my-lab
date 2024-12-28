import Link from "next/link";
import { getList } from "./(lab)";
import { Thumbnail } from "./components/thumb";

export default function Home() {
  const list = getList();

  return (
    <main className="pt-10 pb-4 min-h-screen gap-y-16 mx-auto max-w-[90%] sm:container">
      <header className="mb-16">
        <h1 className="font-display text-5xl md:text-7xl font-bold">the lab</h1>
        <p className="mt-4">
          webgl, motion & shaders — by{" "}
          <Link href="https://stylessh.dev">@stylessh</Link>
        </p>
      </header>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
        {list.map((item) => (
          <Link href={item.href} key={item.href}>
            <Thumbnail lab={item} delay={getRandomDelay()} />
          </Link>
        ))}
      </div>
    </main>
  );
}

// get random delay between 0.01 and 0.1
const getRandomDelay = () => Math.random() * 0.1 + 0.01;
