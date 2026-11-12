"use client";

import {
  RadarArea,
  RadarAxis,
  RadarChart,
  RadarGrid,
  RadarLabels,
} from "@/components/charts";
import { productMetrics, productScores } from "@/data/demo";

/**
 * Porovnání dvou produktů v pěti oblastech na stejné škále 0–100. Bez pevné
 * velikosti se graf přizpůsobí obalu, takže se vejde i na úzký telefon.
 */
export function ProductRadar() {
  return (
    <div className="mx-auto aspect-square w-full max-w-[340px]">
      <RadarChart data={productScores} margin={48} metrics={productMetrics}>
        <RadarGrid />
        <RadarAxis />
        <RadarLabels fontSize={11} offset={16} />
        {productScores.map((row, index) => (
          <RadarArea index={index} key={row.label} />
        ))}
      </RadarChart>
    </div>
  );
}
