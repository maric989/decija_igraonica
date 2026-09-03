import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Slovo na Slovo | Igra prepoznavanja prvog slova",
  description:
    "Zabavna edukativna igra za decu. Pogodi kojim slovom počinje reč sa slike i nauči ćirilicu.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
