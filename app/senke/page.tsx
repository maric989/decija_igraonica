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
import { playNetacno, playPobjeda, playTacno } from "@/lib/sounds";
import { useT } from "@/components/PismoProvider";

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

const SLIKA_KLASA = "h-16 w-16 object-contain sm:h-20 sm:w-20 lg:h-24 lg:w-24";

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
  const t = useT();
  return (
    <Image
      src={src}
      alt={t(naziv)}
      width={96}
      height={96}
      draggable={false}
      priority={priority}
      className={`pointer-events-none select-none ${SLIKA_KLASA} ${
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
      className={`relative z-20 cursor-grab touch-none active:cursor-grabbing ${SLIKA_KLASA}`}
      aria-label={t(pojam.naziv)}
    >
      <Slicica src={pojam.src} naziv={pojam.naziv} priority />
    </motion.div>
  );
}

export default function SenkePage() {
  const t = useT();
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
      (s) =>
        !spojeno.includes(s.id) && pogodioCilj(point, zoneRefs.current[s.id]),
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
    <main className="igrica-ekran bg-sky-100">
      <NazadLink className="absolute top-4 left-4 z-50 inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-2 font-bold text-slate-700 shadow-sm transition-colors hover:bg-white" />

      <header className="mt-4 mb-2 flex flex-col items-center px-4">
        <h1 className="flex items-center justify-center gap-2 text-center text-2xl font-extrabold text-sky-800 sm:text-3xl">
          <Image
            src="/icons/senke.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 object-contain"
            priority
          />
          <span>{t("Senke")}</span>
        </h1>
        <p className="text-center text-sm font-semibold text-sky-700 sm:text-base">
          {t("Prevuci sliku na njenu senku!")}
        </p>
      </header>

      <div className="flex min-h-0 flex-1 flex-row items-center justify-center gap-4 overflow-hidden px-4 w-full">
        <section className="relative z-20 flex flex-col items-center gap-4">
          {POJMOVI.map((pojam) => {
            const matched = spojeno.includes(pojam.id);
            return (
              <div
                key={pojam.id}
                className={`flex items-center justify-center ${SLIKA_KLASA}`}
              >
                {matched ? (
                  <div className={`rounded-2xl border-4 border-dashed border-sky-200 bg-white/30 ${SLIKA_KLASA}`} />
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
              </div>
            );
          })}
        </section>

        <section className="relative z-0 flex flex-col items-center gap-4">
          {senke.map((pojam) => {
            const matched = spojeno.includes(pojam.id);
            const aktivanCilj =
              nadSenkom === pojam.id && prevlacenje === pojam.id;
            return (
              <div
                key={pojam.id}
                ref={(el) => {
                  zoneRefs.current[pojam.id] = el;
                }}
                className={`flex items-center justify-center rounded-2xl ${SLIKA_KLASA} ${
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
            );
          })}
        </section>
      </div>

      {gotovo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-3xl bg-white p-8 text-center shadow-2xl">
            <p className="text-5xl">🎉</p>
            <h2 className="text-3xl font-extrabold text-green-600">{t("Bravo!")}</h2>
            <p className="text-lg text-slate-600">{t("Sve senke su na svom mestu.")}</p>
            <button
              type="button"
              onClick={novaIgra}
              className="flex items-center gap-2 rounded-full bg-sky-600 px-8 py-3 text-lg font-extrabold text-white shadow-lg transition-all hover:scale-105 hover:bg-sky-700"
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
