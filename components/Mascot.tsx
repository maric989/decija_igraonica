"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { playTacno } from "@/lib/sounds";

const PORUKE = [
  "Ćao! Šta ćemo danas da učimo?",
  "Hajde da učimo slova!",
  "Probaj matematiku! ⭐",
  "Ti si super!",
  "Izaberi igru i krenimo!",
  "Volim da učim s tobom!",
];

export default function Mascot() {
  const [pose, setPose] = useState<"idle" | "click">("idle");
  const [poruka, setPoruka] = useState(PORUKE[0]);

  function handleClick(e: React.MouseEvent | React.PointerEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (pose === "click") return;
    playTacno();
    const ostale = PORUKE.filter((p) => p !== poruka);
    setPoruka(ostale[Math.floor(Math.random() * ostale.length)]);
    setPose("click");
  }

  return (
    <div className="relative z-10 shrink-0">
      <AnimatePresence mode="wait">
        <motion.span
          key={poruka}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-none absolute -top-7 left-1/2 z-20 w-max max-w-[11rem] -translate-x-1/2 rounded-2xl border border-slate-100 bg-white px-3 py-1 text-center text-xs font-medium text-slate-600 shadow-sm"
        >
          {poruka}
        </motion.span>
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label="Sovica maskota"
        onClick={handleClick}
        className="relative -top-2 cursor-pointer select-none bg-transparent"
        variants={{
          idle: {
            y: [0, -8, 0],
            rotate: [-1, 1, -1],
            scale: 1,
            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          },
          click: {
            scale: 1.15,
            y: -20,
            rotate: [0, -10, 10, 0],
            transition: { duration: 0.5, ease: "easeOut" },
          },
        }}
        animate={pose}
        onAnimationComplete={() => {
          if (pose === "click") setPose("idle");
        }}
      >
        <Image
          src="/mascot.png"
          alt="Sovica maskota"
          width={64}
          height={64}
          priority
          className="h-14 w-14 object-contain mix-blend-multiply sm:h-16 sm:w-16"
        />
      </motion.button>
    </div>
  );
}
