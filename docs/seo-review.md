# SEO review — po strani

Inventar šta **trenutno postoji** na svakoj URL. Tehnički setup: [seo.md](./seo.md). Izvori: `lib/seo.ts`, `app/layout.tsx`, `app/*/layout.tsx`, `app/sitemap.ts`.

Sajt: [https://www.decija-ucionica.com](https://www.decija-ucionica.com)

Kako čitati:

- **`<title>`** = tab + Google naslov. Šablon: `%s | Dečija Učionica`.
- **Description** = meta + OG + Twitter (isti tekst).
- **`<h1>`** = vidljivi naslov na stranici (Google ga čita).
- Metadata je **latinica**. Vidljivi UI (h1, kartice) ide kroz prekidač; podrazumevano **ćirilica**.

---

## Šta ima svaka igra (automatski)

Layout zove `igraLayout("/ruta")`. Ne moraš to da proveravaš po fajlu, osim ako ruta nije u `IGRE_SEO`.

| Polje | Vrednost |
|---|---|
| `<title>` | `{naslov} \| Dečija Učionica` |
| `description` | iz `IGRE_SEO` |
| Canonical | `https://www.decija-ucionica.com{path}` |
| Open Graph | isti title/description, `url`, `siteName: Dečija Učionica`, `locale: sr_RS`, `type: website` |
| Twitter | `summary_large_image` + isti title/description |
| OG slika | **ista za sve** — `app/opengraph-image.png` (nema slike po igri) |
| JSON-LD | `LearningResource` + `BreadcrumbList` (Početna → igra) + `Game` + `preschool` |
| Sitemap | da, `priority: 0.8`, `changefreq: monthly`, `lastModified` fiksni datum |

Nema po igri: keywords, `opengraph-image` u folderu igre, `twitter:image` posebno, FAQ / HowTo schema.

---

## Početna `/`

| | |
|---|---|
| `<title>` | Dečija Učionica \| Edukativne igre za predškolce |
| Description | Besplatne edukativne igre za predškolce i mlađu decu. Uči ćirilicu, slova, brojeve i logiku kroz zabavne 3D igrice bez reklama i otvaranja naloga. |
| Canonical | `/` |
| `<h1>` | Dečija Učionica |
| Vidljivi tekst | Podnaslov **Moja Pametna Učionica** + „Besplatne igre za ćirilicu i brojeve…“ + nazivi igara na karticama |
| JSON-LD | `WebSite` + `WebApplication` (u root layoutu, ide i na ostale strane). Na početnoj još `FAQPage`. |
| Keywords | samo ovde, u `app/layout.tsx` (Google ih ionako ignoriše) |
| Sitemap | da, `priority: 1`, lastModified `2026-09-06` |

**Za review:** h1 i `<title>` sada koriste **Dečija Učionica**. Stari vidljivi naziv **Moja Pametna Učionica** je podnaslov + `alternateName` u JSON-LD.

---

## O nama `/o-nama`

| | |
|---|---|
| `<title>` | O nama \| Dečija Učionica |
| Description | Saznaj sve o projektu Dečija Učionica, našim ciljevima, politici privatnosti i kontakt podacima. Besplatne igre bez reklama i registracije. |
| Canonical | `/o-nama` |
| OG / Twitter | da (isti title/opis) |
| `<h1>` | O nama |
| JSON-LD | `AboutPage` + ugnježdena `Organization` (`email: maric989@gmail.com`); plus root WebSite/WebApplication |
| Sitemap | da, `priority: 0.3`, lastModified `2026-09-06` |
| Kontakt | `maric989@gmail.com` u tekstu |

---

## Igre — title, opis, h1, datum

Proveri: da li title i h1 kažu istu igru; da li opis tačno opisuje šta dete radi; da li je dovoljno specifičan za pretragu.

| URL | `<title>` (bez `\| Dečija Učionica`) | Description | Vidljivi `<h1>` | lastModified | Napomena |
|---|---|---|---|---|---|
| `/uci-slova` | Uči Slova | Nauči sva slova srpske ćirilice kroz interaktivne 3D kartice sa slikama i zvučnim izgovorom. Besplatna igra za predškolce i najmlađe. | Uči Slova | 2026-09-06 | Ima i podnaslov na strani |
| `/uci-brojeve` | Uči Brojeve | Nauči brojeve od 1 do 10 kroz jasne vizuelne primere i zabavne 3D objekte. Edukativna igra brojanja prilagođena predškolskom uzrastu. | Uči Brojeve | 2026-09-06 | |
| `/slovo-na-slovo` | Slovo na Slovo | Pogodi kojim slovom počinje reč sa slike i vežbaj ćirilicu kroz igru. Zabavna edukativna igrica za prepoznavanje slova i razvoj rečnika. | Slovo na Slovo | 2026-09-06 | Podnaslov: „Kojim slovom počinje reč?“ |
| `/sastavi-rec` | Sastavi Reč | Složi slova pravim redom i sastavi reči sa slika. Zabavna vežba ćirilice, čitanja i pisanja za decu predškolskog uzrasta od 5 do 7 godina. | Sastavi Reč | 2026-09-06 | |
| `/pogodi-rec` | Pogodi Reč | Pogađaj slova na ćirilici i sačuvaj balončiće da ne puknu. Interaktivna igra reči i vežbanje slova za predškolce i prvačiće. | Pogodi Reč | 2026-09-06 | |
| `/matematika` | Matematička Avantura | Zabavna matematika za decu: uči sabiranje i oduzimanje kroz igru. Tri nivoa težine prilagođena predškolcima i prvačićima. | Matematička Avantura | 2026-09-06 | |
| `/vaga` | Vaga | Stavi isti broj jabuka na desnu stranu vage i dovedi je u ravnotežu. Zabavna igra matematike, brojanja i logike za predškolce. | Vaga | 2026-09-06 | Podnaslov na strani |
| `/senke` | Senke | Prevuci sliku na odgovarajući oblik senke i poveži tačne parove. Zabavna igra logike, opažanja i koncentracije za najmlađe. | Senke | 2026-09-06 | |
| `/poredjenje` | Poređenje | Poređaj predmete od najmanjeg do najvećeg. Interaktivna igra veličina, gradacije i logičkog razmišljanja za decu predškolskog uzrasta. | Poređenje | 2026-09-06 | |
| `/sat` | Koliko je sati? | Nauči gledanje na analogni sat sa kazaljkama. Interaktivna igra za decu: namesti vreme ili pročitaj koliko je sati uz pune i četvrt sate. | Koliko je sati? | 2026-09-06 | |
| `/igraonica/brojalica` | Brojalica | Prebroj šarene predmete na ekranu i pogodi tačan broj. Zabavna mini-igra za vežbanje brojanja i osnova matematike kod predškolaca. | Brojalica | 2026-09-06 | Podnaslov: „Prebroj predmete!“ |
| `/igraonica/memorija` | Memorija | Pronađi parove slova i odgovarajućih slika. Odlična vežba pamćenja, koncentracije i učenja srpske ćirilice kroz igru za najmlađe. | Memorija | 2026-09-06 | |
| `/igraonica/carobna-tastatura` | Čarobna Tastatura | Uhvati slova koja padaju pritiskom na tastaturu. Brza i zabavna igra za prepoznavanje slova i učenje kucanja na ćirilici za decu. | Čarobna Tastatura | 2026-09-06 | |
| `/igraonica/magicna-pisaca-masina` | Magična Pisaća Mašina | Tipkaj slobodno na tastaturi i gledaj magične vizuelne efekte. Vežba prepoznavanja slova ćirilice i kucanja za predškolce. | Magična Pisaća Mašina | 2026-09-06 | Stari URL ide 308 ovde |

---

## Globalno (nije po strani)

| Stavka | Stanje |
|---|---|
| `html lang` | `sr-Cyrl` u root layoutu; posle load-a prekidač stavlja `sr-Cyrl` / `sr-Latn` |
| `robots.txt` | `Allow: /` za `*`, plus GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended |
| Sitemap | početna + o-nama + 14 igara. Alias `/igraonica/magicna-masina` **nije** u sitemapu (dobro) |
| Redirect | 308 `/igraonica/magicna-masina` → `/igraonica/magicna-pisaca-masina` |
| Favicon / apple icon | `app/favicon.ico`, `app/icon.png`, `app/apple-icon.png` |
| OG slika | jedna, `app/opengraph-image.png` ~1200×630 |
| Indexiranje igara | stranice su `"use client"` ali Next i dalje šalje HTML sa h1 + meta iz layouta |

---

## Checklist za review

Kopiraj i štikliraj.

**Copy (title / description)**

- [x] Title igre je jasan i bez `|` u `IGRE_SEO` (šablon dodaje brend)
- [x] Description kaže šta dete **radi** i ima ključne reči (predškolci, ćirilica, učenje)
- [x] Description 120–155 karaktera (SERP)
- [x] Sat opis uključuje pune i četvrt sate
- [x] Dva brenda: h1 Dečija Učionica, podnaslov Moja Pametna Učionica

**h1**

- [x] Svaka igra ima `<h1>` koji se poklapa sa title
- [x] Brojalica h1 = `Brojalica`
- [x] Čarobna Tastatura ima `<h1>`
- [x] Početna h1 = Dečija Učionica (Moja Pametna Učionica je podnaslov)

**Tehnički**

- [ ] Canonical tačan (View Source na produkciji)
- [x] JSON-LD LearningResource + BreadcrumbList na igri; WebSite na svim stranama; FAQPage na početnoj
- [x] `/o-nama` — AboutPage + Organization (email)
- [ ] OG slika po igri — trenutno svi shareovi izgledaju isto
- [ ] Search Console: koje URL su indeksirane

**Van koda**

- [ ] Facebook / LinkedIn debugger posle izmene opisa
- [ ] `lastModified` u `IGRE_SEO` ažurirati kad se menja sadržaj igre

---

## Gde dirati posle review-a

| Šta | Fajl |
|---|---|
| Title / description / datum igre | `lib/seo.ts` → `IGRE_SEO` |
| Title / description početne | `app/layout.tsx` + `SITE_DESCRIPTION` u `lib/seo.ts` |
| O nama meta | `app/o-nama/page.tsx` |
| Vidljivi h1 | `app/<ruta>/page.tsx` |
| Sitemap datum početne | `app/sitemap.ts` → `HOME_LAST_MODIFIED` |

Provera: View Source na `https://www.decija-ucionica.com/sat` (dev overlay nije merodavan). Traži `<title>`, `meta name="description"`, `rel="canonical"`, `og:title`, `application/ld+json`.
