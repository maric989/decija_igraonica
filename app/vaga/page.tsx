"use client";

import { useCallback, useEffect, useRef, useState, type Ref } from "react";
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
import { playPop, playPobjeda } from "@/lib/sounds";

const JABUKA_SRC = "/vaga/apple.png";

function slucajanCilj() {
  return Math.floor(Math.random() * 9) + 2;
}

function pogodioCilj(point: { x: number; y: number }, el: HTMLElement | null) {
  if (!el) return false;
  const r = el.getBoundingClientRect();
  const pad = 24;
  return (
    point.x >= r.left - pad &&
    point.x <= r.right + pad &&
    point.y >= r.top - pad &&
    point.y <= r.bottom + pad
  );
}

function Jabuka({ velika = false }: { velika?: boolean }) {
  return (
    <Image
      src={JABUKA_SRC}
      alt=""
      width={velika ? 64 : 48}
      height={velika ? 64 : 48}
      draggable={false}
      className={`pointer-events-none object-contain drop-shadow-md ${
        velika ? "h-16 w-16" : "h-12 w-12"
      }`}
    />
  );
}

function Tas({
  broj,
  highlight = "idle",
  tasRef,
}: {
  broj: number;
  highlight?: "ok" | "hover" | "idle";
  tasRef?: Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={tasRef}
      className={`relative flex min-h-[128px] h-auto w-32 flex-wrap items-center justify-center gap-1 rounded-2xl border-2 p-2 pb-6 shadow-xl ${
        highlight === "ok"
          ? "border-green-400 bg-green-50/90"
          : highlight === "hover"
            ? "border-amber-300 bg-amber-50/90"
            : "border-white bg-white/90"
      }`}
    >
      {Array.from({ length: broj }, (_, i) => (
        <Jabuka key={i} />
      ))}
      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-1 text-2xl font-black text-slate-700 shadow-md">
        {broj}
      </span>
    </div>
  );
}

function KorpaJabuka({
  disabled,
  onDrop,
  onDragMove,
}: {
  disabled: boolean;
  onDrop: (point: { x: number; y: number }) => boolean;
  onDragMove: (point: { x: number; y: number }) => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  async function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    onDrop(info.point);
    await Promise.all([
      animate(x, 0, { type: "spring", stiffness: 460, damping: 28 }),
      animate(y, 0, { type: "spring", stiffness: 460, damping: 28 }),
    ]);
  }

  return (
    <motion.div
      role="img"
      aria-label="Jabuka"
      drag={!disabled}
      dragMomentum={false}
      dragElastic={0.12}
      style={{ x, y }}
      whileDrag={{ scale: 1.12, cursor: "grabbing", zIndex: 80 }}
      onDrag={(_, info) => onDragMove(info.point)}
      onDragEnd={handleDragEnd}
      className={`relative z-30 ${
        disabled ? "cursor-default opacity-40" : "cursor-grab touch-none active:cursor-grabbing"
      }`}
    >
      <Jabuka velika />
    </motion.div>
  );
}

