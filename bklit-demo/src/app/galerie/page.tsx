import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ActivityHeatmap } from "@/components/demo/activity-heatmap";
import { BudgetGauge } from "@/components/demo/budget-gauge";
import { CategoryBars } from "@/components/demo/category-bars";
import { CategorySunburst } from "@/components/demo/category-sunburst";
import { ChannelRadial } from "@/components/demo/channel-radial";
import { ConversionFunnel } from "@/components/demo/conversion-funnel";
import { DeliveryScatter } from "@/components/demo/delivery-scatter";
import { DevicePie } from "@/components/demo/device-pie";
import { FlowSankey } from "@/components/demo/flow-sankey";
import { GoalRings } from "@/components/demo/goal-rings";
import { LiveOrders } from "@/components/demo/live-orders";
import { PriceCandles } from "@/components/demo/price-candles";
import { ProductRadar } from "@/components/demo/product-radar";
import { RevenueArea } from "@/components/demo/revenue-area";
import { RevenueComposed } from "@/components/demo/revenue-composed";
import { SparklineRow } from "@/components/demo/sparkline-row";
import { TrafficLines } from "@/components/demo/traffic-lines";
import { WorldMap } from "@/components/demo/world-map";
import {
  ChartCard,
  type LegendEntry,
  PageHeading,
} from "@/components/site/chart-card";
import {
  candleLegend,
  categoryLegend,
  composedLegend,
  deliveryLegend,
  radarLegend,
  revenueLegend,
  trafficLegend,
} from "@/data/legends";

export const metadata: Metadata = { title: "Galerie grafů" };

interface GalleryItem {
  /** Název položky v registru: `@bklit/<name>`. */
  name: string;
  title: string;
  description: string;
  legend?: LegendEntry[];
  /** Zabere celou šířku mřížky. */
  wide?: boolean;
  chart: ReactNode;
}

interface GallerySection {
  /** Kotva sekce (bez mezer a diakritiky). */
  id: string;
  title: string;
  lead: string;
  items: GalleryItem[];
}

const COMPACT = "h-56 sm:h-64";

