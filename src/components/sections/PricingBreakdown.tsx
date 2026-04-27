import type { ZoneId } from "@/content/site";
import { getTotals } from "@/lib/pricing";

type PricingBreakdownProps = {
  zoneId: ZoneId;
  unitId: string;
  unitName: string;
  zoneLabel: string;
};

export function PricingBreakdown({
  zoneId,
  unitId,
  unitName,
  zoneLabel,
}: PricingBreakdownProps) {
  const { subtotal, estimatedTax, total } = getTotals(zoneId, unitId);

  if (!unitId || subtotal <= 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-muted/30 p-4 text-sm text-muted-foreground">
        Select a bounce house and zone to see an estimate.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <p className="text-sm font-medium text-foreground">Estimate</p>
      <p className="mt-1 text-xs text-muted-foreground">
        {unitName} · {zoneLabel}. Tax is a placeholder rate for layout only.
      </p>
      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Rental subtotal</dt>
          <dd className="font-medium">${subtotal.toFixed(2)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Est. tax (placeholder)</dt>
          <dd className="font-medium">${estimatedTax.toFixed(2)}</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-border pt-2 text-base font-semibold">
          <dt>Total due (preview)</dt>
          <dd>${total.toFixed(2)}</dd>
        </div>
      </dl>
    </div>
  );
}
