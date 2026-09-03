"use client";

import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Calculator,
  Keyboard,
  Puzzle,
  Hash,
  Type,
  Sparkles,
  PartyPopper,
  PlusCircle,
  type LucideIcon,
} from "lucide-react";
import { playPop } from "@/lib/sounds";

const ICONS = {
  BookOpen,
  Calculator,
  Keyboard,
  Puzzle,
  Hash,
  Type,
  Sparkles,
  PartyPopper,
  PlusCircle,
} as const satisfies Record<string, LucideIcon>;

export type ActionCardIcon = keyof typeof ICONS;

type ActionCardProps = {
  title: string;
  href: string;
  backgroundClass: string;
  kategorija: string;
  description?: string;
  imageSrc?: string;
  icon?: ActionCardIcon;
  iconClass?: string;
};

export default function ActionCard({
  title,
  href,
  backgroundClass,
  kategorija,
  description,
  imageSrc,
  icon,
  iconClass,
}: ActionCardProps) {
  const Icon = icon ? ICONS[icon] : null;

  return (
    <Link
      href={href}
      onMouseEnter={() => playPop()}
      onClick={() => playPop()}
      className={`group relative ${backgroundClass} flex min-h-52 w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-3xl border-4 border-white/70 p-8 pt-12 text-slate-800 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl sm:min-h-56`}
    >
      <span className="absolute top-3 left-3 rounded-full bg-white/60 px-3 py-1 text-xs font-bold tracking-wide text-slate-700 shadow-sm">
        {kategorija}
      </span>
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={title}
          width={80}
          height={80}
          className="h-20 w-20 object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-110 sm:h-24 sm:w-24"
        />
      ) : Icon ? (
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/70 shadow-inner transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-6 sm:h-24 sm:w-24">
          <Icon
            className={`h-10 w-10 ${iconClass ?? ""} transition-transform duration-300 ease-in-out group-hover:scale-110 sm:h-12 sm:w-12`}
            strokeWidth={2.25}
          />
        </span>
      ) : null}
      <span className="text-center text-2xl font-bold sm:text-3xl">{title}</span>
      {description && (
        <span className="text-center text-sm font-medium text-slate-600 sm:text-base">
          {description}
        </span>
      )}
    </Link>
  );
}
