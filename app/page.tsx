import Link from "next/link";
import { getList } from "./lab";

export default function Home() {
  const list = getList();

  return (
    <main className="flex flex-col items-center pt-16 pb-4 min-h-screen">
      <div className="max-w-xl flex flex-col gap-y-12">
        <header className="flex flex-col gap-2">
          <h1 className="font-semibold">Welcome to Lab</h1>

          <p>
            This is a place where I'm experimenting with new ideas and
            technologies.
          </p>
        </header>

        <ul className="flex flex-col">
          {list.map((item) => (
            <li key={item.href} className="text-left">
              <Link href={item.href}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
