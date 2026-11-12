"use client";

import { useEffect, useRef, useState } from "react";
import {
  buildArcs,
  SunburstCenter,
  SunburstChart,
  SunburstHint,
  SunburstLabels,
  SunburstSegment,
} from "@/components/charts";
import { revenueTree } from "@/data/demo";

const { arcs } = buildArcs(revenueTree);
const MAX_SIZE = 340;

/**
 * Tržby podle kategorie a podkategorie. Kliknutím na díl se graf přiblíží.
 * `SunburstChart` chce velikost v pixelech, proto měříme šířku obalu a graf
 * zmenšíme, když je karta užší než 340 px.
 */
export function CategorySunburst() {
  const wrapper = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<number | null>(null);

  useEffect(() => {
    const element = wrapper.current;
    if (!element) {
      return;
    }
    const observer = new ResizeObserver(([entry]) => {
      if (entry) {
        setSize(Math.min(MAX_SIZE, Math.floor(entry.contentRect.width)));
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex w-full flex-col items-center" ref={wrapper}>
      {size ? (
        <SunburstChart data={revenueTree} size={size}>
          {arcs.map((arc) => (
            <SunburstSegment index={arc.arcIndex} key={arc.id} />
          ))}
          <SunburstCenter />
          <SunburstLabels />
          <SunburstHint>
            {({ hoveredArc, focus }) => {
              if (hoveredArc) {
                return hoveredArc.trail.join("  ›  ");
              }
              return focus.depth === 0
                ? "Kliknutím na díl přiblížíte"
                : "Kliknutím na střed se vrátíte";
            }}
          </SunburstHint>
        </SunburstChart>
      ) : (
        <div aria-hidden style={{ height: MAX_SIZE }} />
      )}
    </div>
  );
}
