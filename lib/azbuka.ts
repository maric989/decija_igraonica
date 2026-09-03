export type SlovoData = {
  slovo: string;
  rec: string;
  audioRec: string;
  audioSlovo: string;
  slika?: string;
  boja: string;
};

export const AZBUKA_PODACI: SlovoData[] = [
  { slovo: "А", rec: "АВИОН",     audioRec: "/audio/reci/a-avion.mp3",      audioSlovo: "/audio/slova/a.mp3?v=2",  slika: "/slike/azbuka/avion.jpeg",     boja: "bg-red-100"    },
  { slovo: "Б", rec: "БАНАНА",    audioRec: "/audio/reci/b-banana.mp3",     audioSlovo: "/audio/slova/b.mp3?v=2",  slika: "/slike/azbuka/banana.jpeg",    boja: "bg-blue-100"   },
  { slovo: "В", rec: "ВУК",       audioRec: "/audio/reci/v-vuk.mp3",        audioSlovo: "/audio/slova/v.mp3?v=2",  slika: "/slike/azbuka/vuk.jpeg",       boja: "bg-green-100"  },
  { slovo: "Г", rec: "ГРОЖЂЕ",    audioRec: "/audio/reci/g-grozdje.mp3?v=4", audioSlovo: "/audio/slova/g.mp3?v=4", slika: "/slike/azbuka/grozdje.jpeg",   boja: "bg-yellow-100" },
  { slovo: "Д", rec: "ДРВО",      audioRec: "/audio/reci/d-drvo.mp3",       audioSlovo: "/audio/slova/d.mp3?v=2",  slika: "/slike/azbuka/drvo.jpeg",      boja: "bg-purple-100" },
  { slovo: "Ђ", rec: "ЂАК",       audioRec: "/audio/reci/dj-djak.mp3?v=3",  audioSlovo: "/audio/slova/dj.mp3?v=3", slika: "/slike/azbuka/djak.jpeg",      boja: "bg-red-100"    },
  { slovo: "Е", rec: "ЕКСЕР",     audioRec: "/audio/reci/e-ekser.mp3",      audioSlovo: "/audio/slova/e.mp3?v=2",  slika: "/slike/azbuka/ekser.jpeg",     boja: "bg-blue-100"   },
  { slovo: "Ж", rec: "ЖИРАФА",    audioRec: "/audio/reci/zh-zhirafa.mp3",   audioSlovo: "/audio/slova/zh.mp3?v=2", slika: "/slike/azbuka/zirafa.jpeg",    boja: "bg-green-100"  },
  { slovo: "З", rec: "ЗЕБРА",     audioRec: "/audio/reci/z-zebra.mp3",      audioSlovo: "/audio/slova/z.mp3?v=2",  slika: "/slike/azbuka/zebra.jpeg",     boja: "bg-yellow-100" },
  { slovo: "И", rec: "ИГРА",      audioRec: "/audio/reci/i-igra.mp3",       audioSlovo: "/audio/slova/i.mp3?v=2",  slika: "/slike/azbuka/igra.jpeg",      boja: "bg-purple-100" },
  { slovo: "Ј", rec: "ЈАБУКА",    audioRec: "/audio/reci/j-jabuka.mp3?v=3", audioSlovo: "/audio/slova/j.mp3?v=3", slika: "/slike/azbuka/jabuka.jpeg",    boja: "bg-red-100"    },
  { slovo: "К", rec: "КЊИГА",     audioRec: "/audio/reci/k-knjiga.mp3",     audioSlovo: "/audio/slova/k.mp3?v=2",  slika: "/slike/azbuka/knjiga.jpeg",    boja: "bg-blue-100"   },
  { slovo: "Л", rec: "ЛАВ",       audioRec: "/audio/reci/l-lav.mp3",        audioSlovo: "/audio/slova/l.mp3?v=2",  slika: "/slike/azbuka/lav.jpeg",       boja: "bg-green-100"  },
  { slovo: "Љ", rec: "ЉУЉАШКА",   audioRec: "/audio/reci/lj-ljuljaska.mp3", audioSlovo: "/audio/slova/lj.mp3?v=2", slika: "/slike/azbuka/ljuljaska.jpeg", boja: "bg-yellow-100" },
  { slovo: "М", rec: "МАЧКА",     audioRec: "/audio/reci/m-maca.mp3",       audioSlovo: "/audio/slova/m.mp3?v=2",  slika: "/slike/azbuka/macka.jpeg",     boja: "bg-purple-100" },
  { slovo: "Н", rec: "НОС",       audioRec: "/audio/reci/n-nos.mp3",        audioSlovo: "/audio/slova/n.mp3?v=2",  slika: "/slike/azbuka/nos.jpeg",       boja: "bg-red-100"    },
  { slovo: "Њ", rec: "ЊИВА",      audioRec: "/audio/reci/nj-njiva.mp3",     audioSlovo: "/audio/slova/nj.mp3?v=2", slika: "/slike/azbuka/njiva.jpeg",     boja: "bg-blue-100"   },
  { slovo: "О", rec: "ОКО",       audioRec: "/audio/reci/o-oko.mp3",        audioSlovo: "/audio/slova/o.mp3?v=2",  slika: "/slike/azbuka/oko.jpeg",       boja: "bg-green-100"  },
  { slovo: "П", rec: "ПАС",       audioRec: "/audio/reci/p-pas.mp3",        audioSlovo: "/audio/slova/p.mp3?v=2",  slika: "/slike/azbuka/pas.jpeg",       boja: "bg-yellow-100" },
  { slovo: "Р", rec: "РИБА",      audioRec: "/audio/reci/r-riba.mp3",       audioSlovo: "/audio/slova/r.mp3?v=2",  slika: "/slike/azbuka/riba.jpeg",      boja: "bg-purple-100" },
  { slovo: "С", rec: "СУНЦЕ",     audioRec: "/audio/reci/s-sunce.mp3",      audioSlovo: "/audio/slova/s.mp3?v=2",  slika: "/slike/azbuka/sunce.jpeg",     boja: "bg-red-100"    },
  { slovo: "Т", rec: "ТОРТА",     audioRec: "/audio/reci/t-torta.mp3",      audioSlovo: "/audio/slova/t.mp3?v=2",  slika: "/slike/azbuka/torta.jpeg",     boja: "bg-blue-100"   },
  { slovo: "Ћ", rec: "ЋУП",       audioRec: "/audio/reci/cj-cup.mp3",       audioSlovo: "/audio/slova/cj.mp3?v=2", slika: "/slike/azbuka/cup.jpeg",       boja: "bg-green-100"  },
  { slovo: "У", rec: "УВО",       audioRec: "/audio/reci/u-uvo.mp3",        audioSlovo: "/audio/slova/u.mp3?v=2",  slika: "/slike/azbuka/uvo.jpeg",       boja: "bg-yellow-100" },
  { slovo: "Ф", rec: "ФУДБАЛ",    audioRec: "/audio/reci/f-fudbal.mp3",     audioSlovo: "/audio/slova/f.mp3?v=2",  slika: "/slike/azbuka/fudbal.jpeg",    boja: "bg-purple-100" },
  { slovo: "Х", rec: "ХЛЕБ",      audioRec: "/audio/reci/h-hleb.mp3",       audioSlovo: "/audio/slova/h.mp3?v=2",  slika: "/slike/azbuka/hleb.jpeg",      boja: "bg-red-100"    },
  { slovo: "Ц", rec: "ЦВЕТ",      audioRec: "/audio/reci/c-cvet.mp3",       audioSlovo: "/audio/slova/c.mp3?v=2",  slika: "/slike/azbuka/cvet.jpeg",      boja: "bg-blue-100"   },
  { slovo: "Ч", rec: "ЧАША",      audioRec: "/audio/reci/ch-chasa.mp3",     audioSlovo: "/audio/slova/ch.mp3?v=2", slika: "/slike/azbuka/casa.jpeg",      boja: "bg-green-100"  },
  { slovo: "Џ", rec: "ЏИП",       audioRec: "/audio/reci/dz-dzip.mp3",      audioSlovo: "/audio/slova/dz.mp3?v=2", slika: "/slike/azbuka/dzip.jpeg",      boja: "bg-yellow-100" },
  { slovo: "Ш", rec: "ШКОЛА",     audioRec: "/audio/reci/sh-shkola.mp3",    audioSlovo: "/audio/slova/sh.mp3?v=2", slika: "/slike/azbuka/skola.jpeg",     boja: "bg-purple-100" },
];
