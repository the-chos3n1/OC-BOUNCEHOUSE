import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";

/** Single scrolling homepage; subsection anchors omitted from XML (same URL). */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();
  const loc = base.endsWith("/") ? `${base}` : `${base}/`;
  return [
    {
      url: loc,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
