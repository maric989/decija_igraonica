"use client";

import NazadLink from "@/components/NazadLink";
import PismoSwitch from "@/components/PismoSwitch";
import { useT } from "@/components/PismoProvider";
import { CONTACT_EMAIL, SITE_NAME, SITE_NAME_ALT } from "@/lib/seo";

export default function ONamaSadrzaj() {
  const t = useT();

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-sky-100 px-6 py-10">
      <div className="flex w-full max-w-2xl flex-col">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <NazadLink />
          <PismoSwitch />
        </div>

        <article className="rounded-3xl border border-white/50 bg-white/80 p-6 shadow-md backdrop-blur-md sm:p-10">
          <h1 className="mb-6 text-3xl font-extrabold text-sky-800 sm:text-4xl">
            {t("O nama")}
          </h1>

          <div className="space-y-6 text-base leading-relaxed text-slate-700 sm:text-lg">
            <p>
              {t(
                `${SITE_NAME} (${SITE_NAME_ALT}) je sajt sa besplatnim edukativnim igrama za predškolce: ćirilica, slova, brojevi i logika. Nema naloga, nema reklama i nema kupovine.`,
              )}
            </p>

            <section>
              <h2 className="mb-2 text-xl font-extrabold text-sky-800">
                {t("Privatnost")}
              </h2>
              <p>
                {t(
                  "Ne pravimo korisničke naloge i ne tražimo ime, uzrast ni email deteta. Igre rade u pregledaču; zvezdice i poeni se ne čuvaju na serveru.",
                )}
              </p>
              <p className="mt-3">
                {t(
                  "Da bismo videli da li sajt radi (brzina, koje se stranice otvaraju), koristimo Vercel Analytics i Speed Insights. To su merenja posete, ne profili dece. Nema trećih reklama ni društvenih dodataka.",
                )}
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-xl font-extrabold text-sky-800">
                {t("Kontakt")}
              </h2>
              <p>
                {t("Pitanja, greške u igri ili predlozi:")}{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-bold text-sky-700 underline decoration-sky-300 underline-offset-2 hover:text-sky-900"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
