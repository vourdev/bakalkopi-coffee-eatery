import type { MetadataRoute } from "next";
import { GUIDES } from "@/lib/guides";
import { absoluteUrl } from "@/lib/seo";

const LATEST_GUIDE = GUIDES.map((g) => g.modified).sort().at(-1);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/menu"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/panduan"), lastModified: LATEST_GUIDE, changeFrequency: "monthly", priority: 0.8 },
    ...GUIDES.map((guide) => ({
      url: absoluteUrl(`/panduan/${guide.slug}`),
      lastModified: guide.modified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    { url: absoluteUrl("/tentang"), changeFrequency: "yearly", priority: 0.6 },
    { url: absoluteUrl("/kontak"), changeFrequency: "yearly", priority: 0.6 },
  ];
}
