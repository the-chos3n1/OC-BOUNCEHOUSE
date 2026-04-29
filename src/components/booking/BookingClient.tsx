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
import { TimePickerField } from "@/components/ui/time-picker-field";
import { PricingBreakdown } from "@/components/sections/PricingBreakdown";

type BookingClientProps = {
  stripeDemo: boolean;
  initialUnitId?: string;
  /** When true, used inside one-page scroll — use section heading semantics */
  embedded?: boolean;
};

/**
 * Booking UI separates "availability display" from "availability truth".
 * Production needs: America/Los_Angeles timezone, buffers, same-day cutoff, holidays,
 * and a real data source (Calendar API, DB, or ops tool).
 */
export function BookingClient({ stripeDemo, initialUnitId, embedded }: BookingClientProps) {
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
        {embedded ? (
          <h2
            id="book-heading"
            className="font-display text-4xl font-bold tracking-tight scroll-mt-24 sm:scroll-mt-28"
          >
            Book a bounce house
          </h2>
        ) : (
          <h1 className="font-display text-4xl font-bold tracking-tight">Book a bounce house</h1>
        )}
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
            <CardHeader className="flex flex-row items-start gap-3 space-y-0 pb-4">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <div className="min-w-0">
                <CardTitle className="text-base">Payments (design phase)</CardTitle>
                <CardDescription className="mt-1.5 text-pretty">
                  {stripeDemo ? (
                    <>
                      <strong>Demo mode:</strong> no card charges. When you are ready, add{" "}
                      <code className="rounded bg-muted px-1 text-xs">STRIPE_SECRET_KEY</code>,
                      create Checkout Sessions on the server, and confirm with{" "}
                      <code className="rounded bg-muted px-1 text-xs">checkout.session.completed</code>{" "}
                      webhooks.
                    </>
                  ) : (
                    <>
                      <strong>Keys detected:</strong> this build still completes as a demo lead. Swap
                      the submit handler for a server action that creates a Checkout Session and
                      redirects to Stripe.
                    </>
                  )}
                </CardDescription>
              </div>
            </CardHeader>
          </Card>

          <fieldset className="space-y-5 rounded-lg border border-border bg-card/60 p-4 shadow-sm sm:p-5">
            <legend className="px-1 font-display text-sm font-semibold text-foreground">
              Rental details
            </legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="unit">Bounce house</Label>
                <select
                  id="unit"
                  name="unit"
                  className="flex h-11 w-full rounded-md border border-border bg-card px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
                  className="flex h-11 w-full rounded-md border border-border bg-card px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
            </div>
          </fieldset>

          <fieldset className="space-y-5 rounded-lg border border-border bg-card/60 p-4 shadow-sm sm:p-5">
            <legend className="px-1 font-display text-sm font-semibold text-foreground">
              Event schedule
            </legend>
            <p className="-mt-1 text-xs text-muted-foreground sm:text-sm">
              Date and times help us quote — availability shown here is not live inventory until you
              connect a calendar or ops tool.
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="eventDate">Event date</Label>
                <div className="flex min-h-11 items-center gap-2 rounded-md border border-border bg-card px-3 shadow-sm focus-within:ring-2 focus-within:ring-primary">
                  <CalendarClock className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                  <Input
                    id="eventDate"
                    type="date"
                    value={eventDate}
                    onChange={(ev) => setEventDate(ev.target.value)}
                    className="min-h-10 flex-1 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
                  />
                </div>
                <p className="text-xs text-muted-foreground">{mockHint}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="startTime">Start time</Label>
                <TimePickerField
                  id="startTime"
                  value={startTime}
                  onChange={setStartTime}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End time</Label>
                <TimePickerField id="endTime" value={endTime} onChange={setEndTime} />
              </div>
            </div>
          </fieldset>

          <fieldset className="space-y-4 rounded-lg border border-border bg-card/60 p-4 shadow-sm sm:p-5">
            <legend className="px-1 font-display text-sm font-semibold text-foreground">
              Your contact info
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="customerName">Full name</Label>
                <Input
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  autoComplete="name"
                  className="h-11"
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
                  className="h-11"
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
                  className="h-11"
                />
              </div>
            </div>
          </fieldset>

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

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={pending}>
              {pending ? "Submitting…" : stripeDemo ? "Complete booking (demo)" : "Save lead (Checkout TODO)"}
            </Button>
            <Button type="button" variant="outline" size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/#rentals">Back to rentals</Link>
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
              <CardHeader className="pb-2">
                <CardTitle className="text-base">After design: calendar, CRM, Stripe</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="list-inside list-disc space-y-1.5 text-xs leading-relaxed text-muted-foreground">
                  <li>
                    <strong className="text-foreground">Calendar:</strong> America/Los_Angeles,
                    buffers, holidays, real inventory (API, DB, or ops tool) — replace mock hints in
                    this form.
                  </li>
                  <li>
                    <strong className="text-foreground">CRM:</strong> POST the same shape as{" "}
                    <code className="rounded bg-muted px-1 text-foreground">submitLead</code> (contact
                    + booking) to your webhook or vendor.
                  </li>
                  <li>
                    <strong className="text-foreground">Stripe:</strong> confirm payment via webhook
                    before promising the slot; see{" "}
                    <code className="rounded bg-muted px-1 text-foreground">src/lib/stripe.ts</code>.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}
