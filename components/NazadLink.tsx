"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { playPop } from "@/lib/sounds";
import { useT } from "@/components/PismoProvider";

const DEFAULT_CLASS =
  "inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-2 font-bold text-slate-700 shadow-sm transition-colors hover:bg-white";

type NazadLinkProps = {
  href?: string;
  className?: string;
  label?: string;
  iconClassName?: string;
};

export default function NazadLink({
  href = "/",
  className = DEFAULT_CLASS,
  label = "Nazad",
  iconClassName = "h-5 w-5",
}: NazadLinkProps) {
  const t = useT();
  return (
    <Link href={href} onClick={() => playPop()} className={className}>
      <ArrowLeft className={iconClassName} />
      {t(label)}
    </Link>
  );
}
