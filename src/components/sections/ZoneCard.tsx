import type { Zone } from "@/content/site";

export function ZoneCard({ zone }: { zone: Zone }) {
  return (
    <article className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <h3 className="font-display text-xl font-semibold">{zone.label}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{zone.description}</p>
      <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Example cities
      </p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {zone.cities.map((c) => (
          <li
            key={c}
            className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-foreground"
          >
            {c}
          </li>
        ))}
      </ul>
    </article>
  );
}
