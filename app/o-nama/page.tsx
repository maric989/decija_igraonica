import type { Metadata } from "next";
import ONamaSadrzaj from "./sadrzaj";
import { SITE_NAME } from "@/lib/seo";

const DESCRIPTION =
  "Privatnost, kontakt i kako radi Dečija učionica — besplatne igre za predškolce, bez naloga i reklama.";

export const metadata: Metadata = {
  title: "O nama",
  description: DESCRIPTION,
  alternates: { canonical: "/o-nama" },
  openGraph: {
    title: "O nama",
    description: DESCRIPTION,
    url: "/o-nama",
    siteName: SITE_NAME,
    locale: "sr_RS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "O nama",
    description: DESCRIPTION,
  },
};

export default function ONamaPage() {
  return <ONamaSadrzaj />;
}
