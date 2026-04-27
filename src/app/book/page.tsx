import { isStripeConfigured } from "@/lib/stripe";
import { BookingClient } from "@/components/booking/BookingClient";

export const metadata = {
  title: "Book",
};

type PageProps = {
  searchParams: Promise<{ unit?: string }>;
};

export default async function BookPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const stripeDemo = !isStripeConfigured();

  return <BookingClient stripeDemo={stripeDemo} initialUnitId={params.unit} />;
}
