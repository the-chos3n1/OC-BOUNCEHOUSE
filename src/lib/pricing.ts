import type { BounceHouse, ZoneId } from "@/content/site";
import { bounceHouses } from "@/content/site";

/** Tax placeholder — replace with real rate / AvaTax / Stripe Tax when live. */
export const PLACEHOLDER_TAX_RATE = 0.0775;

export function getBounceHouseById(id: string): BounceHouse | undefined {
  return bounceHouses.find((b) => b.id === id);
}

export function getRentalSubtotal(zoneId: ZoneId, unitId: string): number {
  const unit = getBounceHouseById(unitId);
  if (!unit) return 0;
  return unit.priceByZone[zoneId];
}

export function getEstimatedTax(subtotal: number): number {
  return Math.round(subtotal * PLACEHOLDER_TAX_RATE * 100) / 100;
}

export function getTotals(zoneId: ZoneId, unitId: string) {
  const subtotal = getRentalSubtotal(zoneId, unitId);
  const estimatedTax = getEstimatedTax(subtotal);
  const total = Math.round((subtotal + estimatedTax) * 100) / 100;
  return { subtotal, estimatedTax, total };
}
