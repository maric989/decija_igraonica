export type Pismo = "cyrl" | "latn";

export const PISMO_KEY = "deco-pismo";
export const PISMO_DEFAULT: Pismo = "cyrl";

const ZASTICENO = ["Vercel Analytics", "Speed Insights", "Vercel", "email"];

const SLOVA: Record<string, string> = {
  A: "А",
  B: "Б",
  C: "Ц",
  Č: "Ч",
  Ć: "Ћ",
  D: "Д",
  Đ: "Ђ",
  E: "Е",
  F: "Ф",
  G: "Г",
  H: "Х",
  I: "И",
  J: "Ј",
  K: "К",
  L: "Л",
  M: "М",
  N: "Н",
  O: "О",
  P: "П",
  R: "Р",
  S: "С",
  Š: "Ш",
  T: "Т",
  U: "У",
  V: "В",
  Z: "З",
  Ž: "Ж",
  a: "а",
  b: "б",
  c: "ц",
  č: "ч",
  ć: "ћ",
  d: "д",
  đ: "ђ",
  e: "е",
  f: "ф",
  g: "г",
  h: "х",
  i: "и",
  j: "ј",
  k: "к",
  l: "л",
  m: "м",
  n: "н",
  o: "о",
  p: "п",
  r: "р",
  s: "с",
  š: "ш",
  t: "т",
  u: "у",
  v: "в",
  z: "з",
  ž: "ж",
};

function uCirilicu(tekst: string): string {
  return tekst
    .replace(/Dž|DŽ/g, "Џ")
    .replace(/dž/g, "џ")
    .replace(/Lj|LJ/g, "Љ")
    .replace(/lj/g, "љ")
    .replace(/Nj|NJ/g, "Њ")
    .replace(/nj/g, "њ")
    .replace(/./g, (ch) => SLOVA[ch] ?? ch);
}

export function naPismo(tekst: string, pismo: Pismo): string {
  if (pismo === "latn") return tekst;

  const cuvanje: string[] = [];
  let radni = tekst;
  for (const token of ZASTICENO) {
    radni = radni.replaceAll(token, () => {
      const i = cuvanje.length;
      cuvanje.push(token);
      return `\u0000${i}\u0000`;
    });
  }

  radni = uCirilicu(radni);
  return radni.replace(/\u0000(\d+)\u0000/g, (_, i) => cuvanje[Number(i)] ?? "");
}
