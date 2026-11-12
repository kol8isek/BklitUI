import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { KpiRow } from "@/components/demo/kpi-row";
import { RevenueArea } from "@/components/demo/revenue-area";
import { ChartCard } from "@/components/site/chart-card";
import { buttonVariants } from "@/components/ui/button";
import { revenueLegend } from "@/data/legends";
import { cn } from "@/lib/utils";

const pages = [
  {
    href: "/prehled",
    title: "Přehled",
    text: "Čtyři hlavní ukazatele, tržby proti loňsku, plnění cílů a aktivita podpory.",
    charts: "Plošný, sloupcový a prstencový graf, teplotní mapa, sparkline",
  },
  {
    href: "/navstevnost",
    title: "Návštěvnost",
    text: "Kolik lidí přišlo, z jakých zemí a zařízení a kde na cestě k nákupu odpadli.",
    charts: "Čárový a koláčový graf, kartogram, Sankeyův diagram, trychtýř",
  },
  {
    href: "/prodej",
    title: "Prodej",
    text: "Nejprodávanější produkty, tržby podle kategorie a kanálu a doba doručení.",
    charts: "Vícevrstvý kruhový, radiální, paprskový a bodový graf, sparkline",
  },
  {
    href: "/finance",
    title: "Finance",
    text: "Kurz akcie, měsíční tržby s klouzavým průměrem, rozpočet a živé objednávky.",
    charts: "Svíčkový, složený a živý čárový graf, ukazatel",
  },
  {
    href: "/galerie",
    title: "Galerie grafů",
    text: "Všechny typy grafů na jednom místě i s příkazem pro instalaci.",
    charts: "Všech 18 typů rozdělených do pěti skupin",
    wide: true,
  },
];

const steps = [
  {
    title: "Připravte shadcn/ui",
    text: "Příkaz vytvoří soubor components.json, podle kterého se komponenty ukládají.",
    code: "npx shadcn@latest init",
  },
  {
    title: "Přidejte graf z registru @bklit",
    text: "Zdrojový kód grafu se zkopíruje do složky src/components/charts a doinstalují se závislosti.",
    code: "npx shadcn@latest add @bklit/area-chart",
  },
  {
    title: "Poskládejte ho z dílů",
    text: "Graf je obal, do kterého vkládáte mřížku, řady, osy a nápovědu.",
    code: `<AreaChart data={data}>
  <Grid horizontal />
  <Area dataKey="trzby" />
  <XAxis />
  <ChartTooltip />
</AreaChart>`,
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-10 sm:px-6 sm:py-14">
      <section className="flex flex-col gap-8">
        <div className="flex max-w-3xl flex-col gap-4">
          <p className="w-fit rounded-full border px-3 py-1 text-muted-foreground text-sm">
            Ukázkový web · Next.js, shadcn/ui a Bklit UI
          </p>
          <h1 className="text-balance font-semibold text-4xl tracking-tight sm:text-5xl">
            Data e-shopu Orbita v grafech Bklit UI
          </h1>
          <p className="text-lg text-muted-foreground">
            Smyšlený e-shop, skutečné komponenty. Web ukazuje 18 typů grafů z
            registru Bklit UI poskládaných do přehledu, návštěvnosti, prodeje a
            financí.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              className={cn(buttonVariants({ size: "lg" }), "px-4")}
              href="/prehled"
            >
              Otevřít přehled
              <ArrowRight data-icon="inline-end" />
            </Link>
            <Link
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "px-4"
              )}
              href="/galerie"
            >
              Galerie grafů
            </Link>
          </div>
        </div>

        <KpiRow />

        <ChartCard
          description="Denní tržby za posledních 60 dní proti stejnému období loni. Najetím zobrazíte hodnoty."
          legend={revenueLegend}
          title="Tržby"
        >
          <RevenueArea />
        </ChartCard>
      </section>

      <section aria-labelledby="co-najdete" className="flex flex-col gap-6">
        <h2
          className="font-semibold text-2xl tracking-tight"
          id="co-najdete"
        >
          Co na webu najdete
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => (
            <Link
              className={cn(
                "group flex flex-col gap-2 rounded-xl bg-card p-5 ring-1 ring-foreground/10 transition-shadow hover:ring-foreground/25 focus-visible:outline-2 focus-visible:outline-ring",
                "wide" in page && "sm:col-span-2"
              )}
              href={page.href}
              key={page.href}
            >
              <span className="flex items-center gap-2 font-medium text-base">
                {page.title}
                <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="text-muted-foreground text-sm">{page.text}</span>
              <span className="text-muted-foreground text-xs">
                {page.charts}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="jak-vznikl" className="flex flex-col gap-6">
        <div className="flex max-w-2xl flex-col gap-2">
          <h2
            className="font-semibold text-2xl tracking-tight"
            id="jak-vznikl"
          >
            Jak takový graf přidat
          </h2>
          <p className="text-muted-foreground">
            Bklit UI se neinstaluje jako balíček. Grafy se kopírují přímo do
            projektu, takže je můžete upravit. Na tomto webu jsou například
            formáty dat a čísel přepnuté do češtiny.
          </p>
        </div>
        <ol className="grid gap-4 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li
              className="flex min-w-0 flex-col gap-3 rounded-xl bg-card p-5 ring-1 ring-foreground/10"
              key={step.title}
            >
              <span className="flex items-center gap-2 font-medium">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground text-xs">
                  {index + 1}
                </span>
                {step.title}
              </span>
              <p className="text-muted-foreground text-sm">{step.text}</p>
              <pre className="mt-auto overflow-x-auto rounded-lg bg-muted p-3 font-mono text-xs leading-relaxed">
                <code>{step.code}</code>
              </pre>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
