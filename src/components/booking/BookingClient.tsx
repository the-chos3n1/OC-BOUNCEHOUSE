"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { CalendarClock, Info } from "lucide-react";
import {
  bounceHouses,
  zones,
  type ZoneId,
} from "@/content/site";
import { submitLead } from "@/actions/leads";
import { getBounceHouseById } from "@/lib/pricing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PricingBreakdown } from "@/components/sections/PricingBreakdown";

type BookingClientProps = {
  stripeDemo: boolean;
  initialUnitId?: string;
};

/**
 * Booking UI separates "availability display" from "availability truth".
 * Production needs: America/Los_Angeles timezone, buffers, same-day cutoff, holidays,
 * and a real data source (Calendar API, DB, or ops tool).
 */
export function BookingClient({ stripeDemo, initialUnitId }: BookingClientProps) {
  const defaultZone = zones[1]?.id ?? "central_oc";
  const defaultUnit =
    (initialUnitId && getBounceHouseById(initialUnitId)?.id) ||
    bounceHouses[0]?.id ||
    "";

  const [zoneId, setZoneId] = useState<ZoneId>(defaultZone);
  const [unitId, setUnitId] = useState(defaultUnit);
  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("16:00");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [status, setStatus] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  const selectedUnit = useMemo(() => getBounceHouseById(unitId), [unitId]);
  const selectedZone = useMemo(() => zones.find((z) => z.id === zoneId), [zoneId]);

  const mockHint = useMemo(() => {
    if (!eventDate) return "Pick a date to see a sample availability note (not real inventory).";
    const d = new Date(`${eventDate}T12:00:00`);
    const day = d.getDay();
    if (day === 0 || day === 6) return "Weekends fill fast — this is demo text only; confirm with us after submit.";
    return "Weekday windows often have flexibility — demo placeholder.";
  }, [eventDate]);

  function onCompleteDemo(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedUnit || !selectedZone) return;
    setStatus(null);
    startTransition(async () => {
      const result = await submitLead({
        source: "booking_demo",
        name: customerName,
        email: customerEmail,
        phone: customerPhone || undefined,
        zoneId,
        unitId,
        eventDate: eventDate || undefined,
        startTime: eventDate ? `${eventDate}T${startTime}:00` : undefined,
        endTime: eventDate ? `${eventDate}T${endTime}:00` : undefined,
        message: `Demo booking request. Stripe mode: ${stripeDemo ? "demo (no charge)" : "key present — still stub until Checkout wired)"}.`,
      });
      if (result.ok) {
        setStatus({
          type: "ok",
          text: stripeDemo
            ? "Demo booking captured — no payment taken. Connect Stripe Checkout + webhooks when ready."
            : "Lead captured — STRIPE_SECRET_KEY is set but Checkout isn’t wired in this scaffold; use webhooks after implementing server-side sessions.",
        });
      } else {
        setStatus({ type: "err", text: result.error });
      }
    });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="font-display text-4xl font-bold tracking-tight">Book a bounce house</h1>
        <p className="mt-3 text-muted-foreground">
          Choose your zone, unit, and event window. Calendar hints are placeholders until you connect
          real availability.
        </p>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-5 lg:gap-12">
        <form
          className="space-y-8 lg:col-span-3"
          onSubmit={onCompleteDemo}
          aria-describedby="stripe-mode-banner"
        >
          <Card id="stripe-mode-banner">
            <CardHeader className="flex flex-row items-start gap-3 space-y-0">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <div>
                <CardTitle className="text-base">Stripe status</CardTitle>
                <CardDescription>
                  {stripeDemo ? (
                    <>
                      <strong>Demo mode:</strong> no charges. Add{" "}
                      <code className="rounded bg-muted px-1 text-xs">STRIPE_SECRET_KEY</code> when
                      you are ready to implement Checkout Sessions server-side, then confirm with{" "}
                      <code className="rounded bg-muted px-1 text-xs">checkout.session.completed</code>{" "}
                      webhooks.
                    </>
                  ) : (
                    <>
                      <strong>Keys detected:</strong> this repo still uses a demo completion path.
                      Replace the submit handler with a server action that creates a Checkout Session
                      and redirects to Stripe.
                    </>
                  )}
                </CardDescription>
              </div>
            </CardHeader>
          </Card>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="unit">Bounce house</Label>
              <select
                id="unit"
                name="unit"
                className="flex h-10 w-full rounded-md border border-border bg-card px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                value={unitId}
                onChange={(ev) => setUnitId(ev.target.value)}
              >
                {bounceHouses.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="zone">Delivery zone</Label>
              <select
                id="zone"
                name="zone"
                className="flex h-10 w-full rounded-md border border-border bg-card px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                value={zoneId}
                onChange={(ev) => setZoneId(ev.target.value as ZoneId)}
              >
                {zones.map((z) => (
                  <option key={z.id} value={z.id}>
                    {z.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="eventDate">Event date</Label>
              <div className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                <Input
                  id="eventDate"
                  type="date"
                  value={eventDate}
                  onChange={(ev) => setEventDate(ev.target.value)}
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">{mockHint}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="startTime">Start time</Label>
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(ev) => setStartTime(ev.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End time</Label>
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(ev) => setEndTime(ev.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4 border-t border-border pt-8">
            <h2 className="font-display text-lg font-semibold">Your contact info</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="customerName">Full name</Label>
                <Input
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  autoComplete="name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerEmail">Email</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerPhone">Phone</Label>
                <Input
                  id="customerPhone"
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  autoComplete="tel"
                />
              </div>
            </div>
          </div>

          {status ? (
            <p
              role="status"
              className={
                status.type === "ok" ? "text-sm text-primary" : "text-sm text-red-600"
              }
            >
              {status.text}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <Button type="submit" disabled={pending}>
              {pending ? "Submitting…" : stripeDemo ? "Complete booking (demo)" : "Save lead (Checkout TODO)"}
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/rentals">Back to rentals</Link>
            </Button>
          </div>
        </form>

        <aside className="lg:col-span-2">
          <div className="sticky top-24 space-y-6">
            {selectedUnit && selectedZone ? (
              <PricingBreakdown
                zoneId={zoneId}
                unitId={unitId}
                unitName={selectedUnit.name}
                zoneLabel={selectedZone.shortLabel}
              />
            ) : null}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Production checklist</CardTitle>
                <CardDescription className="text-xs leading-relaxed">
                  Timezone: America/Los_Angeles. Enforce minimum setup/strike buffers. Block
                  holidays in data. Use Stripe webhooks to confirm payment before promising the
                  slot. Push the same lead payload to your CRM as the contact form.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}
