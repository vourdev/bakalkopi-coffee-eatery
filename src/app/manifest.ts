import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.legalName,
    short_name: SITE.name,
    description: "Kafe & rumah makan Nusantara di Cimanggis, Depok.",
    lang: "id",
    start_url: "/",
    display: "standalone",
    background_color: "#faf6ee",
    theme_color: "#231c18",
    icons: [
      { src: "/icon.png", type: "image/png", sizes: "96x96" },
      { src: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
  };
}
