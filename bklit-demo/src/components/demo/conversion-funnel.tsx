"use client";

import { FunnelChart } from "@/components/charts";
import { conversionFunnel, formatNumber } from "@/data/demo";

function formatPercent(percent: number): string {
  return `${Math.round(percent)} %`;
}

/** Nákupní trychtýř. Na úzké obrazovce se překlopí na výšku, aby se vešly popisky. */
export function ConversionFunnel() {
  return (
    <>
      <FunnelChart
        className="hidden sm:block"
        color="var(--chart-1)"
        data={conversionFunnel}
        formatPercentage={formatPercent}
        formatValue={formatNumber}
        style={{ aspectRatio: "2.4 / 1" }}
      />
      <FunnelChart
        className="sm:hidden"
        color="var(--chart-1)"
        data={conversionFunnel}
        formatPercentage={formatPercent}
        formatValue={formatNumber}
        orientation="vertical"
        style={{ aspectRatio: "1 / 1.4" }}
      />
    </>
  );
}
