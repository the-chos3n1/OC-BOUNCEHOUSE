import { bounceHouses } from "@/content/site";
import { ProductCard } from "@/components/sections/ProductCard";

export const metadata = {
  title: "Rentals",
};

export default function RentalsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-display text-4xl font-bold tracking-tight">Rentals</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Every unit pulls pricing from the same zone table used on the booking page — no duplicated
        numbers.
      </p>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {bounceHouses.map((house) => (
          <ProductCard key={house.id} house={house} />
        ))}
      </div>
    </div>
  );
}
