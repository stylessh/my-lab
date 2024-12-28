import Entry from "./entry";
import { getLabFromList } from "../..";
import WebGLLayout from "@/app/layouts/webgl-layout";
import { Links } from "@/app/components/links";

export default async function MorphCube() {
  const lab = getLabFromList("morph-cube");

  return (
    <>
      <WebGLLayout
        canvasProps={{
          dpr: [1, 1.5],
          shadows: true,
          gl: {
            antialias: true,
          },
          camera: {
            position: [0, 0, 30],
            fov: 15,
            near: 10,
            far: 40,
          },
        }}
      >
        <Entry />
      </WebGLLayout>

      <Links lab={lab} />
    </>
  );
}
