"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Apple, Cat, Car, Heart, Star, Fish, Cake, Sun, type LucideIcon } from "lucide-react";
import confetti from "canvas-confetti";
import NazadLink from "@/components/NazadLink";

// ─── Predmeti koji se broje ───────────────────────────────────────────────────
type Predmet = { ikona: LucideIcon; boja: string; naziv: string };

const PREDMETI: Predmet[] = [
  { ikona: Apple,  boja: "text-red-500",    naziv: "jabuka"  },
  { ikona: Cat,    boja: "text-orange-400", naziv: "mačka"   },
  { ikona: Car,    boja: "text-blue-500",   naziv: "auto"    },
  { ikona: Heart,  boja: "text-pink-500",   naziv: "srce"    },
  { ikona: Star,   boja: "text-yellow-400", naziv: "zvezda"  },
  { ikona: Fish,   boja: "text-cyan-500",   naziv: "riba"    },
  { ikona: Cake,   boja: "text-purple-500", naziv: "torta"   },
  { ikona: Sun,    boja: "text-amber-400",  naziv: "sunce"   },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function randomBroj(min = 1, max = 10) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function playPop() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.connect(g); g.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(900, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.08);
    g.gain.setValueAtTime(0.25, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  } catch { /* noop */ }
}

function playTacno() {
  try {
    const ctx = new AudioContext();
    [523, 659, 784].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.connect(g); g.connect(ctx.destination);
      osc.type = "sine"; osc.frequency.value = freq;
      const t = ctx.currentTime + i * 0.13;
      g.gain.setValueAtTime(0.3, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      osc.start(t); osc.stop(t + 0.35);
    });
  } catch { /* noop */ }
}

function playNetacno() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.connect(g); g.connect(ctx.destination);
    osc.type = "sawtooth"; osc.frequency.value = 160;
    g.gain.setValueAtTime(0.2, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.32);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.32);
  } catch { /* noop */ }
}

