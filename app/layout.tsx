import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Moja Pametna Učionica",
  description: "Dečija edukativna aplikacija za učenje slova, brojeva i igru",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sr" className={`${nunito.variable} h-full antialiased`}>
      <body className={`${nunito.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
