"use client";

import {
  Bar,
  BarChart,
  BarXAxis,
  BarYAxis,
  ChartTooltip,
  Grid,
  YAxis,
} from "@/components/charts";
import { categoryOrders, formatNumber } from "@/data/demo";
import { seriesColor } from "@/data/legends";
import { cn } from "@/lib/utils";

function tooltipRows(point: Record<string, unknown>) {
  return [
    {
      color: seriesColor.current,
      label: "Tento měsíc",
      value: formatNumber(point.tento as number),
    },
    {
      color: seriesColor.previous,
      label: "Minulý měsíc",
      value: formatNumber(point.minuly as number),
    },
  ];
}

/**
 * Objednávky podle kategorie: seskupené sloupce, jeden odstín ve dvou
 * sytostech. Na úzké obrazovce by se názvy kategorií pod svislými sloupci
 * překrývaly, proto se tam graf vykreslí vodorovně s hodnotami přímo
 * ve sloupcích.
 */
export function CategoryBars({
  className = "h-64 sm:h-80",
}: {
  className?: string;
}) {
  return (
    <>
      <BarChart
        aspectRatio="auto"
        barGap={0.28}
        className={cn("hidden sm:block", className)}
        data={categoryOrders}
        margin={{ top: 16, right: 16, bottom: 40, left: 48 }}
        xDataKey="kategorie"
      >
        <Grid horizontal strokeDasharray="none" />
        <Bar
          dataKey="minuly"
          fill={seriesColor.previous}
          groupGap={2}
          lineCap={4}
        />
        <Bar
          dataKey="tento"
          fill={seriesColor.current}
          groupGap={2}
          lineCap={4}
        />
        <BarXAxis />
        <YAxis formatValue={formatNumber} />
        <ChartTooltip rows={tooltipRows} />
      </BarChart>

      <BarChart
        aspectRatio="auto"
        barGap={0.22}
        className="h-[27rem] sm:hidden"
        data={categoryOrders}
        margin={{ top: 8, right: 16, bottom: 8, left: 84 }}
        orientation="horizontal"
        xDataKey="kategorie"
      >
        <Grid horizontal={false} strokeDasharray="none" vertical />
        <Bar
          dataKey="minuly"
          fill={seriesColor.previous}
          groupGap={2}
          lineCap={4}
          showValue
          valueLabelColor="var(--foreground)"
          valueLabelFormatter={formatNumber}
          valueLabelPosition="top"
        />
        <Bar
          dataKey="tento"
          fill={seriesColor.current}
          groupGap={2}
          lineCap={4}
          showValue
          valueLabelFormatter={formatNumber}
          valueLabelPosition="top"
        />
        <BarYAxis />
        <ChartTooltip rows={tooltipRows} />
      </BarChart>
    </>
  );
}
