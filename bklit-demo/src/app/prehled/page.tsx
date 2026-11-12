import type { Metadata } from "next";
import { ActivityHeatmap } from "@/components/demo/activity-heatmap";
import { CategoryBars } from "@/components/demo/category-bars";
import { GoalRings } from "@/components/demo/goal-rings";
import { KpiRow } from "@/components/demo/kpi-row";
import { RevenueArea } from "@/components/demo/revenue-area";
import { ChartCard, PageHeading } from "@/components/site/chart-card";
import { DataTable } from "@/components/site/data-table";
import {
  categoryOrders,
  dailyRevenue,
  formatCzk,
  formatNumber,
} from "@/data/demo";
import { categoryLegend, revenueLegend } from "@/data/legends";

export const metadata: Metadata = { title: "Přehled" };

const dayFmt = new Intl.DateTimeFormat("cs-CZ", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
});

export default function PrehledPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 sm:px-6">
      <PageHeading
        lead="Hlavní ukazatele e-shopu za posledních 14 dní, vývoj tržeb a plnění měsíčních cílů. Najetím na graf zobrazíte přesné hodnoty."
        title="Přehled"
      />

      <KpiRow />

      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard
          className="lg:col-span-2"
          description="Denní tržby za posledních 60 dní proti stejnému období loni"
          footer={
            <DataTable
              columns={["Den", "Letos", "Loni"]}
              rows={dailyRevenue.map((row) => [
                dayFmt.format(row.date),
                formatCzk(row.letos),
                formatCzk(row.loni),
              ])}
            />
          }
          legend={revenueLegend}
          title="Tržby"
        >
          <RevenueArea />
        </ChartCard>

        <ChartCard
          description="Stav k poslednímu dni měsíce"
          title="Plnění měsíčních cílů"
        >
          <GoalRings />
        </ChartCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard
          description="Počet objednávek v tomto a minulém měsíci"
          footer={
            <DataTable
              columns={["Kategorie", "Tento měsíc", "Minulý měsíc"]}
              rows={categoryOrders.map((row) => [
                row.kategorie,
                formatNumber(row.tento),
                formatNumber(row.minuly),
              ])}
            />
          }
          legend={categoryLegend}
          title="Objednávky podle kategorie"
        >
          <CategoryBars />
        </ChartCard>

        <ChartCard
          description="Vyřízené požadavky zákaznické podpory po dnech, posledních 26 týdnů"
          title="Aktivita podpory"
        >
          <ActivityHeatmap />
        </ChartCard>
      </div>
    </div>
  );
}
