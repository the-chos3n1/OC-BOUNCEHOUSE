# OC Bounce Co. — marketing & booking shell

Next.js (App Router) site with a data-driven layout: edit `src/content/site.ts` for copy, inventory, zones, and nav.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy `.env.example` to `.env.local`. Stripe is optional for this scaffold; see `src/lib/stripe.ts` and the booking page banner.

## Project structure

- `src/content/site.ts` — single source of truth for marketing data
- `src/components/layout/` — header & footer
- `src/components/sections/` — reusable page sections
- `src/actions/leads.ts` — `submitLead` stub for CRM / email / Zapier
- `src/lib/stripe.ts` — Stripe integration notes and demo flag

