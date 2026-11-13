import { useState } from "react";
import { Wallet, Coins, Star, Siren, Clock } from "lucide-react";
import { sosTasks, type SosTask } from "@/lib/oqu-data";
import { useT } from "./context";

export function MentorView({ extra }: { extra: SosTask[] }) {
  const { t, l } = useT();
  const [accepted, setAccepted] = useState<number[]>([]);
  const all = [...extra, ...sosTasks];
  const feed = all.filter(s => !accepted.includes(s.id));
  const active = all.filter(s => accepted.includes(s.id));
  const kpis = [
    { icon: Wallet, label: t.earned, value: "18 500 ₸", cls: "bg-primary-soft text-primary" },
    { icon: Coins, label: t.coins, value: "340 Coins", hint: t.coinsHint, cls: "bg-warning-soft text-warning-foreground" },
    { icon: Star, label: t.rating, value: "4.9 ★", cls: "bg-success-soft text-success-foreground" },
  ];
  return (
    <div className="space-y-8">
      <div>
        <span className="inline-block rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">{t.imMentor}</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {kpis.map(k => (
          <div key={k.label} className="rounded-2xl border bg-card p-5 shadow-card">
            <div className={`inline-grid size-10 place-items-center rounded-xl ${k.cls}`}><k.icon className="size-5" /></div>
            <p className="mt-3 text-sm text-muted-foreground">{k.label}</p>
            <p className="font-display text-2xl font-bold">{k.value}</p>
            {k.hint && <p className="text-xs text-muted-foreground">{k.hint}</p>}
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <section>
          <h2 className="mb-3 flex items-center gap-2 text-xl font-bold"><Siren className="size-5 text-warning" />{t.sosFeed}</h2>
          <div className="space-y-3">
            {feed.map(s => (
              <div key={s.id} className="flex flex-col gap-3 rounded-2xl border-l-4 border-l-warning bg-card p-4 shadow-card sm:flex-row sm:items-center">
                <div className="flex-1">
                  <span className="text-xs font-bold uppercase text-warning-foreground">{t.sosUrgent}</span>
                  <h3 className="font-sans text-base font-bold">{l(s.title)}</h3>
                  <p className="text-sm text-muted-foreground">{l(s.desc)}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><Clock className="size-3" />{s.mins} {t.min}</p>
                </div>
                <span className="rounded-lg bg-warning-soft px-2.5 py-1 font-bold text-warning-foreground">{s.budget}</span>
                <button onClick={() => setAccepted(a => [...a, s.id])} className="rounded-xl bg-gradient-primary px-4 py-2 font-bold text-primary-foreground shadow-glow">{t.accept}</button>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-2xl border bg-card p-5 shadow-card">
          <h2 className="mb-3 text-lg font-bold">{t.activeSessions}</h2>
          {active.length === 0 ? <p className="text-sm text-muted-foreground">{t.noActive}</p> : (
            <ul className="space-y-2">{active.map(s => (
              <li key={s.id} className="animate-pop rounded-xl bg-success-soft p-3 text-sm"><b className="text-success-foreground">● {l(s.title)}</b><div className="text-xs">{s.budget} · {t.min25}</div></li>
            ))}</ul>
          )}
        </section>
      </div>
    </div>
  );
}
