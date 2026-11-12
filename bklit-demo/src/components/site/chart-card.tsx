import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface LegendEntry {
  label: string;
  color: string;
  /** Volitelná hodnota za popiskem. */
  value?: string;
}

/** Legenda: barevná značka nese identitu, text zůstává v běžné barvě písma. */
export function SeriesLegend({
  items,
  className,
}: {
  items: LegendEntry[];
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "flex flex-wrap gap-x-4 gap-y-1 text-muted-foreground text-sm",
        className
      )}
    >
      {items.map((item) => (
        <li className="flex items-center gap-1.5" key={item.label}>
          <span
            aria-hidden
            className="size-2.5 shrink-0 rounded-[3px]"
            style={{ background: item.color }}
          />
          <span>{item.label}</span>
          {item.value ? (
            <span className="font-medium text-foreground tabular-nums">
              {item.value}
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

/** Karta s nadpisem, popisem, volitelnou legendou a grafem. */
export function ChartCard({
  title,
  description,
  legend,
  footer,
  className,
  contentClassName,
  children,
}: {
  title: string;
  description?: string;
  legend?: LegendEntry[];
  footer?: ReactNode;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
}) {
  return (
    <Card className={cn("min-w-0", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
        {legend ? <SeriesLegend className="pt-1" items={legend} /> : null}
      </CardHeader>
      {/* Graf se v kartě roztáhne na výšku a vystředí, patička zůstane dole. */}
      <CardContent
        className={cn(
          "flex min-w-0 flex-1 flex-col justify-center",
          contentClassName
        )}
      >
        {children}
      </CardContent>
      {footer ? (
        <div className="px-(--card-spacing) text-muted-foreground text-sm">
          {footer}
        </div>
      ) : null}
    </Card>
  );
}

/** Nadpis stránky se stručným úvodem. */
export function PageHeading({
  title,
  lead,
  children,
}: {
  title: string;
  lead: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 pb-6">
      <h1 className="font-semibold text-2xl tracking-tight sm:text-3xl">
        {title}
      </h1>
      <p className="max-w-2xl text-muted-foreground">{lead}</p>
      {children}
    </div>
  );
}
