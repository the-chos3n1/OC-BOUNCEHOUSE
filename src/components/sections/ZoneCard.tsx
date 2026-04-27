import type { Zone, ZoneId } from "@/content/site";

const zoneStripe: Record<ZoneId, string> = {
  north_oc: "bg-zone-north",
  central_oc: "bg-zone-central",
  south_oc: "bg-zone-south",
};

export function ZoneCard({ zone }: { zone: Zone }) {
  return (
    <article className="relative overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <div className={`h-1 w-full ${zoneStripe[zone.id]}`} aria-hidden />
      <div className="p-6">
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
      </div>
    </article>
  );
}
