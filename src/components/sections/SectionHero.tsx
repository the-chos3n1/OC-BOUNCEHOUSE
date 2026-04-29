import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";

export function SectionHero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-muted/50 to-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-primary">
            Orange County · Delivered &amp; setup
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-balance text-foreground sm:text-5xl">
            Bounce houses for birthdays, churches, and parties that show up on time.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">{siteConfig.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href={siteConfig.bookCta.href}>{siteConfig.bookCta.label}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/#rentals">Browse rentals</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Pricing varies by OC zone — jump to{" "}
            <Link href="/#service-areas" className="font-medium text-primary hover:underline">
              service areas
            </Link>{" "}
            below.
          </p>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border bg-muted shadow-lg lg:aspect-square">
          <Image
            src="https://images.unsplash.com/photo-1505377059067-e8593a664830?w=1200&h=900&fit=crop"
            alt="Outdoor birthday party with balloons and sunshine"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
