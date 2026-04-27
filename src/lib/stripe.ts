/**
 * Stripe integration (stub)
 *
 * Demo mode: when STRIPE_SECRET_KEY is unset, the booking UI shows a breakdown only
 * and "Complete booking" runs the CRM lead path without charging.
 *
 * Production path (later):
 * 1. Create Checkout Session or PaymentIntent on the server from { unitId, zoneId, date, customer }.
 * 2. Confirm payment client-side or redirect to Checkout.
 * 3. Webhook: handle checkout.session.completed (or payment_intent.succeeded) to mark booking paid
 *    and push the same payload to your CRM / Google Sheet.
 *
 * @see https://stripe.com/docs/webhooks
 */

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function stripeModeLabel(): "demo" | "live" {
  return isStripeConfigured() ? "live" : "demo";
}
