# Orbita – ukázkový web s grafy Bklit UI

Analytický web smyšleného e-shopu postavený na Next.js, shadcn/ui a grafech
[Bklit UI](https://ui.bklit.com). Všechna data jsou vymyšlená.

## Spuštění

Dvakrát klikněte na `spustit.cmd` (nebo ho spusťte v terminálu) a otevřete
<http://localhost:3000>. Server ukončíte klávesami `Ctrl+C`.

Skript používá přenosný Node.js ze složky `..\.tools`, takže Node.js nemusí být
v systému nainstalovaný.

## Stránky

- `/` – úvod
- `/prehled` – hlavní ukazatele, tržby, cíle, aktivita podpory
- `/navstevnost` – návštěvy, mapa, zařízení, cesta návštěvníka, trychtýř
- `/prodej` – nejprodávanější produkty, kategorie, kanály, doba doručení
- `/finance` – akcie, měsíční tržby, rozpočet, živé objednávky
- `/galerie` – všech 18 typů grafů s instalačním příkazem

## Struktura

- `src/components/charts` – grafy z registru (`npx shadcn@latest add @bklit/<název>`),
  upravené do češtiny. Pozor: `add --overwrite` úpravy přepíše.
- `src/components/demo` – konkrétní grafy webu
- `src/components/site` – hlavička, patička, karty, tabulky
- `src/data` – ukázková data a barvy řad
