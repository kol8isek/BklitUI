"use client";

import { curveMonotoneX } from "d3-shape";
import { useEffect, useState } from "react";
import {
  ChartTooltip,
  LiveLine,
  LiveLineChart,
  LiveXAxis,
  LiveYAxis,
} from "@/components/charts";

interface Point {
  time: number;
  value: number;
}

const WINDOW_SECONDS = 30;
const KEEP_POINTS = 90;

function nextValue(previous: number): number {
  const drift = (Math.random() - 0.5) * 6;
  // Táhne hodnotu zpět ke 24 objednávkám za minutu, aby neutekla z grafu.
  const pull = (24 - previous) * 0.08;
  return Math.max(4, Math.round((previous + drift + pull) * 10) / 10);
}

function seed(now: number): Point[] {
  const points: Point[] = [];
  let value = 22;
  for (let i = WINDOW_SECONDS; i >= 0; i -= 1) {
    value = nextValue(value);
    points.push({ time: now - i, value });
  }
  return points;
}

function formatOrders(value: number): string {
  return value.toFixed(1).replace(".", ",");
}

/**
 * Simulovaný živý přenos: každou sekundu přibude nový bod. Data vznikají až
 * v prohlížeči, proto se graf vykreslí teprve po prvním tiknutí.
 */
export function LiveOrders() {
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    const tick = () => {
      const now = Date.now() / 1000;
      setPoints((previous) => {
        if (previous.length === 0) {
          return seed(now);
        }
        const last = previous.at(-1)?.value ?? 22;
        return [
          ...previous.slice(-KEEP_POINTS),
          { time: now, value: nextValue(last) },
        ];
      });
    };
    const first = setTimeout(tick, 0);
    const interval = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, []);

  const latest = points.at(-1)?.value;

  if (latest === undefined) {
    return <div aria-hidden className="h-[280px]" />;
  }

  return (
    <LiveLineChart
      data={points}
      margin={{ top: 24, right: 56, bottom: 32, left: 40 }}
      style={{ height: 280 }}
      value={latest}
      window={WINDOW_SECONDS}
    >
      <LiveLine
        curve={curveMonotoneX}
        dataKey="value"
        formatValue={formatOrders}
        stroke="var(--chart-1)"
      />
      <LiveXAxis />
      <LiveYAxis formatValue={formatOrders} />
      <ChartTooltip />
    </LiveLineChart>
  );
}
