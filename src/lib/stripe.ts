/**
 * Stripe integration (stub — design phase)
 *
 * Demo mode: when STRIPE_SECRET_KEY is unset, the booking UI shows a breakdown only
 * and "Complete booking" runs the CRM lead path (`submitLead`) without charging.
 *
 * Production path (implement after design sign-off):
 * 1. Server action: create Checkout Session (or PaymentIntent) from { unitId, zoneId, date, customer }.
 * 2. Redirect to Stripe Checkout (or confirm client-side if using Elements).
 * 3. Webhook: handle `checkout.session.completed` (or `payment_intent.succeeded`) to mark booking paid,
 *    then push the same lead fields to your CRM as the contact form.
 *
 * Do not promise a calendar slot until payment (or deposit) is confirmed via webhook.
 *
 * @see https://stripe.com/docs/webhooks
 */

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function stripeModeLabel(): "demo" | "live" {
  return isStripeConfigured() ? "live" : "demo";
}
