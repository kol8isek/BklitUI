// Ukázková data pro web. Všechno je vymyšlené a deterministické (pevné
// semínko, pevná data), aby server i prohlížeč vykreslily totéž.

import type { HeatmapColumn, SankeyData, SunburstNode } from "@/components/charts";

/** Malý deterministický generátor pseudonáhodných čísel (mulberry32). */
function createRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Poslední den, který data pokrývají. */
export const LAST_DAY = new Date(2026, 9, 31);

function daysBefore(count: number): Date {
  return new Date(2026, 9, 31 - count);
}

// ---------------------------------------------------------------------------
// Přehled
// ---------------------------------------------------------------------------

/** Denní tržby za posledních 60 dní a stejné období o rok dříve (Kč). */
export const dailyRevenue = (() => {
  const random = createRandom(11);
  return Array.from({ length: 60 }, (_, i) => {
    const date = daysBefore(59 - i);
    const weekend = date.getDay() === 0 || date.getDay() === 6;
    const base = 58_000 + i * 620 + Math.sin(i / 4.5) * 9_000;
    const letos = base * (weekend ? 0.78 : 1) + random() * 9_000;
    const loni = base * 0.82 * (weekend ? 0.8 : 1) + random() * 8_000 - i * 150;
    return {
      date,
      letos: Math.round(letos / 100) * 100,
      loni: Math.round(loni / 100) * 100,
    };
  });
})();

/** Objednávky podle kategorie: tento a minulý měsíc. */
export const categoryOrders = [
  { kategorie: "Elektronika", tento: 1840, minuly: 1620 },
  { kategorie: "Domácnost", tento: 1410, minuly: 1480 },
  { kategorie: "Móda", tento: 1260, minuly: 1090 },
  { kategorie: "Sport", tento: 940, minuly: 870 },
  { kategorie: "Knihy", tento: 610, minuly: 660 },
  { kategorie: "Hračky", tento: 480, minuly: 390 },
];

/** Plnění měsíčních cílů (hodnota proti cíli). */
export const monthlyGoals = [
  { label: "Tržby", value: 2_480_000, maxValue: 3_000_000, unit: "Kč" },
  { label: "Objednávky", value: 6_540, maxValue: 7_000, unit: "ks" },
  { label: "Noví zákazníci", value: 1_150, maxValue: 2_000, unit: "" },
];

/** Vyřízené požadavky podpory po dnech, 26 týdnů (neděle je první v týdnu). */
export const supportHeatmap: HeatmapColumn[] = (() => {
  const random = createRandom(29);
  const weeks = 26;
  // Poslední sloupec je týden, který obsahuje LAST_DAY.
  const lastSunday = new Date(2026, 9, 31 - LAST_DAY.getDay());
  return Array.from({ length: weeks }, (_, week) => {
    const sunday = new Date(
      lastSunday.getFullYear(),
      lastSunday.getMonth(),
      lastSunday.getDate() - (weeks - 1 - week) * 7
    );
    return {
      bin: week,
      bins: Array.from({ length: 7 }, (_, day) => {
        const date = new Date(
          sunday.getFullYear(),
          sunday.getMonth(),
          sunday.getDate() + day
        );
        const weekend = day === 0 || day === 6;
        const roll = random();
        let count = 0;
        if (weekend) {
          count = roll > 0.7 ? 1 : 0;
        } else {
          count = Math.min(6, Math.floor(roll * 4 + week / 9));
        }
        return { bin: day, count, date };
      }),
    };
  });
})();

interface KpiPoint {
  date: Date;
  value: number;
}

function kpiSeries(
  seed: number,
  start: number,
  step: number,
  noise: number,
  digits = 0
): KpiPoint[] {
  const random = createRandom(seed);
  const factor = 10 ** digits;
  return Array.from({ length: 14 }, (_, i) => ({
    date: daysBefore(13 - i),
    value:
      Math.round(
        (start + step * i + Math.sin(i / 2) * noise + random() * noise) * factor
      ) / factor,
  }));
}

/** Čtyři hlavní ukazatele: posledních 14 dní. */
export const kpis = {
  trzby: { trend: 12.4, series: kpiSeries(3, 61_000, 2_100, 6_000) },
  objednavky: { trend: 8.1, series: kpiSeries(5, 178, 5, 16) },
  konverze: { trend: -0.6, series: kpiSeries(7, 3.4, -0.01, 0.25, 2) },
  kosik: { trend: 3.9, series: kpiSeries(9, 342, 3.2, 14) },
};

