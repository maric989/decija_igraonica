import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import JsonLd from "@/components/JsonLd";
import { PismoProvider } from "@/components/PismoProvider";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, sajtJsonLd } from "@/lib/seo";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: {
    default: `${SITE_NAME} | Edukativne igre za predškolce`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
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
    url: "/",
    title: `${SITE_NAME} | Edukativne igre za predškolce`,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Edukativne igre za predškolce`,
    description: SITE_DESCRIPTION,
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sr-Cyrl" className={`${nunito.variable} h-full antialiased`}>
      <body className={`${nunito.className} min-h-full flex flex-col`}>
        <PismoProvider>
          <JsonLd data={sajtJsonLd()} />
          {children}
        </PismoProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
