import Image from "next/image";
import Link from "next/link";
import type { BounceHouse, ZoneId } from "@/content/site";
import { zones } from "@/content/site";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ProductCardProps = {
  house: BounceHouse;
  /** When set, show price for that zone; otherwise show "from" across zones */
  highlightZone?: ZoneId;
};

export function ProductCard({ house, highlightZone }: ProductCardProps) {
  const prices = zones.map((z) => house.priceByZone[z.id]);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const priceLabel = highlightZone
    ? `$${house.priceByZone[highlightZone]}`
    : `From $${min}${max !== min ? `–$${max}` : ""}`;

  return (
    <Card className="flex flex-col overflow-hidden pt-0 transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] w-full bg-muted">
        <Image
          src={house.imageUrl}
          alt={house.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 33vw"
        />
      </div>
      <CardHeader>
        <CardTitle>{house.name}</CardTitle>
        <CardDescription>{house.shortDescription}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto flex flex-1 flex-col gap-4">
        <ul className="space-y-1 text-sm text-muted-foreground">
          {house.specs.map((s) => (
            <li key={s}>· {s}</li>
          ))}
        </ul>
        <p className="font-display text-lg font-semibold text-primary">{priceLabel} / day</p>
        <p className="text-xs text-muted-foreground">
          Final total depends on zone, add-ons, and taxes — see booking preview.
        </p>
        <Button asChild variant="outline" className="w-full">
          <Link href={`/book?unit=${house.id}`}>Start booking</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
