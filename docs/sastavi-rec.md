# Sastavi Reč

- Ruta: `/sastavi-rec`
- Fajl: `app/sastavi-rec/page.tsx`
- Kategorija: slova
- Ikona: `/icons/sastavi-rec.png`

## Za dete

Vidi sliku (ili emoji) i prazna polja. Na dnu su kockice sa slovima. Klikće slova pravim redom. Pogrešno slovo: kockica zadrhti i pocrveni. Kad sastavi reč: Bravo, pa sama ide sledeća.

## Kako radi

- 55 kratkih reči (3–5 slova) u `lib/sastavi-rec.ts`
- Slike iz `public/slike/` gde postoje; inače emoji
- Kockice imaju jedinstven ID (dva иста slova, npr. МАЦА)
- Tačno: `playPop`, slovo ide u slot
- Netačno: `playNetacno` + `animate-shake`
- Cela reč: `playTacno` + konfete, posle 2s sledeća reč

## Beleške

Korak između Slovo na Slovo i Pogodi Reč. Layout je `h-[100dvh]` bez skrola. Slova ostaju ćirilica (ne prelaze na latinicu sa UI prekidačem).
