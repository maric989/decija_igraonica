import ActionCard from "@/components/ActionCard";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-sky-100 px-6 py-12">
      <div className="flex w-full max-w-6xl flex-col items-center">

        <h1 className="text-center font-extrabold text-sky-800">
          <Link
            href="/"
            className="mx-auto mb-10 flex w-fit items-center justify-center gap-3 rounded-full border border-white/50 bg-white/80 px-4 py-3 shadow-md backdrop-blur-md sm:px-8"
          >
            <Image
              src="/logo.png"
              alt="Moja Pametna Učionica Logo"
              width={48}
              height={48}
              className="h-12 w-12 rounded-xl object-contain transition-transform hover:scale-105"
              priority
            />
            <span className="text-2xl sm:text-4xl md:text-5xl">
              Moja Pametna Učionica
            </span>
          </Link>
        </h1>

        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ActionCard
            title="Uči Slova"
            href="/uci-slova"
            imageSrc="/icons/uci-slova.jpeg"
            backgroundClass="bg-rose-200"
            kategorija="SLOVA"
            description="Uči slova kroz šarene kartice!"
          />
          <ActionCard
            title="Uči Brojeve"
            href="/uci-brojeve"
            imageSrc="/icons/uci-brojeve.jpeg"
            backgroundClass="bg-emerald-200"
            kategorija="MATEMATIKA"
            description="Upoznaj brojeve od 1 do 10!"
          />
          <ActionCard
            title="Slovo na Slovo"
            href="/slovo-na-slovo"
            imageSrc="/icons/slovo-na-slovo.jpeg"
            backgroundClass="bg-violet-200"
            kategorija="SLOVA"
            description="Pogodi kojim slovom počinje reč!"
          />
          <ActionCard
            title="Čarobna Tastatura"
            href="/igraonica/carobna-tastatura"
            imageSrc="/icons/carobna-tastatura.jpeg"
            backgroundClass="bg-blue-200"
            kategorija="SLOVA"
            description="Uhvati slova koja padaju!"
          />
          <ActionCard
            title="Memorija"
            href="/igraonica/memorija"
            imageSrc="/icons/memorija.jpeg"
            backgroundClass="bg-pink-200"
            kategorija="LOGIKA"
            description="Pronađi parove slova i slika."
          />
          <ActionCard
            title="Brojalica"
            href="/igraonica/brojalica"
            imageSrc="/icons/brojalica.jpeg"
            backgroundClass="bg-yellow-200"
            kategorija="MATEMATIKA"
            description="Prebroj predmete na ekranu."
          />
          <ActionCard
            title="Magična Pisaća Mašina"
            href="/igraonica/magicna-pisaca-masina"
            imageSrc="/icons/pisaca-masina.jpeg"
            backgroundClass="bg-orange-200"
            kategorija="SLOVA"
            description="Tipkaj slobodno i gledaj magiju!"
          />
          <ActionCard
            title="Pogodi Reč"
            href="/pogodi-rec"
            imageSrc="/icons/pogodi-rec.jpeg"
            backgroundClass="bg-indigo-200"
            kategorija="SLOVA"
            description="Pogađaj slova i sačuvaj balone!"
          />
          <ActionCard
            title="Matematička Avantura"
            href="/matematika"
            imageSrc="/icons/matematika.jpeg"
            backgroundClass="bg-lime-200"
            kategorija="MATEMATIKA"
            description="Sabiranje i oduzimanje kroz igru!"
          />
          <ActionCard
            title="Senke"
            href="/senke"
            imageSrc="/senke-bager.png"
            backgroundClass="bg-slate-200"
            kategorija="LOGIKA"
            description="Poveži sliku sa njenom senkom!"
          />
        </div>

      </div>
    </main>
  );
}
