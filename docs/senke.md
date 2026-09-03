# Senke

- Ruta: `/senke`
- Fajl: `app/senke/page.tsx`
- Kategorija: logika
- Ikona: `/icons/senke.png`

## Za dete

Levo su šarene slike, desno njihove senke izmešanog reda. Prevlači sliku na pravu senku. Tačno: senka postane šarena i zablista zeleno. Pogrešno: slika se vrati levo. Kad spoji sve: Bravo i konfete.

## Kako radi

- Slike: `/senke/bager.png`, `/senke/dinosaurus.png`, `/senke/raketa.png`, `/senke/kraba.png`
- Senke: iste slike sa `brightness-0 opacity-20 filter drop-shadow-md`
- Drag-and-drop preko **framer-motion**; pogodak se meri preklapanjem prsta/miša sa drop zonom
- Tačan par: `playTacno` + zeleni sjaj (`drop-shadow-green-500`)
- Dugme „Igraj ponovo“ ponovo meša senke

## Beleške

Vežba vizuelno sparivanje oblika. Nema naslova kolona — interfejs je vizuelan.
