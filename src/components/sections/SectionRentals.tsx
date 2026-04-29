import Link from "next/link";
import { bounceHouses } from "@/content/site";
import { ProductCard } from "@/components/sections/ProductCard";
import { Button } from "@/components/ui/button";

export function SectionRentals() {
  return (
    <section
      id="rentals"
      className="scroll-mt-24 border-b border-border py-16 sm:py-20 sm:scroll-mt-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Rentals
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Every unit pulls pricing from the same zone table used below — pick a bounce house,
          confirm your OC zone at booking time.
        </p>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {bounceHouses.map((house) => (
            <ProductCard key={house.id} house={house} />
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/#service-areas">Delivery zones</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/#contact">Questions? Contact</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
