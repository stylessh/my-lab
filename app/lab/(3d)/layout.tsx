"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Leva } from "leva";

export default function CanvasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen">
      <Suspense fallback={null}>
        <Canvas>{children}</Canvas>
      </Suspense>

      <Leva collapsed />
    </div>
  );
}
