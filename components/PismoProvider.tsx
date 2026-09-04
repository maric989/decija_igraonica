"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { naPismo, PISMO_DEFAULT, PISMO_KEY, type Pismo } from "@/lib/pismo";

type PismoCtx = {
  pismo: Pismo;
  setPismo: (pismo: Pismo) => void;
};

const PismoContext = createContext<PismoCtx>({
  pismo: PISMO_DEFAULT,
  setPismo: () => {},
});

export function PismoProvider({ children }: { children: ReactNode }) {
  const [pismo, setPismoState] = useState<Pismo>(PISMO_DEFAULT);

  useEffect(() => {
    const sacuvano = localStorage.getItem(PISMO_KEY);
    if (sacuvano === "cyrl" || sacuvano === "latn") {
      setPismoState(sacuvano);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = pismo === "cyrl" ? "sr-Cyrl" : "sr-Latn";
  }, [pismo]);

  const setPismo = useCallback((sledece: Pismo) => {
    setPismoState(sledece);
    localStorage.setItem(PISMO_KEY, sledece);
  }, []);

  return (
    <PismoContext.Provider value={{ pismo, setPismo }}>
      {children}
    </PismoContext.Provider>
  );
}

export function usePismo() {
  return useContext(PismoContext);
}

export function useT() {
  const { pismo } = usePismo();
  return useCallback((tekst: string) => naPismo(tekst, pismo), [pismo]);
}
