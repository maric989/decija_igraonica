import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Magična Pisaća Mašina",
  description:
    "Slobodno kucanje i učenje slova na tastaturi uz zabavne vizuelne efekte.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
