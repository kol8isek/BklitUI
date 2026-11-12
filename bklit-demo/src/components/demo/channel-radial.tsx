"use client";

import {
  RadialAxis,
  RadialBar,
  RadialCenter,
  RadialChart,
  RadialLegend,
} from "@/components/charts";
import { channelByMonth, formatNumber } from "@/data/demo";
import { seriesColor } from "@/data/legends";

const series = [
  { dataKey: "web", label: "Web", color: seriesColor.web },
  { dataKey: "aplikace", label: "Aplikace", color: seriesColor.app },
];

/** Objednávky po měsících dokola: skládané paprsky pro web a aplikaci. */
export function ChannelRadial() {
  return (
    <div className="flex justify-center">
      <RadialChart
        angleType="band"
        data={channelByMonth}
        maxValue="stacked"
        maxWidth={360}
        series={series}
        xDataKey="mesic"
      >
        <RadialBar cornerRadius={3} stackGap={2} />
        <RadialAxis showCircle={false} />
        <RadialCenter defaultLabel="Celkem" />
        <RadialLegend formatValue={formatNumber} />
      </RadialChart>
    </div>
  );
}
