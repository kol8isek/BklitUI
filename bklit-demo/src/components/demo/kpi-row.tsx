"use client";

import {
  AreaSparkline,
  BarSparkline,
  ChartStatFlow,
  LineSparkline,
} from "@/components/charts";
import type { ChartStatFlowFormat } from "@/components/charts/chart-stat-flow";
import {
  StatCardChart,
  statCardLabelClassName,
} from "@/components/stat-card-chart";
import {
  formatStatCardDay,
  type StatCardPoint,
  useStatCardSparklineHover,
} from "@/components/stat-card-sparkline-hover";
import { TrendBadge } from "@/components/trend-badge";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { kpis } from "@/data/demo";

type SparklineKind = "area" | "line" | "bar";

interface KpiCardProps {
  title: string;
  series: StatCardPoint[];
  /** Změna proti předchozím 14 dnům v procentech. */
  trend: number;
  kind: SparklineKind;
  format?: ChartStatFlowFormat;
  suffix?: string;
}

const SPARKLINE_HEIGHT = 72;

/**
 * Dlaždice s jedním ukazatelem. V klidu ukazuje poslední den, při najetí
 * na graf hodnotu a mezidenní změnu vybraného dne.
 */
function KpiCard({ title, series, trend, kind, format, suffix }: KpiCardProps) {
  const { hover, sparklineProps } = useStatCardSparklineHover(
    series,
    formatStatCardDay
  );
  const last = series.at(-1)?.value ?? 0;
  const values = series.map((point) => point.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pad = (max - min) * 0.08;
  // Sloupce musí začínat na nule, čáry a plochy stačí přiblížit na rozsah dat.
  const domain: [number, number] =
    kind === "bar" ? [0, max + pad] : [min - pad, max + pad];

  const shared = {
    color: "var(--chart-1)",
    data: series,
    dataKey: "value" as const,
    height: SPARKLINE_HEIGHT,
    yDomain: domain,
    ...sparklineProps,
  };

  return (
    <Card className="gap-0 py-0">
      <CardHeader className="px-4 pt-3 pb-1">
        <CardTitle className="font-normal text-muted-foreground text-sm">
          {title}
        </CardTitle>
        <CardAction>
          <TrendBadge value={hover.trend ?? trend} />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col px-4 pb-3">
        <ChartStatFlow
          formatOptions={format}
          label={hover.label ?? "Dnes"}
          labelClassName={statCardLabelClassName}
          suffix={suffix}
          value={hover.value ?? last}
          valueClassName="text-2xl font-semibold leading-tight tracking-tight"
        />
        <StatCardChart className="mt-2" size="sm">
          {kind === "area" ? (
            <AreaSparkline
              crosshair="gradient"
              fillOpacity={0.35}
              padding={0}
              strokeWidth={2}
              {...shared}
            />
          ) : null}
          {kind === "line" ? (
            <LineSparkline
              crosshair="gradient"
              curve="monotone"
              padding={{ top: 4, bottom: 4 }}
              strokeWidth={2}
              {...shared}
            />
          ) : null}
          {kind === "bar" ? (
            <BarSparkline barGap={2} barRadius={2} padding={0} {...shared} />
          ) : null}
        </StatCardChart>
      </CardContent>
    </Card>
  );
}

/** Řada čtyř hlavních ukazatelů e-shopu. */
export function KpiRow() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        format={{ maximumFractionDigits: 0 }}
        kind="area"
        series={kpis.trzby.series}
        suffix=" Kč"
        title="Tržby"
        trend={kpis.trzby.trend}
      />
      <KpiCard
        kind="bar"
        series={kpis.objednavky.series}
        title="Objednávky"
        trend={kpis.objednavky.trend}
      />
      <KpiCard
        format={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
        kind="line"
        series={kpis.konverze.series}
        suffix=" %"
        title="Konverzní poměr"
        trend={kpis.konverze.trend}
      />
      <KpiCard
        format={{ maximumFractionDigits: 0 }}
        kind="line"
        series={kpis.kosik.series}
        suffix=" Kč"
        title="Průměrná objednávka"
        trend={kpis.kosik.trend}
      />
    </div>
  );
}