// ---------------------------------------------------------------------------
// Návštěvnost
// ---------------------------------------------------------------------------

/** Návštěvy a unikátní návštěvníci za posledních 30 dní. */
export const trafficSeries = (() => {
  const random = createRandom(41);
  return Array.from({ length: 30 }, (_, i) => {
    const date = daysBefore(29 - i);
    const weekend = date.getDay() === 0 || date.getDay() === 6;
    const navstevy =
      (4_300 + i * 55 + Math.sin(i / 3) * 520) * (weekend ? 0.72 : 1) +
      random() * 380;
    return {
      date,
      navstevy: Math.round(navstevy),
      unikatni: Math.round(navstevy * (0.62 + random() * 0.05)),
    };
  });
})();

/** Návštěvy podle země (tisíce). Klíče odpovídají názvům v mapových datech. */
export const visitorsByCountry: Record<string, number> = {
  Czechia: 86,
  Slovakia: 41,
  Germany: 34,
  Poland: 27,
  Austria: 19,
  "United States of America": 16,
  "United Kingdom": 12,
  France: 9,
  Netherlands: 8,
  Italy: 7,
  Spain: 6,
  Hungary: 6,
  Ukraine: 5,
  Canada: 4,
  Sweden: 3,
  Switzerland: 3,
  Brazil: 3,
  India: 3,
  Australia: 2,
  Japan: 2,
  Norway: 1,
  Mexico: 1,
};

/** České názvy zemí pro popisky v mapě. */
export const countryNamesCs: Record<string, string> = {
  Czechia: "Česko",
  Slovakia: "Slovensko",
  Germany: "Německo",
  Poland: "Polsko",
  Austria: "Rakousko",
  "United States of America": "USA",
  "United Kingdom": "Velká Británie",
  France: "Francie",
  Netherlands: "Nizozemsko",
  Italy: "Itálie",
  Spain: "Španělsko",
  Hungary: "Maďarsko",
  Ukraine: "Ukrajina",
  Canada: "Kanada",
  Sweden: "Švédsko",
  Switzerland: "Švýcarsko",
  Brazil: "Brazílie",
  India: "Indie",
  Australia: "Austrálie",
  Japan: "Japonsko",
  Norway: "Norsko",
  Mexico: "Mexiko",
};

/** Hranice pěti stupňů sekvenční škály pro mapu (tisíce návštěv). */
export const visitorScale = [
  { from: 40, label: "40 a více", color: "var(--chart-scale-05)" },
  { from: 15, label: "15–39", color: "var(--chart-scale-04)" },
  { from: 5, label: "5–14", color: "var(--chart-scale-03)" },
  { from: 1, label: "1–4", color: "var(--chart-scale-02)" },
  { from: 0, label: "bez dat", color: "var(--chart-scale-01)" },
];

/** Cesta návštěvníka: zdroj → vstupní stránka → výsledek. */
export const visitorFlow: SankeyData = {
  nodes: [
    { name: "Vyhledávání", category: "source" },
    { name: "Sociální sítě", category: "source" },
    { name: "E-mail", category: "source" },
    { name: "Přímý vstup", category: "source" },
    { name: "Úvodní stránka", category: "landing" },
    { name: "Produkt", category: "landing" },
    { name: "Blog", category: "landing" },
    { name: "Nákup", category: "outcome" },
    { name: "Registrace", category: "outcome" },
    { name: "Odchod", category: "outcome" },
  ],
  links: [
    { source: 0, target: 4, value: 5200 },
    { source: 0, target: 5, value: 7400 },
    { source: 0, target: 6, value: 3100 },
    { source: 1, target: 4, value: 1900 },
    { source: 1, target: 5, value: 2600 },
    { source: 1, target: 6, value: 1200 },
    { source: 2, target: 4, value: 900 },
    { source: 2, target: 5, value: 3300 },
    { source: 3, target: 4, value: 4100 },
    { source: 3, target: 5, value: 1500 },
    { source: 4, target: 7, value: 2300 },
    { source: 4, target: 8, value: 2900 },
    { source: 4, target: 9, value: 6900 },
    { source: 5, target: 7, value: 5100 },
    { source: 5, target: 8, value: 2200 },
    { source: 5, target: 9, value: 7500 },
    { source: 6, target: 7, value: 400 },
    { source: 6, target: 8, value: 1300 },
    { source: 6, target: 9, value: 2600 },
  ],
};

