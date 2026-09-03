import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Senke | Poveži parove",
  description:
    "Edukativna igra za decu: prevuci sliku na njenu senku i poveži parove.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
