import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

/** Production: set NEXT_PUBLIC_SITE_URL to your canonical origin (no trailing slash). */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return raw ? raw.replace(/\/$/, "") : "http://localhost:3000";
}

/** Default search keywords — align with zones and rentals as the business finalizes messaging. */
export const siteKeywords: string[] = [
  siteConfig.name,
  "bounce house rental",
  "Orange County bounce house",
  "bounce house rental Orange County CA",
  "party inflatable rental",
  "birthday party bounce house",
  "church event bounce house",
  "school event inflatable",
  "North OC",
  "Central OC",
  "South OC",
];

export const rootOgTitle = `${siteConfig.name} · Orange County bounce house rentals`;

export const rootOgDescription = siteConfig.tagline;

export type SeoPath = "/";

/**
 * Single-page layout: only `/` accepts metadata; paths like `/#rentals` are in-page anchors.
 */
export function buildPageMetadata(args: {
  path: SeoPath;
  description: string;
  titleSegment?: string;
}): Metadata {
  const base = getSiteUrl();
  const url = args.path === "/" ? `${base}/` : `${base}${args.path}`;

  const ogTitle = args.titleSegment
    ? `${args.titleSegment} · ${siteConfig.name}`
    : rootOgTitle;

  return {
    ...(args.titleSegment ? { title: args.titleSegment } : {}),
    description: args.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: siteConfig.name,
      title: ogTitle,
      description: args.description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: args.description,
    },
  };
}
