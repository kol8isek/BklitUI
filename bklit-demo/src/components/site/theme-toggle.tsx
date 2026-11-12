"use client";

import { Moon, Sun } from "lucide-react";
import { useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";

function prefersDark(): boolean {
  try {
    const stored = localStorage.getItem("theme");
    if (stored) {
      return stored === "dark";
    }
  } catch {
    // localStorage nemusí být dostupné (soukromé okno apod.)
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeToggle() {
  // Při vývoji React po opětovném připojení smaže třídu, kterou nastavil
  // skript v <head>. Tady ji vracíme zpět; v produkci se nic nezmění.
  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", prefersDark());
  }, []);

  function toggle() {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Bez úložiště se volba jen nezapamatuje.
    }
  }

  return (
    <Button
      aria-label="Přepnout světlý a tmavý motiv"
      onClick={toggle}
      size="icon"
      variant="ghost"
    >
      <Sun className="hidden dark:block" />
      <Moon className="dark:hidden" />
    </Button>
  );
}
