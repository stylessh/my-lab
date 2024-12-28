import { Lab } from "./lab";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cn(...args: any[]) {
  return args.filter(Boolean).join(" ");
}

export function getGithubPath(lab: Lab) {
  return `https://github.com/stylessh/my-lab/tree/main/app/lab/(${lab.type})/${lab.id}`;
}
