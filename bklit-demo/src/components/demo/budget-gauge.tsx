"use client";

import { Gauge } from "@/components/charts";
import { budget, formatCompact } from "@/data/demo";

const percent = Math.round((budget.spent / budget.total) * 100);

/** Jeden poměr proti limitu: čerpání ročního rozpočtu. */
export function BudgetGauge() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-full max-w-[320px]">
        <Gauge
          activeFill="var(--chart-1)"
          centerValue={percent}
          defaultLabel="vyčerpáno"
          suffix=" %"
          totalNotches={40}
          value={percent}
        />
      </div>
      <p className="text-center text-muted-foreground text-sm">
        <span className="font-medium text-foreground">
          {formatCompact(budget.spent)} Kč
        </span>{" "}
        z {formatCompact(budget.total)} Kč, zbývá{" "}
        {formatCompact(budget.total - budget.spent)} Kč
      </p>
    </div>
  );
}
