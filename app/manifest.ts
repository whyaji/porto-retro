import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Wahyu Patriaji — Full-Stack & Mobile Software Engineer",
    short_name: "PatriaLabs",
    description:
      "Professional portfolio of Wahyu Patriaji — Full-Stack & Mobile Software Engineer.",
    start_url: "/",
    display: "standalone",
    background_color: "#EBEDE3",
    theme_color: "#0B1849",
    lang: "en",
    icons: [
      {
        src: "/icon64.png",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "/icon256.png",
        sizes: "256x256",
        type: "image/png",
      },
    ],
  };
}
