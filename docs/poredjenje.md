# Poređenje

- Ruta: `/poredjenje`
- Fajl: `app/poredjenje/page.tsx`
- Kategorija: matematika / logika
- Ikona: `/icons/poredjenje.png`

## Za dete

Pet jabuka različitih veličina. Prevlači ih na postolja na dnu, od najmanjeg do najvećeg. Pogrešno mesto: jabuka se vrati. Kad su sve na mestu: Bravo i konfete.

## Kako radi

- Jabuke: `/vaga/apple.png` sa Tailwind veličinama (`w-12` … `w-32`)
- Igra je u `max-w-4xl`; postolja su grupisana na sredini (`justify-center`, ne `justify-between`)
- Drag-and-drop preko **framer-motion**; pogodak se meri preklapanjem sa postoljem
- Tačno: `playTacno`, jabuka ostaje na postolju
- Netačno: `playNetacno` + snap back
- Sve pet: `playPobjeda` + konfete + „Igraj ponovo“ (novo mešanje)

## Beleške

Ista vrsta predmeta, poredi se samo veličina. Layout je `h-[100dvh]` bez skrola na telefonu.
