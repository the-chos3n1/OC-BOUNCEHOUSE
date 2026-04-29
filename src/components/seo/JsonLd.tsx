import { siteConfig, zones } from "@/content/site";
import { getSiteUrl } from "@/lib/seo";

/**
 * Single LocalBusiness graph for sitewide structured data — avoid injecting duplicates per page.
 */
export function LocalBusinessJsonLd() {
  const url = getSiteUrl();
  const cityNames = [...new Set(zones.flatMap((z) => z.cities))];

  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${url}/#business`,
    name: siteConfig.name,
    description: siteConfig.tagline,
    url: url.endsWith("/") ? `${url}` : `${url}/`,
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Orange County, California",
      },
      ...cityNames.map((name) => ({
        "@type": "City",
        name,
        containedInPlace: { "@type": "State", name: "California" },
      })),
    ],
    ...(siteConfig.contact.email && !siteConfig.contact.email.includes("example")
      ? { email: siteConfig.contact.email }
      : {}),
    telephone: siteConfig.contact.phone,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
