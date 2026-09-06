import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ONamaSadrzaj from "./sadrzaj";
import { O_NAMA_DESCRIPTION, SITE_NAME, oNamaJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "O nama",
  description: O_NAMA_DESCRIPTION,
  alternates: { canonical: "/o-nama" },
  openGraph: {
    title: "O nama",
    description: O_NAMA_DESCRIPTION,
    url: "/o-nama",
    siteName: SITE_NAME,
    locale: "sr_RS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "O nama",
    description: O_NAMA_DESCRIPTION,
  },
};

export default function ONamaPage() {
  return (
    <>
      <JsonLd data={oNamaJsonLd()} />
      <ONamaSadrzaj />
    </>
  );
}
