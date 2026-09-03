import JsonLd from "@/components/JsonLd";
import { findIgra, igraJsonLd, igraMetadata } from "@/lib/seo";

export function igraLayout(path: string) {
  const igra = findIgra(path);

  function Layout({ children }: { children: React.ReactNode }) {
    return (
      <>
        <JsonLd data={igraJsonLd(igra)} />
        {children}
      </>
    );
  }

  return { metadata: igraMetadata(igra), Layout };
}
