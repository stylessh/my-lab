"use client";

import React from "react";

import { Html } from "@react-three/drei";
import { Lab } from "../lab";
import Link from "next/link";
import { cn } from "../utils";

export function InfoPanel({
  lab,
  is3d = true,
  className,
}: {
  lab: Lab | undefined;
  is3d?: boolean;
  className?: string;
}) {
  if (!lab) return null;

  const Wrapper = is3d ? GLWrapper : React.Fragment;

  return (
    <Wrapper>
      <div
        className={cn(
          "absolute left-4 bottom-4 bg-neutral-900/50 backdrop-blur-lg rounded-lg p-4",
          className
        )}
      >
        <div>
          <div className="flex items-center gap-2">
            <Link href="/" className="text-sm">
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="m6 8-4 4 4 4M2 12h20"></path>
              </svg>
              <span className="sr-only">Back</span>
            </Link>

            <h1 className="font-semibold">{lab.title}</h1>
          </div>

          {lab.description && <p>{lab.description}</p>}

          {lab.sources && (
            <ul className="mt-4">
              <li className="mb-2">sources & inspiration: </li>

              {lab.sources.map((source) => (
                <li key={source.href} className="text-sm">
                  <Link href={source.href} target="_blank">
                    {source.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

const GLWrapper = ({ children }: { children: React.ReactNode }) => {
  return <Html fullscreen>{children}</Html>;
};
