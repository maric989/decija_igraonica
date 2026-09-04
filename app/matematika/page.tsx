"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Minus, Plus, RefreshCw, Settings2, Star } from "lucide-react";
import NazadLink from "@/components/NazadLink";
import GameTitleIcon from "@/components/GameTitleIcon";
import { playNetacno, playPop, playTacno } from "@/lib/sounds";
import { useT } from "@/components/PismoProvider";

type Operacija = "+" | "-" | "mix";
type Tezina = "lako" | "srednje" | "tesko";
type Ekran = "podesavanje" | "kviz";

type Zadatak = {
  a: number;
  b: number;
  op: "+" | "-";
  rezultat: number;
  opcije: number[];
};

const MAX_PO_TEZINI: Record<Tezina, number> = {
  lako: 10,
  srednje: 30,
  tesko: 100,
};

const BOJE_ODGOVORA = [
  "bg-lime-200 text-lime-900 hover:bg-lime-300",
  "bg-yellow-200 text-yellow-900 hover:bg-yellow-300",
  "bg-sky-200 text-sky-900 hover:bg-sky-300",
  "bg-pink-200 text-pink-900 hover:bg-pink-300",
];

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function generisiZadatak(operacija: Operacija, tezina: Tezina): Zadatak {
  const max = MAX_PO_TEZINI[tezina];
  const op: "+" | "-" =
    operacija === "mix" ? (Math.random() < 0.5 ? "+" : "-") : operacija;

  let a = randomInt(1, max);
  let b = randomInt(1, max);
  if (op === "-" && a < b) {
    [a, b] = [b, a];
  }

  const rezultat = op === "+" ? a + b : a - b;
  const opcije = new Set<number>([rezultat]);
  const gornja = Math.max(max * 2, rezultat + 5);

  let pokusaji = 0;
  while (opcije.size < 4 && pokusaji < 80) {
    pokusaji += 1;
    const pomeraj = randomInt(-8, 8) || 1;
    const kandidat = rezultat + pomeraj;
    if (kandidat >= 0 && kandidat <= gornja && kandidat !== rezultat) {
      opcije.add(kandidat);
    }
  }

  let n = 0;
  while (opcije.size < 4) {
    if (!opcije.has(n)) opcije.add(n);
    n += 1;
  }

  return { a, b, op, rezultat, opcije: shuffle([...opcije]) };
}

function BrojSaIkonama({ n, emoji }: { n: number; emoji: string }) {
  return (
    <div className="flex max-w-[11rem] flex-col items-center gap-2 sm:max-w-xs">
      <span className="text-5xl font-extrabold text-emerald-800 sm:text-6xl">{n}</span>
      <div className="flex flex-wrap justify-center gap-0.5 text-lg leading-none sm:text-xl">
        {Array.from({ length: n }, (_, i) => (
          <span key={i}>{emoji}</span>
        ))}
      </div>
    </div>
  );
}

