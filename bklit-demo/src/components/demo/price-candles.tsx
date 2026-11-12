"use client";

import {
  Candlestick,
  CandlestickChart,
  ChartTooltip,
  Grid,
  XAxis,
  YAxis,
} from "@/components/charts";
import { stockCandles } from "@/data/demo";

const NEUTRAL = "var(--chart-foreground-muted)";

function formatPrice(value: number): string {
  return `${value.toFixed(1).replace(".", ",")} Kč`;
}

function tooltipRows(point: Record<string, unknown>) {
  const open = point.open as number;
  const close = point.close as number;
  return [
    { color: NEUTRAL, label: "Otevření", value: formatPrice(open) },
    {
      color: NEUTRAL,
      label: "Maximum",
      value: formatPrice(point.high as number),
    },
    { color: NEUTRAL, label: "Minimum", value: formatPrice(point.low as number) },
    {
      color: close >= open ? "var(--chart-positive)" : "var(--chart-negative)",
      label: close >= open ? "Závěr (růst)" : "Závěr (pokles)",
      value: formatPrice(close),
    },
  ];
}

/** Denní kurz akcie jako svíčky (otevření, maximum, minimum, závěr). */
export function PriceCandles({
  className = "h-72 sm:h-96",
}: {
  className?: string;
}) {
  return (
    <CandlestickChart
      aspectRatio="auto"
      className={className}
      data={stockCandles}
      margin={{ top: 16, right: 16, bottom: 40, left: 48 }}
    >
      <Grid horizontal strokeDasharray="none" />
      <Candlestick />
      <XAxis />
      <YAxis />
      <ChartTooltip rows={tooltipRows} />
    </CandlestickChart>
  );
}
