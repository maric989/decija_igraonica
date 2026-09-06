# Ideje za nove igre

Nisu urađene. Predlozi ruta i ikona su radni — ikone još nisu u `public/icons/`.

Redosled kod slova: **Slovo na Slovo** (prvo slovo) → **Sastavi Reč** (ređa data slova) → **Pogodi Reč** (pogađa na slepo).

---

# Veseli Oblici

- Ruta: `/oblici`
- Fajl: `app/oblici/page.tsx`
- Kategorija: matematika / logika
- Ikona: `/icons/oblici.jpeg` (3D krug, kvadrat i trougao sa licima)

## Za dete

Na ekranu je „rupa“ određenog oblika (npr. zvezda), a pored su tri različita oblika. Prevlači pravi oblik u rupu. Kad pogodi, oblik se nasmeje i kaže svoje ime: „Kvadrat!“.

## Kako radi

- Oblici: krug, kvadrat, trougao, pravougaonik, zvezda, srce.
- Drag-and-drop (kao Senke). Ako je na telefonu teško, fallback: klik na pravi oblik.
- Audio izgovara naziv oblika.

## Beleške

Vežba prepoznavanje geometrijskih oblika. Lica na oblicima drže isti veseli ton kao ostale igre.

---

# Sastavi Reč

- Ruta: `/sastavi-rec`
- Fajl: `app/sastavi-rec/page.tsx`
- Kategorija: slova
- Ikona: `/icons/sastavi-rec.jpeg` (razbacane kockice sa slovima)

## Za dete

Vidi sliku (npr. MAČKA) i prazna polja ispod. Slova su razbacana na dnu. Klikće slova pravim redom da sastavi reč.

## Kako radi

- Korak između Slovo na Slovo i Pogodi Reč: dete vidi sva potrebna slova, ali ih ređa.
- Pogrešno slovo: zacrveni se i vrati nazad (`playNetacno`).
- Tačna reč: slika, audio, `playTacno` / Bravo.

## Beleške

Reči i slike iz `lib/azbuka.ts`. Kockice su ćirilica. Kratke reči (3–5 slova) za predškolce.

---

# Muzička Pamtilica

- Ruta: `/igraonica/muzicka-pamtilica`
- Fajl: `app/igraonica/muzicka-pamtilica/page.tsx`
- Kategorija: logika / memorija
- Ikona: `/icons/muzika.jpeg` (šarena klavijatura ili 4 obojena polja)

## Za dete

Četiri polja različitih boja zasvetle redom uz zvukove. Dete ponovi redosled. Počinje sa dva tona, pa se niz duži.

## Kako radi

- Simon Says: prikaži niz → dete tapne isti niz.
- Tonovi preko Web Audio API (`lib/sounds.ts` ili lokalni oscilator).
- Pogrešan tap: kratka greška, isti niz ponovo (ili od početka — odluka pri implementaciji).
- Svetlosni efekti na poljima (pulse / glow).

## Beleške

Vežba kratkoročnu memoriju i koncentraciju. Nema slova ni brojeva — čista logika. Gornja granica niza da ne frustrire (npr. 8).

---

# Čuvari Prirode

- Ruta: `/igraonica/cuvari-prirode`
- Fajl: `app/igraonica/cuvari-prirode/page.tsx`
- Kategorija: logika / svet oko nas
- Ikona: `/icons/ekologija.jpeg` (kante za smeće različitih boja)

## Za dete

Tri kante: plava (papir), žuta (plastika), zelena (staklo). Predmeti padaju odozgo. Dete klikne pravu kantu da ih uhvati.

## Kako radi

- Predmeti: novine, flaša, kesa, tegla…
- Brzina padanja blago raste.
- Tačno: predmet upadne u kantu, `playTacno`.
- Netačno: kanta zadrhti, predmet nestane, `playNetacno`.

## Beleške

Edukacija o reciklaži, ne takmičenje na vreme. Boje kanti držati kao u Srbiji (plava / žuta / zelena) da naučeno važi i van ekrana.

---

# Koliko je sati?

- Ruta: `/sat`
- Fajl: `app/sat/page.tsx`
- Kategorija: matematika / svet oko nas
- Ikona: `/icons/sat.jpeg` (veseo zidni sat)

## Za dete

Veliki analogni sat sa kazaljkama. Glas kaže: „Namesti sat na 3 sata.“ Dete prstom okreće veliku kazaljku.

## Kako radi

- Dva moda: **Namesti sat** (okreće kazaljku) i **Koji je ovo sat?** (bira broj).
- Prvo samo puni sati (1:00, 2:00…). Za stariju decu: pola (3:30).
- Brojevi 1–12 u krugu; vežba i analogni sat i brojanje.

## Beleške

Počni od moda „Namesti sat“ i punih sati. Digitalni prikaz pored analognog pomaže da povežu 3:00 sa kazaljkama. Kazaljka za minute može biti zaključana na 12 dok se ne uvede pola.

