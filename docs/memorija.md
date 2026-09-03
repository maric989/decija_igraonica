# Memorija

- Ruta: `/igraonica/memorija`
- Fajl: `app/igraonica/memorija/page.tsx`
- Kategorija: logika
- Ikona: `/icons/memorija.jpeg`

## Za dete

16 kartica (4×4). Okreće dve. Ako su ista slika — par ostaje otvoren. Ako nisu — vrate se. Cilj: naći svih 8 parova.

## Kako radi

- Slike: `public/slike/` (avion, torta, auto, cvet, srce, psić, jabuka, sunce).
- 3D flip. Tabla je zaključana dok se netačan par vraća (~1s).
- Brojač pronađenih parova i pokušaja.
- Na kraju: „Bravo!“ i dugme za novu igru (novo mešanje).

## Beleške

Na telefonu kartice moraju biti kvadrati koji se skupljaju sa širinom ekrana (ne fiksni `w-28`), inače se preklapaju.
