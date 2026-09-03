import ActionCard from "@/components/ActionCard";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-sky-100 px-6 py-12">
      <div className="flex w-full max-w-6xl flex-col items-center gap-12">

        <h1 className="text-center text-4xl font-extrabold text-sky-800 sm:text-5xl md:text-6xl">
          <Link href="/" className="flex items-center justify-center gap-3">
            <Image
              src="/logo.png"
              alt="Moja Pametna Učionica Logo"
              width={48}
              height={48}
              className="w-12 h-12 object-contain rounded-xl hover:scale-105 transition-transform"
              priority
            />
            Moja Pametna Učionica
          </Link>
        </h1>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8">
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
            title="Slovo na Slovo"
            href="/slovo-na-slovo"
            icon="Sparkles"
            backgroundClass="bg-violet-200"
            description="Pogodi kojim slovom počinje reč!"
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
          <ActionCard
            title="Pogodi Reč"
            href="/pogodi-rec"
            icon="PartyPopper"
            backgroundClass="bg-indigo-200"
            description="Pogađaj slova i sačuvaj balone!"
          />
          <ActionCard
            title="Matematička Avantura"
            href="/matematika"
            icon="PlusCircle"
            backgroundClass="bg-lime-200"
            description="Sabiranje i oduzimanje kroz igru!"
          />
        </div>

      </div>
    </main>
  );
}
