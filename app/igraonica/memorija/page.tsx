"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";

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
    <main className="flex min-h-screen flex-col items-center bg-pink-50 px-4 py-8">

      {/* Header */}
      <div className="mb-6 flex w-full max-w-3xl items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full bg-pink-200 px-5 py-2.5 font-bold text-pink-900 shadow-md transition-all hover:scale-105 hover:shadow-lg"
        >
          <ArrowLeft className="h-5 w-5" />
          Nazad
        </Link>

        <h1 className="text-3xl font-extrabold text-pink-800 sm:text-4xl">
          Memorija 🧠
        </h1>

        <button
          onClick={novaIgra}
          className="flex items-center gap-2 rounded-full bg-pink-200 px-5 py-2.5 font-bold text-pink-900 shadow-md transition-all hover:scale-105 hover:shadow-lg"
        >
          <RefreshCw className="h-5 w-5" />
          Nova
        </button>
      </div>

      {/* Statistika */}
      <div className="mb-5 flex gap-6 text-center">
        <div className="rounded-2xl bg-pink-200 px-5 py-2 shadow">
          <p className="text-xs font-semibold uppercase tracking-wide text-pink-600">Pronađeno</p>
          <p className="text-2xl font-extrabold text-pink-900">{pogodene.length} / {SLIKE.length}</p>
        </div>
        <div className="rounded-2xl bg-purple-200 px-5 py-2 shadow">
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-600">Pokušaji</p>
          <p className="text-2xl font-extrabold text-purple-900">{pokusaji}</p>
        </div>
      </div>

      {/* Tabla */}
      <div className="grid grid-cols-4 gap-3 sm:gap-4">
        {tabla.map((kartica) => {
          const stanje = getStanje(kartica);
          const otkrivena = stanje !== "skrivena";
          const pogodena = stanje === "pogodena";

          return (
            <div
              key={kartica.uid}
              onClick={() => klikKartica(kartica)}
              className="cursor-pointer"
              style={{ perspective: "600px" }}
            >
              <div
                className="relative h-28 w-28 transition-transform duration-500 sm:h-32 sm:w-32"
                style={{
                  transformStyle: "preserve-3d",
                  transform: otkrivena ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Poleđina (pitanje) */}
                <div
                  className={`absolute inset-0 flex items-center justify-center rounded-2xl text-5xl shadow-md transition-colors ${
                    pogodena ? "bg-green-200" : "bg-pink-300 hover:bg-pink-400"
                  }`}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  ❓
                </div>

                {/* Lice (slika) */}
                <div
                  className={`absolute inset-0 overflow-hidden rounded-2xl shadow-md ${
                    pogodena ? "ring-4 ring-green-400" : "ring-2 ring-pink-200"
                  }`}
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <Image
                    src={kartica.src}
                    alt={kartica.naziv}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pobjeda overlay */}
      {pobijedio && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-6 rounded-3xl bg-white p-10 shadow-2xl">
            <p className="text-6xl">🎉</p>
            <h2 className="text-4xl font-extrabold text-pink-700">Bravo!</h2>
            <p className="text-xl text-gray-600">Pronašao si sve parove!</p>
            <p className="text-lg font-semibold text-purple-600">Broj pokušaja: {pokusaji}</p>
            <button
              onClick={novaIgra}
              className="rounded-full bg-pink-400 px-8 py-3 text-xl font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-pink-500"
            >
              Igraj ponovo!
            </button>
          </div>
        </div>
      )}

    </main>
  );
}
