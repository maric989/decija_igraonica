# SEO — šta je postavljeno i šta može bolje

Pregled za review. Sajt: [https://www.decija-ucionica.com](https://www.decija-ucionica.com). Next.js 16 App Router, metadata API, deploy na Vercel.

Nema baze ni CMS-a. SEO živi u fajlovima ispod `app/`.

## Šta radi danas

### Root (`app/layout.tsx`)

| Polje | Vrednost |
|---|---|
| `html lang` | `sr` |
| `metadataBase` | `https://www.decija-ucionica.com/` |
| `title.default` | Moja Pametna Učionica \| Edukativne igre za decu |
| `title.template` | `%s \| Moja Pametna Učionica` |
| `description` | Dečija Učionica… ćirilica, slova, brojevi, logika, predškolci |
| `applicationName` | Dečija Učionica |
| `keywords` | brend + ćirilica + brojevi + predškolci |
| `openGraph` | `type: website`, `locale: sr_RS`, naslov i opis (kraći od meta description) |
| Font | Nunito (`latin` + `latin-ext`) |

Početna (`app/page.tsx`) **nema** svoj `metadata` — nasleđuje default iz root layouta. To je u redu.

### Ikone i deljenje (fajlovi, ne kod)

Next automatski ih pokupi iz `app/`:

| Fajl | Uloga |
|---|---|
| `app/favicon.ico` | Favicon |
| `app/icon.png` | Ikona u tabu / PWA-ish |
| `app/apple-icon.png` | Apple touch icon |
| `app/opengraph-image.png` | Default OG slika za share (Facebook, iMessage…) |

Nema `twitter-image.png` ni `twitter` polja u metadata. Twitter/X obično padne na OG, ali nije eksplicitno `summary_large_image`.

### Po igri (`app/<ruta>/layout.tsx`)

Samo `title` + `description`. Nema `openGraph`, `alternates.canonical`, ni JSON-LD po strani.

Zbog `title.template`, u tabu i Google-u naslov igre postaje:

`{title iz layouta} | Moja Pametna Učionica`

Ako `title` već ima `|` (npr. `Vaga | Uravnoteži brojeve`), dobija se **dupli pipe**:

`Vaga | Uravnoteži brojeve | Moja Pametna Učionica`

| Ruta | Title u layoutu |
|---|---|
| `/uci-slova` | Uči Slova i Ćirilicu |
| `/uci-brojeve` | Učenje Brojeva do 10 |
| `/slovo-na-slovo` | Slovo na Slovo \| Igra prepoznavanja prvog slova |
| `/pogodi-rec` | Pogodi Reč \| Čarobni Baloni |
| `/matematika` | Matematičke Avanture \| Sabiranje i Oduzimanje |
| `/vaga` | Vaga \| Uravnoteži brojeve |
| `/senke` | Senke \| Poveži parove |
| `/igraonica/brojalica` | Igra Brojalica za Decu |
| `/igraonica/memorija` | Igra Memorije \| Spoji slovo i sliku |
| `/igraonica/carobna-tastatura` | Čarobna Tastatura \| Padajuća slova |
| `/igraonica/magicna-pisaca-masina` | Magična Pisaća Mašina |
| `/igraonica/magicna-masina` | Magična Pisaća Mašina (isti sadržaj, alias rute) |

Igre su `"use client"` stranice. To **ne kvari** SEO: metadata ostaje u server `layout.tsx`, Google vidi `<title>` i `<meta>`.

### Sitemap (`app/sitemap.ts`)

Izlaz: `https://www.decija-ucionica.com/sitemap.xml`

- Početna: `priority: 1`, `changeFrequency: yearly`
- Igre: `priority: 0.8`, `changeFrequency: monthly`
- `lastModified: new Date()` — **svaki build** pomera datum. To nije signal „sadržaj se promenio“, samo da je deploy bio danas.

**Nedostaje u sitemapu:** `/senke`. Alias `/igraonica/magicna-masina` namerno nije (kanon je `magicna-pisaca-masina`).

### Robots (`app/robots.ts`)

`https://www.decija-ucionica.com/robots.txt`

- `User-agent: *` → `Allow: /`
- Pokazuje na sitemap
- Nema `Disallow`, nema `host`, nema posebnih pravila za AI crawlere

### Šta **nije** postavljeno

- `alternates.canonical` po strani
- JSON-LD (`WebApplication`, `WebSite`, `Game`, `BreadcrumbList`)
- `openGraph` / OG slika **po igri** (sve deli jednu `opengraph-image.png`)
- `twitter: { card: "summary_large_image" }`
- `manifest.webmanifest` / PWA ime
- `hreflang` (samo `sr`; UI naslovi su latinica, igre ćirilica)
- `robots` noindex na alias ruti `magicna-masina`
- Semantički `<h1>` konzistentan sa title-om (početna h1 je logo-link)

---

## Brend — tri imena

Ovo je najveći sadržajni dug:

1. **Moja Pametna Učionica** — title, šablon, logo na početnoj
2. **Dečija Učionica** — `applicationName`, OG `siteName`, description
3. **decija-ucionica.com** — domen + keyword `decija-ucionica`

Za Google i roditelje treba jedan primarni brend u `<title>` i OG, a ostalo kao „takođe poznato“ u tekstu, ne kao konkuretni naslov.

---

## Predlog unapređenja (prioritet)

### 1. Brzo, visok uticaj

- Ubaci **`/senke` u sitemap**.
- Uskladi brend: jedan `title` / `siteName` (npr. Dečija Učionica jer je to domen), drugi naziv u opisu.
- Title igre **bez** `|` u layoutu (`title: "Vaga"`), šablon dodaje ` | Moja Pametna Učionica`.
- `lastModified` u sitemapu: fiksni datum ili datum poslednje prave izmene, ne `new Date()` na svaki build.
- Alias `/igraonica/magicna-masina`: `alternates.canonical` na `/igraonica/magicna-pisaca-masina` (ili redirect 308).

### 2. Deljenje i click-through

- `twitter: { card: "summary_large_image" }` u root metadata.
- Po igri: `openGraph.title` + `openGraph.description` (isti kao meta), opciono `opengraph-image` po ruti (ikona igre na pastelnoj pozadini).
- `alternates.canonical` = `metadataBase` + pathname.

### 3. Structured data

U root layout (ili početna) JSON-LD npr.:

- `WebSite` + `name` + `url` + `inLanguage: sr`
- `WebApplication` / `LearningResource`: besplatno, za decu, bez naloga
- Na igri: `VideoGame` ili `LearningResource` sa `educationalLevel`

### 4. Sadržaj za pretragu

Početna je mreža kartica — malo indeksabilnog teksta. Kratak pasus ispod loga („Besplatne igre za ćirilicu i brojeve…“) pomaže više od novih keyword niza.

Keyword meta tag Google **ignoriše**; lista u root layoutu ne škodi, ali ne rangira. Bolje: prirodne reči u `<h1>`, description i vidljivom tekstu (`ćirilica`, `predškolci`, `besplatno`).

### 5. Tehnika

- Lighthouse / Search Console: indeksirane URL, Core Web Vitals (Speed Insights već radi).
- OG slika: proveri dimenzije (ideal ~1200×630). Trenutni `opengraph-image.png` je ~178 KB.
- `lang="sr"` je OK; ako hoćeš preciznije: `sr-Latn` za UI ili ostavi `sr`.

---

## Gde dirati kod

| Želiš | Fajl |
|---|---|
| Globalni naslov, opis, OG, jezik | `app/layout.tsx` |
| Sitemap | `app/sitemap.ts` |
| robots.txt | `app/robots.ts` |
| Title/opis jedne igre | `app/<ruta>/layout.tsx` |
| Favicon / OG default slika | `app/icon.png`, `app/opengraph-image.png` |

Posle izmene metadata: `npm run build` ili pogledaj View Source na produkciji (`<title>`, `og:`, `canonical`). Dev overlay nije merodavan za share preview — koristi [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) ili sličan alat.
