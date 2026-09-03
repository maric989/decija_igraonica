"use client";

import { useRef, useState } from "react";
import NazadLink from "@/components/NazadLink";
import GameTitleIcon from "@/components/GameTitleIcon";

const BROJEVI = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

const PASTELNE_BOJE = [
  "bg-pink-200",
  "bg-blue-200",
  "bg-yellow-200",
  "bg-purple-200",
  "bg-orange-200",
] as const;

const EMOJI_PO_BROJU: Record<(typeof BROJEVI)[number], string> = {
  1: "🍎",
  2: "🎈",
  3: "🚗",
  4: "🧸",
  5: "🐶",
  6: "🍓",
  7: "🦋",
  8: "🐢",
  9: "🐠",
  10: "🍬",
};

const BROJEVI_AUDIO: Record<(typeof BROJEVI)[number], string> = {
  1: "/audio/brojevi/1.mp3",
  2: "/audio/brojevi/2.mp3",
  3: "/audio/brojevi/3.mp3",
  4: "/audio/brojevi/4.mp3",
  5: "/audio/brojevi/5.mp3",
  6: "/audio/brojevi/6.mp3",
  7: "/audio/brojevi/7.mp3",
  8: "/audio/brojevi/8.mp3",
  9: "/audio/brojevi/9.mp3",
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
          <NazadLink />
          <div className="flex items-center gap-3">
            <GameTitleIcon src="/icons/uci-brojeve.jpeg" alt="" />
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
              className={`${PASTELNE_BOJE[index % PASTELNE_BOJE.length]} ${
                activeNumber === broj ? "z-10 -translate-y-1 shadow-xl" : "shadow-lg hover:-translate-y-1 hover:shadow-xl"
              } relative flex aspect-square cursor-pointer flex-col items-center justify-center rounded-3xl border-4 border-white p-4 transition-all`}
            >
              <span className="text-6xl font-black leading-none text-slate-800 opacity-90 md:text-8xl">
                {broj}
              </span>
              <div className="mt-4 flex flex-wrap justify-center gap-1.5 px-2">
                {Array.from({ length: broj }).map((_, i) => (
                  <span key={i} className="text-lg leading-none sm:text-xl">
                    {EMOJI_PO_BROJU[broj]}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
