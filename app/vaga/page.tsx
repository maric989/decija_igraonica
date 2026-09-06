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
import { useT } from "@/components/PismoProvider";

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
        velika ? "h-14 w-14 sm:h-16 sm:w-16" : "h-8 w-8 sm:h-11 sm:w-11"
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
      className={`relative flex min-h-[5.5rem] w-[6.75rem] flex-wrap items-center justify-center gap-0.5 rounded-2xl border-2 p-1.5 pb-5 shadow-xl sm:min-h-[7rem] sm:w-32 sm:p-2 sm:pb-6 ${
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
      <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white px-3 py-0.5 text-lg font-black text-slate-700 shadow-md sm:-bottom-5 sm:px-4 sm:text-2xl">
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
  const t = useT();
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
      aria-label={t("Jabuka")}
      drag={!disabled}
      dragMomentum={false}
      dragElastic={0.12}
      style={{ x, y }}
      whileDrag={{ scale: 1.12, cursor: "grabbing", zIndex: 80 }}
      onDrag={(_, info) => onDragMove(info.point)}
      onDragEnd={handleDragEnd}
      className={`relative z-30 touch-none ${
        disabled ? "cursor-default opacity-40" : "cursor-grab touch-none active:cursor-grabbing"
      }`}
    >
      <Jabuka velika />
    </motion.div>
  );
}

export default function VagaPage() {
  const t = useT();
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
    <main className="igrica-ekran bg-amber-50">
      <NazadLink
        className="absolute top-4 left-4 z-50 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-slate-700 shadow-sm hover:bg-white"
        iconClassName="h-4 w-4"
      />

      <header className="mt-4 mb-2 flex flex-col items-center gap-1 px-16">
        <h1 className="flex items-center justify-center gap-1 text-center text-2xl font-extrabold text-amber-800 sm:text-3xl">
          <GameTitleIcon src="/icons/vaga.png" alt="" size="sm" />
          <span>{t("Vaga")}</span>
        </h1>
        <p className="text-center text-sm font-semibold text-amber-800/80">
          {t("Stavi isto jabuka na desnu stranu!")}
        </p>
      </header>

      <div className="flex min-h-0 flex-1 items-center justify-center px-3">
        <div className="relative h-52 w-full max-w-sm sm:h-64">
          <div
            className="absolute top-5 left-1/2 z-0 h-40 w-10 -translate-x-1/2 rounded-t-full rounded-b-2xl bg-gradient-to-b from-amber-600 to-amber-950 shadow-inner sm:h-48 sm:w-12"
            aria-hidden
          />

          <motion.div
            className="absolute top-4 right-3 left-3 z-10 h-7 rounded-full border-b-4 border-amber-800/40 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 shadow-lg sm:h-8"
            style={{ transformOrigin: "center center" }}
            animate={{ rotate: tiltAngle }}
            transition={{ type: "spring", stiffness: 90, damping: 16 }}
          />

          <div
            className="absolute top-7 left-1/2 z-30 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-amber-900 bg-gradient-to-br from-amber-200 via-amber-500 to-amber-800 shadow-md sm:h-7 sm:w-7"
            aria-hidden
          >
            <span className="absolute top-1/2 left-1/2 h-0.5 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-950/70" />
            <span className="absolute top-1/2 left-1/2 h-3 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-950/70" />
          </div>

          <motion.div
            className="absolute top-12 left-0 z-20"
            animate={{ y: -tiltAngle * 1.5 }}
            transition={{ type: "spring", stiffness: 90, damping: 16 }}
          >
            <Tas broj={targetWeight} />
          </motion.div>

          <motion.div
            className="absolute top-12 right-0 z-20"
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
      </div>

      <div className="mx-4 mt-auto flex max-w-sm shrink-0 flex-col items-center gap-2 self-center rounded-3xl border-2 border-white bg-white/50 p-3 shadow-lg backdrop-blur-md touch-none sm:p-4">
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
        <p className="text-center text-sm font-medium text-slate-500">
          {t("Prevucite jabuku na desni tas")}
        </p>
        {currentWeight > 0 && !ravnoteza && (
          <button
            type="button"
            onClick={() => setCurrentWeight(0)}
            className="rounded-full bg-white px-4 py-1.5 text-sm font-bold text-amber-800 shadow-sm hover:bg-amber-100"
          >
            {t("Isprazni tas")}
          </button>
        )}
      </div>

      {ravnoteza && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-3xl bg-white p-8 text-center shadow-2xl">
            <Jabuka velika />
            <h2 className="text-3xl font-extrabold text-green-600">{t("Bravo!")}</h2>
            <p className="text-lg text-slate-600">{t("Vaga je u ravnoteži!")}</p>
            <button
              type="button"
              onClick={novaIgra}
              className="flex items-center gap-2 rounded-full bg-amber-600 px-8 py-3 text-lg font-extrabold text-white shadow-lg transition-all hover:scale-105 hover:bg-amber-700"
            >
              <RefreshCw className="h-5 w-5" />
              {t("Sledeći zadatak")}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
