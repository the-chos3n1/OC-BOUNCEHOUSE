import Link from "next/link";
import { Instagram, Facebook, Mail, Phone } from "lucide-react";
import { footerColumns, siteConfig, zones } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg font-semibold">{siteConfig.name}</p>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">{siteConfig.tagline}</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-1.5 hover:text-primary"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                {siteConfig.contact.email}
              </a>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\D/g, "")}`}
                className="flex items-center gap-1.5 hover:text-primary"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden />
                {siteConfig.contact.phone}
              </a>
            </div>
            <div className="mt-4 flex gap-3">
              <a
                href={siteConfig.social.instagram}
                className="text-muted-foreground hover:text-primary"
                aria-label="Instagram (placeholder link)"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.facebook}
                className="text-muted-foreground hover:text-primary"
                aria-label="Facebook (placeholder link)"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-foreground">{col.title}</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="hover:text-primary">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-8">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Service zones
          </p>
          <ul className="mt-2 flex flex-wrap gap-2 text-sm text-muted-foreground">
            {zones.map((z) => (
              <li key={z.id}>
                <span className="rounded-full bg-background px-2 py-0.5 ring-1 ring-border">
                  {z.shortLabel}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. Placeholder site — policies and entity
            details TBD.
          </p>
        </div>
      </div>
    </footer>
  );
}
