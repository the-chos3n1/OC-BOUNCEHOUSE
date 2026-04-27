import Link from "next/link";
import { bounceHouses } from "@/content/site";
import { SectionHero } from "@/components/sections/SectionHero";
import { SectionFeatures } from "@/components/sections/SectionFeatures";
import { SectionTestimonials } from "@/components/sections/SectionTestimonials";
import { SectionFaq } from "@/components/sections/SectionFaq";
import { ProductCard } from "@/components/sections/ProductCard";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const featured = bounceHouses.filter((b) => b.featured);

  return (
    <>
      <SectionHero />
      <section className="border-b border-border py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Featured rentals
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Starter lineup below — swap placeholder photos, specs, and zone prices in one content file
            when inventory is final.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {featured.map((house) => (
              <ProductCard key={house.id} house={house} />
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/rentals">View all rentals</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/service-areas">See OC zones</Link>
            </Button>
          </div>
        </div>
      </section>
      <SectionFeatures />
      <SectionTestimonials />
      <SectionFaq />
    </>
  );
}
