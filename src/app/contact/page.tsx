import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { ContactForm } from "@/components/forms/ContactForm";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/contact",
  titleSegment: "Contact",
  description: `Questions or custom event needs? Reach ${siteConfig.name} — we serve Orange County and reply within one business day.`,
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-display text-4xl font-bold tracking-tight">Contact</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Questions before booking? Use the form — submissions go through{" "}
        <code className="rounded bg-muted px-1 text-xs">submitLead</code> so you can wire a CRM or
        email provider once the business plan is final.
      </p>
      <div className="mt-10 grid gap-12 lg:grid-cols-2">
        <ContactForm />
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="font-display text-lg font-semibold">Direct</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">Email:</span>{" "}
              <a className="text-primary hover:underline" href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <span className="font-medium text-foreground">Phone:</span>{" "}
              <a className="text-primary hover:underline" href={`tel:${siteConfig.contact.phone.replace(/\D/g, "")}`}>
                {siteConfig.contact.phone}
              </a>
            </li>
            <li>{siteConfig.contact.responseTime}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
