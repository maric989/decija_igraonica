import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vaga | Uravnoteži brojeve",
  description:
    "Edukativna matematička igra za decu: stavi isti broj jabuka na vagu da bude u ravnoteži.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
