import { useEffect, useMemo, useState } from "react";
import { X, Zap, MapPin, Timer, QrCode, RotateCcw } from "lucide-react";
import { mentors, type Mentor, type Subject } from "@/lib/oqu-data";
import { useT } from "./context";

type Fmt = "all" | "online" | "offline";

export function StudentView({ onPay }: { onPay: (kzt: number, coins: number) => void }) {
  const { t, l } = useT();
  const [subject, setSubject] = useState<Subject | "all">("all");
  const [fmt, setFmt] = useState<Fmt>("all");
  const [idx, setIdx] = useState(0);
  const [anim, setAnim] = useState<"" | "left" | "right">("");
  const [match, setMatch] = useState<Mentor | null>(null);
  const [room, setRoom] = useState<{ m: Mentor; offline: boolean } | null>(null);

  const list = useMemo(() => mentors.filter(m => (subject === "all" || m.subject === subject) && (fmt === "all" || (fmt === "online") === m.online)), [subject, fmt]);
  useEffect(() => setIdx(0), [subject, fmt]);
  const current = list[idx];

  const swipe = (dir: "left" | "right") => {
    if (!current || anim) return;
    setAnim(dir);
    setTimeout(() => { if (dir === "right") setMatch(current); setAnim(""); setIdx(i => i + 1); }, 450);
  };

  const subjects: [Subject | "all", string][] = [["all", t.subjAll], ["math", t.subjMath], ["phys", t.subjPhys], ["code", t.subjCode], ["web", t.subjWeb]];
  const fmts: [Fmt, string][] = [["all", t.fmtAll], ["online", t.fmtOnline], ["offline", t.fmtOffline]];

  if (room) return <StudyRoom m={room.m} offline={room.offline} onEnd={() => setRoom(null)} />;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
      <div className="space-y-6">
        <div>
          <span className="inline-block rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">{t.findHelp}</span>
          <h1 className="mt-3 text-3xl font-bold md:text-4xl">{t.heroStudent}</h1>
          <p className="mt-2 max-w-lg text-muted-foreground">{t.heroStudentSub}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {subjects.map(([s, label]) => (
            <button key={s} onClick={() => setSubject(s)} className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${subject === s ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary"}`}>{label}</button>
          ))}
        </div>
        <div className="inline-flex rounded-xl bg-muted p-1">
          {fmts.map(([f, label]) => (
            <button key={f} onClick={() => setFmt(f)} className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${fmt === f ? "bg-card text-foreground shadow-card" : "text-muted-foreground"}`}>{label}</button>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="relative h-[480px]">
          {current ? (
            <>
              {list[idx + 1] && <div className="absolute inset-0 translate-y-3 scale-95 rounded-3xl border bg-card opacity-60" />}
              <MentorCard key={current.id} m={current} className={anim === "left" ? "animate-swipe-left" : anim === "right" ? "animate-swipe-right" : ""} />
            </>
          ) : (
            <div className="grid h-full place-items-center rounded-3xl border border-dashed bg-card text-center">
              <div>
                <p className="font-semibold text-muted-foreground">{t.deckEmpty}</p>
                <button onClick={() => setIdx(0)} className="mt-3 inline-flex items-center gap-1 rounded-lg bg-primary-soft px-3 py-1.5 text-sm font-semibold text-primary"><RotateCcw className="size-4" />{t.deckReset}</button>
              </div>
            </div>
          )}
        </div>
        <div className="mt-5 flex justify-center gap-4">
          <button onClick={() => swipe("left")} disabled={!current} className="flex items-center gap-2 rounded-2xl border bg-card px-6 py-3 font-bold text-destructive shadow-card transition hover:scale-105 disabled:opacity-40"><X className="size-5" />{t.skip}</button>
          <button onClick={() => swipe("right")} disabled={!current} className="flex items-center gap-2 rounded-2xl bg-gradient-primary px-6 py-3 font-bold text-primary-foreground shadow-glow transition hover:scale-105 disabled:opacity-40"><Zap className="size-5" />{t.book}</button>
        </div>
      </div>

      {match && <MatchModal m={match} onClose={() => setMatch(null)} onStart={(offline, coins) => {
        onPay(coins ? 0 : match.price.kzt ?? 1000, coins ? match.price.coins ?? 50 : 0);
        setRoom({ m: match, offline }); setMatch(null);
      }} />}
    </div>
  );
}

function Price({ m }: { m: Mentor }) {
  const { t } = useT();
  return <span>{m.price.kzt ? `${m.price.kzt.toLocaleString("ru-RU")} ₸` : `${m.price.coins} ${t.coins}`} / {t.min25}</span>;
}

function MentorCard({ m, className }: { m: Mentor; className: string }) {
  const { t, l } = useT();
  return (
    <div className={`absolute inset-0 flex flex-col overflow-hidden rounded-3xl border bg-card shadow-card ${className}`}>
      <div className="relative grid h-40 place-items-center bg-gradient-primary text-7xl">
        {m.emoji}
        <span className={`absolute left-4 top-4 rounded-full px-2.5 py-1 text-xs font-bold ${m.online ? "bg-success text-primary-foreground" : "bg-card text-foreground"}`}>
          {m.online ? `● ${t.onlineNow}` : `🏫 ${t.offlineCampus}`}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-card/90 px-2.5 py-1 text-xs font-bold">{m.uni}</span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-xl font-bold">{l(m.name)}, {m.year} {t.course}, GPA {m.gpa}</h3>
          <span className="mt-1 inline-block rounded-full bg-success-soft px-2.5 py-0.5 text-xs font-bold text-success-foreground">{t.verified}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">{m.skills.map(s => <span key={s} className="rounded-md bg-muted px-2 py-0.5 text-xs font-semibold">{s}</span>)}</div>
        <p className="italic text-muted-foreground">“{l(m.quote)}”</p>
        <div className="mt-auto flex items-center justify-between text-sm">
          <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="size-4" />{m.online ? "💻" : "🏫"} {l(m.location)}</span>
          <span className="rounded-lg bg-warning-soft px-2 py-1 font-bold text-warning-foreground"><Price m={m} /></span>
        </div>
      </div>
    </div>
  );
}

function MatchModal({ m, onClose, onStart }: { m: Mentor; onClose: () => void; onStart: (offline: boolean, coins: boolean) => void }) {
  const { t, l } = useT();
  const [offline, setOffline] = useState(!m.online);
  const [coins, setCoins] = useState(!m.price.kzt);
  const opt = (on: boolean) => `rounded-xl border-2 p-3 text-left text-sm font-semibold transition ${on ? "border-primary bg-primary-soft text-primary" : "hover:border-primary/40"}`;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/50 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md animate-pop rounded-3xl bg-card p-6 shadow-card" onClick={e => e.stopPropagation()}>
        <div className="text-center">
          <div className="text-5xl">{m.emoji}⚡</div>
          <h2 className="mt-2 bg-gradient-primary bg-clip-text text-3xl font-bold text-transparent">{t.match}</h2>
          <p className="text-sm text-muted-foreground">{l(m.name)} · {t.matchSub}</p>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <button className={opt(!offline)} onClick={() => setOffline(false)}>💻 {t.formatOnlineSprint}</button>
          <button className={opt(offline)} onClick={() => setOffline(true)}>🏫 {t.formatOfflineZone}<div className="text-xs font-normal opacity-70">{t.library}</div></button>
        </div>
        <p className="mt-4 text-xs font-bold uppercase text-muted-foreground">{t.payment}</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button className={opt(!coins)} onClick={() => setCoins(false)}>₸ {t.payKzt}<div className="text-xs font-normal">{(m.price.kzt ?? 1000).toLocaleString("ru-RU")} ₸</div></button>
          <button className={opt(coins)} onClick={() => setCoins(true)}>🪙 {t.payCoins}<div className="text-xs font-normal">{m.price.coins ?? 50}</div></button>
        </div>
        <div className="mt-6 flex gap-2">
          <button onClick={onClose} className="flex-1 rounded-xl border py-3 font-semibold">{t.cancel}</button>
          <button onClick={() => onStart(offline, coins)} className="flex-[2] rounded-xl bg-gradient-primary py-3 font-bold text-primary-foreground shadow-glow">{t.startRoom}</button>
        </div>
      </div>
    </div>
  );
}

function StudyRoom({ m, offline, onEnd }: { m: Mentor; offline: boolean; onEnd: () => void }) {
  const { t, l } = useT();
  const [sec, setSec] = useState(25 * 60);
  useEffect(() => { const id = setInterval(() => setSec(s => Math.max(0, s - 1)), 1000); return () => clearInterval(id); }, []);
  const mm = String(Math.floor(sec / 60)).padStart(2, "0"), ss = String(sec % 60).padStart(2, "0");
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="rounded-3xl border bg-card p-5 shadow-card">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold">{t.liveRoom} · {l(m.name)}</h2>
          <span className="flex items-center gap-1 rounded-full bg-success-soft px-3 py-1 text-xs font-bold text-success-foreground">● LIVE</span>
        </div>
        <p className="mb-2 text-sm font-semibold text-muted-foreground">{t.scratchpad}</p>
        <textarea className="h-80 w-full resize-none rounded-xl border bg-foreground p-4 font-mono text-sm text-success outline-none focus:ring-2 focus:ring-ring" placeholder={t.scratchPh} defaultValue={"int* p = &x;\n// "} />
      </div>
      <div className="space-y-4">
        <div className="rounded-3xl bg-gradient-primary p-6 text-center text-primary-foreground shadow-glow">
          <Timer className="mx-auto size-6" />
          <div className="mt-2 font-display text-5xl font-bold tabular-nums">{mm}:{ss}</div>
        </div>
        {offline && (
          <div className="rounded-3xl border bg-card p-5 text-center shadow-card">
            <p className="font-bold">{t.qrTitle}</p>
            <div className="mx-auto my-3 grid size-36 grid-cols-8 gap-0.5 rounded-lg border p-2">
              {Array.from({ length: 64 }, (_, i) => <div key={i} className={(i * 7 + m.id * 3) % 5 < 2 || [0, 1, 8, 9, 6, 7, 14, 15, 48, 49, 56, 57].includes(i) ? "bg-foreground" : ""} />)}
            </div>
            <p className="flex items-center justify-center gap-1 text-xs text-muted-foreground"><QrCode className="size-3" />{t.qrSub}</p>
            <p className="mt-1 text-xs font-semibold">{l(m.location)}</p>
          </div>
        )}
        <button onClick={onEnd} className="w-full rounded-xl border bg-card py-3 font-semibold text-destructive">{t.endSession}</button>
      </div>
    </div>
  );
}
