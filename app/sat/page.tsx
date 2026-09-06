"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import GameTitleIcon from "@/components/GameTitleIcon";
import NazadLink from "@/components/NazadLink";
import { playNetacno, playPop, playTacno } from "@/lib/sounds";
import { useT } from "@/components/PismoProvider";

type Mode = "namesti" | "procitaj";
type Tezina = "lako" | "tesko";
type Vreme = { hour: number; minutes: number };

const SATI = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
const MINUTI_LAKO = [0] as const;
const MINUTI_TESKO = [0, 15, 30, 45] as const;

function izmesaj<T>(niz: T[]): T[] {
  const kopija = [...niz];
  for (let i = kopija.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kopija[i], kopija[j]] = [kopija[j], kopija[i]];
  }
  return kopija;
}

function istoVreme(a: Vreme, b: Vreme) {
  return a.hour === b.hour && a.minutes === b.minutes;
}

function wrapSat(n: number) {
  return ((n - 1 + 12) % 12) + 1;
}

function minutiZa(tezina: Tezina) {
  return tezina === "lako" ? MINUTI_LAKO : MINUTI_TESKO;
}

function slucajnoVreme(tezina: Tezina, izuzmi?: Vreme): Vreme {
  const minuti = minutiZa(tezina);
  let vreme: Vreme;
  do {
    vreme = {
      hour: SATI[Math.floor(Math.random() * SATI.length)],
      minutes: minuti[Math.floor(Math.random() * minuti.length)],
    };
  } while (izuzmi && istoVreme(vreme, izuzmi));
  return vreme;
}

function napraviOpcije(tacan: Vreme, tezina: Tezina): Vreme[] {
  const kandidati: Vreme[] = [];
  if (tezina === "lako") {
    for (const hour of SATI) {
      if (hour !== tacan.hour) kandidati.push({ hour, minutes: 0 });
    }
  } else {
    for (const minutes of MINUTI_TESKO) {
      if (minutes !== tacan.minutes) {
        kandidati.push({ hour: tacan.hour, minutes });
      }
    }
    kandidati.push({ hour: wrapSat(tacan.hour + 1), minutes: tacan.minutes });
    kandidati.push({ hour: wrapSat(tacan.hour - 1), minutes: tacan.minutes });
  }
  const jedinstveni = kandidati.filter((k) => !istoVreme(k, tacan));
  return izmesaj([tacan, ...izmesaj(jedinstveni).slice(0, 2)]);
}

function formatVreme(v: Vreme) {
  return `${v.hour}:${String(v.minutes).padStart(2, "0")}`;
}

function oblikSati(n: number): string {
  if (n === 1) return "sat";
  if (n >= 2 && n <= 4) return "sata";
  return "sati";
}

function ugaoBroja(broj: number) {
  return (broj * 30 - 90) * (Math.PI / 180);
}

function satUgao(hour: number, minutes: number) {
  return (hour % 12) * 30 + minutes * 0.5;
}

function minutUgao(minutes: number) {
  return minutes * 6;
}

