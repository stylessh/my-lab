"use client";

import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Suspense } from "react";

export default function WebGLLayout({
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
