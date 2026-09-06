"use client";

import ActionCard from "@/components/ActionCard";
import FaqPocetna from "@/components/FaqPocetna";
import JsonLd from "@/components/JsonLd";
import PismoSwitch from "@/components/PismoSwitch";
import { useT } from "@/components/PismoProvider";
import { faqJsonLd } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const t = useT();
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-sky-100 px-6 py-12">
      <div className="flex w-full max-w-6xl flex-col items-center">

        <div className="mb-6 flex flex-col items-center justify-center gap-4">
          <Link href="/" className="flex flex-col items-center justify-center gap-4">
            <Image
              src="/logo.png"
              alt={t("Dečija Učionica Logo")}
              width={96}
              height={96}
              className="h-20 w-20 object-contain drop-shadow-md transition-transform hover:scale-105 md:h-24 md:w-24"
              priority
            />
            <span className="flex flex-col items-center gap-1">
              <h1 className="text-center text-5xl font-extrabold tracking-tight text-sky-900 drop-shadow-sm md:text-6xl">
                {t("Dečija Učionica")}
              </h1>
              <p className="text-center text-xl font-bold text-sky-700 md:text-2xl">
                {t("Moja Pametna Učionica")}
              </p>
            </span>
          </Link>
        </div>

        <p className="mx-auto mb-8 max-w-2xl text-center text-lg font-medium leading-relaxed text-sky-800/80 md:text-xl">
          {t("Besplatne igre za ćirilicu i brojeve — za predškolce, bez naloga i reklama.")}
        </p>

        <div className="mb-12">
          <PismoSwitch />
        </div>

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
            title="Slovo na Slovo"
            href="/slovo-na-slovo"
            imageSrc="/icons/slovo-na-slovo.jpeg"
            backgroundClass="bg-violet-200"
            kategorija="SLOVA"
            description="Pogodi kojim slovom počinje reč!"
          />
          <ActionCard
            title="Sastavi Reč"
            href="/sastavi-rec"
            imageSrc="/icons/sastavi-rec.png"
            backgroundClass="bg-cyan-200"
            kategorija="SLOVA"
            description="Klikni slova i sastavi reč!"
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
            title="Vaga"
            href="/vaga"
            imageSrc="/icons/vaga.png"
            backgroundClass="bg-amber-200"
            kategorija="MATEMATIKA"
            description="Uravnoteži vagu jabukama!"
          />
          <ActionCard
            title="Poređenje"
            href="/poredjenje"
            imageSrc="/icons/poredjenje.png"
            backgroundClass="bg-orange-200"
            kategorija="MATEMATIKA"
            description="Poređaj od najmanjeg do najvećeg!"
          />
          <ActionCard
            title="Koliko je sati?"
            href="/sat"
            imageSrc="/icons/sat.png"
            backgroundClass="bg-teal-200"
            kategorija="MATEMATIKA"
            description="Namesti sat i pročitaj koliko je sati!"
          />
          <ActionCard
            title="Senke"
            href="/senke"
            imageSrc="/icons/senke.png"
            backgroundClass="bg-slate-200"
            kategorija="LOGIKA"
            description="Poveži sliku sa njenom senkom!"
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
            title="Magična Pisaća Mašina"
            href="/igraonica/magicna-pisaca-masina"
            imageSrc="/icons/pisaca-masina.jpeg"
            backgroundClass="bg-orange-200"
            kategorija="SLOVA"
            description="Tipkaj slobodno i gledaj magiju!"
          />
          <ActionCard
            title="Čarobna Tastatura"
            href="/igraonica/carobna-tastatura"
            imageSrc="/icons/carobna-tastatura.jpeg"
            backgroundClass="bg-blue-200"
            kategorija="SLOVA"
            description="Uhvati slova koja padaju!"
          />
        </div>

        <FaqPocetna />

        <p className="mt-10 text-center text-sm font-semibold text-sky-800/50">
          <Link href="/o-nama" className="hover:text-sky-800">
            {t("O nama")}
          </Link>
        </p>

      </div>
      <JsonLd data={faqJsonLd()} />
    </main>
  );
}
