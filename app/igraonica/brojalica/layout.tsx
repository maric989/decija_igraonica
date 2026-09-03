import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Igra Brojalica za Decu",
  description:
    "Zabavna mini-igra za predškolce. Prebroj predmete na ekranu i pogodi tačan broj!",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
