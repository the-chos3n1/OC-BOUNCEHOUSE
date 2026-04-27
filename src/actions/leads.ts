"use server";

/**
 * Single exit point for leads (contact form, demo booking completion).
 *
 * Wire-up options (choose when CRM is finalized):
 * - Zapier / Make webhook → HubSpot, Pipedrive, Go High Level
 * - Resend / SendGrid → email to owner + BCC
 * - Formspree / Getform with native CRM integration
 *
 * Keep `LeadPayload` fields stable so mapping to CRM columns stays trivial.
 */

export type LeadPayload = {
  source: "contact" | "booking_demo";
  name: string;
  email: string;
  phone?: string;
  eventType?: string;
  eventDate?: string;
  message?: string;
  zoneId?: string;
  unitId?: string;
  /** ISO strings when booking flow provides them */
  startTime?: string;
  endTime?: string;
};

export type SubmitLeadResult = { ok: true } | { ok: false; error: string };

export async function submitLead(payload: LeadPayload): Promise<SubmitLeadResult> {
  if (!payload.name?.trim() || !payload.email?.trim()) {
    return { ok: false, error: "Name and email are required." };
  }

  // Stub: in production, POST to webhook or send email. Never log PII in shared logs.
  if (process.env.NODE_ENV === "development") {
    console.info("[submitLead] stub success", {
      source: payload.source,
      hasPhone: Boolean(payload.phone),
      zoneId: payload.zoneId,
      unitId: payload.unitId,
    });
  }

  return { ok: true };
}
