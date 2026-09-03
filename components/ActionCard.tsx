"use client";

import Link from "next/link";
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
  icon: ActionCardIcon;
  backgroundClass: string;
  description?: string;
};

export default function ActionCard({
  title,
  href,
  icon,
  backgroundClass,
  description,
}: ActionCardProps) {
  const Icon = ICONS[icon];

  return (
    <Link
      href={href}
      onMouseEnter={() => playPop()}
      onClick={() => playPop()}
      className={`group ${backgroundClass} flex min-h-52 w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-3xl p-8 text-slate-800 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-105 hover:shadow-xl sm:min-h-56`}
    >
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/70 shadow-inner transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-6 sm:h-24 sm:w-24">
        <Icon
          className="h-10 w-10 transition-transform duration-300 ease-in-out group-hover:scale-110 sm:h-12 sm:w-12"
          strokeWidth={2.25}
        />
      </span>
      <span className="text-center text-2xl font-bold sm:text-3xl">{title}</span>
      {description && (
        <span className="text-center text-sm font-medium text-slate-600 sm:text-base">
          {description}
        </span>
      )}
    </Link>
  );
}
