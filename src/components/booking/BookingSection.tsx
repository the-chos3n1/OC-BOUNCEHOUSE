import { isStripeConfigured } from "@/lib/stripe";
import { BookingClient } from "@/components/booking/BookingClient";

type BookingSectionProps = {
  initialUnitId?: string;
};

export async function BookingSection({ initialUnitId }: BookingSectionProps) {
  const stripeDemo = !isStripeConfigured();
  return (
    <section id="book" className="scroll-mt-24 border-y border-border bg-muted/20 py-16 sm:py-20 sm:scroll-mt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <BookingClient stripeDemo={stripeDemo} initialUnitId={initialUnitId} embedded />
      </div>
    </section>
  );
}
