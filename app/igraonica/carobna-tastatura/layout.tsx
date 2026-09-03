import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Čarobna Tastatura | Padajuća slova",
  description:
    "Edukativna igra brzine i prepoznavanja slova za najmlađe.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
