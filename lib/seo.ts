import type { Metadata } from "next";

export const SITE_URL = "https://www.decija-ucionica.com";
export const SITE_NAME = "Dečija Učionica";
export const SITE_NAME_ALT = "Moja Pametna Učionica";

export const SITE_DESCRIPTION =
  "Dečija Učionica (Moja Pametna Učionica) — besplatne edukativne igre za predškolce: ćirilica, slova, brojevi i logika, bez naloga i reklama.";

export const CONTACT_EMAIL = "maric989@gmail.com";

export type IgraSeo = {
  path: string;
  title: string;
  description: string;
  lastModified: string;
};

/** lastModified = poslednja prava izmena sadržaja, ne datum builda. */
export const IGRE_SEO: IgraSeo[] = [
  {
    path: "/uci-slova",
    title: "Uči Slova",
    description:
      "Besplatna igra za predškolce: uči srpsku ćirilicu kroz šarene kartice sa slikama i zvukom.",
    lastModified: "2026-09-03",
  },
  {
    path: "/uci-brojeve",
    title: "Uči Brojeve",
    description:
      "Nauči brojeve od 1 do 10 kroz vizuelne primere prilagođene deci predškolskog uzrasta.",
    lastModified: "2026-09-03",
  },
  {
    path: "/slovo-na-slovo",
    title: "Slovo na Slovo",
    description:
      "Pogodi kojim slovom počinje reč sa slike i vežbaj ćirilicu kroz igru.",
    lastModified: "2026-09-03",
  },
  {
    path: "/pogodi-rec",
    title: "Pogodi Reč",
    description:
      "Pogađaj slova na ćirilici i sačuvaj balone. Edukativna igra reči za predškolce.",
    lastModified: "2026-09-03",
  },
  {
    path: "/matematika",
    title: "Matematička Avantura",
    description:
      "Sabiranje i oduzimanje kroz igru, sa tri nivoa težine za predškolce i prvačiće.",
    lastModified: "2026-09-03",
  },
  {
    path: "/vaga",
    title: "Vaga",
    description:
      "Stavi isti broj jabuka na vagu da bude u ravnoteži. Igra brojanja za predškolce.",
    lastModified: "2026-09-03",
  },
  {
    path: "/senke",
    title: "Senke",
    description:
      "Prevuci sliku na njenu senku i poveži parove. Igra logike za predškolce.",
    lastModified: "2026-09-03",
  },
  {
    path: "/poredjenje",
    title: "Poređenje",
    description:
      "Poređaj predmete od najmanjeg do najvećeg. Igra veličine za predškolce.",
    lastModified: "2026-09-04",
  },
  {
    path: "/igraonica/brojalica",
    title: "Brojalica",
    description:
      "Prebroj predmete na ekranu i pogodi tačan broj. Mini-igra za predškolce.",
    lastModified: "2026-09-03",
  },
  {
    path: "/igraonica/memorija",
    title: "Memorija",
    description:
      "Pronađi parove slova i slika. Vežba pamćenja i ćirilice za predškolce.",
    lastModified: "2026-09-03",
  },
  {
    path: "/igraonica/carobna-tastatura",
    title: "Čarobna Tastatura",
    description:
      "Uhvati slova koja padaju. Igra brzine i prepoznavanja slova za najmlađe.",
    lastModified: "2026-09-03",
  },
  {
    path: "/igraonica/magicna-pisaca-masina",
    title: "Magična Pisaća Mašina",
    description:
      "Tipkaj slobodno na tastaturi i uči slova uz zabavne vizuelne efekte.",
    lastModified: "2026-09-03",
  },
];

export function igraMetadata(igra: Pick<IgraSeo, "title" | "description" | "path">): Metadata {
  return {
    title: igra.title,
    description: igra.description,
    alternates: { canonical: igra.path },
    openGraph: {
      title: igra.title,
      description: igra.description,
      url: igra.path,
      siteName: SITE_NAME,
      locale: "sr_RS",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: igra.title,
      description: igra.description,
    },
  };
}

export function sajtJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: SITE_NAME,
        alternateName: SITE_NAME_ALT,
        url: `${SITE_URL}/`,
        inLanguage: "sr",
        description: SITE_DESCRIPTION,
      },
      {
        "@type": "WebApplication",
        name: SITE_NAME,
        alternateName: SITE_NAME_ALT,
        url: `${SITE_URL}/`,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        inLanguage: "sr",
        isAccessibleForFree: true,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "EUR",
        },
        audience: {
          "@type": "EducationalAudience",
          educationalRole: "student",
        },
        educationalLevel: "preschool",
      },
    ],
  };
}

export function igraJsonLd(igra: Pick<IgraSeo, "title" | "description" | "path">) {
  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: igra.title,
    description: igra.description,
    url: `${SITE_URL}${igra.path}`,
    inLanguage: "sr",
    isAccessibleForFree: true,
    educationalLevel: "preschool",
    learningResourceType: "Game",
    isPartOf: {
      "@type": "WebApplication",
      name: SITE_NAME,
      url: `${SITE_URL}/`,
    },
  };
}

export function findIgra(path: string): IgraSeo {
  const igra = IGRE_SEO.find((i) => i.path === path);
  if (!igra) throw new Error(`Nema SEO unosa za ${path}`);
  return igra;
}
