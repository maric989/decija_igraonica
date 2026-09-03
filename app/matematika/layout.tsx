import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Matematičke Avanture | Sabiranje i Oduzimanje",
  description:
    "Interaktivna matematička igra za decu. Vežbajte sabiranje i oduzimanje kroz tri nivoa težine!",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
