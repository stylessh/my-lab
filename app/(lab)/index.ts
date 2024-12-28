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
    href: "/blobs",
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
  {
    id: "morph-cube",
    title: "Morph Cube",
    href: "/morph-cube",
    type: "3d",

    description: "Morphing cubes with react-three-fiber and drei.",

    sources: [
      {
        title: "Yinger Website (Inspiration)",
        href: "https://yinger.dev/",
      },
    ],

    thumbnail: "/assets/thumbs/morph-cube.png",
  },
];

export const getList = () => list.toReversed();

export const getLabFromList = (id: string) =>
  list.find((item) => item.id === id);
