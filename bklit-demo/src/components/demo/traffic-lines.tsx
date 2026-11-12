"use client";

import { curveMonotoneX } from "d3-shape";
import {
  ChartTooltip,
  Grid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "@/components/charts";
import { formatNumber, trafficSeries } from "@/data/demo";
import { seriesColor } from "@/data/legends";

function tooltipRows(point: Record<string, unknown>) {
  return [
    {
      color: seriesColor.visits,
      label: "Návštěvy",
      value: formatNumber(point.navstevy as number),
    },
    {
      color: seriesColor.uniques,
      label: "Unikátní",
      value: formatNumber(point.unikatni as number),
    },
  ];
}

/** Návštěvy a unikátní návštěvníci: dvě řady ve stejných jednotkách na jedné ose. */
export function TrafficLines({
  className = "h-64 sm:h-80",
}: {
  className?: string;
}) {
  return (
    <LineChart
      aspectRatio="auto"
      className={className}
      data={trafficSeries}
      margin={{ top: 16, right: 16, bottom: 40, left: 48 }}
    >
      <Grid horizontal strokeDasharray="none" />
      <Line
        curve={curveMonotoneX}
        dataKey="navstevy"
        fadeEdges={false}
        stroke={seriesColor.visits}
        strokeWidth={2}
      />
      <Line
        curve={curveMonotoneX}
        dataKey="unikatni"
        fadeEdges={false}
        stroke={seriesColor.uniques}
        strokeWidth={2}
      />
      <XAxis />
      <YAxis formatValue={formatNumber} />
      <ChartTooltip rows={tooltipRows} />
    </LineChart>
  );
}
