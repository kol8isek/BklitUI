/**
 * Rozbalovací tabulka s daty grafu. Hodnoty tak nejsou dostupné jen po najetí
 * myší a přečte je i čtečka obrazovky.
 */
export function DataTable({
  columns,
  rows,
  summary = "Data v tabulce",
}: {
  columns: string[];
  rows: (string | number)[][];
  summary?: string;
}) {
  return (
    <details className="group text-sm">
      <summary className="w-fit cursor-pointer select-none rounded-md py-1 text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring">
        {summary}
      </summary>
      <div className="mt-2 max-h-64 overflow-auto rounded-lg border">
        <table className="w-full border-collapse text-left">
          <thead className="sticky top-0 bg-muted text-muted-foreground">
            <tr>
              {columns.map((column, index) => (
                <th
                  className={
                    index === 0
                      ? "px-3 py-2 font-medium"
                      : "px-3 py-2 text-right font-medium"
                  }
                  key={column}
                  scope="col"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr className="border-t" key={String(row[0])}>
                {row.map((cell, index) => (
                  <td
                    className={
                      index === 0
                        ? "px-3 py-1.5"
                        : "px-3 py-1.5 text-right tabular-nums"
                    }
                    key={columns[index] ?? index}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}
