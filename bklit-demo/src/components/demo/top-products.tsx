"use client";

import { LineSparkline } from "@/components/charts";
import { TrendBadge } from "@/components/trend-badge";
import { formatCzk, formatNumber, topProducts } from "@/data/demo";

/**
 * Nejprodávanější produkty: v každém řádku malý graf prodaných kusů po dnech.
 * Graf je jen obrázek trendu, přesná čísla jsou ve sloupcích vedle, proto
 * nereaguje na najetí myší.
 */
export function TopProducts() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
        <thead className="text-muted-foreground">
          <tr>
            <th className="py-2 pr-3 font-medium" scope="col">
              Produkt
            </th>
            <th className="px-3 py-2 font-medium" scope="col">
              Kusy po dnech
            </th>
            <th className="px-3 py-2 text-right font-medium" scope="col">
              Kusy
            </th>
            <th className="px-3 py-2 text-right font-medium" scope="col">
              Tržby
            </th>
            <th className="py-2 pl-3 text-right font-medium" scope="col">
              Změna
            </th>
          </tr>
        </thead>
        <tbody>
          {topProducts.map((product) => (
            <tr className="border-t" key={product.nazev}>
              <th className="py-2.5 pr-3 font-normal" scope="row">
                <span className="block font-medium">{product.nazev}</span>
                <span className="block text-muted-foreground text-xs">
                  {product.kategorie}
                </span>
              </th>
              <td className="px-3 py-2.5">
                <LineSparkline
                  aria-label={`Prodané kusy po dnech, ${product.nazev}`}
                  color="var(--chart-1)"
                  curve="monotone"
                  data={product.series}
                  dataKey="value"
                  endDot
                  height={32}
                  interactive={false}
                  padding={{ top: 4, bottom: 4, right: 4 }}
                  strokeWidth={1.5}
                  width={128}
                />
              </td>
              <td className="px-3 py-2.5 text-right tabular-nums">
                {formatNumber(product.kusy)}
              </td>
              <td className="px-3 py-2.5 text-right tabular-nums">
                {formatCzk(product.trzby)}
              </td>
              <td className="py-2.5 pl-3 text-right">
                <TrendBadge value={product.trend} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
