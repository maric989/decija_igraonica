"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AZBUKA_PODACI, type SlovoData } from "@/lib/azbuka";
import NazadLink from "@/components/NazadLink";
import GameTitleIcon from "@/components/GameTitleIcon";

// ─── Komponenta ───────────────────────────────────────────────────────────────
export default function UciSlovaPage() {
  const [flippedSlovo, setFlippedSlovo] = useState<string | null>(null);
  const resetTimeoutRef = useRef<number | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  function handleCardClick(data: SlovoData) {
    // Ako je ista kartica već okrenuta — vrati je
    if (flippedSlovo === data.slovo) {
      setFlippedSlovo(null);
      currentAudioRef.current?.pause();
      return;
    }

    // Zaustavi prethodni audio
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
    }
    if (resetTimeoutRef.current !== null) {
      window.clearTimeout(resetTimeoutRef.current);
    }

    // Okreni karticu i pusti audio "[Slovo]... kao... [reč]"
    setFlippedSlovo(data.slovo);
    const audio = new Audio(data.audioRec);
    currentAudioRef.current = audio;
    void audio.play();

    // Automatski vrati karticu posle 4 sekunde
    resetTimeoutRef.current = window.setTimeout(() => {
      setFlippedSlovo(null);
      resetTimeoutRef.current = null;
    }, 4000);
  }

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current !== null) window.clearTimeout(resetTimeoutRef.current);
      currentAudioRef.current?.pause();
    };
  }, []);

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-rose-100 px-4 py-8 sm:px-6 sm:py-12">
      <div className="flex w-full max-w-6xl flex-col items-center gap-8">

        {/* ── Header ── */}
        <header className="flex flex-col items-center gap-4 text-center">
          <NazadLink />
          <div className="flex items-center gap-3">
            <GameTitleIcon src="/icons/uci-slova.jpeg" alt="" />
            <h1 className="text-4xl font-extrabold text-rose-800 sm:text-5xl">
              Uči Slova
            </h1>
          </div>
          <p className="text-sm text-rose-600 sm:text-base">
            Klikni na slovo da vidiš reč! 👆
          </p>
        </header>

        {/* ── Grid ── */}
        <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {AZBUKA_PODACI.map((data) => {
            const isFlipped = flippedSlovo === data.slovo;

            return (
              /* Perspektivni kontejner */
              <div
                key={data.slovo}
                onClick={() => handleCardClick(data)}
                className="aspect-square cursor-pointer"
                style={{ perspective: "1000px" }}
                aria-label={`Slovo ${data.slovo}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleCardClick(data)}
              >
                {/* Unutrašnja kartica koja se obrće */}
                <div
                  className="relative h-full w-full transition-transform duration-700"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* ── PREDNJA STRANA — slovo ── */}
                  <div
                    className={`${data.boja} absolute inset-0 flex items-center justify-center rounded-2xl shadow-md`}
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <span className="text-5xl font-bold text-gray-800">
                      {data.slovo}
                    </span>
                  </div>

                  {/* ── POLEĐINA — slika + reč ── */}
                  <div
                    className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border-2 border-rose-200 bg-white shadow-xl"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    {data.slika ? (
                      <div className="relative min-h-0 flex-1">
                        <Image
                          src={data.slika}
                          alt={data.rec}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                        />
                      </div>
                    ) : (
                      <div className="flex min-h-0 flex-1 items-center justify-center bg-rose-50" />
                    )}
                    <span className="bg-white px-2 py-1.5 text-center text-xs font-bold tracking-wide text-gray-700 sm:text-sm">
                      {data.rec}
                    </span>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}
