import { createContext, useContext } from "react";
import { dict, type Dict, type L3, type Lang } from "@/lib/i18n";

export const LangCtx = createContext<Lang>("ru");
export function useT() {
  const lang = useContext(LangCtx);
  const t: Dict = dict[lang];
  const l = (v: L3) => v[lang];
  return { t, l, lang };
}
