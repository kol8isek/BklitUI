import type { Metadata } from "next";
import { ConversionFunnel } from "@/components/demo/conversion-funnel";
import { DevicePie } from "@/components/demo/device-pie";
import { FlowSankey } from "@/components/demo/flow-sankey";
import { TrafficLines } from "@/components/demo/traffic-lines";
import { WorldMap } from "@/components/demo/world-map";
import { ChartCard, PageHeading } from "@/components/site/chart-card";
import { DataTable } from "@/components/site/data-table";
import {
  countryNamesCs,
  formatNumber,
  trafficSeries,
  visitorsByCountry,
} from "@/data/demo";
import { trafficLegend } from "@/data/legends";

export const metadata: Metadata = { title: "Návštěvnost" };

const dayFmt = new Intl.DateTimeFormat("cs-CZ", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
});

const countryRows = Object.entries(visitorsByCountry)
  .sort(([, a], [, b]) => b - a)
  .map(([name, value]) => [countryNamesCs[name] ?? name, `${value} tis.`]);

export default function NavstevnostPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 sm:px-6">
      <PageHeading
        lead="Kolik lidí na web přišlo, odkud, na čem si ho prohlíželi a jak daleko se dostali směrem k nákupu."
        title="Návštěvnost"
      />

      <ChartCard
        description="Posledních 30 dní"
        footer={
          <DataTable
            columns={["Den", "Návštěvy", "Unikátní návštěvníci"]}
            rows={trafficSeries.map((row) => [
              dayFmt.format(row.date),
              formatNumber(row.navstevy),
              formatNumber(row.unikatni),
            ])}
          />
        }
        legend={trafficLegend}
        title="Návštěvy a unikátní návštěvníci"
      >
        <TrafficLines />
      </ChartCard>

      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard
          className="lg:col-span-2"
          description="Návštěvy podle země za posledních 30 dní. Kliknutím na zemi mapu přiblížíte."
          footer={
            <DataTable
              columns={["Země", "Návštěvy"]}
              rows={countryRows}
              summary="Země v tabulce"
            />
          }
          title="Odkud návštěvníci přicházejí"
        >
          <WorldMap />
        </ChartCard>

        <ChartCard
          description="Podíl návštěv podle typu zařízení"
          title="Zařízení"
        >
          <DevicePie />
        </ChartCard>
      </div>

      <ChartCard
        description="Od zdroje návštěvy přes vstupní stránku po výsledek. Šířka pruhu odpovídá počtu návštěv."
        title="Cesta návštěvníka"
      >
        <FlowSankey />
      </ChartCard>

      <ChartCard
        description="Kolik návštěv došlo do každého kroku nákupu; procenta jsou podíl z prvního kroku"
        title="Nákupní trychtýř"
      >
        <ConversionFunnel />
      </ChartCard>
    </div>
  );
}
