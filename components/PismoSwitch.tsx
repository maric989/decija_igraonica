"use client";

import { playPop } from "@/lib/sounds";
import { usePismo } from "@/components/PismoProvider";

export default function PismoSwitch() {
  const { pismo, setPismo } = usePismo();

  return (
    <div
      role="group"
      aria-label="Pismo"
      className="flex rounded-full border-4 border-white bg-white p-1 shadow-[0_5px_0_#7dd3fc]"
    >
      <button
        type="button"
        onClick={() => {
          playPop();
          setPismo("cyrl");
        }}
        className={`rounded-full px-3 py-1.5 text-sm font-extrabold transition-colors sm:px-4 ${
          pismo === "cyrl" ? "bg-sky-600 text-white" : "text-sky-800/60 hover:text-sky-800"
        }`}
      >
        Ћирилица
      </button>
      <button
        type="button"
        onClick={() => {
          playPop();
          setPismo("latn");
        }}
        className={`rounded-full px-3 py-1.5 text-sm font-extrabold transition-colors sm:px-4 ${
          pismo === "latn" ? "bg-sky-600 text-white" : "text-sky-800/60 hover:text-sky-800"
        }`}
      >
        Latinica
      </button>
    </div>
  );
}
