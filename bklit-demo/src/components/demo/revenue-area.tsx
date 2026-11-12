"use client";

import { curveMonotoneX } from "d3-shape";
import {
  Area,
  AreaChart,
  ChartTooltip,
  Grid,
  XAxis,
  YAxis,
} from "@/components/charts";
import { dailyRevenue, formatCompact, formatCzk } from "@/data/demo";
import { seriesColor } from "@/data/legends";

function tooltipRows(point: Record<string, unknown>) {
  return [
    {
      color: seriesColor.current,
      label: "Letos",
      value: formatCzk(point.letos as number),
    },
    {
      color: seriesColor.context,
      label: "Loni",
      value: formatCzk(point.loni as number),
    },
  ];
}

/** Denní tržby: letošek jako plocha, loňsko jako tenká šedá čára pro srovnání. */
export function RevenueArea({
  className = "h-64 sm:h-80",
}: {
  className?: string;
}) {
  return (
    <AreaChart
      aspectRatio="auto"
      className={className}
      data={dailyRevenue}
      margin={{ top: 16, right: 16, bottom: 40, left: 52 }}
    >
      <Grid horizontal strokeDasharray="none" />
      <Area
        curve={curveMonotoneX}
        dataKey="loni"
        fill={seriesColor.context}
        fillOpacity={0}
        strokeWidth={1.5}
      />
      <Area
        curve={curveMonotoneX}
        dataKey="letos"
        fill={seriesColor.current}
        fillOpacity={0.3}
        strokeWidth={2}
      />
      <XAxis />
      <YAxis formatValue={formatCompact} />
      <ChartTooltip rows={tooltipRows} />
    </AreaChart>
  );
}
