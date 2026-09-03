"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import NazadLink from "@/components/NazadLink";

const BOJE = [
  "text-red-500",
  "text-orange-500",
  "text-yellow-500",
  "text-green-500",
  "text-teal-500",
  "text-blue-500",
  "text-indigo-500",
  "text-purple-500",
  "text-pink-500",
  "text-rose-500",
];

const REDOVI_TASTATURE = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

type LeteceSlovoType = {
  id: number;
  slovo: string;
  x: number;
  boja: string;
};

let idBrojac = 0;

function reproducirajKlik() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(300, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.05);

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.08);
  } catch {
    // Web Audio API nije dostupan
  }
}

export default function MagicnaPisacaMasinaPage() {
  const [otipkaniTekst, setOtipkaniTekst] = useState("");
  const [letecaSlova, setLetecaSlova] = useState<LeteceSlovoType[]>([]);
  const [aktivnoSlovo, setAktivnoSlovo] = useState<string | null>(null);
  const krajTekstaRef = useRef<HTMLDivElement>(null);

  const highlightTipku = useCallback((slovo: string) => {
    setAktivnoSlovo(slovo);
    setTimeout(() => setAktivnoSlovo(null), 150);
  }, []);

  const handleType = useCallback((slovo: string) => {
    setOtipkaniTekst((prev) => prev + slovo);
    reproducirajKlik();
    highlightTipku(slovo.toUpperCase());

    const novoSlovo: LeteceSlovoType = {
      id: ++idBrojac,
      slovo,
      x: Math.random() * 80 + 10, // 10% – 90% širine ekrana
      boja: BOJE[Math.floor(Math.random() * BOJE.length)],
    };

    setLetecaSlova((prev) => [...prev, novoSlovo]);

    setTimeout(() => {
      setLetecaSlova((prev) => prev.filter((s) => s.id !== novoSlovo.id));
    }, 2000);
  }, []);

  // Slušaj pravu tipkovnicu
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === "Backspace") {
        setOtipkaniTekst((prev) => prev.slice(0, -1));
        highlightTipku("⌫");
        return;
      }
      if (e.key === "Enter") {
        handleType("\n");
        highlightTipku("↵");
        return;
      }
      if (e.key === " ") {
        e.preventDefault();
        handleType(" ");
        highlightTipku("RAZMAK");
        return;
      }
      if (e.key.length === 1) {
        handleType(e.key);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleType, highlightTipku]);

  // Auto-scroll prema dolje
  useEffect(() => {
    krajTekstaRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [otipkaniTekst]);

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-amber-900 px-4 py-6 sm:py-10">
      {/* Leteća slova (magija) */}
      {letecaSlova.map((s) => (
        <LeteceSlovoElement key={s.id} slovoObj={s} />
      ))}

      <div className="flex w-full max-w-3xl flex-col items-center gap-6">
        {/* Header */}
        <header className="flex w-full items-center justify-between">
          <NazadLink
            label="Nazad"
            iconClassName="h-4 w-4"
            className="flex items-center gap-2 rounded-full bg-amber-700 px-4 py-2 text-sm font-bold text-amber-100 shadow-md transition-all hover:scale-105 hover:bg-amber-600"
          />
          <h1 className="text-center text-2xl font-extrabold text-amber-100 sm:text-3xl drop-shadow-lg">
            🖊️ Magična Pisaća Mašina
          </h1>
          <div className="w-28" />
        </header>

        {/* Papir */}
        <section className="w-full rounded-2xl bg-orange-50 p-8 shadow-2xl min-h-[50vh] max-h-[60vh] overflow-y-auto border-4 border-amber-200 relative">
          {/* Linije na papiru */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              backgroundImage:
                "repeating-linear-gradient(transparent, transparent 47px, #d6b89a 47px, #d6b89a 48px)",
              backgroundPosition: "0 56px",
            }}
          />
          <div className="relative z-10">
            <p className="font-mono text-2xl sm:text-4xl text-gray-800 whitespace-pre-wrap break-words leading-[48px] min-h-[48px]">
              {otipkaniTekst}
              <span className="animate-pulse text-amber-600">|</span>
            </p>
            <div ref={krajTekstaRef} />
          </div>
        </section>

        {/* Virtualna tipkovnica */}
        <div className="flex w-full flex-col items-center gap-2 rounded-2xl bg-amber-800 p-4 shadow-xl">
          {REDOVI_TASTATURE.map((red, i) => (
            <div key={i} className="flex gap-1.5 sm:gap-2">
              {red.map((slovo) => (
                <button
                  key={slovo}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    handleType(slovo);
                  }}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg text-base font-bold text-amber-900 shadow-md transition-all active:scale-90 hover:bg-yellow-200 sm:h-12 sm:w-12 sm:text-lg select-none ${
                    aktivnoSlovo === slovo
                      ? "bg-yellow-400 scale-90 shadow-inner"
                      : "bg-amber-100"
                  }`}
                >
                  {slovo}
                </button>
              ))}
            </div>
          ))}
          {/* Donji red: razmak i enter */}
          <div className="flex gap-2 mt-1">
            <button
              onPointerDown={(e) => { e.preventDefault(); handleType(" "); }}
              className={`h-10 w-48 rounded-lg text-sm font-bold text-amber-900 shadow-md transition-all active:scale-95 hover:bg-yellow-200 sm:h-12 sm:w-64 select-none ${
                aktivnoSlovo === "RAZMAK" ? "bg-yellow-400 scale-95 shadow-inner" : "bg-amber-100"
              }`}
            >
              RAZMAK
            </button>
            <button
              onPointerDown={(e) => { e.preventDefault(); handleType("\n"); }}
              className={`h-10 w-20 rounded-lg text-sm font-bold text-amber-900 shadow-md transition-all active:scale-95 hover:bg-yellow-200 sm:h-12 sm:w-24 select-none ${
                aktivnoSlovo === "↵" ? "bg-yellow-400 scale-95 shadow-inner" : "bg-amber-200"
              }`}
            >
              ↵
            </button>
            <button
              onPointerDown={(e) => { e.preventDefault(); setOtipkaniTekst((p) => p.slice(0, -1)); highlightTipku("⌫"); }}
              className={`h-10 w-20 rounded-lg text-sm font-bold text-red-900 shadow-md transition-all active:scale-95 hover:bg-red-300 sm:h-12 sm:w-24 select-none ${
                aktivnoSlovo === "⌫" ? "bg-red-400 scale-95 shadow-inner" : "bg-red-200"
              }`}
            >
              ⌫
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

// Zasebna komponenta za leteće slovo s CSS animacijom
function LeteceSlovoElement({ slovoObj }: { slovoObj: LeteceSlovoType }) {
  return (
    <span
      className={`pointer-events-none fixed top-1/2 z-50 text-5xl font-extrabold ${slovoObj.boja} drop-shadow-lg`}
      style={{
        left: `${slovoObj.x}%`,
        animation: "letiFgore 2s ease-out forwards",
      }}
    >
      {slovoObj.slovo === " " ? "·" : slovoObj.slovo === "\n" ? "↵" : slovoObj.slovo}
      <style>{`
        @keyframes letiFgore {
          0%   { transform: translateY(0)   scale(1);   opacity: 1; }
          100% { transform: translateY(-200px) scale(1.6); opacity: 0; }
        }
      `}</style>
    </span>
  );
}
