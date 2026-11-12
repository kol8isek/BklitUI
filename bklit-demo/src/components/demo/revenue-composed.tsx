"use client";

import { curveMonotoneX } from "d3-shape";
import {
  ChartTooltip,
  ComposedChart,
  Grid,
  Line,
  SeriesBar,
  XAxis,
  YAxis,
} from "@/components/charts";
import { formatNumber, monthlyRevenue } from "@/data/demo";
import { seriesColor } from "@/data/legends";

const monthFmt = new Intl.DateTimeFormat("cs-CZ", {
  month: "short",
  year: "2-digit",
});
const monthLabels = monthlyRevenue.map((row) => monthFmt.format(row.date));

function tooltipRows(point: Record<string, unknown>) {
  return [
    {
      color: seriesColor.revenue,
      label: "Tržby",
      value: `${formatNumber(point.trzby as number)} tis. Kč`,
    },
    {
      color: seriesColor.average,
      label: "Průměr za 3 měsíce",
      value: `${formatNumber(point.prumer as number)} tis. Kč`,
    },
  ];
}

/**
 * Sloupce a čára v jednom grafu. Obě řady jsou v tisících korun, takže sdílejí
 * jednu osu.
 */
export function RevenueComposed({
  className = "h-64 sm:h-80",
}: {
  className?: string;
}) {
  return (
    <ComposedChart
      aspectRatio="auto"
      className={className}
      data={monthlyRevenue}
      margin={{ top: 16, right: 16, bottom: 40, left: 52 }}
      maxBarSize={28}
    >
      <Grid horizontal strokeDasharray="none" />
      <SeriesBar dataKey="trzby" fill={seriesColor.revenue} radius={4} />
      <Line
        curve={curveMonotoneX}
        dataKey="prumer"
        fadeEdges={false}
        stroke={seriesColor.average}
        strokeWidth={2}
      />
      <XAxis labels={monthLabels} numTicks={6} />
      <YAxis formatValue={formatNumber} />
      <ChartTooltip dateLabels={monthLabels} rows={tooltipRows} />
    </ComposedChart>
  );
}
