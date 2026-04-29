"use client";

import { useMemo } from "react";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const QUARTERS = [0, 15, 30, 45] as const;
const HOURS12 = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;

function snapQuarter(h24: number, minute: number): { h24: number; minute: number } {
  let total = ((h24 % 24) + 24) % 24 * 60 + minute;
  total = Math.min(1439, Math.max(0, Math.round(total / 15) * 15));
  return { h24: Math.floor(total / 60) % 24, minute: total % 60 };
}

function parseHm(value: string): { h24: number; minute: number } | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(value?.trim() ?? "");
  if (!m) return null;
  const hh = Number(m[1]);
  const mm = Number(m[2]);
  if (!Number.isFinite(hh) || !Number.isFinite(mm)) return null;
  return snapQuarter(hh, mm);
}

function toHHMM(parsed: { h24: number; minute: number }): string {
  return `${String(parsed.h24).padStart(2, "0")}:${String(parsed.minute).padStart(2, "0")}`;
}

/** 24h clock → hour 1–12 and period for the picker rows */
function to12Parts(h24: number, minute: number) {
  const period = h24 >= 12 ? ("PM" as const) : ("AM" as const);
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return { h12, minute, period };
}

/** Picker selections → 24h time */
function from12Parts(h12: number, minute: number, period: "AM" | "PM"): { h24: number; minute: number } {
  let h24: number;
  if (period === "AM") {
    h24 = h12 === 12 ? 0 : h12;
  } else {
    h24 = h12 === 12 ? 12 : h12 + 12;
  }
  return snapQuarter(h24, minute);
}

function formatDisplay12(h24: number, minute: number): string {
  const { h12, period } = to12Parts(h24, minute);
  const mm = String(minute).padStart(2, "0");
  return `${h12}:${mm} ${period}`;
}

export type TimePickerFieldProps = {
  id?: string;
  value: string;
  onChange: (next: string) => void;
  className?: string;
  disabled?: boolean;
};

/**
 * Controlled field: value/onChange use 24-hour "HH:MM".
 * Dropdown uses site Button styles instead of native time picker chrome.
 */
export function TimePickerField({ id, value, onChange, className, disabled }: TimePickerFieldProps) {
  const parsed = useMemo(() => parseHm(value) ?? { h24: 10, minute: 0 }, [value]);
  const parts = useMemo(() => to12Parts(parsed.h24, parsed.minute), [parsed.h24, parsed.minute]);

  function apply(next: { h24: number; minute: number }) {
    onChange(toHHMM(next));
  }

  const triggerLabel = formatDisplay12(parsed.h24, parsed.minute);

  const colClass =
    "max-h-52 overflow-y-auto overscroll-contain rounded-md border border-border bg-muted/30 p-1";

  return (
    <Popover>
      <PopoverTrigger asChild disabled={disabled}>
        <button
          type="button"
          id={id}
          disabled={disabled}
          className={cn(
            "flex h-11 w-full items-center gap-2 rounded-md border border-border bg-card px-3 text-left text-sm shadow-sm outline-none ring-offset-background",
            "transition-colors hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            disabled && "cursor-not-allowed opacity-50",
            className,
          )}
          aria-haspopup="dialog"
        >
          <Clock className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
          <span className="min-w-0 flex-1 font-medium tabular-nums text-foreground">{triggerLabel}</span>
          <span className="sr-only">Open time picker</span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-auto overflow-visible border-border p-4 shadow-lg"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <div className="grid grid-cols-3 gap-3">
          <div className="min-w-[4.25rem]">
            <p className="mb-2 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Hour
            </p>
            <div className={`${colClass} flex flex-col gap-1`} role="listbox" aria-label="Hour">
              {HOURS12.map((h) => (
                <Button
                  key={h}
                  type="button"
                  variant={parts.h12 === h ? "default" : "outline"}
                  size="sm"
                  className="justify-center px-3 font-medium tabular-nums"
                  onClick={() =>
                    apply(from12Parts(h, parsed.minute, parts.period))
                  }
                >
                  {h}
                </Button>
              ))}
            </div>
          </div>
          <div className="min-w-[4.25rem]">
            <p className="mb-2 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Min
            </p>
            <div className={`${colClass} flex flex-col gap-1`} role="listbox" aria-label="Minute">
              {QUARTERS.map((m) => (
                <Button
                  key={m}
                  type="button"
                  variant={parsed.minute === m ? "default" : "outline"}
                  size="sm"
                  className="justify-center px-3 font-medium tabular-nums"
                  onClick={() => apply(from12Parts(parts.h12, m, parts.period))}
                >
                  :{String(m).padStart(2, "0")}
                </Button>
              ))}
            </div>
          </div>
          <div className="min-w-[4.25rem]">
            <p className="mb-2 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Period
            </p>
            <div className="flex flex-col gap-2 rounded-md border border-border bg-muted/30 p-2">
              {(["AM", "PM"] as const).map((period) => (
                <Button
                  key={period}
                  type="button"
                  variant={parts.period === period ? "default" : "outline"}
                  size="sm"
                  className="justify-center font-medium"
                  onClick={() => apply(from12Parts(parts.h12, parsed.minute, period))}
                >
                  {period}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
