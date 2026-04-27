import { Sparkles, MapPinned, HeartHandshake } from "lucide-react";
import { featureHighlights } from "@/content/site";

const icons = [Sparkles, MapPinned, HeartHandshake];

export function SectionFeatures() {
  return (
    <section className="border-b border-border bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Why families and venues book with us
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Placeholder positioning copy — replace with your real differentiators and insurance details.
        </p>
        <ul className="mt-10 grid gap-8 md:grid-cols-3">
          {featureHighlights.map((f, i) => {
            const Icon = icons[i] ?? Sparkles;
            return (
              <li key={f.title} className="rounded-lg border border-border bg-card p-6 shadow-sm">
                <Icon className="h-8 w-8 text-primary" aria-hidden />
                <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
