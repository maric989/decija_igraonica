"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import GameTitleIcon from "@/components/GameTitleIcon";
import NazadLink from "@/components/NazadLink";
import { playNetacno, playPop, playTacno } from "@/lib/sounds";
import { useT } from "@/components/PismoProvider";
import { SASTAVI_RECI, type RecPojam } from "@/lib/sastavi-rec";

type Kockica = {
  id: string;
  slovo: string;
};

function izmesaj<T>(niz: T[]): T[] {
  const kopija = [...niz];
  for (let i = kopija.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kopija[i], kopija[j]] = [kopija[j], kopija[i]];
  }
  return kopija;
}

function kockiceOdReci(word: string): Kockica[] {
  return izmesaj(
    word.split("").map((slovo, i) => ({ id: `${word}-${i}-${slovo}`, slovo })),
  );
}

const KOCKA =
  "flex h-14 w-14 items-center justify-center rounded-2xl text-3xl font-extrabold text-white touch-none sm:h-16 sm:w-16 sm:text-4xl lg:h-20 lg:w-20 lg:text-5xl";

export default function SastaviRecPage() {
  const t = useT();
  const [redosled, setRedosled] = useState<RecPojam[]>(SASTAVI_RECI);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [shuffledLetters, setShuffledLetters] = useState<Kockica[]>([]);
  const [placedLetters, setPlacedLetters] = useState<string[]>([]);
  const [errorId, setErrorId] = useState<string | null>(null);
  const [bravo, setBravo] = useState(false);
  const [spremno, setSpremno] = useState(false);
  const errorTimeoutRef = useRef<number | null>(null);
  const nextTimeoutRef = useRef<number | null>(null);

  const pojam = redosled[currentWordIndex] ?? SASTAVI_RECI[0];
  const rec = pojam.word;
  const slovaReci = rec.split("");

  const pokreniRec = useCallback((index: number, lista: RecPojam[]) => {
    const sledeca = lista[index];
    if (!sledeca) return;
    setCurrentWordIndex(index);
    setShuffledLetters(kockiceOdReci(sledeca.word));
    setPlacedLetters([]);
    setErrorId(null);
    setBravo(false);
  }, []);

  useEffect(() => {
    const lista = izmesaj(SASTAVI_RECI);
    setRedosled(lista);
    pokreniRec(0, lista);
    setSpremno(true);

    return () => {
      if (errorTimeoutRef.current) window.clearTimeout(errorTimeoutRef.current);
      if (nextTimeoutRef.current) window.clearTimeout(nextTimeoutRef.current);
    };
  }, [pokreniRec]);

  function sledecaRec() {
    const sledeciIndex = currentWordIndex + 1;
    if (sledeciIndex >= redosled.length) {
      const nova = izmesaj(SASTAVI_RECI);
      setRedosled(nova);
      pokreniRec(0, nova);
      return;
    }
    pokreniRec(sledeciIndex, redosled);
  }

  function klikniSlovo(kockica: Kockica) {
    if (bravo) return;

    const ocekivano = rec[placedLetters.length];
    if (kockica.slovo === ocekivano) {
      playPop();
      const novi = [...placedLetters, kockica.slovo];
      setPlacedLetters(novi);
      setShuffledLetters((prev) => prev.filter((s) => s.id !== kockica.id));

      if (novi.length === rec.length) {
        setBravo(true);
        playTacno();
        void confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.45 },
          colors: ["#38bdf8", "#facc15", "#f472b6", "#34d399"],
        });
        nextTimeoutRef.current = window.setTimeout(() => {
          sledecaRec();
        }, 2000);
      }
      return;
    }

    playNetacno();
    setErrorId(kockica.id);
    errorTimeoutRef.current = window.setTimeout(() => setErrorId(null), 500);
  }

  if (!spremno) {
    return (
      <main className="igrica-ekran bg-sky-50">
        <p className="m-auto text-xl font-bold text-sky-700">{t("Učitavanje...")}</p>
      </main>
    );
  }

  return (
    <main className="igrica-ekran bg-sky-50">
      <NazadLink className="absolute top-4 left-4 z-50 inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-2 font-bold text-slate-700 shadow-sm transition-colors hover:bg-white" />

      <div className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col px-4 pt-16">
        <header className="flex shrink-0 flex-col items-center">
          <h1 className="mb-2 flex items-center justify-center gap-2 text-xl font-extrabold text-sky-800 sm:text-2xl lg:text-3xl">
            <GameTitleIcon src="/icons/sastavi-rec.png" alt="" size="sm" />
            <span>{t("Sastavi Reč")}</span>
          </h1>
        </header>

        <div className="igrica-sredina py-1">
          {pojam.image ? (
            <Image
              src={pojam.image}
              alt={rec}
              width={256}
              height={256}
              className="mb-4 h-28 w-28 object-contain mix-blend-multiply drop-shadow-xl sm:mb-6 sm:h-40 sm:w-40 lg:h-56 lg:w-56"
              priority
            />
          ) : (
            <p className="mb-4 flex h-28 w-28 items-center justify-center text-6xl drop-shadow-xl sm:mb-6 sm:h-40 sm:w-40 sm:text-8xl lg:h-56 lg:w-56 lg:text-9xl">
              {pojam.emoji}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 lg:gap-5">
            {slovaReci.map((slovo, i) => {
              const popunjeno = i < placedLetters.length;
              return (
                <div
                  key={`${rec}-slot-${i}`}
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl font-extrabold transition-all sm:h-16 sm:w-16 sm:text-4xl lg:h-20 lg:w-20 lg:text-5xl ${
                    popunjeno
                      ? "bg-gradient-to-b from-sky-300 to-sky-500 text-white shadow-[0_8px_0_#0369a1]"
                      : "border-4 border-dashed border-sky-300 bg-white/40 text-sky-800 shadow-inner"
                  }`}
                >
                  {popunjeno ? placedLetters[i] : ""}
                </div>
              );
            })}
          </div>

          {bravo && (
            <p className="mt-3 animate-bounce text-2xl font-extrabold text-green-600 sm:text-3xl">
              {t("Bravo!")}
            </p>
          )}
        </div>

        <div className="igrica-dno">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 lg:gap-4">
            {shuffledLetters.map((kockica) => {
              const greska = errorId === kockica.id;
              return (
                <button
                  key={kockica.id}
                  type="button"
                  disabled={bravo}
                  onClick={() => klikniSlovo(kockica)}
                  className={`${KOCKA} cursor-pointer transition-all ${
                    greska
                      ? "animate-shake bg-gradient-to-b from-red-400 to-red-600 shadow-[0_8px_0_#991b1b] hover:translate-y-1 hover:shadow-[0_4px_0_#991b1b] active:translate-y-2 active:shadow-none"
                      : "bg-gradient-to-b from-blue-400 to-blue-600 shadow-[0_8px_0_#1e3a8a] hover:translate-y-1 hover:shadow-[0_4px_0_#1e3a8a] active:translate-y-2 active:shadow-none"
                  }`}
                >
                  {kockica.slovo}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
