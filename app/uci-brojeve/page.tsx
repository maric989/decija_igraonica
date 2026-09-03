"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calculator, Star } from "lucide-react";

const BROJEVI = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

const NAIZMENICNE_BOJE = [
  "bg-emerald-100",
  "bg-teal-100",
  "bg-green-100",
  "bg-lime-100",
  "bg-emerald-100",
] as const;

const BROJEVI_AUDIO: Record<(typeof BROJEVI)[number], string> = {
  1:  "/audio/brojevi/1.mp3",
  2:  "/audio/brojevi/2.mp3",
  3:  "/audio/brojevi/3.mp3",
  4:  "/audio/brojevi/4.mp3",
  5:  "/audio/brojevi/5.mp3",
  6:  "/audio/brojevi/6.mp3",
  7:  "/audio/brojevi/7.mp3",
  8:  "/audio/brojevi/8.mp3",
  9:  "/audio/brojevi/9.mp3",
  10: "/audio/brojevi/10.mp3",
};

export default function UciBrojevePage() {
  const [activeNumber, setActiveNumber] = useState<number | null>(null);
  const resetTimeoutRef = useRef<number | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  function handleNumberClick(broj: (typeof BROJEVI)[number]) {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
    }

    const audio = new Audio(BROJEVI_AUDIO[broj]);
    currentAudioRef.current = audio;
    void audio.play();

    setActiveNumber(broj);

    if (resetTimeoutRef.current !== null) {
      window.clearTimeout(resetTimeoutRef.current);
    }
    resetTimeoutRef.current = window.setTimeout(() => {
      setActiveNumber(null);
      resetTimeoutRef.current = null;
    }, 800);
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-emerald-100 px-4 py-8 sm:px-6 sm:py-12">
      <div className="flex w-full max-w-4xl flex-col items-center gap-8">
        <header className="flex flex-col items-center gap-4 text-center">
          <Link
            href="/"
            className="flex cursor-pointer items-center gap-2 rounded-full bg-emerald-200 px-6 py-3 text-lg font-bold text-emerald-900 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <ArrowLeft className="h-5 w-5" />
            Nazad
          </Link>
          <div className="flex items-center gap-3">
            <Calculator
              className="h-10 w-10 text-emerald-600 sm:h-12 sm:w-12"
              strokeWidth={2.25}
            />
            <h1 className="text-4xl font-extrabold text-emerald-800 sm:text-5xl">
              Uči Brojeve
            </h1>
          </div>
        </header>

        <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {BROJEVI.map((broj, index) => (
            <button
              key={broj}
              type="button"
              onClick={() => handleNumberClick(broj)}
              aria-label={`Broj ${broj}`}
              className={`${NAIZMENICNE_BOJE[index % NAIZMENICNE_BOJE.length]} ${
                activeNumber === broj
                  ? "z-10 scale-110 shadow-2xl"
                  : "shadow-md hover:scale-105 hover:bg-emerald-200 hover:shadow-xl active:scale-95"
              } relative flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl p-4 transition-all duration-300`}
            >
              <span className="text-7xl font-bold leading-none text-emerald-800 sm:text-8xl">
                {broj}
              </span>
              <div className="flex flex-wrap justify-center gap-0.5">
                {Array.from({ length: broj }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400 sm:h-5 sm:w-5"
                    strokeWidth={1}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
