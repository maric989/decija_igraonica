# Vaga

- Ruta: `/vaga`
- Fajl: `app/vaga/page.tsx`
- Kategorija: brojevi / matematika
- Ikona: `/icons/vaga.png`

## Za dete

Na levom tasu je nekoliko jabuka (2–10). Treba da prevuče iste toliko jabuka iz korpe na desni tas. Vaga se naginje dok nije isto. Kad je ravnoteža: Bravo i konfete.

## Kako radi

- Jabuke: `/vaga/apple.png` (providna pozadina, bez `mix-blend-multiply`)
- `tiltAngle` je ograničen na ±25°; tasovi se pomeraju gore-dole sa grede
- Drag-and-drop jedne jabuke iz korpe (framer-motion); posle puštanja se vraća da može ponovo
- Tačan broj: `playPobjeda` + konfete + „Sledeći zadatak“
- „Isprazni tas“ vraća desnu stranu na 0 ako dete stavi previše

## Beleške

Vežba brojanje i pojam jednakosti kroz vagu, ne kroz sabiranje na papiru.
