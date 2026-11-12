"use client";

import type { FeatureCollection, Geometry } from "geojson";
import { useEffect, useState } from "react";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";

interface CountryProperties {
  name: string;
  [key: string]: unknown;
}

export type WorldData = FeatureCollection<Geometry, CountryProperties>;

type WorldTopology = Topology<{
  countries: GeometryCollection<CountryProperties>;
}>;

let cache: WorldData | null = null;
let pending: Promise<WorldData> | null = null;

/**
 * Načte obrysy států z balíčku `world-atlas` (součást webu, žádný požadavek
 * na cizí server) a převede je z TopoJSON na GeoJSON. Mapa se stahuje až
 * ve chvíli, kdy je potřeba, a jen jednou.
 */
function loadWorldData(): Promise<WorldData> {
  if (cache) {
    return Promise.resolve(cache);
  }
  pending ??= import("world-atlas/countries-110m.json").then((module) => {
    const topology = module.default as unknown as WorldTopology;
    const collection = feature(
      topology,
      topology.objects.countries
    ) as unknown as WorldData;
    // Antarktida v Mercatorově zobrazení zabere spodní třetinu mapy.
    cache = {
      ...collection,
      features: collection.features.filter(
        (item) => item.properties.name !== "Antarctica"
      ),
    };
    return cache;
  });
  return pending;
}

export function useWorldData(): WorldData | null {
  const [data, setData] = useState<WorldData | null>(cache);

  useEffect(() => {
    let cancelled = false;
    loadWorldData().then((loaded) => {
      if (!cancelled) {
        setData(loaded);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return data;
}
