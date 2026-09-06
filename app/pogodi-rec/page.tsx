"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Home, RefreshCw, Star } from "lucide-react";
import confetti from "canvas-confetti";
import NazadLink from "@/components/NazadLink";
import GameTitleIcon from "@/components/GameTitleIcon";
import { playBalloonPop, playPobjeda, playTacno } from "@/lib/sounds";
import { useT } from "@/components/PismoProvider";

const ZIVOTI = 6;

const REDOVI_TASTATURE = [
  ["Љ", "Њ", "Е", "Р", "Т", "З", "У", "И", "О", "П", "Ш", "Ђ"],
  ["А", "С", "Д", "Ф", "Г", "Х", "Ј", "К", "Л", "Ч", "Ћ", "Ж"],
  ["Џ", "Ц", "В", "Б", "Н", "М"],
] as const;

const LATIN_NA_CIRILICU: Record<string, string> = {
  q: "Љ",
  w: "Њ",
  e: "Е",
  r: "Р",
  t: "Т",
  y: "З",
  u: "У",
  i: "И",
  o: "О",
  p: "П",
  "[": "Ш",
  "]": "Ђ",
  a: "А",
  s: "С",
  d: "Д",
  f: "Ф",
  g: "Г",
  h: "Х",
  j: "Ј",
  k: "К",
  l: "Л",
  ";": "Ч",
  "'": "Ћ",
  "\\": "Ж",
  z: "Џ",
  x: "Ц",
  c: "В",
  v: "Б",
  b: "Н",
  n: "М",
};

const SVA_SLOVA = new Set<string>(REDOVI_TASTATURE.flat());

const BALON_BOJE = [
  { telo: "bg-red-400", konac: "bg-red-300", delay: "0ms" },
  { telo: "bg-orange-400", konac: "bg-orange-300", delay: "180ms" },
  { telo: "bg-yellow-300", konac: "bg-yellow-200", delay: "320ms" },
  { telo: "bg-green-400", konac: "bg-green-300", delay: "90ms" },
  { telo: "bg-sky-400", konac: "bg-sky-300", delay: "250ms" },
  { telo: "bg-violet-400", konac: "bg-violet-300", delay: "400ms" },
];

const DUGME_BOJE = [
  "bg-red-200 text-red-900 hover:bg-red-300",
  "bg-orange-200 text-orange-900 hover:bg-orange-300",
  "bg-yellow-200 text-yellow-900 hover:bg-yellow-300",
  "bg-green-200 text-green-900 hover:bg-green-300",
  "bg-sky-200 text-sky-900 hover:bg-sky-300",
  "bg-violet-200 text-violet-900 hover:bg-violet-300",
  "bg-pink-200 text-pink-900 hover:bg-pink-300",
  "bg-fuchsia-200 text-fuchsia-900 hover:bg-fuchsia-300",
];

type RecIgre = {
  rec: string;
  kategorija: string;
  slika?: string;
};

const RECI: RecIgre[] = [
  { rec: "ПАС", kategorija: "Животиње", slika: "/slike/azbuka/pas.jpeg" },
  { rec: "МАЧКА", kategorija: "Животиње", slika: "/slike/azbuka/macka.jpeg" },
  { rec: "ЛАВ", kategorija: "Животиње", slika: "/slike/azbuka/lav.jpeg" },
  { rec: "ВУК", kategorija: "Животиње", slika: "/slike/azbuka/vuk.jpeg" },
  { rec: "РИБА", kategorija: "Животиње", slika: "/slike/azbuka/riba.jpeg" },
  { rec: "ЗЕБРА", kategorija: "Животиње", slika: "/slike/azbuka/zebra.jpeg" },
  { rec: "ЖИРАФА", kategorija: "Животиње", slika: "/slike/azbuka/zirafa.jpeg" },
  { rec: "ЈАБУКА", kategorija: "Воће", slika: "/slike/azbuka/jabuka.jpeg" },
  { rec: "БАНАНА", kategorija: "Воће", slika: "/slike/azbuka/banana.jpeg" },
  { rec: "ГРОЖЂЕ", kategorija: "Воће", slika: "/slike/azbuka/grozdje.jpeg" },
  { rec: "СУНЦЕ", kategorija: "Природа", slika: "/slike/azbuka/sunce.jpeg" },
  { rec: "ДРВО", kategorija: "Природа", slika: "/slike/azbuka/drvo.jpeg" },
  { rec: "ЦВЕТ", kategorija: "Природа", slika: "/slike/azbuka/cvet.jpeg" },
  { rec: "КУЋА", kategorija: "Остало" },
  { rec: "КЊИГА", kategorija: "Остало", slika: "/slike/azbuka/knjiga.jpeg" },
  { rec: "ШКОЛА", kategorija: "Остало", slika: "/slike/azbuka/skola.jpeg" },
  { rec: "ТОРТА", kategorija: "Остало", slika: "/slike/azbuka/torta.jpeg" },
  { rec: "ЧАША", kategorija: "Остало", slika: "/slike/azbuka/casa.jpeg" },
  { rec: "АВИОН", kategorija: "Остало", slika: "/slike/azbuka/avion.jpeg" },
  { rec: "ЏИП", kategorija: "Остало", slika: "/slike/azbuka/dzip.jpeg" },
];

