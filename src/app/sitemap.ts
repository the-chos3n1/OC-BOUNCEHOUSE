import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";

const paths = [
  "",
  "/rentals",
  "/book",
  "/contact",
  "/how-it-works",
  "/service-areas",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  return paths.map((path) => {
    const loc = path === "" ? `${base}/` : `${base}${path}`;
    const priority =
      path === ""
        ? 1
        : path === "/rentals" || path === "/book"
          ? 0.9
          : path === "/contact" || path === "/service-areas"
            ? 0.8
            : 0.7;
    const changeFreq: MetadataRoute.Sitemap[0]["changeFrequency"] =
      path === "" || path === "/rentals"
        ? "weekly"
        : path === "/book"
          ? "daily"
          : "monthly";
    return {
      url: loc,
      lastModified: now,
      changeFrequency: changeFreq,
      priority,
    };
  });
}
