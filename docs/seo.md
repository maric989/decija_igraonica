# SEO — šta je postavljeno

Sajt: [https://www.decija-ucionica.com](https://www.decija-ucionica.com). Next.js 16 App Router, metadata API, deploy na Vercel.

Nema baze ni CMS-a. SEO živi u `lib/seo.ts`, `app/layout.tsx`, `app/sitemap.ts` i `app/<ruta>/layout.tsx`.

## Brend

| Gde | Ime |
|---|---|
| `<title>`, OG `siteName`, `applicationName` | **Dečija Učionica** |
| Logo na početnoj, `alternateName` u JSON-LD, description | Moja Pametna Učionica |
| Domen | decija-ucionica.com |

Šablon naslova: `%s | Dečija Učionica`. Title igre je kratak, **bez** `|` (npr. `Vaga` → `Vaga | Dečija Učionica`).

## Root (`app/layout.tsx`)

| Polje | Vrednost |
|---|---|
| `html lang` | `sr` |
| `metadataBase` | `https://www.decija-ucionica.com/` |
| `title.default` | Dečija Učionica \| Edukativne igre za predškolce |
| `title.template` | `%s \| Dečija Učionica` |
| `description` | Dečija Učionica (Moja Pametna Učionica) — besplatne igre, ćirilica, predškolci, bez naloga |
| `twitter.card` | `summary_large_image` |
| `alternates.canonical` | `/` |
| JSON-LD | `WebSite` + `WebApplication` (besplatno, preschool, `inLanguage: sr`) |
| Font | Nunito (`latin` + `latin-ext`) |

Početna ima kratak pasus ispod loga (indeksabilan tekst, ne samo kartice).

## Po igri

`lib/seo.ts` → `igraMetadata` + `igraJsonLd`. Layout samo zove `igraLayout("/ruta")`.

- `title` + `description`
- `openGraph.title` / `description` (isti kao meta)
- `alternates.canonical` = pathname (Next dodaje `metadataBase`)
- JSON-LD `LearningResource` + `educationalLevel: preschool`

## Sitemap (`app/sitemap.ts`)

Izlaz: `https://www.decija-ucionica.com/sitemap.xml`

- Početna + sve igre, uključujući `/senke`
- `lastModified` je **fiksni datum** iz `lib/seo.ts`, ne `new Date()` na build
- Alias `/igraonica/magicna-masina` nije u sitemapu

## Alias pisaće mašine

`next.config.ts`: **308** sa `/igraonica/magicna-masina` → `/igraonica/magicna-pisaca-masina`.

## Robots

`https://www.decija-ucionica.com/robots.txt` — `Allow: /`, pokazuje na sitemap.

## Ikone i deljenje

| Fajl | Uloga |
|---|---|
| `app/favicon.ico` | Favicon |
| `app/icon.png` | Ikona u tabu |
| `app/apple-icon.png` | Apple touch icon |
| `app/opengraph-image.png` | Default OG slika (~1200×630) |

Po-igri `opengraph-image` (ikona na pastelnoj pozadini) **nije** urađen — sve igre dele root OG sliku.

## Šta ostaje van koda

- Search Console: indeksirane URL, Core Web Vitals (Speed Insights već radi)
- Lighthouse / Facebook Sharing Debugger posle deploya
- Keyword meta Google ignoriše; rangiranje ide preko `<h1>`, description i vidljivog teksta

## Gde dirati

| Želiš | Fajl |
|---|---|
| Brend, opis, OG, Twitter, JSON-LD sajta | `lib/seo.ts`, `app/layout.tsx` |
| Title/opis/datum jedne igre | `lib/seo.ts` (`IGRE_SEO`) |
| Sitemap | `app/sitemap.ts` (čita `IGRE_SEO`) |
| Redirect alias | `next.config.ts` |
| Favicon / OG default slika | `app/icon.png`, `app/opengraph-image.png` |

Posle izmene metadata: `npm run build` ili View Source na produkciji. Dev overlay nije merodavan za share preview — koristi [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/).
