import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pogodi Reč | Čarobni Baloni",
  description:
    "Edukativna igra pogađanja reči na ćirilici za decu. Sačuvaj balone i pogodi skrivenu reč!",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