const sections: GallerySection[] = [
  {
    id: "casove-rady",
    title: "Časové řady",
    lead: "Grafy s datem na vodorovné ose. Skládají se ze stejných dílů: mřížka, osy, řady a nápověda.",
    items: [
      {
        name: "area-chart",
        title: "Plošný graf",
        description: "Vývoj jedné veličiny v čase, tady s loňskem pro srovnání.",
        legend: revenueLegend,
        chart: <RevenueArea className={COMPACT} />,
      },
      {
        name: "line-chart",
        title: "Čárový graf",
        description: "Víc řad ve stejných jednotkách na jedné ose.",
        legend: trafficLegend,
        chart: <TrafficLines className={COMPACT} />,
      },
      {
        name: "composed-chart",
        title: "Složený graf",
        description: "Sloupce, čáry a plochy na společné škále.",
        legend: composedLegend,
        chart: <RevenueComposed className={COMPACT} />,
      },
      {
        name: "scatter-chart",
        title: "Bodový graf",
        description: "Jednotlivá měření v čase bez spojnic.",
        legend: deliveryLegend,
        chart: <DeliveryScatter className={COMPACT} />,
      },
      {
        name: "candlestick-chart",
        title: "Svíčkový graf",
        description: "Otevření, maximum, minimum a závěr pro každý den.",
        legend: candleLegend,
        chart: <PriceCandles className={COMPACT} />,
      },
      {
        name: "live-line-chart",
        title: "Živý čárový graf",
        description: "Plynule posouvaný graf pro data přicházející v reálném čase.",
        chart: <LiveOrders />,
      },
    ],
  },
  {
    id: "kategorie",
    title: "Porovnání kategorií",
    lead: "Když na vodorovné ose nejsou data, ale pojmenované skupiny.",
    items: [
      {
        name: "bar-chart",
        title: "Sloupcový graf",
        description: "Seskupené nebo skládané sloupce, svisle i vodorovně.",
        legend: categoryLegend,
        wide: true,
        chart: <CategoryBars className={COMPACT} />,
      },
      {
        name: "radar-chart",
        title: "Paprskový graf",
        description: "Profil několika položek ve stejných měřítkách.",
        legend: radarLegend,
        chart: <ProductRadar />,
      },
      {
        name: "radial-chart",
        title: "Radiální graf",
        description: "Sloupce uspořádané do kruhu, vhodné pro opakující se období.",
        chart: <ChannelRadial />,
      },
    ],
  },
  {
    id: "casti-celku",
    title: "Části celku a poměry",
    lead: "Kolik z celku připadá na jednotlivé díly a jak daleko je hodnota od cíle.",
    items: [
      {
        name: "pie-chart",
        title: "Koláčový graf",
        description: "Několik málo dílů jednoho celku, plný i s otvorem uprostřed.",
        chart: <DevicePie />,
      },
      {
        name: "ring-chart",
        title: "Prstencový graf",
        description: "Každý prstenec ukazuje hodnotu proti vlastnímu maximu.",
        chart: <GoalRings />,
      },
      {
        name: "gauge-chart",
        title: "Ukazatel",
        description: "Jedno číslo proti limitu, obloukem nebo vodorovně.",
        chart: <BudgetGauge />,
      },
      {
        name: "sunburst-chart",
        title: "Vícevrstvý kruhový graf",
        description: "Hierarchie v soustředných kruzích s přiblížením na kliknutí.",
        chart: <CategorySunburst />,
      },
      {
        name: "funnel-chart",
        title: "Trychtýř",
        description: "Úbytek mezi po sobě jdoucími kroky.",
        wide: true,
        chart: <ConversionFunnel />,
      },
    ],
  },
  {
    id: "toky-a-mapa",
    title: "Toky, kalendář a mapa",
    lead: "Specializované grafy pro vztahy mezi uzly, aktivitu po dnech a zeměpisná data.",
    items: [
      {
        name: "sankey-chart",
        title: "Sankeyův diagram",
        description: "Přesuny mezi uzly; šířka pruhu odpovídá objemu.",
        wide: true,
        chart: <FlowSankey />,
      },
      {
        name: "heatmap-chart",
        title: "Teplotní mapa",
        description: "Aktivita po dnech v kalendářové mřížce.",
        chart: <ActivityHeatmap />,
      },
      {
        name: "choropleth-chart",
        title: "Kartogram",
        description: "Hodnoty podle území s přiblížením a nápovědou.",
        chart: <WorldMap />,
      },
    ],
  },
  {
    id: "male-grafy",
    title: "Malé grafy",
    lead: "Grafy bez os do tabulek a dlaždic. Najdete je i v ukazatelích na stránce Přehled a v tabulce produktů na stránce Prodej.",
    items: [
      {
        name: "sparkline",
        title: "Sparkline",
        description: "Čára, plocha nebo sloupce na pár desítkách pixelů.",
        wide: true,
        chart: <SparklineRow />,
      },
    ],
  },
];

const total = sections.reduce((sum, section) => sum + section.items.length, 0);

export default function GaleriePage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8 sm:px-6">
      <PageHeading
        lead={`Všech ${total} typů grafů použitých na tomto webu. U každého je příkaz, kterým si ho přidáte do vlastního projektu.`}
        title="Galerie grafů"
      />

      {sections.map((section) => (
        <section
          aria-labelledby={section.id}
          className="flex flex-col gap-4"
          key={section.id}
        >
          <div className="flex flex-col gap-1">
            <h2
              className="font-semibold text-xl tracking-tight"
              id={section.id}
            >
              {section.title}
            </h2>
            <p className="max-w-2xl text-muted-foreground">{section.lead}</p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {section.items.map((item) => (
              <ChartCard
                className={item.wide ? "lg:col-span-2" : undefined}
                description={item.description}
                footer={
                  <code className="block overflow-x-auto whitespace-nowrap rounded-md bg-muted px-2.5 py-1.5 font-mono text-foreground text-xs">
                    npx shadcn@latest add @bklit/{item.name}
                  </code>
                }
                key={item.name}
                legend={item.legend}
                title={item.title}
              >
                {item.chart}
              </ChartCard>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
