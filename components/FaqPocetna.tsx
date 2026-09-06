"use client";

import { ChevronDown } from "lucide-react";
import { useT } from "@/components/PismoProvider";
import { FAQ_POCETNA } from "@/lib/seo";

export default function FaqPocetna() {
  const t = useT();

  return (
    <section className="mt-16 w-full max-w-3xl" aria-labelledby="faq-naslov">
      <h2
        id="faq-naslov"
        className="mb-6 text-center text-2xl font-extrabold text-sky-800 sm:text-3xl"
      >
        {t("Česta pitanja")}
      </h2>

      <div className="flex flex-col gap-3">
        {FAQ_POCETNA.map((stavka) => (
          <details
            key={stavka.pitanje}
            className="group rounded-3xl border-4 border-white/80 bg-gradient-to-r from-orange-100 to-sky-100 shadow-md open:shadow-lg"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-extrabold text-sky-900 marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="text-left text-base sm:text-lg">{t(stavka.pitanje)}</span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-400 text-white shadow-[0_3px_0_#c2410c] group-open:bg-sky-500 group-open:shadow-[0_3px_0_#0369a1]">
                <ChevronDown className="h-5 w-5 transition-transform duration-200 group-open:rotate-180" />
              </span>
            </summary>
            <p className="px-5 pb-5 text-base leading-relaxed text-slate-700 sm:text-lg">
              {t(stavka.odgovor)}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
