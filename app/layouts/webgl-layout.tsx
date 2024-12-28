"use client";

import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { ComponentProps, Suspense } from "react";

export default function WebGLLayout({
  children,
  canvasProps,
}: {
  children: React.ReactNode;
  canvasProps?: Omit<ComponentProps<typeof Canvas>, "children">;
}) {
  return (
    <div className="h-screen w-screen">
      <Suspense fallback={null}>
        <Canvas {...canvasProps}>{children}</Canvas>
      </Suspense>

      <Leva collapsed />
    </div>
  );
}
