import Link from "next/link";
import { Lab } from "../lab";
import { ArrowLeftIcon } from "./icons";
import { getGithubPath } from "../utils";

export function Links({ lab }: { lab?: Lab }) {
  if (!lab) return null;

  return (
    <div className="absolute top-4 left-4 flex items-center gap-4">
      <Link
        href="/"
        className="text-sm mix-blend-difference text-white mt-0.5"
        aria-label="go back"
      >
        <ArrowLeftIcon className="size-5" />
      </Link>

      <Link
        href={getGithubPath(lab)}
        target="_blank"
        className="text-sm mix-blend-difference text-white"
        aria-label="source code"
      >
        source code
      </Link>
    </div>
  );
}
