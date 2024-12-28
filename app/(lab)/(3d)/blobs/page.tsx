import Entry from "./entry";
import { getLabFromList } from "../..";
import WebGLLayout from "@/app/layouts/webgl-layout";
import { Links } from "@/app/components/links";

export default async function Blobs() {
  const lab = getLabFromList("blobs");

  return (
    <>
      <WebGLLayout>
        <Entry />
      </WebGLLayout>

      <Links lab={lab} />
    </>
  );
}
