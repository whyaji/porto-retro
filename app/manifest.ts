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
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
