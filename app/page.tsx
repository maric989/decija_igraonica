import ActionCard from "@/components/ActionCard";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-sky-100 px-6 py-12">
      <div className="flex w-full max-w-6xl flex-col items-center gap-12">

        <h1 className="flex flex-wrap items-center justify-center gap-3 text-center text-4xl font-extrabold text-sky-800 sm:gap-4 sm:text-5xl md:text-6xl">
          <Sparkles
            className="h-10 w-10 text-amber-400 sm:h-12 sm:w-12 md:h-14 md:w-14"
            strokeWidth={2.25}
          />
          Moja Pametna Učionica
        </h1>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <ActionCard
            title="Uči Slova"
            href="/uci-slova"
            icon="BookOpen"
            backgroundClass="bg-rose-200"
            description="Uči slova kroz šarene kartice!"
          />
          <ActionCard
            title="Uči Brojeve"
            href="/uci-brojeve"
            icon="Calculator"
            backgroundClass="bg-emerald-200"
            description="Upoznaj brojeve od 1 do 10!"
          />
          <ActionCard
            title="Čarobna Tastatura"
            href="/igraonica/carobna-tastatura"
            icon="Keyboard"
            backgroundClass="bg-blue-200"
            description="Uhvati slova koja padaju!"
          />
          <ActionCard
            title="Memorija"
            href="/igraonica/memorija"
            icon="Puzzle"
            backgroundClass="bg-pink-200"
            description="Pronađi parove slova i slika."
          />
          <ActionCard
            title="Brojalica"
            href="/igraonica/brojalica"
            icon="Hash"
            backgroundClass="bg-yellow-200"
            description="Prebroj predmete na ekranu."
          />
          <ActionCard
            title="Magična Pisaća Mašina"
            href="/igraonica/magicna-pisaca-masina"
            icon="Type"
            backgroundClass="bg-orange-200"
            description="Tipkaj slobodno i gledaj magiju!"
          />
        </div>

      </div>
    </main>
  );
}
