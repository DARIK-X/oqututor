import { GraduationCap, Sparkles, Siren, Wallet, Coins } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import { useT } from "./context";

export type Role = "student" | "mentor" | "teacher";

export function Header(p: { role: Role; setRole: (r: Role) => void; lang: Lang; setLang: (l: Lang) => void; kzt: number; coins: number; onSos: () => void }) {
  const { t } = useT();
  const roles: [Role, string][] = [["student", t.roleStudent], ["mentor", t.roleMentor], ["teacher", t.roleTeacher]];
  const langs: [Lang, string][] = [["kz", "ҚАЗ"], ["ru", "РУС"], ["en", "ENG"]];
  return (
    <header className="sticky top-0 z-30 border-b bg-card/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="relative grid size-9 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
            <GraduationCap className="size-5" />
            <Sparkles className="absolute -right-1 -top-1 size-3.5 text-warning" />
          </div>
          <span className="font-display text-lg font-bold">Oqu-Tutor</span>
        </div>
        <nav className="order-last flex w-full rounded-xl bg-muted p-1 md:order-none md:ml-4 md:w-auto">
          {roles.map(([r, label]) => (
            <button key={r} onClick={() => p.setRole(r)}
              className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-semibold transition md:flex-none ${p.role === r ? "bg-card text-primary shadow-card" : "text-muted-foreground hover:text-foreground"}`}>
              {label}
            </button>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-xl border bg-card px-3 py-1.5 text-sm font-semibold sm:flex">
            <Wallet className="size-4 text-primary" />{p.kzt.toLocaleString("ru-RU")} ₸
            <span className="text-border">|</span>
            <Coins className="size-4 text-warning" />{p.coins} {t.coins}
          </div>
          <div className="flex rounded-full border bg-card p-0.5 text-xs font-bold">
            {langs.map(([l, label]) => (
              <button key={l} onClick={() => p.setLang(l)}
                className={`rounded-full px-2.5 py-1 transition ${p.lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>{label}</button>
            ))}
          </div>
          <button onClick={p.onSos} className="flex items-center gap-1 rounded-xl bg-gradient-sos px-3 py-1.5 text-sm font-bold text-primary-foreground shadow-card transition hover:scale-105">
            <Siren className="size-4" />{t.sos}
          </button>
        </div>
      </div>
    </header>
  );
}
