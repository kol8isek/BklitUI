"use client";

import {
  AreaSparkline,
  BarSparkline,
  LineSparkline,
} from "@/components/charts";
import { sparklineData } from "@/data/demo";

const variants = [
  { label: "Čára", kind: "line" },
  { label: "Plocha", kind: "area" },
  { label: "Sloupce", kind: "bar" },
] as const;

/** Tři podoby malého grafu bez os, vhodné do tabulek a dlaždic. */
export function SparklineRow() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {variants.map((variant) => (
        <div className="flex flex-col gap-2" key={variant.kind}>
          <span className="text-muted-foreground text-sm">{variant.label}</span>
          {variant.kind === "line" ? (
            <LineSparkline
              data={sparklineData}
              dataKey="value"
              endDot
              height={56}
            />
          ) : null}
          {variant.kind === "area" ? (
            <AreaSparkline data={sparklineData} dataKey="value" height={56} />
          ) : null}
          {variant.kind === "bar" ? (
            <BarSparkline
              barRadius={2}
              data={sparklineData}
              dataKey="value"
              height={56}
              yDomain={[0, undefined]}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}