function AnalogniSat({
  vreme,
  clickable,
  onHourClick,
  shaking,
}: {
  vreme: Vreme;
  clickable: boolean;
  onHourClick?: (h: number) => void;
  shaking: boolean;
}) {
  return (
    <div
      className={`relative mb-6 flex h-64 w-64 items-center justify-center rounded-full border-8 border-emerald-400 bg-white shadow-[0_8px_0_#34d399] md:mb-8 md:h-80 md:w-80 ${
        shaking ? "animate-shake" : ""
      }`}
    >
      {SATI.map((broj) => {
        const angle = ugaoBroja(broj);
        const r = 38;
        const aktivan = clickable && vreme.hour === broj;
        return (
          <button
            key={broj}
            type="button"
            disabled={!clickable}
            onClick={() => onHourClick?.(broj)}
            className={`absolute z-30 flex h-10 w-10 items-center justify-center rounded-full text-2xl font-bold transition-colors md:h-12 md:w-12 ${
              aktivan ? "bg-orange-100 text-orange-600" : "text-emerald-800"
            } ${clickable ? "cursor-pointer hover:bg-emerald-100 active:scale-95" : "pointer-events-none"}`}
            style={{
              left: `${50 + r * Math.cos(angle)}%`,
              top: `${50 + r * Math.sin(angle)}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {broj}
          </button>
        );
      })}

      <motion.div
        className="absolute bottom-1/2 left-1/2 z-[5] h-28 w-2 rounded-full bg-emerald-700 md:h-36"
        style={{ originX: 0.5, originY: 1 }}
        animate={{ rotate: minutUgao(vreme.minutes), x: "-50%" }}
        transition={{ type: "spring", stiffness: 160, damping: 16 }}
      />

      <motion.div
        className="absolute bottom-1/2 left-1/2 z-10 h-20 w-3 rounded-full bg-orange-500 md:h-24"
        style={{ originX: 0.5, originY: 1 }}
        animate={{ rotate: satUgao(vreme.hour, vreme.minutes), x: "-50%" }}
        transition={{ type: "spring", stiffness: 160, damping: 16 }}
      />

      <div className="absolute z-20 h-4 w-4 rounded-full bg-emerald-900" />
    </div>
  );
}

export default function SatPage() {
  const t = useT();
  const [mode, setMode] = useState<Mode>("procitaj");
  const [tezina, setTezina] = useState<Tezina>("lako");
  const [target, setTarget] = useState<Vreme>({ hour: 3, minutes: 0 });
  const [current, setCurrent] = useState<Vreme>({ hour: 12, minutes: 0 });
  const [options, setOptions] = useState<Vreme[]>([
    { hour: 1, minutes: 0 },
    { hour: 3, minutes: 0 },
    { hour: 8, minutes: 0 },
  ]);
  const [bravo, setBravo] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [spremno, setSpremno] = useState(false);
  const errorTimeoutRef = useRef<number | null>(null);
  const nextTimeoutRef = useRef<number | null>(null);

  const ocistiTajmere = useCallback(() => {
    if (errorTimeoutRef.current) window.clearTimeout(errorTimeoutRef.current);
    if (nextTimeoutRef.current) window.clearTimeout(nextTimeoutRef.current);
  }, []);

  const pokreniZadatak = useCallback(
    (noviMode: Mode, novaTezina: Tezina, stari?: Vreme) => {
      ocistiTajmere();
      const cilj = slucajnoVreme(novaTezina, stari);
      setTarget(cilj);
      setBravo(false);
      setShaking(false);
      setErrorKey(null);

      if (noviMode === "procitaj") {
        setCurrent(cilj);
        setOptions(napraviOpcije(cilj, novaTezina));
        return;
      }

      const start: Vreme = { hour: cilj.hour === 12 ? 3 : 12, minutes: 0 };
      setCurrent(start);
      setOptions([]);
    },
    [ocistiTajmere],
  );

  useEffect(() => {
    pokreniZadatak("procitaj", "lako");
    setSpremno(true);
    return () => ocistiTajmere();
  }, [pokreniZadatak, ocistiTajmere]);

  function promeniMod(novi: Mode) {
    if (novi === mode && !bravo) return;
    playPop();
    setMode(novi);
    pokreniZadatak(novi, tezina, target);
  }

  function promeniTezinu(nova: Tezina) {
    if (nova === tezina && !bravo) return;
    playPop();
    setTezina(nova);
    pokreniZadatak(mode, nova, target);
  }

  function uspeh() {
    setBravo(true);
    playTacno();
    void confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.4 },
      colors: ["#34d399", "#fb923c", "#facc15", "#38bdf8"],
    });
    nextTimeoutRef.current = window.setTimeout(() => {
      pokreniZadatak(mode, tezina, target);
    }, 2000);
  }

  function klikniBrojNaSatu(hour: number) {
    if (bravo || mode !== "namesti") return;
    playPop();
    setCurrent((prev) => ({ ...prev, hour }));
  }

  function klikniMinute(minutes: number) {
    if (bravo || mode !== "namesti") return;
    playPop();
    setCurrent((prev) => ({ ...prev, minutes }));
  }

  function potvrdi() {
    if (bravo) return;
    if (istoVreme(current, target)) {
      uspeh();
      return;
    }
    playNetacno();
    setShaking(true);
    errorTimeoutRef.current = window.setTimeout(() => setShaking(false), 450);
  }

  function klikniOpciju(vreme: Vreme) {
    if (bravo) return;
    if (istoVreme(vreme, target)) {
      uspeh();
      return;
    }
    playNetacno();
    setErrorKey(formatVreme(vreme));
    errorTimeoutRef.current = window.setTimeout(() => setErrorKey(null), 500);
  }

  const prikaz = mode === "procitaj" ? target : current;
  const namestiTekst =
    target.minutes === 0
      ? t(`Namesti sat na ${target.hour} ${oblikSati(target.hour)}!`)
      : t(`Namesti sat na ${formatVreme(target)}!`);

  if (!spremno) {
    return (
      <main className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-emerald-50">
        <p className="m-auto text-xl font-bold text-emerald-700">{t("Učitavanje...")}</p>
      </main>
    );
  }

  return (
    <main className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-emerald-50">
      <NazadLink className="absolute top-4 left-4 z-50 inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-2 font-bold text-slate-700 shadow-sm transition-colors hover:bg-white" />

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-4 py-8 pt-16">
        <h1 className="mb-3 flex items-center justify-center gap-2 text-2xl font-extrabold text-emerald-800 sm:mb-4 sm:text-3xl">
          <GameTitleIcon src="/icons/sat.png" alt="" size="sm" />
          <span>{t("Koliko je sati?")}</span>
        </h1>

        <div className="mb-4 flex flex-col items-center gap-2">
          <div className="flex rounded-full bg-white/80 p-1 shadow-sm">
            <button
              type="button"
              onClick={() => promeniMod("procitaj")}
              className={`rounded-full px-4 py-2 text-sm font-extrabold transition-colors sm:px-5 sm:text-base ${
                mode === "procitaj"
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "text-emerald-800 hover:bg-emerald-100"
              }`}
            >
              {t("Pročitaj sat")}
            </button>
            <button
              type="button"
              onClick={() => promeniMod("namesti")}
              className={`rounded-full px-4 py-2 text-sm font-extrabold transition-colors sm:px-5 sm:text-base ${
                mode === "namesti"
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "text-emerald-800 hover:bg-emerald-100"
              }`}
            >
              {t("Namesti sat")}
            </button>
          </div>

          <div className="flex rounded-full bg-white/80 p-1 shadow-sm">
            <button
              type="button"
              onClick={() => promeniTezinu("lako")}
              className={`rounded-full px-4 py-1.5 text-sm font-extrabold transition-colors ${
                tezina === "lako"
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "text-emerald-800 hover:bg-emerald-100"
              }`}
            >
              {t("Lako")}
            </button>
            <button
              type="button"
              onClick={() => promeniTezinu("tesko")}
              className={`rounded-full px-4 py-1.5 text-sm font-extrabold transition-colors ${
                tezina === "tesko"
                  ? "bg-orange-500 text-white shadow-sm"
                  : "text-emerald-800 hover:bg-orange-100"
              }`}
            >
              {t("Teško")}
            </button>
          </div>
        </div>

        <p className="mb-3 text-center text-xl font-extrabold text-emerald-900 sm:text-2xl">
          {mode === "namesti" ? namestiTekst : t("Koliko je sati?")}
        </p>

        {mode === "namesti" && (
          <p className="mb-3 rounded-full bg-white/80 px-4 py-1 text-lg font-black text-orange-600 shadow-sm">
            {formatVreme(target)}
          </p>
        )}

        <AnalogniSat
          vreme={prikaz}
          clickable={mode === "namesti" && !bravo}
          onHourClick={klikniBrojNaSatu}
          shaking={shaking}
        />

        {mode === "namesti" && tezina === "tesko" && (
          <div className="mb-4 flex items-center justify-center gap-2">
            {MINUTI_TESKO.map((minutes) => {
              const aktivno = current.minutes === minutes;
              return (
                <button
                  key={minutes}
                  type="button"
                  disabled={bravo}
                  onClick={() => klikniMinute(minutes)}
                  className={`rounded-2xl px-3 py-2 text-lg font-extrabold transition-all sm:px-4 sm:text-xl ${
                    aktivno
                      ? "bg-orange-500 text-white shadow-[0_4px_0_#c2410c]"
                      : "bg-white text-emerald-800 shadow-sm hover:bg-orange-50"
                  }`}
                >
                  :{String(minutes).padStart(2, "0")}
                </button>
              );
            })}
          </div>
        )}

        {mode === "namesti" ? (
          <button
            type="button"
            disabled={bravo}
            onClick={potvrdi}
            className="rounded-2xl bg-gradient-to-b from-emerald-400 to-emerald-600 px-10 py-4 text-2xl font-extrabold text-white shadow-[0_6px_0_#047857] transition-all hover:translate-y-1 hover:shadow-[0_4px_0_#047857] active:translate-y-2 active:shadow-none disabled:opacity-60"
          >
            {t("Potvrdi")}
          </button>
        ) : (
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            {options.map((vreme) => {
              const kljuc = formatVreme(vreme);
              const greska = errorKey === kljuc;
              return (
                <button
                  key={kljuc}
                  type="button"
                  disabled={bravo}
                  onClick={() => klikniOpciju(vreme)}
                  className={`flex items-center justify-center rounded-2xl font-extrabold text-white transition-all hover:translate-y-1 active:translate-y-2 active:shadow-none ${
                    tezina === "lako"
                      ? "h-20 w-20 text-4xl"
                      : "h-16 min-w-[5.5rem] px-3 text-2xl sm:h-20 sm:min-w-[6.5rem] sm:text-3xl"
                  } ${
                    greska
                      ? "animate-shake bg-gradient-to-b from-red-400 to-red-600 shadow-[0_6px_0_#991b1b] hover:shadow-[0_4px_0_#991b1b]"
                      : "bg-gradient-to-b from-orange-400 to-orange-500 shadow-[0_6px_0_#c2410c] hover:shadow-[0_4px_0_#c2410c]"
                  }`}
                >
                  {tezina === "lako" ? vreme.hour : kljuc}
                </button>
              );
            })}
          </div>
        )}

        {bravo && (
          <p className="mt-4 animate-bounce text-3xl font-extrabold text-green-600 md:text-4xl">
            {t("Bravo!")}
          </p>
        )}
      </div>
    </main>
  );
}
