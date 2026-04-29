# OC Bounce Co. — marketing & booking shell

Next.js (App Router) site with a data-driven layout: edit `src/content/site.ts` for copy, inventory, zones, and nav.

Marketing is a **single scrolling page** on `/` (hero through contact). Header/footer links use anchors such as `/#book` and `/#rentals`. Paths like `/contact` redirect to the same page with the right hash (`src/middleware.ts`).
## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy `.env.example` to `.env.local`. Stripe is optional for this scaffold; see `src/lib/stripe.ts` and the booking page banner.

## After design: calendar, CRM, Stripe

The booking page uses **placeholder** availability hints, not a live calendar. Production work typically includes: `America/Los_Angeles` timezone, setup/strike buffers, holiday blocks, and a real data source (database, calendar API, or internal tool).

**CRM / leads:** Contact and booking flows both call `submitLead` in `src/actions/leads.ts`. Keep the `LeadPayload` shape stable, then POST to your webhook (Zapier, Make) or email provider from that action.

**Stripe:** See `src/lib/stripe.ts`. Implement Checkout Sessions (or Payment Intents) on the server, redirect the customer, and confirm with `checkout.session.completed` (or equivalent) webhooks before promising a slot.

## Project structure

- `src/content/site.ts` — single source of truth for marketing data
- `src/components/layout/` — header & footer
- `src/components/sections/` — reusable page sections
- `src/actions/leads.ts` — `submitLead` stub for CRM / email / Zapier
- `src/lib/stripe.ts` — Stripe integration notes and demo flag

