import Image from "next/image";
import Link from "next/link";
import { zones } from "@/content/site";
import { ZoneCard } from "@/components/sections/ZoneCard";
import { Button } from "@/components/ui/button";

export function SectionServiceAreas() {
  return (
    <section
      id="service-areas"
      className="scroll-mt-24 border-b border-border bg-background py-16 sm:py-20 sm:scroll-mt-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Service areas
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Three Orange County zones keep travel fair. City lists are examples — refine to match your
          routing and mileage model.
        </p>

        <div className="relative mt-10 aspect-[21/9] w-full overflow-hidden rounded-lg border border-border bg-muted shadow-sm">
          <Image
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1600&h=686&fit=crop"
            alt="Aerial view of coastal Southern California hills and neighborhoods — placeholder map hero"
            fill
            className="object-cover"
            sizes="100vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
          <p className="absolute bottom-4 left-4 right-4 text-sm text-foreground">
            Replace with an embedded map, illustrated zone graphic, or static map image branded to
            your business.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {zones.map((z) => (
            <ZoneCard key={z.id} zone={z} />
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-border bg-muted/40 p-6">
          <p className="font-medium text-foreground">Not sure which zone you are in?</p>
          <p className="mt-2 text-sm text-muted-foreground">
            During booking we will confirm your address — scroll to the booking form anytime.
          </p>
          <Button asChild className="mt-4">
            <Link href="/#book">Start a booking</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
