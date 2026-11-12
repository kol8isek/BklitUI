"use client";

import {
  SankeyChart,
  SankeyLink,
  SankeyNode,
  SankeyTooltip,
} from "@/components/charts";
import { SeriesLegend } from "@/components/site/chart-card";
import { formatNumber, visitorFlow } from "@/data/demo";

// Barva označuje krok cesty, ne jednotlivý uzel. Uzly jsou popsané přímo
// v grafu, takže deset různých odstínů není potřeba.
const stageColor = {
  source: "var(--chart-1)",
  landing: "var(--chart-2)",
  outcome: "var(--chart-3)",
} as const;

const legend = [
  { label: "Zdroj návštěvy", color: stageColor.source },
  { label: "Vstupní stránka", color: stageColor.landing },
  { label: "Výsledek", color: stageColor.outcome },
];

function colorOf(node: { category?: unknown }): string {
  const category = node.category as keyof typeof stageColor | undefined;
  return category ? stageColor[category] : stageColor.source;
}

/**
 * Cesta návštěvníka od zdroje po výsledek. Popisky uzlů potřebují místo po
 * stranách, proto má graf minimální šířku a na telefonu se posouvá do strany.
 */
export function FlowSankey() {
  return (
    <div className="flex flex-col gap-2">
      <SeriesLegend items={legend} />
      <div className="overflow-x-auto">
        <div className="min-w-[640px]">
          <SankeyChart
            aspectRatio="2.2 / 1"
            data={visitorFlow}
            margin={{ top: 16, right: 120, bottom: 16, left: 120 }}
            nodePadding={18}
            nodeWidth={12}
          >
            <SankeyLink getNodeColor={colorOf} />
            <SankeyNode getNodeColor={colorOf} />
            <SankeyTooltip formatValue={formatNumber} />
          </SankeyChart>
        </div>
      </div>
    </div>
  );
}
