"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, Star } from "lucide-react";
import confetti from "canvas-confetti";
import { AZBUKA_PODACI, type SlovoData } from "@/lib/azbuka";
import { playNetacno, playTacno } from "@/lib/sounds";
import NazadLink from "@/components/NazadLink";
import GameTitleIcon from "@/components/GameTitleIcon";
import { useT } from "@/components/PismoProvider";

const POJMOVI = AZBUKA_PODACI.filter(
  (p): p is SlovoData & { slika: string } => Boolean(p.slika),
);

const BOJE_DUGMADI = [
  "bg-violet-200 hover:bg-violet-300 text-violet-900",
  "bg-fuchsia-200 hover:bg-fuchsia-300 text-fuchsia-900",
  "bg-sky-200 hover:bg-sky-300 text-sky-900",
] as const;

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function randomPojam(exclude?: string): (typeof POJMOVI)[number] {
  const pool = exclude
    ? POJMOVI.filter((p) => p.slovo !== exclude)
    : POJMOVI;
  return pool[Math.floor(Math.random() * pool.length)];
}

function napraviOpcije(tacno: string): string[] {
  const ostala = POJMOVI.map((p) => p.slovo).filter((s) => s !== tacno);
  const netacna = shuffle(ostala).slice(0, 2);
  return shuffle([tacno, ...netacna]);
}

export default function SlovoNaSlovoPage() {
  const t = useT();
  const [pojam, setPojam] = useState<(typeof POJMOVI)[number] | null>(null);
  const [opcije, setOpcije] = useState<string[]>([]);
  const [poeni, setPoeni] = useState(0);
  const [status, setStatus] = useState<"igra" | "tacno">("igra");
  const [pogresnoSlovo, setPogresnoSlovo] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const noviZadatak = useCallback(() => {
    setStatus("igra");
    setPogresnoSlovo(null);
    const sledeci = randomPojam(pojam?.slovo);
    setPojam(sledeci);
    setOpcije(napraviOpcije(sledeci.slovo));
  }, [pojam?.slovo]);

  useEffect(() => {
    const prvi = randomPojam();
    setPojam(prvi);
    setOpcije(napraviOpcije(prvi.slovo));

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      audioRef.current?.pause();
    };
  }, []);

  function proveriOdgovor(izabrano: string) {
    if (!pojam || status === "tacno") return;

    if (izabrano === pojam.slovo) {
      setStatus("tacno");
      setPogresnoSlovo(null);
      setPoeni((p) => p + 1);
      playTacno();

      void confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#c084fc", "#f472b6", "#facc15", "#60a5fa", "#34d399"],
      });

      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(pojam.audioRec);
      audioRef.current = audio;
      setTimeout(() => void audio.play(), 350);

      timeoutRef.current = window.setTimeout(() => {
        noviZadatak();
      }, 1500);
      return;
    }

    playNetacno();
    setPogresnoSlovo(izabrano);
    window.setTimeout(() => setPogresnoSlovo(null), 500);
  }

  if (!pojam) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-violet-50">
        <p className="text-xl font-bold text-violet-700">{t("Učitavanje...")}</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-violet-50 px-4 py-8 sm:py-10">
      {/* Header */}
      <div className="mb-6 flex w-full max-w-2xl items-center justify-between">
        <NazadLink />

        <div className="flex items-center gap-2 rounded-full bg-amber-300/90 px-5 py-2 shadow-md">
          <Star className="h-5 w-5 fill-amber-700 text-amber-700" />
          <span className="text-xl font-extrabold text-amber-900">{poeni}</span>
        </div>
      </div>

      <h1 className="mb-2 flex items-center justify-center gap-2 text-center text-3xl font-extrabold text-violet-800 sm:text-4xl">
        <GameTitleIcon src="/icons/slovo-na-slovo.jpeg" alt="" />
        {t("Slovo na Slovo")}
      </h1>
      <p className="mb-8 text-center text-lg font-semibold text-violet-600">
        {t("Kojim slovom počinje reč?")}
      </p>

      {/* Slika */}
      <div className="relative mb-8 h-56 w-56 overflow-hidden rounded-3xl border-4 border-white shadow-xl sm:h-64 sm:w-64">
        <Image
          src={pojam.slika}
          alt={pojam.rec}
          fill
          className="object-cover"
          sizes="256px"
          priority
        />
        {status === "tacno" && (
          <div className="absolute inset-0 flex items-center justify-center bg-green-500/30">
            <span className="animate-bounce rounded-full bg-white p-3 shadow-lg">
              <Check className="h-12 w-12 text-green-600" strokeWidth={3} />
            </span>
          </div>
        )}
      </div>

      {status === "tacno" && (
        <p className="mb-4 animate-bounce text-2xl font-extrabold text-green-600">
          {t("Bravo!")} {pojam.rec}
        </p>
      )}

      {/* Opcije */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {opcije.map((slovo, i) => {
          const jePogresno = pogresnoSlovo === slovo;
          const jeTacno = status === "tacno" && slovo === pojam.slovo;

          let dugmeBoja: string = BOJE_DUGMADI[i % BOJE_DUGMADI.length];
          if (jeTacno) dugmeBoja = "bg-green-300 text-green-900 ring-4 ring-green-400 scale-110";
          if (jePogresno) dugmeBoja = "animate-shake bg-orange-300 text-orange-900";

          return (
            <button
              key={`${pojam.slovo}-${slovo}`}
              type="button"
              disabled={status === "tacno"}
              onClick={() => proveriOdgovor(slovo)}
              className={`flex h-24 w-24 items-center justify-center rounded-3xl text-5xl font-extrabold shadow-lg transition-all duration-200 sm:h-28 sm:w-28 ${dugmeBoja} ${
                status === "tacno"
                  ? "cursor-default"
                  : "cursor-pointer hover:scale-110 active:scale-95"
              }`}
            >
              {slovo}
            </button>
          );
        })}
      </div>
    </main>
  );
}
