"use client";

import { useState, useTransition, type FormEvent } from "react";
import { submitLead } from "@/actions/leads";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setMessage(null);
    startTransition(async () => {
      const result = await submitLead({
        source: "contact",
        name: String(fd.get("name") ?? ""),
        email: String(fd.get("email") ?? ""),
        phone: String(fd.get("phone") ?? "") || undefined,
        eventType: String(fd.get("eventType") ?? "") || undefined,
        eventDate: String(fd.get("eventDate") ?? "") || undefined,
        message: String(fd.get("message") ?? "") || undefined,
      });
      if (result.ok) {
        setMessage({
          type: "ok",
          text: "Thanks — we received your note. This demo doesn’t send email yet; wire `submitLead` to your CRM or inbox.",
        });
        e.currentTarget.reset();
      } else {
        setMessage({ type: "err", text: result.error });
      }
    });
  }

  return (
    <form className="space-y-8" onSubmit={onSubmit}>
      <fieldset className="space-y-5 rounded-lg border border-border bg-card/60 p-4 shadow-sm sm:p-5">
        <legend className="px-1 font-display text-sm font-semibold text-foreground">
          How to reach you
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              required
              autoComplete="name"
              placeholder="Alex Rivera"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="h-11"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="(714) 555-0100"
              className="h-11 sm:max-w-md"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-5 rounded-lg border border-border bg-card/60 p-4 shadow-sm sm:p-5">
        <legend className="px-1 font-display text-sm font-semibold text-foreground">
          About your event
        </legend>
        <p className="-mt-1 text-xs text-muted-foreground sm:text-sm">
          Birthdays, church gatherings, school events — a few details help us respond with the right
          unit and zone.
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="eventType">Event type</Label>
            <Input
              id="eventType"
              name="eventType"
              placeholder="Birthday, church picnic, school fair…"
              className="h-11"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="eventDate">Preferred date</Label>
            <Input id="eventDate" name="eventDate" type="date" className="h-11 sm:max-w-xs" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Venue address, park name, gate codes, timing questions…"
            rows={5}
            className="min-h-[7.5rem] resize-y"
          />
        </div>
      </fieldset>

      <div className="flex flex-col gap-4 border-t border-border pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">{siteConfig.contact.responseTime}</p>
        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={pending}>
          {pending ? "Sending…" : "Send message"}
        </Button>
      </div>
      {message ? (
        <p
          role="status"
          className={
            message.type === "ok"
              ? "text-sm text-primary sm:-mt-2"
              : "text-sm text-red-600 sm:-mt-2"
          }
        >
          {message.text}
        </p>
      ) : null}
    </form>
  );
}
