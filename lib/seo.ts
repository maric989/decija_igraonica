import type { Metadata } from "next";

export const SITE_URL = "https://www.decija-ucionica.com";
export const SITE_NAME = "Dečija Učionica";
export const SITE_NAME_ALT = "Moja Pametna Učionica";

export const SITE_DESCRIPTION =
  "Besplatne edukativne igre za predškolce i mlađu decu. Uči ćirilicu, slova, brojeve i logiku kroz zabavne 3D igrice bez reklama i otvaranja naloga.";

export const CONTACT_EMAIL = "maric989@gmail.com";

export const O_NAMA_DESCRIPTION =
  "Saznaj sve o projektu Dečija Učionica, našim ciljevima, politici privatnosti i kontakt podacima. Besplatne igre bez reklama i registracije.";

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
      "Nauči sva slova srpske ćirilice kroz interaktivne 3D kartice sa slikama i zvučnim izgovorom. Besplatna igra za predškolce i najmlađe.",
    lastModified: "2026-09-06",
  },
  {
    path: "/uci-brojeve",
    title: "Uči Brojeve",
    description:
      "Nauči brojeve od 1 do 10 kroz jasne vizuelne primere i zabavne 3D objekte. Edukativna igra brojanja prilagođena predškolskom uzrastu.",
    lastModified: "2026-09-06",
  },
  {
    path: "/slovo-na-slovo",
    title: "Slovo na Slovo",
    description:
      "Pogodi kojim slovom počinje reč sa slike i vežbaj ćirilicu kroz igru. Zabavna edukativna igrica za prepoznavanje slova i razvoj rečnika.",
    lastModified: "2026-09-06",
  },
  {
    path: "/sastavi-rec",
    title: "Sastavi Reč",
    description:
      "Složi slova pravim redom i sastavi reči sa slika. Zabavna vežba ćirilice, čitanja i pisanja za decu predškolskog uzrasta od 5 do 7 godina.",
    lastModified: "2026-09-06",
  },
  {
    path: "/pogodi-rec",
    title: "Pogodi Reč",
    description:
      "Pogađaj slova na ćirilici i sačuvaj balončiće da ne puknu. Interaktivna igra reči i vežbanje slova za predškolce i prvačiće.",
    lastModified: "2026-09-06",
  },
  {
    path: "/matematika",
    title: "Matematička Avantura",
    description:
      "Zabavna matematika za decu: uči sabiranje i oduzimanje kroz igru. Tri nivoa težine prilagođena predškolcima i prvačićima.",
    lastModified: "2026-09-06",
  },
  {
    path: "/vaga",
    title: "Vaga",
    description:
      "Stavi isti broj jabuka na desnu stranu vage i dovedi je u ravnotežu. Zabavna igra matematike, brojanja i logike za predškolce.",
    lastModified: "2026-09-06",
  },
  {
    path: "/senke",
    title: "Senke",
    description:
      "Prevuci sliku na odgovarajući oblik senke i poveži tačne parove. Zabavna igra logike, opažanja i koncentracije za najmlađe.",
    lastModified: "2026-09-06",
  },
  {
    path: "/poredjenje",
    title: "Poređenje",
    description:
      "Poređaj predmete od najmanjeg do najvećeg. Interaktivna igra veličina, gradacije i logičkog razmišljanja za decu predškolskog uzrasta.",
    lastModified: "2026-09-06",
  },
  {
    path: "/sat",
    title: "Koliko je sati?",
    description:
      "Nauči gledanje na analogni sat sa kazaljkama. Interaktivna igra za decu: namesti vreme ili pročitaj koliko je sati uz pune i četvrt sate.",
    lastModified: "2026-09-06",
  },
  {
    path: "/igraonica/brojalica",
    title: "Brojalica",
    description:
      "Prebroj šarene predmete na ekranu i pogodi tačan broj. Zabavna mini-igra za vežbanje brojanja i osnova matematike kod predškolaca.",
    lastModified: "2026-09-06",
  },
  {
    path: "/igraonica/memorija",
    title: "Memorija",
    description:
      "Pronađi parove slova i odgovarajućih slika. Odlična vežba pamćenja, koncentracije i učenja srpske ćirilice kroz igru za najmlađe.",
    lastModified: "2026-09-06",
  },
  {
    path: "/igraonica/carobna-tastatura",
    title: "Čarobna Tastatura",
    description:
      "Uhvati slova koja padaju pritiskom na tastaturu. Brza i zabavna igra za prepoznavanje slova i učenje kucanja na ćirilici za decu.",
    lastModified: "2026-09-06",
  },
  {
    path: "/igraonica/magicna-pisaca-masina",
    title: "Magična Pisaća Mašina",
    description:
      "Tipkaj slobodno na tastaturi i gledaj magične vizuelne efekte. Vežba prepoznavanja slova ćirilice i kucanja za predškolce.",
    lastModified: "2026-09-06",
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
  const url = `${SITE_URL}${igra.path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LearningResource",
        name: igra.title,
        description: igra.description,
        url,
        inLanguage: "sr",
        isAccessibleForFree: true,
        educationalLevel: "preschool",
        learningResourceType: "Game",
        isPartOf: {
          "@type": "WebApplication",
          name: SITE_NAME,
          url: `${SITE_URL}/`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Početna",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: igra.title,
            item: url,
          },
        ],
      },
    ],
  };
}

export function oNamaJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "O nama",
    description: O_NAMA_DESCRIPTION,
    url: `${SITE_URL}/o-nama`,
    inLanguage: "sr",
    isPartOf: {
      "@type": "WebApplication",
      name: SITE_NAME,
      url: `${SITE_URL}/`,
    },
    about: {
      "@type": "Organization",
      name: SITE_NAME,
      alternateName: SITE_NAME_ALT,
      url: `${SITE_URL}/`,
      email: CONTACT_EMAIL,
    },
  };
}

export function findIgra(path: string): IgraSeo {
  const igra = IGRE_SEO.find((i) => i.path === path);
  if (!igra) throw new Error(`Nema SEO unosa za ${path}`);
  return igra;
}

export const FAQ_POCETNA: { pitanje: string; odgovor: string }[] = [
  {
    pitanje: "Šta je Dečija Učionica?",
    odgovor:
      "Dečija Učionica je besplatna B2C platforma sa 3D edukativnim igrama za predškolce.",
  },
  {
    pitanje: "Da li su igre besplatne i bez reklama?",
    odgovor:
      "Da, sve igre su 100% besplatne, bez naloga, praćenja i reklama.",
  },
  {
    pitanje: "Šta deca mogu da nauče na sajtu?",
    odgovor:
      "Srpsku ćirilicu, slova, brojeve, sabiranje, logiku, prepoznavanje oblika i gledanje na sat.",
  },
  {
    pitanje: "Za koji uzrast su namenjene igrice?",
    odgovor: "Za decu predškolskog uzrasta od 3 do 7 godina.",
  },
];

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_POCETNA.map((stavka) => ({
      "@type": "Question",
      name: stavka.pitanje,
      acceptedAnswer: {
        "@type": "Answer",
        text: stavka.odgovor,
      },
    })),
  };
}
