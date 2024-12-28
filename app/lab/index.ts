export type Lab = {
  id: string;
  title: string;
  href: string;
  type: "3d" | "ui";

  description?: string;

  sources?: {
    title: string;
    href: string;
  }[];

  thumbnail?: string;
};

const list: Lab[] = [
  {
    id: "blobs",
    title: "Smooth Blobs",
    href: "/lab/blobs",
    type: "3d",

    description: "Spheres using SDF and raymarching.",

    sources: [
      {
        title: "Inigo Quilez Blog - Raymarching",
        href: "https://iquilezles.org/articles/raymarchingdf/",
      },
      {
        title: "Inigo Quilez Blog - smin",
        href: "https://iquilezles.org/articles/smin/",
      },
      {
        title: "Codrops",
        href: "https://tympanus.net/codrops/2024/07/15/how-to-create-a-liquid-raymarching-scene-using-three-js-shading-language/",
      },
      {
        title: "Broedutrecht",
        href: "https://broedutrecht.nl/",
      },
    ],

    thumbnail: "/assets/thumbs/blobs.png",
  },
];

export const getList = () => list;

export const getLabFromList = (id: string) =>
  list.find((item) => item.id === id);