/** Nákupní trychtýř za posledních 30 dní. */
export const conversionFunnel = [
  { label: "Návštěva", value: 48_200 },
  { label: "Produkt", value: 21_400 },
  { label: "Košík", value: 7_900 },
  { label: "Pokladna", value: 4_100 },
  { label: "Nákup", value: 2_650 },
];

/** Podíl návštěv podle zařízení (%). */
export const deviceShare = [
  { label: "Mobil", value: 58, color: "var(--chart-1)" },
  { label: "Počítač", value: 34, color: "var(--chart-2)" },
  { label: "Tablet", value: 8, color: "var(--chart-3)" },
];

// ---------------------------------------------------------------------------
// Finance
// ---------------------------------------------------------------------------

/** Denní kurz akcie (OHLC), 60 obchodních dní. */
export const stockCandles = (() => {
  const random = createRandom(73);
  const rows: {
    date: Date;
    open: number;
    high: number;
    low: number;
    close: number;
  }[] = [];
  let price = 412;
  let offset = 86;
  while (rows.length < 60) {
    const date = daysBefore(offset);
    offset -= 1;
    if (date.getDay() === 0 || date.getDay() === 6) {
      continue;
    }
    const open = price;
    const change = (random() - 0.46) * 14;
    const close = Math.max(300, open + change);
    const high = Math.max(open, close) + random() * 5;
    const low = Math.min(open, close) - random() * 5;
    rows.push({
      date,
      open: Math.round(open * 10) / 10,
      high: Math.round(high * 10) / 10,
      low: Math.round(low * 10) / 10,
      close: Math.round(close * 10) / 10,
    });
    price = close;
  }
  return rows;
})();

/** Měsíční tržby a jejich tříměsíční klouzavý průměr (tis. Kč). */
export const monthlyRevenue = (() => {
  const values = [
    1620, 1540, 1710, 1880, 1790, 1960, 2140, 2050, 2230, 2410, 2320, 2480,
  ];
  return values.map((trzby, i) => {
    const window = values.slice(Math.max(0, i - 2), i + 1);
    const prumer = window.reduce((sum, v) => sum + v, 0) / window.length;
    return {
      date: new Date(2025, 10 + i, 1),
      trzby,
      prumer: Math.round(prumer),
    };
  });
})();

/** Čerpání ročního rozpočtu na marketing. */
export const budget = { spent: 3_460_000, total: 4_800_000 };

// ---------------------------------------------------------------------------
// Prodej (a galerie)
// ---------------------------------------------------------------------------

/**
 * Nejprodávanější produkty za posledních 30 dní: prodané kusy po dnech,
 * součet, tržby a změna druhé poloviny období proti první (%).
 */
export const topProducts = [
  { nazev: "Sluchátka Aria", kategorie: "Elektronika", cena: 2490, start: 9, step: 0.22 },
  { nazev: "Telefon Nova 5", kategorie: "Elektronika", cena: 8990, start: 4, step: 0.06 },
  { nazev: "Sluchátka Bolt", kategorie: "Elektronika", cena: 1290, start: 12, step: -0.12 },
  { nazev: "Kávovar Brio", kategorie: "Domácnost", cena: 3490, start: 5, step: 0.1 },
  { nazev: "Běžecké boty Trail", kategorie: "Sport", cena: 1890, start: 8, step: 0.15 },
  { nazev: "Zimní bunda Polar", kategorie: "Móda", cena: 2790, start: 3, step: 0.3 },
  { nazev: "Robotický vysavač Luna", kategorie: "Domácnost", cena: 5990, start: 4, step: -0.04 },
]
  .map((row, index) => {
    const random = createRandom(151 + index);
    const series = Array.from({ length: 30 }, (_, i) => ({
      date: daysBefore(29 - i),
      value: Math.max(
        0,
        Math.round(
          row.start + row.step * i + Math.sin(i / 2.5) * 1.5 + random() * 3
        )
      ),
    }));
    const sum = (points: typeof series) =>
      points.reduce((total, point) => total + point.value, 0);
    const first = sum(series.slice(0, 15));
    const second = sum(series.slice(15));
    const kusy = first + second;
    return {
      nazev: row.nazev,
      kategorie: row.kategorie,
      kusy,
      trzby: kusy * row.cena,
      trend: first === 0 ? 0 : ((second - first) / first) * 100,
      series,
    };
  })
  .sort((a, b) => b.trzby - a.trzby);

