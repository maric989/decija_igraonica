"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { RefreshCw } from "lucide-react";
import NazadLink from "@/components/NazadLink";
import GameTitleIcon from "@/components/GameTitleIcon";
import { useT } from "@/components/PismoProvider";

// ─── Podaci ───────────────────────────────────────────────────────────────────
const SLIKE = [
  { id: "airplane",  src: "/slike/airplane.jpeg",   naziv: "Avion"   },
  { id: "cake",      src: "/slike/cake.jpeg",        naziv: "Torta"   },
  { id: "car",       src: "/slike/car.jpeg",         naziv: "Auto"    },
  { id: "flower",    src: "/slike/flower.jpeg",      naziv: "Cvet"    },
  { id: "heart",     src: "/slike/heart.jpeg",       naziv: "Srce"    },
  { id: "puppy",     src: "/slike/puppy.jpeg",       naziv: "Psić"    },
  { id: "redapple",  src: "/slike/red apple.jpeg",   naziv: "Jabuka"  },
  { id: "sun",       src: "/slike/sun.jpeg",         naziv: "Sunce"   },
];

type Kartica = {
  uid: string;   // jedinstveni id instance (id + "a" / "b")
  id: string;    // slikovni id (isti za par)
  src: string;
  naziv: string;
};

function kreirajTablu(): Kartica[] {
  const par: Kartica[] = SLIKE.flatMap((s) => [
    { ...s, uid: s.id + "-a" },
    { ...s, uid: s.id + "-b" },
  ]);
  // Fisher-Yates shuffle
  for (let i = par.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [par[i], par[j]] = [par[j], par[i]];
  }
  return par;
}

// ─── Web Audio zvuci ──────────────────────────────────────────────────────────
function playTacno() {
  try {
    const ctx = new AudioContext();
    [523, 659, 784].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.connect(g); g.connect(ctx.destination);
      osc.type = "sine"; osc.frequency.value = freq;
      const t = ctx.currentTime + i * 0.13;
      g.gain.setValueAtTime(0.3, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      osc.start(t); osc.stop(t + 0.35);
    });
  } catch { /* noop */ }
}

function playNetacno() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.connect(g); g.connect(ctx.destination);
    osc.type = "sawtooth"; osc.frequency.value = 160;
    g.gain.setValueAtTime(0.2, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.3);
  } catch { /* noop */ }
}

function playPobjeda() {
  try {
    const ctx = new AudioContext();
    [523, 587, 659, 698, 784, 880].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.connect(g); g.connect(ctx.destination);
      osc.type = "sine"; osc.frequency.value = freq;
      const t = ctx.currentTime + i * 0.1;
      g.gain.setValueAtTime(0.3, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      osc.start(t); osc.stop(t + 0.3);
    });
  } catch { /* noop */ }
}

