import { testimonialPlaceholders } from "@/content/site";

export function SectionTestimonials() {
  return (
    <section className="border-b border-border bg-muted/30 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Kind words (placeholders)
        </h2>
        <p className="mt-3 text-muted-foreground">
          Swap these blocks for real testimonials and star ratings when you have them.
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {testimonialPlaceholders.map((t) => (
            <li
              key={t.name}
              className="rounded-lg border border-border bg-card p-6 shadow-sm"
            >
              <blockquote className="text-foreground">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-4 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{t.name}</span> · {t.context}
              </figcaption>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
