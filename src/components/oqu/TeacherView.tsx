import { useState } from "react";
import { ShieldCheck, CalendarClock, BarChart3 } from "lucide-react";
import { candidates, bottlenecks } from "@/lib/oqu-data";
import { useT } from "./context";

export function TeacherView() {
  const { t, l } = useT();
  const [approved, setApproved] = useState<number[]>([]);
  const [slots, setSlots] = useState([
    { id: 1, time: "Пн / Mon 14:00", online: true, on: true },
    { id: 2, time: "Ср / Wed 10:00", online: false, on: true },
    { id: 3, time: "Пт / Fri 16:00", online: true, on: false },
  ]);
  const max = Math.max(...bottlenecks.map(b => b.n));
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-2xl border bg-card p-5 shadow-card lg:col-span-2">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold"><ShieldCheck className="size-5 text-success" />{t.verifyQueue}</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {candidates.map(c => {
            const ok = approved.includes(c.id);
            return (
              <div key={c.id} className={`rounded-xl border p-4 transition ${ok ? "border-success bg-success-soft" : ""}`}>
                <h3 className="font-sans font-bold">{l(c.name)}</h3>
                <p className="text-sm text-muted-foreground">GPA {c.gpa} · {c.subject}</p>
                <p className="text-sm">{t.grade}: <b>{c.grade}</b></p>
                <button disabled={ok} onClick={() => setApproved(a => [...a, c.id])}
                  className={`mt-3 w-full rounded-lg py-2 text-sm font-bold ${ok ? "bg-success text-primary-foreground" : "bg-primary text-primary-foreground hover:opacity-90"}`}>
                  {ok ? `✓ ${t.approved}` : t.approve}
                </button>
              </div>
            );
          })}
        </div>
      </section>
      <section className="rounded-2xl border bg-card p-5 shadow-card">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold"><CalendarClock className="size-5 text-primary" />{t.officeHours}</h2>
        <ul className="space-y-2">
          {slots.map(s => (
            <li key={s.id} className="flex items-center justify-between rounded-xl bg-muted p-3">
              <div>
                <p className="font-semibold">{s.time}</p>
                <button onClick={() => setSlots(x => x.map(y => y.id === s.id ? { ...y, online: !y.online } : y))} className="text-xs font-semibold text-primary underline-offset-2 hover:underline">
                  {s.online ? t.fmtOnline : `🏫 ${t.room}`}
                </button>
              </div>
              <button aria-label="toggle" onClick={() => setSlots(x => x.map(y => y.id === s.id ? { ...y, on: !y.on } : y))}
                className={`relative h-6 w-11 rounded-full transition ${s.on ? "bg-success" : "bg-border"}`}>
                <span className={`absolute top-0.5 size-5 rounded-full bg-card transition-all ${s.on ? "left-[22px]" : "left-0.5"}`} />
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section className="rounded-2xl border bg-card p-5 shadow-card">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold"><BarChart3 className="size-5 text-warning" />{t.bottleneck}</h2>
        <ul className="space-y-3">
          {bottlenecks.map(b => (
            <li key={b.n}>
              <div className="mb-1 flex justify-between text-sm"><span className="font-semibold">{l(b.topic)}</span><span className="text-muted-foreground">{b.n} {t.requests}</span></div>
              <div className="h-2.5 rounded-full bg-muted"><div className="h-full rounded-full bg-gradient-sos" style={{ width: `${(b.n / max) * 100}%` }} /></div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