/** Hodnocení dvou produktů v pěti oblastech (0–100). */
export const productMetrics = [
  { key: "cena", label: "Cena" },
  { key: "kvalita", label: "Kvalita" },
  { key: "doprava", label: "Doprava" },
  { key: "podpora", label: "Podpora" },
  { key: "obal", label: "Balení" },
];

export const productScores = [
  {
    label: "Sluchátka Aria",
    color: "var(--chart-1)",
    values: { cena: 62, kvalita: 91, doprava: 78, podpora: 84, obal: 70 },
  },
  {
    label: "Sluchátka Bolt",
    color: "var(--chart-2)",
    values: { cena: 88, kvalita: 67, doprava: 82, podpora: 58, obal: 49 },
  },
];

/** Objednávky po měsících: web a mobilní aplikace. */
export const channelByMonth = [
  { mesic: "Led", web: 186, aplikace: 80 },
  { mesic: "Úno", web: 205, aplikace: 96 },
  { mesic: "Bře", web: 237, aplikace: 120 },
  { mesic: "Dub", web: 173, aplikace: 138 },
  { mesic: "Kvě", web: 209, aplikace: 130 },
  { mesic: "Čvn", web: 214, aplikace: 140 },
  { mesic: "Čvc", web: 198, aplikace: 152 },
  { mesic: "Srp", web: 226, aplikace: 165 },
  { mesic: "Zář", web: 231, aplikace: 171 },
  { mesic: "Říj", web: 262, aplikace: 185 },
  { mesic: "Lis", web: 290, aplikace: 210 },
  { mesic: "Pro", web: 318, aplikace: 240 },
];

/** Tržby podle kategorie a podkategorie (tis. Kč). */
export const revenueTree: SunburstNode = {
  name: "Tržby",
  children: [
    {
      name: "Elektronika",
      children: [
        { name: "Telefony", value: 410 },
        { name: "Sluchátka", value: 260 },
        { name: "Příslušenství", value: 150 },
      ],
    },
    {
      name: "Domácnost",
      children: [
        { name: "Kuchyně", value: 280 },
        { name: "Úklid", value: 160 },
        { name: "Dekorace", value: 110 },
      ],
    },
    {
      name: "Móda",
      children: [
        { name: "Oblečení", value: 300 },
        { name: "Obuv", value: 190 },
      ],
    },
    {
      name: "Sport",
      children: [
        { name: "Fitness", value: 170 },
        { name: "Outdoor", value: 140 },
      ],
    },
  ],
};

/** Doba doručení jednotlivých zásilek po dnech (hodiny) pro dva dopravce. */
export const deliveryTimes = (() => {
  const random = createRandom(97);
  return Array.from({ length: 28 }, (_, i) => ({
    date: daysBefore(27 - i),
    kuryr: Math.round((22 + Math.sin(i / 3) * 4 + random() * 9) * 10) / 10,
    vydejna: Math.round((34 + Math.cos(i / 4) * 5 + random() * 11) * 10) / 10,
  }));
})();

/** Krátká řada pro ukázku sparkline. */
export const sparklineData = (() => {
  const random = createRandom(123);
  return Array.from({ length: 24 }, (_, i) => ({
    den: i + 1,
    value: Math.round(4200 + 40 * i + Math.sin(i * 0.7) * 500 + random() * 300),
  }));
})();

// ---------------------------------------------------------------------------
// Formátování
// ---------------------------------------------------------------------------

const numberFmt = new Intl.NumberFormat("cs-CZ");
const compactFmt = new Intl.NumberFormat("cs-CZ", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export function formatNumber(value: number): string {
  return numberFmt.format(value);
}

export function formatCompact(value: number): string {
  return compactFmt.format(value);
}

export function formatCzk(value: number): string {
  return `${numberFmt.format(value)} Kč`;
}
