import type { Metadata } from "next";
import { BudgetGauge } from "@/components/demo/budget-gauge";
import { LiveOrders } from "@/components/demo/live-orders";
import { PriceCandles } from "@/components/demo/price-candles";
import { RevenueComposed } from "@/components/demo/revenue-composed";
import { ChartCard, PageHeading } from "@/components/site/chart-card";
import { DataTable } from "@/components/site/data-table";
import { formatNumber, monthlyRevenue } from "@/data/demo";
import { candleLegend, composedLegend } from "@/data/legends";

export const metadata: Metadata = { title: "Finance" };

const monthFmt = new Intl.DateTimeFormat("cs-CZ", {
  month: "long",
  year: "numeric",
});

export default function FinancePage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 sm:px-6">
      <PageHeading
        lead="Kurz akcie, měsíční tržby, čerpání rozpočtu a objednávky přicházející právě teď."
        title="Finance"
      />

      <ChartCard
        description="Denní kurz za posledních 60 obchodních dní (Kč)"
        legend={candleLegend}
        title="Akcie Orbita"
      >
        <PriceCandles />
      </ChartCard>

      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard
          className="lg:col-span-2"
          description="Posledních 12 měsíců v tisících korun"
          footer={
            <DataTable
              columns={["Měsíc", "Tržby (tis. Kč)", "Průměr za 3 měsíce"]}
              rows={monthlyRevenue.map((row) => [
                monthFmt.format(row.date),
                formatNumber(row.trzby),
                formatNumber(row.prumer),
              ])}
            />
          }
          legend={composedLegend}
          title="Měsíční tržby a klouzavý průměr"
        >
          <RevenueComposed />
        </ChartCard>

        <ChartCard
          description="Roční rozpočet na marketing"
          title="Čerpání rozpočtu"
        >
          <BudgetGauge />
        </ChartCard>
      </div>

      <ChartCard
        description="Simulovaný živý přenos: nový bod každou sekundu, okno 30 sekund"
        title="Objednávky za minutu právě teď"
      >
        <LiveOrders />
      </ChartCard>
    </div>
  );
}
