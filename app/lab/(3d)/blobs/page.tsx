import Entry from "./entry";
import { InfoPanel } from "@/app/components/info-panel";
import { getLabFromList } from "../..";

export default async function Blobs() {
  const lab = getLabFromList("blobs");

  return (
    <>
      <Entry />

      <InfoPanel lab={lab} />
    </>
  );
}
