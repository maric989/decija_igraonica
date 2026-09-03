# Uči Slova

- Ruta: `/uci-slova`
- Fajl: `app/uci-slova/page.tsx`
- Kategorija: slova
- Ikona: `/icons/uci-slova.jpeg`

## Za dete

Klikne na slovo. Kartica se okrene: vidi sliku i reč (npr. А → АВИОН). Čuje glas koji kaže slovo i reč. Posle par sekundi kartica se vrati.

## Kako radi

- Podaci dolaze iz `lib/azbuka.ts` (30 slova azbuke).
- Audio: `public/slova/` (npr. `a kao avion.mp3`).
- Slike: `public/slike/azbuka/`.
- 3D flip kartice (CSS `rotateY`).

## Beleške

Ovo je ulazna igra — bez bodova i grešaka. Dete samo istražuje azbuku.
