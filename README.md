# Dečija Učionica

Besplatne edukativne igre za predškolce: **ćirilica**, slova, brojevi i logika. Nema naloga, reklama ni baze — sve radi u pregledaču.

- Sajt: [https://www.decija-ucionica.com](https://www.decija-ucionica.com)
- Na početnoj je mreža kartica; svaka vodi u jednu igru
- Jezik: srpski (podrazumevano ćirilica u UI; prekidač Ћирилица / Latinica na početnoj)
- Igre uče ćirilicu — slova i reči u igrama se ne prebacuju na latinicu
- Kontakt / privatnost: `/o-nama`

Vidljivi naziv na početnoj je **Moja Pametna Učionica**; u tabu i SEO-u je Dečija Učionica.

Detalji po igri, ikone i SEO: [`docs/`](./docs/README.md).

## Igre

| Igra | Ruta |
|---|---|
| Uči Slova | `/uci-slova` |
| Uči Brojeve | `/uci-brojeve` |
| Slovo na Slovo | `/slovo-na-slovo` |
| Sastavi Reč | `/sastavi-rec` |
| Memorija | `/igraonica/memorija` |
| Brojalica | `/igraonica/brojalica` |
| Pogodi Reč | `/pogodi-rec` |
| Matematička Avantura | `/matematika` |
| Vaga | `/vaga` |
| Poređenje | `/poredjenje` |
| Senke | `/senke` |
| Magična Pisaća Mašina | `/igraonica/magicna-pisaca-masina` |
| Čarobna Tastatura | `/igraonica/carobna-tastatura` |

Stari URL `/igraonica/magicna-masina` ide 308 na pisaću mašinu.

## Pokretanje

Treba [Node.js](https://nodejs.org/) (LTS).

```bash
npm install
npm run dev
```

Otvori [http://localhost:3000](http://localhost:3000).

| Komanda | Šta radi |
|---|---|
| `npm run dev` | lokalni server (Turbopack) |
| `npm run build` | produkcijski build |
| `npm start` | pokreni build |
| `npm run lint` | ESLint |

Nema `.env`. Deploy je na Vercel (Analytics + Speed Insights).

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Nunito.

```
app/           rute (početna, igre, /o-nama)
components/    kartice, Nazad, JSON-LD
lib/           azbuka, zvuci, SEO
public/        ikone, slike, audio
docs/          opis igara i setup detalji
```
