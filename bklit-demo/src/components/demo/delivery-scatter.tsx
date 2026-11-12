"use client";

import {
  ChartTooltip,
  Grid,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
} from "@/components/charts";
import { deliveryTimes } from "@/data/demo";
import { seriesColor } from "@/data/legends";

function formatHours(value: number): string {
  return `${value.toFixed(1).replace(".", ",")} h`;
}

function tooltipRows(point: Record<string, unknown>) {
  return [
    {
      color: seriesColor.courier,
      label: "Kurýr",
      value: formatHours(point.kuryr as number),
    },
    {
      color: seriesColor.pickup,
      label: "Výdejna",
      value: formatHours(point.vydejna as number),
    },
  ];
}

/** Průměrná doba doručení po dnech pro dva způsoby dopravy. */
export function DeliveryScatter({
  className = "h-64 sm:h-72",
}: {
  className?: string;
}) {
  return (
    <ScatterChart
      aspectRatio="auto"
      className={className}
      data={deliveryTimes}
      margin={{ top: 16, right: 16, bottom: 40, left: 44 }}
    >
      <Grid horizontal strokeDasharray="none" />
      <Scatter dataKey="kuryr" fill={seriesColor.courier} radius={4} />
      <Scatter dataKey="vydejna" fill={seriesColor.pickup} radius={4} />
      <XAxis />
      <YAxis />
      <ChartTooltip rows={tooltipRows} />
    </ScatterChart>
  );
}
