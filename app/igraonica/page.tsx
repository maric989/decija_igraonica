"use client";

import Link from "next/link";
import { ArrowLeft, Keyboard, Puzzle, Calculator, TypeIcon, type LucideIcon } from "lucide-react";

type GameCardProps = {
  naziv: string;
  opis: string;
  ikona: LucideIcon;
  bojaPozadine: string;
  bojaHover: string;
  bojaIkone: string;
  href: string;
};

function GameCard({ naziv, opis, ikona: Ikona, bojaPozadine, bojaHover, bojaIkone, href }: GameCardProps) {
  return (
    <Link
      href={href}
      className={`${bojaPozadine} ${bojaHover} flex cursor-pointer flex-col items-center justify-center gap-4 rounded-3xl p-8 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:p-10`}
    >
      <span className="flex h-24 w-24 items-center justify-center rounded-full bg-white/70 shadow-inner">
        <Ikona className={`h-12 w-12 ${bojaIkone}`} strokeWidth={2} />
      </span>
      <h2 className="text-center text-2xl font-extrabold text-gray-800 sm:text-3xl">
        {naziv}
      </h2>
      <p className="text-center text-base text-gray-600 sm:text-lg">{opis}</p>
    </Link>
  );
}

const IGRE: GameCardProps[] = [
  {
    naziv: "Čarobna Tastatura",
    opis: "Uhvati slova koja padaju!",
    ikona: Keyboard,
    bojaPozadine: "bg-blue-100",
    bojaHover: "hover:bg-blue-200",
    bojaIkone: "text-blue-600",
    href: "/igraonica/carobna-tastatura",
  },
  {
    naziv: "Memorija",
    opis: "Pronađi parove slova i slika.",
    ikona: Puzzle,
    bojaPozadine: "bg-pink-100",
    bojaHover: "hover:bg-pink-200",
    bojaIkone: "text-pink-600",
    href: "/igraonica/memorija",
  },
  {
    naziv: "Brojalica",
    opis: "Prebroj predmete na ekranu.",
    ikona: Calculator,
    bojaPozadine: "bg-yellow-100",
    bojaHover: "hover:bg-yellow-200",
    bojaIkone: "text-yellow-600",
    href: "/igraonica/brojalica",
  },
  {
    naziv: "Magična Pisaća Mašina",
    opis: "Tipkaj slobodno i gledaj magiju slova!",
    ikona: TypeIcon,
    bojaPozadine: "bg-amber-100",
    bojaHover: "hover:bg-amber-200",
    bojaIkone: "text-amber-700",
    href: "/igraonica/magicna-pisaca-masina",
  },
];

export default function IgraonicaPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-purple-100 px-4 py-8 sm:px-6 sm:py-12">
      <div className="flex w-full max-w-5xl flex-col items-center gap-10">

        {/* Header */}
        <header className="flex flex-col items-center gap-4 text-center">
          <Link
            href="/"
            className="flex cursor-pointer items-center gap-2 rounded-full bg-purple-200 px-6 py-3 text-lg font-bold text-purple-900 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <ArrowLeft className="h-5 w-5" />
            Nazad
          </Link>
          <div className="flex items-center gap-3">
            <Puzzle className="h-10 w-10 text-purple-500 sm:h-12 sm:w-12" strokeWidth={2.25} />
            <h1 className="text-4xl font-extrabold text-purple-800 sm:text-5xl">
              Igraonica
            </h1>
          </div>
          <p className="text-sm text-purple-600 sm:text-base">
            Odaberi igru i počni! 🎮
          </p>
        </header>

        {/* Grid igara */}
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {IGRE.map((igra) => (
            <GameCard key={igra.naziv} {...igra} />
          ))}
        </div>

      </div>
    </main>
  );
}
