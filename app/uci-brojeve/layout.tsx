import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Učenje Brojeva do 10",
  description:
    "Nauči brojeve i osnovno brojanje kroz vizuelne primere prilagođene deci.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
