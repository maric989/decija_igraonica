# Moja Pametna Učionica

Besplatna web aplikacija za decu predškolskog i ranog školskog uzrasta. Cilj je da kroz igru uče **ćirilicu**, **brojeve** i **logiku**, bez naloga, reklama i komplikovanih menija.

- Sajt: [https://www.decija-ucionica.com](https://www.decija-ucionica.com)
- Jezik: srpski (ćirilica u igrama, latinica u naslovima interfejsa)
- Publika: predškolci i prvačići, uz odraslu osobu u blizini

## Šta aplikacija radi

Na početnoj strani dete vidi mrežu velikih, šarenih kartica. Svaka kartica vodi u jednu igru. Nema nivoa naloga ni čuvanja rezultata na serveru — zvezdice i poeni ostaju samo tokom trenutne sesije.

Igre su podeljene u tri grupe:

| Kategorija | Igre |
|---|---|
| **Slova** | Uči Slova, Slovo na Slovo, Čarobna Tastatura, Magična Pisaća Mašina, Pogodi Reč |
| **Matematika** | Uči Brojeve, Brojalica, Matematička Avantura, Vaga |
| **Logika** | Memorija, Senke |

## Tehnologija

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4** za izgled
- Font **Nunito**
- Zvuk: MP3 fajlovi u `public/` + kratki tonovi preko Web Audio API (`lib/sounds.ts`)
- Deploy: **Vercel** (Analytics + Speed Insights)
- Nema baze, nema autentikacije, nema backend API-ja

## Važni folderi

| Putanja | Šta je |
|---|---|
| `app/` | Rute i stranice |
| `components/` | Zajednički UI (kartice, Nazad, ikona naslova) |
| `lib/azbuka.ts` | Sva ćirilična slova, reči, slike i audio |
| `lib/sounds.ts` | Veseli / netačni / pobednički zvuci |
| `public/icons/` | 3D slike za kartice i naslove igara ([kako se obrađuju](./ikone.md)) |
| `public/senke/` | Slike za igru Senke (bager, dinosaurus, raketa, kraba) |
| `public/vaga/` | Jabuka za igru Vaga (`apple.png`) |
| `public/slova/` | MP3 „A kao avion“ za Uči slova |
| `public/slike/azbuka/` | Slike pojmova uz slova |
| `public/audio/` | Brojevi, kratka slova, latinica za Čarobnu tastaturu |

## Kako pokrenuti

```bash
npm install
npm run dev
```

Otvori [http://localhost:3000](http://localhost:3000).

## Slike i ikone

- [Ikone: JPEG, PNG, konverzija](./ikone.md)

## SEO

- [SEO: šta je postavljeno i šta unaprediti](./seo.md)

## Igre

- [Uči Slova](./uci-slova.md)
- [Uči Brojeve](./uci-brojeve.md)
- [Slovo na Slovo](./slovo-na-slovo.md)
- [Čarobna Tastatura](./carobna-tastatura.md)
- [Memorija](./memorija.md)
- [Brojalica](./brojalica.md)
- [Magična Pisaća Mašina](./magicna-pisaca-masina.md)
- [Pogodi Reč](./pogodi-rec.md)
- [Matematička Avantura](./matematika.md)
- [Vaga](./vaga.md)
- [Senke](./senke.md)

## Buduće igre

- [Ideje: Veseli Oblici, Od Najmanjeg do Najvećeg, Sastavi Reč, Muzička Pamtilica, Čuvari Prirode, Koliko je sati?](./ideje.md)
