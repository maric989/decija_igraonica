import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.decija-ucionica.com/"),
  title: {
    default: "Moja Pametna Učionica | Edukativne igre za decu",
    template: "%s | Moja Pametna Učionica",
  },
  description:
    "Dečija Učionica (decija-ucionica) — besplatna i bezbedna aplikacija za učenje ćirilice, slova, brojeva i logike za decu predškolskog uzrasta.",
  applicationName: "Dečija Učionica",
  keywords: [
    "decija-ucionica",
    "dečija učionica",
    "decija ucionica",
    "moja pametna učionica",
    "edukativne igre za decu",
    "učenje ćirilice",
    "azbuka za decu",
    "učenje brojeva",
    "igrice za predškolce",
    "slova za decu",
    "razvoj logike",
  ],
  openGraph: {
    type: "website",
    locale: "sr_RS",
    url: "https://www.decija-ucionica.com/",
    title: "Moja Pametna Učionica | Edukativne igre",
    description:
      "Dečija Učionica — besplatna i bezbedna aplikacija za učenje ćirilice i brojeva. Naučite slova kroz igru!",
    siteName: "Dečija Učionica",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sr" className={`${nunito.variable} h-full antialiased`}>
      <body className={`${nunito.className} min-h-full flex flex-col`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