export default function VagaPage() {
  const [targetWeight, setTargetWeight] = useState(0);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [nadTasim, setNadTasim] = useState(false);
  const desniTasRef = useRef<HTMLDivElement | null>(null);

  const novaIgra = useCallback(() => {
    setTargetWeight(slucajanCilj());
    setCurrentWeight(0);
    setNadTasim(false);
  }, []);

  useEffect(() => {
    novaIgra();
  }, [novaIgra]);

  const ravnoteza = targetWeight > 0 && currentWeight === targetWeight;
  const tiltAngle = Math.max(-25, Math.min(25, (currentWeight - targetWeight) * 3));

  useEffect(() => {
    if (!ravnoteza) return;
    playPobjeda();
    void confetti({
      particleCount: 140,
      spread: 80,
      origin: { y: 0.55 },
      colors: ["#f59e0b", "#facc15", "#34d399", "#fb7185", "#38bdf8"],
    });
  }, [ravnoteza]);

  function naDrop(point: { x: number; y: number }) {
    setNadTasim(false);
    if (ravnoteza) return false;
    if (!pogodioCilj(point, desniTasRef.current)) return false;
    playPop();
    setCurrentWeight((w) => w + 1);
    return true;
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-amber-50 px-3 py-4 sm:px-4 sm:py-8">
      <div className="mb-4 flex w-full max-w-3xl flex-col items-center gap-3 sm:mb-8">
        <NazadLink />
        <h1 className="flex items-center justify-center gap-2 text-center text-3xl font-extrabold text-amber-800 sm:text-4xl">
          <GameTitleIcon src="/icons/vaga.png" alt="" />
          <span>Vaga</span>
        </h1>
        <p className="relative z-10 mb-16 text-center text-base font-semibold text-amber-800/80">
          Stavi isto jabuka na desnu stranu!
        </p>
      </div>

      <div className="relative mx-auto mt-24 min-h-80 w-full max-w-lg">
        <div
          className="absolute bottom-0 left-1/2 z-0 h-48 w-12 -translate-x-1/2 rounded-t-full bg-gradient-to-b from-amber-700 to-amber-900 shadow-inner"
          aria-hidden
        />

        <motion.div
          className="absolute top-16 right-0 left-0 z-10 mx-auto h-8 w-full max-w-lg rounded-full border-b-4 border-amber-800/40 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 shadow-lg"
          style={{ transformOrigin: "center center" }}
          animate={{ rotate: tiltAngle }}
          transition={{ type: "spring", stiffness: 90, damping: 16 }}
        />

        <div
          className="absolute top-20 left-1/2 z-30 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-amber-900 bg-gradient-to-br from-amber-200 via-amber-500 to-amber-800 shadow-md"
          aria-hidden
        >
          <span className="absolute top-1/2 left-1/2 h-0.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-950/70" />
          <span className="absolute top-1/2 left-1/2 h-3.5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-950/70" />
        </div>

        <motion.div
          className="absolute top-20 -left-8 z-20"
          animate={{ y: -tiltAngle * 1.5 }}
          transition={{ type: "spring", stiffness: 90, damping: 16 }}
        >
          <Tas broj={targetWeight} />
        </motion.div>

        <motion.div
          className="absolute top-20 -right-8 z-20"
          animate={{ y: tiltAngle * 1.5 }}
          transition={{ type: "spring", stiffness: 90, damping: 16 }}
        >
          <Tas
            broj={currentWeight}
            tasRef={desniTasRef}
            highlight={ravnoteza ? "ok" : nadTasim ? "hover" : "idle"}
          />
        </motion.div>
      </div>

      <div className="mx-auto mt-20 flex max-w-sm flex-col items-center gap-4 rounded-3xl border-2 border-white bg-white/50 p-6 shadow-lg backdrop-blur-md">
        <KorpaJabuka
          disabled={ravnoteza}
          onDrop={naDrop}
          onDragMove={(point) => {
            if (ravnoteza) {
              setNadTasim(false);
              return;
            }
            setNadTasim(pogodioCilj(point, desniTasRef.current));
          }}
        />
        <p className="text-center font-medium text-slate-500">
          Prevucite jabuku na desni tas
        </p>
      </div>

      {currentWeight > 0 && !ravnoteza && (
        <button
          type="button"
          onClick={() => setCurrentWeight(0)}
          className="mt-6 rounded-full bg-white px-5 py-2 text-sm font-bold text-amber-800 shadow-sm hover:bg-amber-100"
        >
          Isprazni tas
        </button>
      )}

      {ravnoteza && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-3xl bg-white p-8 text-center shadow-2xl">
            <Jabuka velika />
            <h2 className="text-3xl font-extrabold text-green-600">Bravo!</h2>
            <p className="text-lg text-slate-600">Vaga je u ravnoteži!</p>
            <button
              type="button"
              onClick={novaIgra}
              className="flex items-center gap-2 rounded-full bg-amber-600 px-8 py-3 text-lg font-extrabold text-white shadow-lg transition-all hover:scale-105 hover:bg-amber-700"
            >
              <RefreshCw className="h-5 w-5" />
              Sledeći zadatak
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
