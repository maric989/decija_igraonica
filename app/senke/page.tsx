"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useMotionValue,
  type PanInfo,
} from "framer-motion";
import { RefreshCw } from "lucide-react";
import confetti from "canvas-confetti";
import NazadLink from "@/components/NazadLink";
import GameTitleIcon from "@/components/GameTitleIcon";
import { playNetacno, playPobjeda, playTacno } from "@/lib/sounds";

type Pojam = {
  id: string;
  src: string;
  naziv: string;
};

const POJMOVI: Pojam[] = [
  { id: "bager", src: "/senke/bager.png", naziv: "Bager" },
  { id: "dinosaurus", src: "/senke/dinosaurus.png", naziv: "Dinosaurus" },
  { id: "raketa", src: "/senke/raketa.png", naziv: "Raketa" },
  { id: "kraba", src: "/senke/kraba.png", naziv: "Kraba" },
];

function izmesaj<T>(niz: T[]): T[] {
  const kopija = [...niz];
  for (let i = kopija.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kopija[i], kopija[j]] = [kopija[j], kopija[i]];
  }
  return kopija;
}

function pogodioCilj(point: { x: number; y: number }, el: HTMLElement | null) {
  if (!el) return false;
  const r = el.getBoundingClientRect();
  const pad = 20;
  return (
    point.x >= r.left - pad &&
    point.x <= r.right + pad &&
    point.y >= r.top - pad &&
    point.y <= r.bottom + pad
  );
}

function Slicica({
  src,
  naziv,
  senka,
  spojen,
  priority = false,
}: {
  src: string;
  naziv: string;
  senka?: boolean;
  spojen?: boolean;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={naziv}
      width={220}
      height={220}
      draggable={false}
      priority={priority}
      className={`pointer-events-none h-32 w-32 select-none object-contain md:h-40 md:w-40 ${
        spojen
          ? "drop-shadow-lg drop-shadow-green-500"
          : senka
            ? "brightness-0 opacity-20 filter drop-shadow-md"
            : "drop-shadow-xl"
      }`}
    />
  );
}

function DraggableSlika({
  pojam,
  onDragStart,
  onDragMove,
  onDragFinish,
  onMatched,
}: {
  pojam: Pojam;
  onDragStart: () => void;
  onDragMove: (point: { x: number; y: number }) => void;
  onDragFinish: (
    point: { x: number; y: number },
  ) => { kind: "match"; zone: DOMRect } | { kind: "miss" } | { kind: "away" };
  onMatched: () => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  async function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    const rezultat = onDragFinish(info.point);

    if (rezultat.kind === "match") {
      playTacno();
      const zona = rezultat.zone;
      const ciljX = zona.left + zona.width / 2;
      const ciljY = zona.top + zona.height / 2;
      await Promise.all([
        animate(x, x.get() + (ciljX - info.point.x), {
          type: "spring",
          stiffness: 520,
          damping: 32,
        }),
        animate(y, y.get() + (ciljY - info.point.y), {
          type: "spring",
          stiffness: 520,
          damping: 32,
        }),
      ]);
      onMatched();
      return;
    }

    if (rezultat.kind === "miss") {
      playNetacno();
    }

    await Promise.all([
      animate(x, 0, { type: "spring", stiffness: 460, damping: 28 }),
      animate(y, 0, { type: "spring", stiffness: 460, damping: 28 }),
    ]);
  }

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.12}
      style={{ x, y }}
      whileDrag={{ scale: 1.08, cursor: "grabbing", zIndex: 80 }}
      onDragStart={onDragStart}
      onDrag={(_, info) => onDragMove(info.point)}
      onDragEnd={handleDragEnd}
      className="relative z-20 h-32 w-32 cursor-grab touch-none active:cursor-grabbing md:h-40 md:w-40"
      aria-label={pojam.naziv}
    >
      <Slicica src={pojam.src} naziv={pojam.naziv} priority />
    </motion.div>
  );
}

