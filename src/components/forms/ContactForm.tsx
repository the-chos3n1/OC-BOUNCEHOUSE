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
    <form className="space-y-6" onSubmit={onSubmit}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required autoComplete="name" placeholder="Alex Rivera" />
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
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(714) 555-0100"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="eventType">Event type</Label>
          <Input
            id="eventType"
            name="eventType"
            placeholder="Birthday, church picnic, school fair…"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="eventDate">Preferred date</Label>
          <Input id="eventDate" name="eventDate" type="date" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Address, park name, timing questions…"
          rows={5}
        />
      </div>
      <p className="text-sm text-muted-foreground">{siteConfig.contact.responseTime}</p>
      {message ? (
        <p
          role="status"
          className={message.type === "ok" ? "text-sm text-primary" : "text-sm text-red-600"}
        >
          {message.text}
        </p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
