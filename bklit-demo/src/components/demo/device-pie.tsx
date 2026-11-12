"use client";

import { PieCenter, PieChart, PieSlice } from "@/components/charts";
import { SeriesLegend } from "@/components/site/chart-card";
import { deviceShare } from "@/data/demo";

const legend = deviceShare.map((item) => ({
  label: item.label,
  color: item.color,
  value: `${item.value} %`,
}));

/** Podíl zařízení: tři díly celku, přesné hodnoty jsou v legendě vedle. */
export function DevicePie() {
  return (
    <div className="flex flex-col items-center gap-4">
      <PieChart
        cornerRadius={4}
        data={deviceShare}
        innerRadius={62}
        padAngle={0.03}
        size={220}
      >
        {deviceShare.map((item, index) => (
          <PieSlice hoverEffect="grow" index={index} key={item.label} />
        ))}
        <PieCenter defaultLabel="Všechna zařízení" suffix=" %" />
      </PieChart>
      <SeriesLegend className="justify-center" items={legend} />
    </div>
  );
}
