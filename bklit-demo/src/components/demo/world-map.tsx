"use client";

import {
  ChoroplethChart,
  type ChoroplethFeature,
  ChoroplethFeatureComponent,
  ChoroplethTooltip,
} from "@/components/charts";
import {
  countryNamesCs,
  visitorScale,
  visitorsByCountry,
} from "@/data/demo";
import { useWorldData } from "@/lib/use-world-data";

function nameOf(feature: ChoroplethFeature): string {
  return (feature.properties?.name as string | undefined) ?? "";
}

function colorFor(feature: ChoroplethFeature): string {
  const visitors = visitorsByCountry[nameOf(feature)] ?? 0;
  const step = visitorScale.find((item) => visitors >= item.from);
  return step?.color ?? "var(--chart-scale-01)";
}

function czechName(feature: ChoroplethFeature): string {
  const name = nameOf(feature);
  return countryNamesCs[name] ?? name;
}

function valueFor(feature: ChoroplethFeature): number | undefined {
  return visitorsByCountry[nameOf(feature)];
}

function formatThousands(value: number): string {
  return `${value} tis.`;
}

/** Návštěvy podle země: jeden odstín, tmavší znamená víc. Kliknutím se přiblíží. */
export function WorldMap() {
  const world = useWorldData();

  return (
    <div className="flex flex-col gap-3">
      {world ? (
        <ChoroplethChart aspectRatio="16 / 9" clickToZoom data={world}>
          <ChoroplethFeatureComponent
            getFeatureColor={colorFor}
            stroke="var(--card)"
            strokeWidth={0.5}
          />
          <ChoroplethTooltip
            formatValue={formatThousands}
            getFeatureName={czechName}
            getFeatureValue={valueFor}
            valueLabel="Návštěvy"
          />
        </ChoroplethChart>
      ) : (
        <div className="flex aspect-video items-center justify-center text-muted-foreground text-sm">
          Načítám mapu…
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground text-sm">
        <span>Návštěvy (tis.):</span>
        <ul className="flex flex-wrap gap-x-3 gap-y-1">
          {[...visitorScale].reverse().map((step) => (
            <li className="flex items-center gap-1.5" key={step.label}>
              <span
                aria-hidden
                className="size-2.5 rounded-[3px] ring-1 ring-foreground/10"
                style={{ background: step.color }}
              />
              {step.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
