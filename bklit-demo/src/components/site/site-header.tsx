"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

// Na telefonu se odkaz „Úvod“ skryje: na úvod vede i logo a jinak by se
// navigace na úzké obrazovce nevešla.
const links = [
  { href: "/", label: "Úvod", desktopOnly: true },
  { href: "/prehled", label: "Přehled" },
  { href: "/navstevnost", label: "Návštěvnost" },
  { href: "/prodej", label: "Prodej" },
  { href: "/finance", label: "Finance" },
  { href: "/galerie", label: "Galerie" },
];

function Logo() {
  return (
    <svg
      aria-hidden
      className="size-6"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="4" fill="var(--chart-1)" />
      <ellipse
        cx="12"
        cy="12"
        rx="10.5"
        ry="5"
        stroke="currentColor"
        strokeWidth="1.5"
        transform="rotate(-28 12 12)"
      />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-6 px-4 sm:px-6">
        <Link
          className="flex h-14 items-center gap-2 font-semibold tracking-tight"
          href="/"
        >
          <Logo />
          Orbita
        </Link>

        <div className="ml-auto flex items-center sm:order-3 sm:ml-0">
          <ThemeToggle />
        </div>

        <nav
          aria-label="Hlavní navigace"
          className="-mx-4 flex w-[calc(100%+2rem)] gap-1 overflow-x-auto px-4 pb-2 sm:order-2 sm:mx-0 sm:w-auto sm:flex-1 sm:px-0 sm:pb-0"
        >
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={cn(
                  "shrink-0 rounded-md px-2 py-1.5 text-sm transition-colors sm:px-3",
                  "desktopOnly" in link && "hidden sm:block",
                  active
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
