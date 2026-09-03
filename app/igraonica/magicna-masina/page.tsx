import Link from "next/link";
import { ArrowLeft, Type } from "lucide-react";

export default function MagicnaMasinaPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-orange-100 px-6 py-12">
      <div className="flex max-w-xl flex-col items-center gap-6 rounded-3xl bg-white/70 p-10 text-center shadow-lg">
        <Type className="h-16 w-16 text-orange-500" strokeWidth={2.25} />
        <h1 className="text-4xl font-extrabold text-orange-800">Magična Pisaća Mašina</h1>
        <p className="text-xl text-slate-700">Igra dolazi uskoro!</p>
        <Link
          href="/"
          className="mt-4 flex cursor-pointer items-center gap-2 rounded-full bg-orange-200 px-6 py-3 text-lg font-bold text-orange-900 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          <ArrowLeft className="h-5 w-5" />
          Nazad
        </Link>
      </div>
    </main>
  );
}
