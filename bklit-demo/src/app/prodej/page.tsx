import type { Metadata } from "next";
import { CategorySunburst } from "@/components/demo/category-sunburst";
import { ChannelRadial } from "@/components/demo/channel-radial";
import { DeliveryScatter } from "@/components/demo/delivery-scatter";
import { ProductRadar } from "@/components/demo/product-radar";
import { TopProducts } from "@/components/demo/top-products";
import { ChartCard, PageHeading } from "@/components/site/chart-card";
import { DataTable } from "@/components/site/data-table";
import {
  channelByMonth,
  deliveryTimes,
  formatNumber,
  productMetrics,
  productScores,
  revenueTree,
} from "@/data/demo";
import { deliveryLegend, radarLegend } from "@/data/legends";

export const metadata: Metadata = { title: "Prodej" };

const dayFmt = new Intl.DateTimeFormat("cs-CZ", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
});

const hoursFmt = new Intl.NumberFormat("cs-CZ", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const leaves = (revenueTree.children ?? []).flatMap((category) =>
  (category.children ?? []).map((leaf) => ({
    name: `${category.name} › ${leaf.name}`,
    value: leaf.value ?? 0,
  }))
);
const leavesTotal = leaves.reduce((sum, leaf) => sum + leaf.value, 0);

const categoryRows = leaves.map((leaf) => [
  leaf.name,
  formatNumber(leaf.value),
  `${Math.round((leaf.value / leavesTotal) * 100)} %`,
]);

const scoreRows = productMetrics.map((metric) => [
  metric.label,
  ...productScores.map(
    (product) => product.values[metric.key as keyof typeof product.values]
  ),
]);

export default function ProdejPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 sm:px-6">
      <PageHeading
        lead="Co se prodává nejvíc, ve kterých kategoriích a kanálech a jak rychle zboží dorazí k zákazníkovi."
        title="Prodej"
      />

      <ChartCard
        description="Posledních 30 dní. Změna porovnává druhou polovinu období s první."
        title="Nejprodávanější produkty"
      >
        <TopProducts />
      </ChartCard>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard
          description="Čtyři největší kategorie a jejich podkategorie, tento měsíc. Kliknutím na díl graf přiblížíte."
          footer={
            <DataTable
              columns={["Kategorie › podkategorie", "Tržby (tis. Kč)", "Podíl"]}
              rows={categoryRows}
            />
          }
          title="Tržby podle kategorie"
        >
          <CategorySunburst />
        </ChartCard>

        <ChartCard
          description="Objednávky z webu a z mobilní aplikace po měsících"
          footer={
            <DataTable
              columns={["Měsíc", "Web", "Aplikace", "Celkem"]}
              rows={channelByMonth.map((row) => [
                row.mesic,
                formatNumber(row.web),
                formatNumber(row.aplikace),
                formatNumber(row.web + row.aplikace),
              ])}
            />
          }
          title="Objednávky podle kanálu"
        >
          <ChannelRadial />
        </ChartCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard
          description="Hodnocení zákazníků v pěti oblastech, 0–100 bodů"
          footer={
            <DataTable
              columns={["Oblast", ...productScores.map((row) => row.label)]}
              rows={scoreRows}
            />
          }
          legend={radarLegend}
          title="Porovnání dvou sluchátek"
        >
          <ProductRadar />
        </ChartCard>

        <ChartCard
          className="lg:col-span-2"
          description="Průměrná doba od objednávky po doručení v hodinách, posledních 28 dní"
          footer={
            <DataTable
              columns={["Den", "Kurýr (h)", "Výdejna (h)"]}
              rows={deliveryTimes.map((row) => [
                dayFmt.format(row.date),
                hoursFmt.format(row.kuryr),
                hoursFmt.format(row.vydejna),
              ])}
            />
          }
          legend={deliveryLegend}
          title="Doba doručení"
        >
          <DeliveryScatter />
        </ChartCard>
      </div>
    </div>
  );
}