// ─── Komponenta ───────────────────────────────────────────────────────────────
export default function BrojalicaPage() {
  const [trazeniBroj, setTrazeniBroj]   = useState(1);
  const [opcije, setOpcije]             = useState<number[]>([]);
  const [predmet, setPredmet]           = useState<Predmet>(PREDMETI[0]);
  const [poruka, setPoruka]             = useState<"tacno" | "netacno" | null>(null);
  // Set indeksa ikona koji je dete već kliknulo (radi brojanja)
  const [kliknuti, setKliknuti]         = useState<Set<number>>(new Set());

  const timeoutRef   = useRef<number | null>(null);
  const porukaTORef  = useRef<number | null>(null);
  const blokiranRef  = useRef(false);
  const audioRef     = useRef<HTMLAudioElement | null>(null);

  const generisiZadatak = useCallback(() => {
    setPoruka(null);
    setKliknuti(new Set());
    blokiranRef.current = false;

    const tacno = randomBroj();
    const netacni = new Set<number>();
    while (netacni.size < 2) {
      const n = randomBroj();
      if (n !== tacno) netacni.add(n);
    }

    setTrazeniBroj(tacno);
    setOpcije(shuffle([tacno, ...netacni]));
    setPredmet(PREDMETI[Math.floor(Math.random() * PREDMETI.length)]);
  }, []);

  useEffect(() => {
    generisiZadatak();
    return () => {
      if (timeoutRef.current)  window.clearTimeout(timeoutRef.current);
      if (porukaTORef.current) window.clearTimeout(porukaTORef.current);
    };
  }, [generisiZadatak]);

  // ─── Klik na pojedinačnu ikonicu (interaktivno brojanje) ─────────────────
  function klikIkonica(i: number) {
    if (kliknuti.has(i)) {
      // Odoznači
      setKliknuti((prev) => { const s = new Set(prev); s.delete(i); return s; });
    } else {
      playPop();
      setKliknuti((prev) => new Set(prev).add(i));
    }
  }

  // ─── Provjera odgovora ────────────────────────────────────────────────────
  function proveriOdgovor(izabraniBroj: number) {
    if (blokiranRef.current) return;
    if (porukaTORef.current) window.clearTimeout(porukaTORef.current);

    if (izabraniBroj === trazeniBroj) {
      blokiranRef.current = true;
      setPoruka("tacno");
      playTacno();

      // Izgovori broj
      if (audioRef.current) { audioRef.current.pause(); }
      const audio = new Audio(`/audio/brojevi/${trazeniBroj}.mp3`);
      audioRef.current = audio;
      setTimeout(() => void audio.play(), 400);

      // Konfete 🎉
      void confetti({
        particleCount: 140,
        spread: 80,
        origin: { y: 0.55 },
        colors: ["#f472b6", "#facc15", "#34d399", "#60a5fa", "#a78bfa"],
      });

      timeoutRef.current = window.setTimeout(() => generisiZadatak(), 2200);
    } else {
      setPoruka("netacno");
      playNetacno();

      porukaTORef.current = window.setTimeout(() => setPoruka(null), 1200);
    }
  }

  const Ikona = predmet.ikona;

  return (
    <main className="flex min-h-screen flex-col items-center bg-yellow-50 px-4 py-10">

      {/* Nazad */}
      <div className="mb-6 w-full max-w-lg">
        <NazadLink className="inline-flex items-center gap-2 rounded-full bg-yellow-200 px-5 py-2.5 font-bold text-yellow-900 shadow-md transition-all hover:scale-105 hover:shadow-lg" />
      </div>

      {/* Naslov */}
      <h1 className="mb-2 text-center text-4xl font-extrabold text-yellow-800 sm:text-5xl">
        Prebroj predmete! 🌟
      </h1>
      <p className="mb-8 text-center text-base text-yellow-600">
        Klikni na predmete dok brojiš, pa odaberi broj!
      </p>

      {/* Kontejner s ikonicama — grid max 5 po redu */}
      <div className="mb-3 flex flex-wrap items-center justify-center gap-3 rounded-3xl bg-white p-6 shadow-xl sm:gap-4 sm:p-8" style={{ maxWidth: "360px" }}>
        {Array.from({ length: trazeniBroj }).map((_, i) => {
          const kliknut = kliknuti.has(i);
          return (
            <button
              key={i}
              type="button"
              onClick={() => klikIkonica(i)}
              className={`flex items-center justify-center rounded-2xl p-1 transition-all duration-200 focus:outline-none ${
                kliknut
                  ? "scale-90 opacity-40"
                  : "hover:scale-110 active:scale-95"
              }`}
              aria-label={`Predmet ${i + 1}`}
            >
              <Ikona
                className={`h-14 w-14 sm:h-16 sm:w-16 ${kliknut ? "text-gray-400" : predmet.boja}`}
                strokeWidth={1.75}
              />
            </button>
          );
        })}
      </div>

      {/* Mini hint */}
      <p className="mb-6 text-sm text-yellow-500">
        {kliknuti.size > 0
          ? `Označio si ${kliknuti.size} ${predmet.naziv}${kliknuti.size === 1 ? "u" : "e"}`
          : "Klikni na svaki predmet dok brojiš →"}
      </p>

      {/* Opcije */}
      <div className="mb-8 flex gap-5">
        {opcije.map((broj) => (
          <button
            key={broj}
            type="button"
            onClick={() => proveriOdgovor(broj)}
            className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-full bg-yellow-200 text-5xl font-bold text-yellow-800 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-yellow-300 active:scale-95"
          >
            {broj}
          </button>
        ))}
      </div>

      {/* Poruka */}
      <div className="flex h-12 items-center justify-center">
        {poruka === "tacno" && (
          <p className="animate-bounce text-3xl font-bold text-green-600">🎉 Bravo!</p>
        )}
        {poruka === "netacno" && (
          <p className="text-3xl font-bold text-red-500">😅 Pokušaj ponovo!</p>
        )}
      </div>

    </main>
  );
}
