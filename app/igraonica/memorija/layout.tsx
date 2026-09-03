import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Igra Memorije | Spoji slovo i sliku",
  description:
    "Vežbaj pamćenje i uči ćirilicu uz klasičnu igru spajanja parova (slova i slike).",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
