import Link from "next/link";
import { siteConfig } from "@/content/site";
import { ContactForm } from "@/components/forms/ContactForm";

export function SectionContact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 border-b border-border py-16 sm:py-20 sm:scroll-mt-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Contact</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Questions before booking? Send a note — submissions go through{" "}
          <code className="rounded bg-muted px-1 text-xs">submitLead</code> so you can wire a CRM or
          email provider when ready.
        </p>
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <ContactForm />
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm lg:sticky lg:top-28 lg:self-start">
            <h3 className="font-display text-lg font-semibold">Direct</h3>
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
            <p className="mt-6 text-xs text-muted-foreground">
              Prefer booking online? Go to{" "}
              <Link href="/#book" className="font-medium text-primary hover:underline">
                Check availability
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
