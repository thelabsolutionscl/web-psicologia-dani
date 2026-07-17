import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Psicóloga y fonoaudióloga`,
    short_name: "Daniela Kaiser",
    description:
      "Evaluación y acompañamiento del neurodesarrollo, online en todo Chile.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8F2ED",
    theme_color: "#F8F2ED",
    lang: "es-CL",
    icons: [
      { src: "/icon.png", sizes: "96x96", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
