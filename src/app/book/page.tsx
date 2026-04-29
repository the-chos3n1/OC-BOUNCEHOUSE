import type { Metadata } from "next";
import { isStripeConfigured } from "@/lib/stripe";
import { BookingClient } from "@/components/booking/BookingClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/book",
  titleSegment: "Book",
  description:
    "Request bounce house availability in Orange County — pick your unit, delivery zone (North, Central, or South OC), and event time. Demo booking flow; connect live calendar and Stripe when ready.",
});

type PageProps = {
  searchParams: Promise<{ unit?: string }>;
};

export default async function BookPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const stripeDemo = !isStripeConfigured();

  return <BookingClient stripeDemo={stripeDemo} initialUnitId={params.unit} />;
}
