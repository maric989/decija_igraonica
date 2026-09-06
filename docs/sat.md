# Koliko je sati?

- Ruta: `/sat`
- Fajl: `app/sat/page.tsx`
- Kategorija: matematika
- Ikona: `/icons/sat.png`

## Za dete

Veliki analogni sat. Dva moda: **Pročitaj sat** (podrazumevano) i **Namesti sat**. Težina: **Lako** (puni sati) i **Teško** (`:00`, `:15`, `:30`, `:45` — mala kazaljka ide između brojeva).

## Kako radi

- `target` je nasumično vreme; u „Namesti“ dete klikne sat (i minute na teškom), pa Potvrdi
- U „Pročitaj“ sat je fiksiran, ispod su 3 dugmeta (jedan tačan)
- Lako: samo `:00`. Teško: četvrti sata; netačne opcije su isti sat / susedni sat
- Tačno: `playTacno` + konfete + Bravo, pa sledeći zadatak
- Netačno: `playNetacno`; sat se drmne (Namesti) ili dugme pocrveni (Pročitaj)
- Kazaljke: minuti `* 6`, sati `* 30 + minuti * 0.5` (Framer Motion)

## Beleške

Layout je `h-[100dvh]` bez skrola. Pored zadatka u „Namesti“ stoji i digitalni `3:30` da povežu analogni i digitalni sat.
