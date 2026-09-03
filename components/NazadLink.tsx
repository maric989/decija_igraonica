"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { playPop } from "@/lib/sounds";

type NazadLinkProps = {
  href?: string;
  className: string;
  label?: string;
  iconClassName?: string;
};

export default function NazadLink({
  href = "/",
  className,
  label = "Nazad",
  iconClassName = "h-5 w-5",
}: NazadLinkProps) {
  return (
    <Link href={href} onClick={() => playPop()} className={className}>
      <ArrowLeft className={iconClassName} />
      {label}
    </Link>
  );
}
