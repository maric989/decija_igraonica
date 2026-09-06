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
import { useT } from "@/components/PismoProvider";

type Predmet = {
  id: number;
  sizeClass: string;
};

const PREDMETI: Predmet[] = [
  { id: 1, sizeClass: "w-12 h-12" },
  { id: 2, sizeClass: "w-16 h-16" },
  { id: 3, sizeClass: "w-20 h-20" },
  { id: 4, sizeClass: "w-24 h-24" },
  { id: 5, sizeClass: "w-32 h-32" },
];

const JABUKA_SRC = "/vaga/apple.png";

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
  const pad = 16;
  return (
    point.x >= r.left - pad &&
    point.x <= r.right + pad &&
    point.y >= r.top - pad &&
    point.y <= r.bottom + pad
  );
}

function Jabuka({
  sizeClass,
  fill = false,
}: {
  sizeClass?: string;
  fill?: boolean;
}) {
  return (
    <Image
      src={JABUKA_SRC}
      alt=""
      width={128}
      height={128}
      draggable={false}
      className={`${fill ? "h-full w-full" : sizeClass} object-contain drop-shadow-md touch-none pointer-events-none select-none`}
    />
  );
}

function DraggableJabuka({
  predmet,
  onDragStart,
  onDragMove,
  onDragFinish,
  onMatched,
}: {
  predmet: Predmet;
  onDragStart: () => void;
  onDragMove: (point: { x: number; y: number }) => void;
  onDragFinish: (
    point: { x: number; y: number },
  ) => { kind: "match"; zone: DOMRect } | { kind: "miss" } | { kind: "away" };
  onMatched: () => void;
}) {
  const t = useT();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  async function handleDragEnd(
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) {
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
      className={`relative z-20 cursor-grab touch-none active:cursor-grabbing ${predmet.sizeClass}`}
      aria-label={t(`Jabuka ${predmet.id}`)}
    >
      <Jabuka fill />
    </motion.div>
  );
}

export default function PoredjenjePage() {
  const t = useT();
  const [raspored, setRaspored] = useState<Predmet[]>(PREDMETI);
  const [placedItems, setPlacedItems] = useState<number[]>([]);
  const [prevlacenje, setPrevlacenje] = useState<number | null>(null);
  const [nadPostoljem, setNadPostoljem] = useState<number | null>(null);
  const zoneRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const novaIgra = useCallback(() => {
    setRaspored(izmesaj(PREDMETI));
    setPlacedItems([]);
    setPrevlacenje(null);
    setNadPostoljem(null);
  }, []);

  useEffect(() => {
    novaIgra();
  }, [novaIgra]);

  const gotovo = placedItems.length === PREDMETI.length;

  useEffect(() => {
    if (!gotovo) return;
    playPobjeda();
    void confetti({
      particleCount: 140,
      spread: 80,
      origin: { y: 0.55 },
      colors: ["#fb923c", "#facc15", "#f472b6", "#34d399", "#38bdf8"],
    });
  }, [gotovo]);

  function nadjiZonu(point: { x: number; y: number }) {
    return PREDMETI.find(
      (p) =>
        !placedItems.includes(p.id) && pogodioCilj(point, zoneRefs.current[p.id]),
    );
  }

  function zavrsiPotez(id: number, point: { x: number; y: number }) {
    const pogodjena = nadjiZonu(point);
    setPrevlacenje(null);
    setNadPostoljem(null);

    if (!pogodjena) {
      return { kind: "away" as const };
    }

    if (pogodjena.id === id) {
      const zone = zoneRefs.current[id]?.getBoundingClientRect();
      if (!zone) {
        setPlacedItems((prev) => (prev.includes(id) ? prev : [...prev, id]));
        return { kind: "away" as const };
      }
      return { kind: "match" as const, zone };
    }

    return { kind: "miss" as const };
  }

  return (
    <main className="igrica-ekran bg-orange-50">
      <NazadLink className="absolute top-4 left-4 z-50 inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-2 font-bold text-slate-700 shadow-sm transition-colors hover:bg-white" />

      <header className="mt-4 mb-1 flex flex-col items-center px-16">
        <h1 className="flex items-center justify-center gap-1 text-center text-2xl font-extrabold text-orange-800 sm:text-3xl">
          <GameTitleIcon src="/icons/poredjenje.png" alt="" size="sm" />
          <span>{t("Poređenje")}</span>
        </h1>
        <p className="text-center text-sm font-semibold text-orange-800/80">
          {t("Prevuci od najmanjeg do najvećeg!")}
        </p>
      </header>

      <div className="relative mx-auto flex min-h-0 w-full max-w-4xl flex-1 flex-col">
        <div className="flex min-h-0 flex-1 flex-wrap items-center justify-center gap-6 p-4 md:gap-16">
          {raspored.map((predmet) => {
            if (placedItems.includes(predmet.id)) return null;
            return (
              <DraggableJabuka
                key={predmet.id}
                predmet={predmet}
                onDragStart={() => setPrevlacenje(predmet.id)}
                onDragMove={(point) => {
                  setNadPostoljem(nadjiZonu(point)?.id ?? null);
                }}
                onDragFinish={(point) => zavrsiPotez(predmet.id, point)}
                onMatched={() =>
                  setPlacedItems((prev) =>
                    prev.includes(predmet.id) ? prev : [...prev, predmet.id],
                  )
                }
              />
            );
          })}
        </div>

        <div className="flex w-full shrink-0 items-end justify-center gap-4 pb-2 md:gap-12">
          {PREDMETI.map((predmet) => {
            const placed = placedItems.includes(predmet.id);
            const aktivanCilj =
              nadPostoljem === predmet.id && prevlacenje === predmet.id;
            return (
              <div key={predmet.id} className="flex flex-col items-center">
                <div
                  ref={(el) => {
                    zoneRefs.current[predmet.id] = el;
                  }}
                  className={`flex items-center justify-center rounded-2xl border-4 border-dashed bg-white/40 ${predmet.sizeClass} ${
                    placed
                      ? "border-green-400 bg-green-100/70"
                      : aktivanCilj
                        ? "border-green-400"
                        : "border-orange-300"
                  }`}
                >
                  {placed ? <Jabuka fill /> : null}
                </div>
                <div className="w-full rounded-b-2xl border-b-8 border-amber-700" />
              </div>
            );
          })}
        </div>
      </div>

      {gotovo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-3xl bg-white p-8 text-center shadow-2xl">
            <p className="text-5xl">🎉</p>
            <h2 className="text-3xl font-extrabold text-green-600">{t("Bravo!")}</h2>
            <p className="text-lg text-slate-600">
              {t("Od najmanjeg do najvećeg!")}
            </p>
            <button
              type="button"
              onClick={novaIgra}
              className="flex items-center gap-2 rounded-full bg-orange-500 px-8 py-3 text-lg font-extrabold text-white shadow-lg transition-all hover:scale-105 hover:bg-orange-600"
            >
              <RefreshCw className="h-5 w-5" />
              {t("Igraj ponovo")}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
