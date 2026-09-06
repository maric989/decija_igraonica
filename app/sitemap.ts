import type { MetadataRoute } from "next";
import { IGRE_SEO, SITE_URL } from "@/lib/seo";

const HOME_LAST_MODIFIED = "2026-09-06";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: HOME_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/o-nama`,
      lastModified: "2026-09-04",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...IGRE_SEO.map((igra) => ({
      url: `${SITE_URL}${igra.path}`,
      lastModified: igra.lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