function izaberiRec(exclude?: string): RecIgre {
  const pool = exclude ? RECI.filter((r) => r.rec !== exclude) : RECI;
  return pool[Math.floor(Math.random() * pool.length)];
}

function slovoSaTastature(e: KeyboardEvent): string | null {
  if (e.ctrlKey || e.metaKey || e.altKey) return null;
  const raw = e.key;
  if (SVA_SLOVA.has(raw.toUpperCase())) return raw.toUpperCase();
  return LATIN_NA_CIRILICU[raw.toLowerCase()] ?? null;
}

function VeseliLik({ zivi, pucaIndex }: { zivi: number; pucaIndex: number | null }) {
  const t = useT();
  return (
    <div className="relative flex flex-col items-center">
      <div className="mb-1 flex h-20 items-end justify-center gap-1 sm:h-24 lg:h-32 lg:gap-2">
        {BALON_BOJE.map((boja, i) => {
          const pukao = i >= zivi;
          const puca = pucaIndex === i;

          return (
            <div key={i} className="relative flex w-8 flex-col items-center sm:w-10">
              {!pukao || puca ? (
                <div
                  className={`relative ${puca ? "animate-balloon-pop" : "animate-balloon-float"}`}
                  style={{ animationDelay: puca ? "0ms" : boja.delay }}
                >
                  <span
                    className={`block h-8 w-6 rounded-full shadow-md sm:h-10 sm:w-8 lg:h-12 lg:w-10 ${boja.telo}`}
                  />
                  <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-inherit" />
                  <span
                    className={`absolute left-1/2 top-full h-8 w-0.5 -translate-x-1/2 ${boja.konac} sm:h-10 lg:h-12`}
                  />
                </div>
              ) : (
                <span className="mb-8 text-lg opacity-40 sm:text-xl">💥</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="relative z-10 mt-4 flex flex-col items-center lg:mt-6">
        <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full border-4 border-amber-300 bg-amber-200 shadow-lg sm:h-20 sm:w-20 lg:h-24 lg:w-24">
          <div className="mb-1 flex gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-800" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-800" />
          </div>
          <div className="h-3 w-6 rounded-b-full border-b-4 border-slate-800" />
        </div>
        <div className="-mt-1 h-8 w-14 rounded-t-3xl bg-sky-400 sm:h-10 sm:w-16 lg:h-12 lg:w-20" />
        <p className="mt-2 text-sm font-bold text-indigo-700 sm:text-base">
          {zivi === 0 ? t("Ох не! 🎈") : t("Drži balone! 🎈")}
        </p>
      </div>
    </div>
  );
}

export default function PogodiRecPage() {
  const t = useT();
  const [pojam, setPojam] = useState<RecIgre | null>(null);
  const [pogodjena, setPogodjena] = useState<Set<string>>(() => new Set());
  const [zivi, setZivi] = useState(ZIVOTI);
  const [pucaIndex, setPucaIndex] = useState<number | null>(null);
  const [status, setStatus] = useState<"igra" | "pobeda" | "poraz">("igra");
  const [zvezdice, setZvezdice] = useState(0);
  const pucaTimeoutRef = useRef<number | null>(null);

  const novaIgra = useCallback((exclude?: string) => {
    if (pucaTimeoutRef.current) window.clearTimeout(pucaTimeoutRef.current);
    setPojam(izaberiRec(exclude));
    setPogodjena(new Set());
    setZivi(ZIVOTI);
    setPucaIndex(null);
    setStatus("igra");
  }, []);

  useEffect(() => {
    novaIgra();
    return () => {
      if (pucaTimeoutRef.current) window.clearTimeout(pucaTimeoutRef.current);
    };
  }, [novaIgra]);

  const handleGuess = useCallback(
    (slovo: string) => {
      if (!pojam || status !== "igra") return;
      if (pogodjena.has(slovo)) return;

      const sledeca = new Set(pogodjena);
      sledeca.add(slovo);
      setPogodjena(sledeca);

      const uReci = pojam.rec.includes(slovo);
      if (uReci) {
        playTacno();
        const otkrivena = pojam.rec.split("").every((s) => sledeca.has(s));
        if (otkrivena) {
          setStatus("pobeda");
          setZvezdice((z) => z + 1);
          playPobjeda();
          void confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.55 },
            colors: ["#818cf8", "#f472b6", "#facc15", "#60a5fa", "#34d399"],
          });
        }
        return;
      }

      playBalloonPop();
      const noviZivi = zivi - 1;
      setPucaIndex(noviZivi);
      setZivi(noviZivi);
      pucaTimeoutRef.current = window.setTimeout(() => setPucaIndex(null), 450);

      if (noviZivi <= 0) {
        setStatus("poraz");
      }
    },
    [pojam, pogodjena, status, zivi],
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const slovo = slovoSaTastature(e);
      if (!slovo) return;
      e.preventDefault();
      handleGuess(slovo);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleGuess]);

  if (!pojam) {
    return (
      <main className="igrica-ekran bg-indigo-50">
        <p className="m-auto text-xl font-bold text-indigo-700">{t("Učitavanje...")}</p>
      </main>
    );
  }

  const slovaReci = pojam.rec.split("");

  return (
    <main className="igrica-ekran bg-indigo-50 px-3 sm:px-4">
      <div className="mb-2 grid w-full max-w-3xl shrink-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 self-center pt-3 sm:mb-3 sm:pt-4">
        <NazadLink />

        <h1 className="flex items-center justify-center gap-1 truncate text-center text-xl font-extrabold text-indigo-800 sm:gap-2 sm:text-3xl">
          <GameTitleIcon src="/icons/pogodi-rec.jpeg" alt="" size="sm" />
          <span className="truncate">{t("Pogodi Reč")}</span>
        </h1>

        <div className="flex shrink-0 items-center gap-1 rounded-full bg-amber-300/90 px-3 py-2 shadow-md sm:gap-2 sm:px-5">
          <Star className="h-4 w-4 fill-amber-700 text-amber-700 sm:h-5 sm:w-5" />
          <span className="text-lg font-extrabold text-amber-900 sm:text-xl">{zvezdice}</span>
        </div>
      </div>

      <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center overflow-y-auto py-1">
        <VeseliLik zivi={zivi} pucaIndex={pucaIndex} />

        <p className="mt-2 rounded-full bg-white/80 px-4 py-1.5 text-sm font-bold text-indigo-600 shadow sm:mt-3 sm:text-base">
          {t("Kategorija:")} {pojam.kategorija}
        </p>

        <div className="mt-3 flex flex-wrap justify-center gap-2 sm:mt-4 sm:gap-3">
          {slovaReci.map((slovo, i) => {
            const otkriveno = pogodjena.has(slovo) || status === "poraz";
            return (
              <span
                key={`${pojam.rec}-${i}`}
                className={`flex h-10 w-8 items-center justify-center rounded-xl border-b-4 text-2xl font-extrabold sm:h-14 sm:w-12 sm:text-3xl lg:h-16 lg:w-14 lg:text-4xl ${
                  otkriveno
                    ? status === "poraz" && !pogodjena.has(slovo)
                      ? "border-orange-300 bg-orange-50 text-orange-700"
                      : "border-indigo-400 bg-white text-indigo-800"
                    : "border-indigo-200 bg-white text-transparent"
                }`}
              >
                {otkriveno ? slovo : "_"}
              </span>
            );
          })}
        </div>

        {status === "pobeda" && (
          <div className="mt-3 flex w-full max-w-sm flex-col items-center gap-2 rounded-3xl bg-white p-4 text-center shadow-xl sm:mt-4 sm:gap-3 sm:p-5">
            <p className="text-2xl font-extrabold text-green-600">{t("Bravo! 🎉")}</p>
            {pojam.slika ? (
              <div className="relative h-28 w-28 overflow-hidden rounded-2xl border-4 border-green-200 sm:h-36 sm:w-36">
                <Image src={pojam.slika} alt={pojam.rec} fill className="object-cover" sizes="144px" />
              </div>
            ) : (
              <Home className="h-16 w-16 text-green-500" />
            )}
            <p className="text-xl font-bold text-indigo-800">{pojam.rec}</p>
            <button
              type="button"
              onClick={() => novaIgra(pojam.rec)}
              className="rounded-full bg-green-400 px-6 py-3 text-lg font-extrabold text-white shadow-lg transition-all hover:scale-105 hover:bg-green-500"
            >
              {t("Sledeća reč")}
            </button>
          </div>
        )}

        {status === "poraz" && (
          <div className="mt-3 flex w-full max-w-sm flex-col items-center gap-2 rounded-3xl bg-white p-4 text-center shadow-xl sm:mt-4 sm:gap-3 sm:p-5">
            <p className="text-2xl font-extrabold text-orange-600">{t("Baloni su pukli!")}</p>
            <p className="text-lg text-slate-600">
              {t("Reč je bila:")} <span className="font-extrabold text-indigo-800">{pojam.rec}</span>
            </p>
            {pojam.slika && (
              <div className="relative h-24 w-24 overflow-hidden rounded-2xl border-4 border-orange-200 sm:h-28 sm:w-28">
                <Image src={pojam.slika} alt={pojam.rec} fill className="object-cover" sizes="112px" />
              </div>
            )}
            <button
              type="button"
              onClick={() => novaIgra(pojam.rec)}
              className="flex items-center gap-2 rounded-full bg-indigo-400 px-6 py-3 text-lg font-extrabold text-white shadow-lg transition-all hover:scale-105 hover:bg-indigo-500"
            >
              <RefreshCw className="h-5 w-5" />
              {t("Pokušaj ponovo")}
            </button>
          </div>
        )}
      </div>

      <div className="igrica-dno w-full max-w-xl self-center">
        <div className="flex w-full flex-col items-center gap-1.5 sm:gap-2">
          {REDOVI_TASTATURE.map((red, ri) => (
            <div key={ri} className="flex w-full justify-center gap-1 sm:gap-1.5">
              {red.map((slovo, si) => {
                const iskorisceno = pogodjena.has(slovo);
                const tacno = iskorisceno && pojam.rec.includes(slovo);
                const boja = DUGME_BOJE[(ri * 6 + si) % DUGME_BOJE.length];

                return (
                  <button
                    key={slovo}
                    type="button"
                    disabled={iskorisceno || status !== "igra"}
                    onPointerDown={(e) => {
                      e.preventDefault();
                      handleGuess(slovo);
                    }}
                    className={`flex h-8 min-w-0 flex-1 items-center justify-center rounded-lg text-sm font-extrabold shadow-md transition-all sm:h-11 sm:max-w-12 sm:text-base lg:h-12 lg:text-lg ${
                      iskorisceno
                        ? tacno
                          ? "cursor-default bg-green-300 text-green-800"
                          : "cursor-default bg-gray-300 text-gray-500"
                        : `cursor-pointer active:scale-90 ${boja}`
                    } ${red.length === 6 ? "max-w-12" : ""}`}
                  >
                    {slovo}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
