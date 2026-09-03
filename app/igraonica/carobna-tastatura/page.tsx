"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";

// ─── Konstante ────────────────────────────────────────────────────────────────
const ABECEDA = [
  "A","B","C","D","E","F","G","H","I","J","K","L","M",
  "N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
] as const;

type Slovo = (typeof ABECEDA)[number];

const BOJE_TIPKI = [
  "bg-red-200 hover:bg-red-300",
  "bg-blue-200 hover:bg-blue-300",
  "bg-green-200 hover:bg-green-300",
  "bg-yellow-200 hover:bg-yellow-300",
  "bg-purple-200 hover:bg-purple-300",
  "bg-pink-200 hover:bg-pink-300",
];

function randomSlovo(): Slovo {
  return ABECEDA[Math.floor(Math.random() * ABECEDA.length)];
}

// ─── Audio helpers ────────────────────────────────────────────────────────────
function playLetter(slovo: Slovo) {
  const audio = new Audio(`/audio/abeceda/${slovo}.mp3`);
  void audio.play();
}

function playTacno() {
  try {
    const ctx = new AudioContext();
    // Uzlazni "ding" — dva tona
    [523, 784].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.35, ctx.currentTime + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.3);
      osc.start(ctx.currentTime + i * 0.12);
      osc.stop(ctx.currentTime + i * 0.12 + 0.3);
    });
  } catch {}
}

function playNetacno() {
  try {
    const ctx = new AudioContext();
    // Kratki "buzz"
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sawtooth";
    osc.frequency.value = 180;
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  } catch {}
}

// ─── Komponenta ───────────────────────────────────────────────────────────────
export default function CarobnaTastaturaPage() {
  const [trenutnoSlovo, setTrenutnoSlovo] = useState<Slovo>(() => randomSlovo());
  const [pozicija, setPozicija] = useState(0);
  const [rezultat, setRezultat] = useState(0);
  const [pogodak, setPogodak] = useState(false);
  const [promasaj, setPromasaj] = useState(false);

  const trenutnoSlovoRef = useRef<Slovo>(trenutnoSlovo);
  const pogodakRef = useRef(pogodak);
  useEffect(() => { trenutnoSlovoRef.current = trenutnoSlovo; }, [trenutnoSlovo]);
  useEffect(() => { pogodakRef.current = pogodak; }, [pogodak]);
  const promasajRef = useRef(promasaj);
  useEffect(() => { promasajRef.current = promasaj; }, [promasaj]);

  // ─── Provjera pogotka ─────────────────────────────────────────────────────
  const provjeriPogodak = useCallback((kliknutoSlovo: Slovo) => {
    if (kliknutoSlovo === trenutnoSlovoRef.current) {
      // ✅ Tačno
      playTacno();
      setTimeout(() => playLetter(kliknutoSlovo), 250); // izgovori slovo posle "ding"
      setPogodak(true);
      setRezultat((r) => r + 1);
      setPozicija(0);
      setTimeout(() => {
        setPogodak(false);
        setTrenutnoSlovo(randomSlovo());
      }, 800);
    } else {
      // ❌ Netačno
      playNetacno();
      setPromasaj(true);
      setTimeout(() => setPromasaj(false), 400);
    }
  }, []);

  // ─── Keyboard input ───────────────────────────────────────────────────────
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.repeat) return;
      const key = e.key.toUpperCase();
      if ((ABECEDA as readonly string[]).includes(key)) {
        provjeriPogodak(key as Slovo);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [provjeriPogodak]);

  // ─── Game loop ────────────────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => {
      if (pogodakRef.current) return;
      setPozicija((prev) => {
        if (prev >= 92) {
          setTrenutnoSlovo(randomSlovo());
          return 0;
        }
        return prev + 1.5;
      });
    }, 100);
    return () => clearInterval(id);
  }, []);

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="flex h-screen flex-col overflow-hidden font-sans">

      {/* ── NEBO (70%) ───────────────────────────────────────────────────── */}
      <div className="relative flex-[7] overflow-hidden rounded-b-3xl bg-indigo-900">

        {/* Navigacija */}
        <div className="absolute left-4 top-4 z-10">
          <Link
            href="/"
            className="flex items-center gap-1 rounded-full bg-white/20 px-4 py-2 text-sm font-bold text-white backdrop-blur transition hover:bg-white/30"
          >
            <ArrowLeft className="h-4 w-4" />
            Izlaz
          </Link>
        </div>

        {/* Rezultat */}
        <div className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full bg-yellow-400/90 px-5 py-2 shadow-lg">
          <Star className="h-5 w-5 fill-yellow-700 text-yellow-700" />
          <span className="text-xl font-extrabold text-yellow-900">{rezultat}</span>
        </div>

        {/* Naslov */}
        <div className="absolute inset-x-0 top-5 flex justify-center">
          <span className="text-base font-bold tracking-widest text-white/50 uppercase">
            Čarobna Tastatura
          </span>
        </div>

        {/* Balon sa slovom */}
        <div
          className="absolute left-1/2 -translate-x-1/2 transition-none"
          style={{ top: `${pozicija}%` }}
        >
          <div
            className={`flex h-20 w-20 items-center justify-center rounded-full shadow-2xl transition-transform duration-300 sm:h-24 sm:w-24 ${
              pogodak
                ? "scale-150 bg-yellow-300 shadow-yellow-300/60"
                : promasaj
                ? "scale-90 bg-red-300 shadow-red-400/60"
                : "scale-100 bg-white/90"
            }`}
          >
            <span
              className={`text-4xl font-extrabold sm:text-5xl ${
                pogodak ? "text-yellow-700" : promasaj ? "text-red-800" : "text-indigo-800"
              }`}
            >
              {trenutnoSlovo}
            </span>
          </div>
          {!pogodak && <div className="mx-auto h-8 w-0.5 bg-white/40" />}
        </div>

        {/* Dekorativne zvezdice */}
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="pointer-events-none absolute select-none text-white/10"
            style={{
              left: `${(i * 37 + 11) % 100}%`,
              top: `${(i * 53 + 7) % 90}%`,
              fontSize: `${10 + (i % 4) * 6}px`,
            }}
          >
            ★
          </div>
        ))}
      </div>

      {/* ── TASTATURA (30%) ──────────────────────────────────────────────── */}
      <div className="flex-[3] overflow-y-auto bg-indigo-950 px-2 py-3 sm:px-4 sm:py-4">
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2 lg:grid-cols-13">
          {ABECEDA.map((slovo, i) => (
            <button
              key={slovo}
              type="button"
              onClick={() => provjeriPogodak(slovo)}
              className={`${BOJE_TIPKI[i % BOJE_TIPKI.length]} flex aspect-square items-center justify-center rounded-xl text-xl font-extrabold text-gray-800 shadow-md transition-all duration-150 hover:scale-110 hover:shadow-lg active:scale-90`}
            >
              {slovo}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
