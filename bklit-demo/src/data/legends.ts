// Barvy řad a legendy. Soubor záměrně není klientský ("use client"), aby z něj
// mohly číst jak grafy v prohlížeči, tak stránky vykreslované na serveru.

import type { LegendEntry } from "@/components/site/chart-card";

/** Barva sleduje řadu, ne její pořadí v grafu. */
export const seriesColor = {
  current: "var(--chart-1)",
  /** Srovnávací (loňská) řada jako kontext: tlumená šedá. */
  context: "var(--chart-foreground-muted)",
  /** Světlejší stupeň téhož odstínu pro „předtím“. */
  previous: "var(--chart-scale-03)",
  visits: "var(--chart-1)",
  uniques: "var(--chart-2)",
  revenue: "var(--chart-1)",
  average: "var(--chart-2)",
  courier: "var(--chart-1)",
  pickup: "var(--chart-2)",
  web: "var(--chart-1)",
  app: "var(--chart-2)",
} as const;

export const revenueLegend: LegendEntry[] = [
  { label: "Letos", color: seriesColor.current },
  { label: "Loni", color: seriesColor.context },
];

export const categoryLegend: LegendEntry[] = [
  { label: "Tento měsíc", color: seriesColor.current },
  { label: "Minulý měsíc", color: seriesColor.previous },
];

export const trafficLegend: LegendEntry[] = [
  { label: "Návštěvy", color: seriesColor.visits },
  { label: "Unikátní návštěvníci", color: seriesColor.uniques },
];

export const composedLegend: LegendEntry[] = [
  { label: "Měsíční tržby", color: seriesColor.revenue },
  { label: "Tříměsíční průměr", color: seriesColor.average },
];

export const candleLegend: LegendEntry[] = [
  { label: "Růst (závěr nad otevřením)", color: "var(--chart-positive)" },
  { label: "Pokles", color: "var(--chart-negative)" },
];

export const deliveryLegend: LegendEntry[] = [
  { label: "Kurýr", color: seriesColor.courier },
  { label: "Výdejna", color: seriesColor.pickup },
];

export const radarLegend: LegendEntry[] = [
  { label: "Sluchátka Aria", color: "var(--chart-1)" },
  { label: "Sluchátka Bolt", color: "var(--chart-2)" },
];