// ─── Komponenta ───────────────────────────────────────────────────────────────
export default function MemorijePage() {
  const t = useT();
  const [tabla, setTabla] = useState<Kartica[]>([]);
  const [otkrivene, setOtkrivene] = useState<string[]>([]); // uid-ovi
  const [pogodene, setPogodene] = useState<string[]>([]);   // id-ovi (parovi)
  const [pobijedio, setPobijedio] = useState(false);
  const [pokusaji, setPokusaji] = useState(0);
  const blokiranRef = useRef(false);

  const novaIgra = useCallback(() => {
    setTabla(kreirajTablu());
    setOtkrivene([]);
    setPogodene([]);
    setPobijedio(false);
    setPokusaji(0);
    blokiranRef.current = false;
  }, []);

  useEffect(() => { novaIgra(); }, [novaIgra]);

  // Provjeri pobjedu
  useEffect(() => {
    if (pogodene.length === SLIKE.length && pogodene.length > 0) {
      setPobijedio(true);
      playPobjeda();
    }
  }, [pogodene]);

  function klikKartica(kartica: Kartica) {
    if (blokiranRef.current) return;
    if (otkrivene.includes(kartica.uid)) return;
    if (pogodene.includes(kartica.id)) return;

    const novaOtkrivena = [...otkrivene, kartica.uid];
    setOtkrivene(novaOtkrivena);

    if (novaOtkrivena.length === 2) {
      blokiranRef.current = true;
      setPokusaji((p) => p + 1);

      const [uid1, uid2] = novaOtkrivena;
      const k1 = tabla.find((k) => k.uid === uid1)!;
      const k2 = tabla.find((k) => k.uid === uid2)!;

      if (k1.id === k2.id) {
        // ✅ Par pronađen
        playTacno();
        setTimeout(() => {
          setPogodene((prev) => [...prev, k1.id]);
          setOtkrivene([]);
          blokiranRef.current = false;
        }, 600);
      } else {
        // ❌ Nije par
        playNetacno();
        setTimeout(() => {
          setOtkrivene([]);
          blokiranRef.current = false;
        }, 1000);
      }
    }
  }

  const getStanje = (kartica: Kartica) => {
    if (pogodene.includes(kartica.id)) return "pogodena";
    if (otkrivene.includes(kartica.uid)) return "otkrivena";
    return "skrivena";
  };

  return (
    <main className="igrica-skrol flex flex-col items-center bg-pink-50 px-3 py-4 sm:px-4 sm:py-8">

      {/* Header */}
      <div className="mb-4 grid w-full max-w-3xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 sm:mb-6 sm:gap-4">
        <NazadLink />

        <h1 className="flex items-center justify-center gap-1 truncate text-center text-xl font-extrabold text-pink-800 sm:gap-2 sm:text-3xl md:text-4xl">
          <GameTitleIcon src="/icons/memorija.jpeg" alt="" size="sm" />
          <span className="truncate">{t("Memorija")}</span>
        </h1>

        <button
          onClick={novaIgra}
          className="flex shrink-0 items-center gap-1 rounded-full bg-pink-200 px-3 py-2 text-sm font-bold text-pink-900 shadow-md transition-all hover:scale-105 hover:shadow-lg sm:gap-2 sm:px-5 sm:py-2.5 sm:text-base"
        >
          <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5" />
          {t("Nova")}
        </button>
      </div>

      {/* Statistika */}
      <div className="mb-4 flex w-full max-w-3xl justify-center gap-3 text-center sm:mb-5 sm:gap-6">
        <div className="min-w-0 flex-1 rounded-2xl bg-pink-200 px-3 py-2 shadow sm:flex-none sm:px-5">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-pink-600 sm:text-xs">{t("Pronađeno")}</p>
          <p className="text-xl font-extrabold text-pink-900 sm:text-2xl">{pogodene.length} / {SLIKE.length}</p>
        </div>
        <div className="min-w-0 flex-1 rounded-2xl bg-purple-200 px-3 py-2 shadow sm:flex-none sm:px-5">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-purple-600 sm:text-xs">{t("Pokušaji")}</p>
          <p className="text-xl font-extrabold text-purple-900 sm:text-2xl">{pokusaji}</p>
        </div>
      </div>

      {/* Tabla: kvadrati se skupljaju sa širinom ekrana, bez fiksnog w-28 */}
      <div className="grid w-full max-w-md grid-cols-4 gap-2 sm:max-w-xl sm:gap-3 md:max-w-2xl md:gap-4">
        {tabla.map((kartica) => {
          const stanje = getStanje(kartica);
          const otkrivena = stanje !== "skrivena";
          const pogodena = stanje === "pogodena";

          return (
            <div
              key={kartica.uid}
              onClick={() => klikKartica(kartica)}
              className="min-w-0 w-full cursor-pointer"
              style={{ perspective: "600px" }}
            >
              <div
                className="relative aspect-square w-full transition-transform duration-500"
                style={{
                  transformStyle: "preserve-3d",
                  transform: otkrivena ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Poleđina (pitanje) */}
                <div
                  className={`absolute inset-0 flex items-center justify-center rounded-xl text-3xl shadow-md transition-colors sm:rounded-2xl sm:text-5xl ${
                    pogodena ? "bg-green-200" : "bg-pink-300 hover:bg-pink-400"
                  }`}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  ❓
                </div>

                {/* Lice (slika) */}
                <div
                  className={`absolute inset-0 overflow-hidden rounded-xl shadow-md sm:rounded-2xl ${
                    pogodena ? "ring-4 ring-green-400" : "ring-2 ring-pink-200"
                  }`}
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <Image
                    src={kartica.src}
                    alt={t(kartica.naziv)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 25vw, 128px"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pobjeda overlay */}
      {pobijedio && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-3xl bg-white p-6 text-center shadow-2xl sm:gap-6 sm:p-10">
            <p className="text-5xl sm:text-6xl">🎉</p>
            <h2 className="text-3xl font-extrabold text-pink-700 sm:text-4xl">{t("Bravo!")}</h2>
            <p className="text-lg text-gray-600 sm:text-xl">{t("Pronašao si sve parove!")}</p>
            <p className="text-base font-semibold text-purple-600 sm:text-lg">{t("Broj pokušaja:")} {pokusaji}</p>
            <button
              onClick={novaIgra}
              className="rounded-full bg-pink-400 px-8 py-3 text-lg font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-pink-500 sm:text-xl"
            >
              {t("Igraj ponovo!")}
            </button>
          </div>
        </div>
      )}

    </main>
  );
}
