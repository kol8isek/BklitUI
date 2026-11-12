"use client";

import { useState } from "react";
import { Ring, RingChart } from "@/components/charts";
import { formatCompact, monthlyGoals } from "@/data/demo";

const rings = monthlyGoals.map((goal, index) => ({
  label: goal.label,
  value: Math.round((goal.value / goal.maxValue) * 100),
  maxValue: 100,
  color: `var(--chart-${index + 1})`,
}));

const average = Math.round(
  rings.reduce((sum, ring) => sum + ring.value, 0) / rings.length
);

/**
 * Plnění měsíčních cílů: každý kruh je jeden cíl, vedle něj přesná čísla.
 * Střed si kreslíme sami. Vestavěný `RingCenter` v klidu ukazuje součet
 * hodnot, což u procent z různých cílů nedává smysl.
 */
export function GoalRings() {
  const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered === null ? null : rings[hovered];

  return (
    <div className="@container">
      <div className="flex @md:flex-row flex-col items-center @md:justify-center gap-6">
        <div className="relative shrink-0">
          <RingChart
            baseInnerRadius={52}
            data={rings}
            hoveredIndex={hovered}
            onHoverChange={setHovered}
            ringGap={6}
            size={220}
            strokeWidth={12}
          >
            {rings.map((ring, index) => (
              <Ring index={index} key={ring.label} />
            ))}
          </RingChart>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-semibold text-2xl leading-tight">
              {active ? active.value : average} %
            </span>
            <span className="max-w-20 text-muted-foreground text-xs leading-tight">
              {active ? active.label : "Průměr cílů"}
            </span>
          </div>
        </div>

        <ul className="flex w-full max-w-xs flex-col gap-3 text-sm">
          {monthlyGoals.map((goal, index) => (
            <li className="flex items-start gap-2" key={goal.label}>
              <span
                aria-hidden
                className="mt-1.5 size-2.5 shrink-0 rounded-[3px]"
                style={{ background: rings[index]?.color }}
              />
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="font-medium">{goal.label}</span>
                <span className="text-muted-foreground">
                  {formatCompact(goal.value)} z {formatCompact(goal.maxValue)}
                  {goal.unit ? ` ${goal.unit}` : ""}
                </span>
              </div>
              <span className="shrink-0 font-medium tabular-nums">
                {rings[index]?.value} %
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
