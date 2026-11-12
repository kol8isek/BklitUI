"use client";

import {
  HeatmapCells,
  HeatmapChart,
  HeatmapInteractionBoundary,
  HeatmapInteractionProvider,
  HeatmapLegend,
  HeatmapTooltip,
  HeatmapXAxis,
  HeatmapYAxis,
} from "@/components/charts";
import { supportHeatmap } from "@/data/demo";

/** Česká množná čísla: 1 požadavek, 2–4 požadavky, jinak požadavků. */
function formatRequests(count: number): string {
  if (count === 1) {
    return "1 vyřízený požadavek";
  }
  if (count >= 2 && count <= 4) {
    return `${count} vyřízené požadavky`;
  }
  return `${count} vyřízených požadavků`;
}

/** Vyřízené požadavky podpory po dnech, týden začíná pondělím. */
export function ActivityHeatmap() {
  return (
    <HeatmapInteractionProvider>
      <HeatmapInteractionBoundary>
        <div className="flex w-full flex-col items-stretch gap-3">
          <HeatmapChart
            className="w-full"
            data={supportHeatmap}
            layout="fluid"
            weekStartDay={1}
          >
            <HeatmapCells />
            <HeatmapXAxis />
            <HeatmapYAxis />
            <HeatmapTooltip formatLabel={formatRequests} />
          </HeatmapChart>
          <HeatmapLegend lessLabel="Méně" moreLabel="Více" />
        </div>
      </HeatmapInteractionBoundary>
    </HeatmapInteractionProvider>
  );
}
