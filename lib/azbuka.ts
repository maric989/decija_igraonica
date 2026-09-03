export type SlovoData = {
  slovo: string;
  rec: string;
  audioRec: string;
  audioSlovo: string;
  slika?: string;
  boja: string;
};

function slovaMp3(ime: string) {
  return `/slova/${encodeURIComponent(ime)}`;
}

export const AZBUKA_PODACI: SlovoData[] = [
  { slovo: "А", rec: "АВИОН",     audioRec: slovaMp3("a kao avion.mp3"),      audioSlovo: "/audio/slova/a.mp3?v=2",  slika: "/slike/azbuka/avion.jpeg",     boja: "bg-red-100"    },
  { slovo: "Б", rec: "БАНАНА",    audioRec: slovaMp3("b kao banana.mp3"),     audioSlovo: "/audio/slova/b.mp3?v=2",  slika: "/slike/azbuka/banana.jpeg",    boja: "bg-blue-100"   },
  { slovo: "В", rec: "ВУК",       audioRec: slovaMp3("v kao vuk.mp3"),        audioSlovo: "/audio/slova/v.mp3?v=2",  slika: "/slike/azbuka/vuk.jpeg",       boja: "bg-green-100"  },
  { slovo: "Г", rec: "ГРОЖЂЕ",    audioRec: slovaMp3("g kao grozdje.mp3"),    audioSlovo: "/audio/slova/g.mp3?v=4", slika: "/slike/azbuka/grozdje.jpeg",   boja: "bg-yellow-100" },
  { slovo: "Д", rec: "ДРВО",      audioRec: slovaMp3("d kao drvo.mp3"),       audioSlovo: "/audio/slova/d.mp3?v=2",  slika: "/slike/azbuka/drvo.jpeg",      boja: "bg-purple-100" },
  { slovo: "Ђ", rec: "ЂАК",       audioRec: slovaMp3("dj kao djak.mp3"),      audioSlovo: "/audio/slova/dj.mp3?v=3", slika: "/slike/azbuka/djak.jpeg",      boja: "bg-red-100"    },
  { slovo: "Е", rec: "ЕКСЕР",     audioRec: slovaMp3("e kao ekser.mp3"),      audioSlovo: "/audio/slova/e.mp3?v=2",  slika: "/slike/azbuka/ekser.jpeg",     boja: "bg-blue-100"   },
  { slovo: "Ж", rec: "ЖИРАФА",    audioRec: slovaMp3("z kao zirafa.mp3"),     audioSlovo: "/audio/slova/zh.mp3?v=2", slika: "/slike/azbuka/zirafa.jpeg",    boja: "bg-green-100"  },
  { slovo: "З", rec: "ЗЕБРА",     audioRec: slovaMp3("z kao zebra.mp3"),      audioSlovo: "/audio/slova/z.mp3?v=2",  slika: "/slike/azbuka/zebra.jpeg",     boja: "bg-yellow-100" },
  { slovo: "И", rec: "ИГРА",      audioRec: slovaMp3("i kao igra.mp3"),       audioSlovo: "/audio/slova/i.mp3?v=2",  slika: "/slike/azbuka/igra.jpeg",      boja: "bg-purple-100" },
  { slovo: "Ј", rec: "ЈАБУКА",    audioRec: slovaMp3("j kao jabuka.mp3"),     audioSlovo: "/audio/slova/j.mp3?v=5", slika: "/slike/azbuka/jabuka.jpeg",    boja: "bg-red-100"    },
  { slovo: "К", rec: "КЊИГА",     audioRec: slovaMp3("k kao knjiga.mp3"),     audioSlovo: "/audio/slova/k.mp3?v=2",  slika: "/slike/azbuka/knjiga.jpeg",    boja: "bg-blue-100"   },
  { slovo: "Л", rec: "ЛАВ",       audioRec: slovaMp3("l kao lav.mp3"),        audioSlovo: "/audio/slova/l.mp3?v=2",  slika: "/slike/azbuka/lav.jpeg",       boja: "bg-green-100"  },
  { slovo: "Љ", rec: "ЉУЉАШКА",   audioRec: slovaMp3("lj kao ljuljaska.mp3"), audioSlovo: "/audio/slova/lj.mp3?v=2", slika: "/slike/azbuka/ljuljaska.jpeg", boja: "bg-yellow-100" },
  { slovo: "М", rec: "МАЧКА",     audioRec: slovaMp3("m kao maca.mp3"),       audioSlovo: "/audio/slova/m.mp3?v=2",  slika: "/slike/azbuka/macka.jpeg",     boja: "bg-purple-100" },
  { slovo: "Н", rec: "НОС",       audioRec: slovaMp3("n kao nos.mp3"),        audioSlovo: "/audio/slova/n.mp3?v=2",  slika: "/slike/azbuka/nos.jpeg",       boja: "bg-red-100"    },
  { slovo: "Њ", rec: "ЊИВА",      audioRec: slovaMp3("nj kao njiva.mp3"),     audioSlovo: "/audio/slova/nj.mp3?v=2", slika: "/slike/azbuka/njiva.jpeg",     boja: "bg-blue-100"   },
  { slovo: "О", rec: "ОКО",       audioRec: slovaMp3("o kao oko.mp3"),        audioSlovo: "/audio/slova/o.mp3?v=2",  slika: "/slike/azbuka/oko.jpeg",       boja: "bg-green-100"  },
  { slovo: "П", rec: "ПАС",       audioRec: slovaMp3("p kao pas.mp3"),        audioSlovo: "/audio/slova/p.mp3?v=2",  slika: "/slike/azbuka/pas.jpeg",       boja: "bg-yellow-100" },
  { slovo: "Р", rec: "РИБА",      audioRec: slovaMp3("r kao riba.mp3"),       audioSlovo: "/audio/slova/r.mp3?v=2",  slika: "/slike/azbuka/riba.jpeg",      boja: "bg-purple-100" },
  { slovo: "С", rec: "СУНЦЕ",     audioRec: slovaMp3("s kao sunce.mp3"),      audioSlovo: "/audio/slova/s.mp3?v=2",  slika: "/slike/azbuka/sunce.jpeg",     boja: "bg-red-100"    },
  { slovo: "Т", rec: "ТОРТА",     audioRec: slovaMp3("t kao torta.mp3"),      audioSlovo: "/audio/slova/t.mp3?v=2",  slika: "/slike/azbuka/torta.jpeg",     boja: "bg-blue-100"   },
  { slovo: "Ћ", rec: "ЋУП",       audioRec: slovaMp3("c kao cup.mp3"),        audioSlovo: "/audio/slova/cj.mp3?v=2", slika: "/slike/azbuka/cup.jpeg",       boja: "bg-green-100"  },
  { slovo: "У", rec: "УВО",       audioRec: slovaMp3("u kao uvo.mp3"),        audioSlovo: "/audio/slova/u.mp3?v=2",  slika: "/slike/azbuka/uvo.jpeg",       boja: "bg-yellow-100" },
  { slovo: "Ф", rec: "ФУДБАЛ",    audioRec: slovaMp3("f kao fudbal.mp3"),     audioSlovo: "/audio/slova/f.mp3?v=2",  slika: "/slike/azbuka/fudbal.jpeg",    boja: "bg-purple-100" },
  { slovo: "Х", rec: "ХЛЕБ",      audioRec: slovaMp3("h kao hleb.mp3"),       audioSlovo: "/audio/slova/h.mp3?v=2",  slika: "/slike/azbuka/hleb.jpeg",      boja: "bg-red-100"    },
  { slovo: "Ц", rec: "ЦВЕТ",      audioRec: slovaMp3("c kao cvet.mp3"),       audioSlovo: "/audio/slova/c.mp3?v=2",  slika: "/slike/azbuka/cvet.jpeg",      boja: "bg-blue-100"   },
  { slovo: "Ч", rec: "ЧАША",      audioRec: slovaMp3("c kao casa.mp3"),       audioSlovo: "/audio/slova/ch.mp3?v=2", slika: "/slike/azbuka/casa.jpeg",      boja: "bg-green-100"  },
  { slovo: "Џ", rec: "ЏИП",       audioRec: slovaMp3("dz kao dzip.mp3"),      audioSlovo: "/audio/slova/dz.mp3?v=2", slika: "/slike/azbuka/dzip.jpeg",      boja: "bg-yellow-100" },
  { slovo: "Ш", rec: "ШКОЛА",     audioRec: slovaMp3("s kao skola.mp3"),      audioSlovo: "/audio/slova/sh.mp3?v=2", slika: "/slike/azbuka/skola.jpeg",     boja: "bg-purple-100" },
];
