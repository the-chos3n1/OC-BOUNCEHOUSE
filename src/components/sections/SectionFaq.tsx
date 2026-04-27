import { faqPlaceholders } from "@/content/site";

export function SectionFaq() {
  return (
    <section className="border-b border-border bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          FAQ (placeholders)
        </h2>
        <p className="mt-3 text-muted-foreground">
          Common questions — swap for finalized policies before launch.
        </p>
        <ul className="mt-10 divide-y divide-border rounded-lg border border-border bg-card">
          {faqPlaceholders.map((item) => (
            <li key={item.q} className="px-6 py-5">
              <h3 className="font-medium text-foreground">{item.q}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
