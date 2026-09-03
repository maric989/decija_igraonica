import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uči Slova i Ćirilicu",
  description:
    "Interaktivno učenje srpske azbuke i ćirilice kroz zabavne kartice sa slikama.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
