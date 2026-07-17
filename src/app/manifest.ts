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
    background_color: "#F4F7F6",
    theme_color: "#F4F7F6",
    lang: "es-CL",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