export default function SenkePage() {
  const [senke, setSenke] = useState<Pojam[]>(POJMOVI);
  const [spojeno, setSpojeno] = useState<string[]>([]);
  const [prevlacenje, setPrevlacenje] = useState<string | null>(null);
  const [nadSenkom, setNadSenkom] = useState<string | null>(null);
  const zoneRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const novaIgra = useCallback(() => {
    setSenke(izmesaj(POJMOVI));
    setSpojeno([]);
    setPrevlacenje(null);
    setNadSenkom(null);
  }, []);

  useEffect(() => {
    novaIgra();
  }, [novaIgra]);

  const gotovo = spojeno.length === POJMOVI.length && POJMOVI.length > 0;

  useEffect(() => {
    if (!gotovo) return;
    playPobjeda();
    void confetti({
      particleCount: 140,
      spread: 80,
      origin: { y: 0.55 },
      colors: ["#facc15", "#38bdf8", "#f472b6", "#34d399", "#fb923c"],
    });
  }, [gotovo]);

  function nadjiZonu(point: { x: number; y: number }) {
    return senke.find(
      (s) => !spojeno.includes(s.id) && pogodioCilj(point, zoneRefs.current[s.id]),
    );
  }

  function zavrsiPotez(id: string, point: { x: number; y: number }) {
    const pogodjena = nadjiZonu(point);
    setPrevlacenje(null);
    setNadSenkom(null);

    if (!pogodjena) {
      return { kind: "away" as const };
    }

    if (pogodjena.id === id) {
      const zone = zoneRefs.current[id]?.getBoundingClientRect();
      if (!zone) {
        setSpojeno((prev) => [...prev, id]);
        return { kind: "away" as const };
      }
      return { kind: "match" as const, zone };
    }

    return { kind: "miss" as const };
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-sky-100 px-3 py-4 sm:px-4 sm:py-8">
      <div className="mb-6 flex w-full max-w-4xl flex-col items-center gap-4">
        <NazadLink />
        <h1 className="flex items-center justify-center gap-2 text-center text-3xl font-extrabold text-sky-800 sm:text-4xl">
          <GameTitleIcon src="/icons/senke.png" alt="" />
          <span>Senke</span>
        </h1>
        <p className="text-center text-base font-semibold text-sky-700">
          Prevuci sliku na njenu senku!
        </p>
      </div>

      <div className="grid w-full max-w-4xl grid-cols-2 gap-10 overflow-visible sm:gap-16 md:gap-24">
        <section className="relative z-20 flex flex-col items-center gap-4 sm:gap-6">
          {POJMOVI.map((pojam) => {
            const matched = spojeno.includes(pojam.id);
            return (
              <div
                key={pojam.id}
                className="flex h-36 w-32 flex-col items-center justify-start md:h-44 md:w-40"
              >
                {matched ? (
                  <div className="h-32 w-32 rounded-3xl border-4 border-dashed border-sky-200 bg-white/30 md:h-40 md:w-40" />
                ) : (
                  <DraggableSlika
                    pojam={pojam}
                    onDragStart={() => setPrevlacenje(pojam.id)}
                    onDragMove={(point) => {
                      setNadSenkom(nadjiZonu(point)?.id ?? null);
                    }}
                    onDragFinish={(point) => zavrsiPotez(pojam.id, point)}
                    onMatched={() =>
                      setSpojeno((prev) =>
                        prev.includes(pojam.id) ? prev : [...prev, pojam.id],
                      )
                    }
                  />
                )}
                <span className="mt-1 text-sm font-bold text-sky-800">{pojam.naziv}</span>
              </div>
            );
          })}
        </section>

        <section className="relative z-0 flex flex-col items-center gap-4 sm:gap-6">
          {senke.map((pojam) => {
            const matched = spojeno.includes(pojam.id);
            const aktivanCilj = nadSenkom === pojam.id && prevlacenje === pojam.id;
            return (
              <div
                key={pojam.id}
                className="flex h-36 w-32 flex-col items-center justify-start md:h-44 md:w-40"
              >
                <div
                  ref={(el) => {
                    zoneRefs.current[pojam.id] = el;
                  }}
                  className={`flex h-32 w-32 items-center justify-center rounded-3xl md:h-40 md:w-40 ${
                    matched
                      ? "bg-green-100/70 ring-4 ring-green-400"
                      : aktivanCilj
                        ? "bg-green-50/80 ring-4 ring-green-300"
                        : prevlacenje
                          ? "bg-white/40 ring-2 ring-sky-200"
                          : ""
                  }`}
                >
                  <Slicica
                    src={pojam.src}
                    naziv={pojam.naziv}
                    senka={!matched}
                    spojen={matched}
                  />
                </div>
                <span className="mt-1 text-sm font-bold text-transparent">
                  {pojam.naziv}
                </span>
              </div>
            );
          })}
        </section>
      </div>

      {gotovo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-3xl bg-white p-8 text-center shadow-2xl">
            <p className="text-5xl">🎉</p>
            <h2 className="text-3xl font-extrabold text-green-600">Bravo!</h2>
            <p className="text-lg text-slate-600">Sve senke su na svom mestu.</p>
            <button
              type="button"
              onClick={novaIgra}
              className="flex items-center gap-2 rounded-full bg-sky-600 px-8 py-3 text-lg font-extrabold text-white shadow-lg transition-all hover:scale-105 hover:bg-sky-700"
            >
              <RefreshCw className="h-5 w-5" />
              Igraj ponovo
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