export default function MatematikaPage() {
  const t = useT();
  const [ekran, setEkran] = useState<Ekran>("podesavanje");
  const [operacija, setOperacija] = useState<Operacija>("+");
  const [tezina, setTezina] = useState<Tezina>("lako");
  const [zadatak, setZadatak] = useState<Zadatak | null>(null);
  const [zvezdice, setZvezdice] = useState(0);
  const [tacanOdgovor, setTacanOdgovor] = useState<number | null>(null);
  const [pogresanOdgovor, setPogresanOdgovor] = useState<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const noviZadatak = useCallback(() => {
    setTacanOdgovor(null);
    setPogresanOdgovor(null);
    setZadatak(generisiZadatak(operacija, tezina));
  }, [operacija, tezina]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  function zapocniIgru() {
    playPop();
    setZvezdice(0);
    setEkran("kviz");
    setTacanOdgovor(null);
    setPogresanOdgovor(null);
    setZadatak(generisiZadatak(operacija, tezina));
  }

  function promeniNivo() {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setEkran("podesavanje");
    setZadatak(null);
    setTacanOdgovor(null);
    setPogresanOdgovor(null);
  }

  function proveriOdgovor(izbor: number) {
    if (!zadatak || tacanOdgovor !== null) return;

    if (izbor === zadatak.rezultat) {
      playTacno();
      setTacanOdgovor(izbor);
      setPogresanOdgovor(null);
      setZvezdice((z) => z + 1);
      timeoutRef.current = window.setTimeout(() => {
        noviZadatak();
      }, 1000);
      return;
    }

    playNetacno();
    setPogresanOdgovor(izbor);
    window.setTimeout(() => setPogresanOdgovor(null), 500);
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-lime-50 px-3 py-4 sm:px-4 sm:py-8">
      <div className="mb-4 grid w-full max-w-3xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 sm:mb-6">
        <NazadLink />
        <h1 className="flex items-center justify-center gap-1 truncate text-center text-lg font-extrabold text-emerald-800 sm:gap-2 sm:text-3xl">
          <GameTitleIcon src="/icons/matematika.jpeg" alt="" size="sm" />
          <span className="truncate">{t("Matematička Avantura")}</span>
        </h1>
        <div className="flex shrink-0 items-center gap-1 rounded-full bg-amber-300/90 px-3 py-2 shadow-md sm:gap-2 sm:px-5">
          <Star className="h-4 w-4 fill-amber-700 text-amber-700 sm:h-5 sm:w-5" />
          <span className="text-lg font-extrabold text-amber-900 sm:text-xl">{zvezdice}</span>
        </div>
      </div>

      {ekran === "podesavanje" ? (
        <div className="flex w-full max-w-xl flex-col items-center gap-8">
          <p className="text-center text-lg font-semibold text-emerald-700">
            {t("Izaberi operaciju i težinu, pa kreni!")}
          </p>

          <section className="w-full">
            <h2 className="mb-3 text-center text-sm font-bold uppercase tracking-wide text-emerald-600">
              {t("Operacija")}
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {(
                [
                  { id: "+", label: "Sabiranje", znak: "+", opis: "Saberi brojeve" },
                  { id: "-", label: "Oduzimanje", znak: "−", opis: "Oduzmi brojeve" },
                  { id: "mix", label: "Miks", znak: "+ / −", opis: "Oboje redom" },
                ] as const
              ).map((opcija) => (
                <button
                  key={opcija.id}
                  type="button"
                  onClick={() => setOperacija(opcija.id)}
                  className={`flex flex-col items-center gap-1 rounded-3xl px-2 py-4 shadow-md transition-all ${
                    operacija === opcija.id
                      ? "scale-105 bg-emerald-400 text-white ring-4 ring-emerald-200"
                      : "bg-white text-emerald-800 hover:bg-emerald-100"
                  }`}
                >
                  <span className="text-2xl font-black sm:text-3xl">{opcija.znak}</span>
                  <span className="text-xs font-bold sm:text-sm">{t(opcija.label)}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="w-full">
            <h2 className="mb-3 text-center text-sm font-bold uppercase tracking-wide text-emerald-600">
              {t("Težina")}
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {(
                [
                  { id: "lako", label: "Lako", opis: "1–10", emoji: "🟢" },
                  { id: "srednje", label: "Srednje", opis: "1–30", emoji: "🟡" },
                  { id: "tesko", label: "Teško", opis: "1–100", emoji: "🔴" },
                ] as const
              ).map((nivo) => (
                <button
                  key={nivo.id}
                  type="button"
                  onClick={() => setTezina(nivo.id)}
                  className={`flex flex-col items-center gap-1 rounded-3xl px-2 py-4 shadow-md transition-all ${
                    tezina === nivo.id
                      ? "scale-105 bg-emerald-400 text-white ring-4 ring-emerald-200"
                      : "bg-white text-emerald-800 hover:bg-emerald-100"
                  }`}
                >
                  <span className="text-2xl">{nivo.emoji}</span>
                  <span className="text-sm font-extrabold">{t(nivo.label)}</span>
                  <span className="text-xs font-semibold opacity-80">{nivo.opis}</span>
                </button>
              ))}
            </div>
          </section>

          <button
            type="button"
            onClick={zapocniIgru}
            className="rounded-full bg-emerald-400 px-10 py-4 text-xl font-extrabold text-white shadow-lg transition-all hover:scale-105 hover:bg-emerald-500"
          >
            {t("Započni igru")}
          </button>
        </div>
      ) : (
        zadatak && (
          <div className="flex w-full max-w-xl flex-col items-center gap-6">
            <button
              type="button"
              onClick={promeniNivo}
              className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-emerald-800 shadow-md transition-all hover:scale-105"
            >
              <Settings2 className="h-4 w-4" />
              {t("Promeni nivo / operaciju")}
            </button>

            <div className="flex w-full flex-col items-center rounded-3xl bg-white p-6 shadow-xl">
              <div className="flex items-start justify-center gap-3 sm:gap-5">
                {tezina === "lako" ? (
                  <>
                    <BrojSaIkonama n={zadatak.a} emoji="⭐" />
                    <span className="mt-2 text-4xl font-black text-emerald-500 sm:text-5xl">
                      {zadatak.op === "+" ? <Plus className="h-10 w-10" /> : <Minus className="h-10 w-10" />}
                    </span>
                    <BrojSaIkonama n={zadatak.b} emoji="🍎" />
                  </>
                ) : (
                  <>
                    <span className="text-6xl font-extrabold text-emerald-800 sm:text-7xl">{zadatak.a}</span>
                    <span className="text-5xl font-black text-emerald-500 sm:text-6xl">
                      {zadatak.op === "+" ? "+" : "−"}
                    </span>
                    <span className="text-6xl font-extrabold text-emerald-800 sm:text-7xl">{zadatak.b}</span>
                  </>
                )}
              </div>
              <p className="mt-4 text-4xl font-black text-emerald-400">= ?</p>
            </div>

            <div className="grid w-full grid-cols-2 gap-3 sm:gap-4">
              {zadatak.opcije.map((opcija, i) => {
                const jeTacno = tacanOdgovor === opcija;
                const jePogresno = pogresanOdgovor === opcija;
                let boja: string = BOJE_ODGOVORA[i];
                if (jeTacno) boja = "bg-green-400 text-white ring-4 ring-green-200 scale-105";
                if (jePogresno) boja = "animate-shake bg-red-400 text-white";

                return (
                  <button
                    key={`${zadatak.a}-${zadatak.op}-${zadatak.b}-${opcija}`}
                    type="button"
                    disabled={tacanOdgovor !== null}
                    onClick={() => proveriOdgovor(opcija)}
                    className={`flex min-h-20 items-center justify-center rounded-3xl text-4xl font-extrabold shadow-lg transition-all sm:min-h-24 sm:text-5xl ${boja} ${
                      tacanOdgovor !== null ? "cursor-default" : "cursor-pointer active:scale-95"
                    }`}
                  >
                    {opcija}
                  </button>
                )}
              )}
            </div>

            {tacanOdgovor !== null && (
              <p className="animate-bounce text-2xl font-extrabold text-green-600">{t("Bravo! ⭐")}</p>
            )}

            <button
              type="button"
              onClick={() => {
                if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
                noviZadatak();
              }}
              className="flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-800"
            >
              <RefreshCw className="h-4 w-4" />
              {t("Sledeći zadatak")}
            </button>
          </div>
        )
      )}
    </main>
  );
}
