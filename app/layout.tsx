import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://decija-igraonica.vercel.app/"),
  title: {
    default: "Moja Pametna Učionica | Edukativne igre za decu",
    template: "%s | Moja Pametna Učionica",
  },
  description:
    "Besplatna i bezbedna aplikacija za učenje ćirilice, slova, brojeva i logike za decu predškolskog uzrasta.",
  applicationName: "Moja Pametna Učionica",
  keywords: [
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
    url: "https://decija-igraonica.vercel.app/",
    title: "Moja Pametna Učionica | Edukativne igre",
    description:
      "Besplatna i bezbedna aplikacija za učenje ćirilice i brojeva. Naučite slova kroz igru!",
    siteName: "Moja Pametna Učionica",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sr" className={`${nunito.variable} h-full antialiased`}>
      <body className={`${nunito.className} min-h-full flex flex-col`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
