import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Siren } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import type { SosTask } from "@/lib/oqu-data";
import { LangCtx, useT } from "@/components/oqu/context";
import { Header, type Role } from "@/components/oqu/Header";
import { StudentView } from "@/components/oqu/StudentView";
import { MentorView } from "@/components/oqu/MentorView";
import { TeacherView } from "@/components/oqu/TeacherView";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Oqu-Tutor — микро-менторство для студентов Казахстана" },
      { name: "description", content: "Academic Tinder: находи проверенных менторов-старшекурсников, бронируй 25-минутные спринты онлайн или в кампусе." },
      { property: "og:title", content: "Oqu-Tutor — микро-менторство для студентов" },
      { property: "og:description", content: "Peer-to-peer менторство и консультации в кампусах Казахстана на ҚАЗ, РУС и ENG." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [lang, setLang] = useState<Lang>("ru");
  const [role, setRole] = useState<Role>("student");
  const [kzt, setKzt] = useState(2500);
  const [coins, setCoins] = useState(120);
  const [sosOpen, setSosOpen] = useState(false);
  const [extra, setExtra] = useState<SosTask[]>([]);
  return (
    <LangCtx.Provider value={lang}>
      <div className="min-h-screen">
        <Header role={role} setRole={setRole} lang={lang} setLang={setLang} kzt={kzt} coins={coins} onSos={() => setSosOpen(true)} />
        <main className="mx-auto max-w-6xl px-4 py-8">
          {role === "student" && <StudentView onPay={(k, c) => { setKzt(v => Math.max(0, v - k)); setCoins(v => Math.max(0, v - c)); }} />}
          {role === "mentor" && <MentorView extra={extra} />}
          {role === "teacher" && <TeacherView />}
        </main>
        {sosOpen && <SosModal onClose={() => setSosOpen(false)} onSend={text => {
          const l3 = { kz: text, ru: text, en: text };
          setExtra(x => [{ id: Date.now(), title: l3, desc: l3, budget: "1 000 ₸", mins: 0 }, ...x]);
          setSosOpen(false); setRole("mentor");
        }} />}
      </div>
    </LangCtx.Provider>
  );
}

function SosModal({ onClose, onSend }: { onClose: () => void; onSend: (s: string) => void }) {
  const { t } = useT();
  const [text, setText] = useState("");
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/50 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md animate-pop rounded-3xl bg-card p-6 shadow-card" onClick={e => e.stopPropagation()}>
        <div className="mb-3 inline-grid size-11 place-items-center rounded-xl bg-gradient-sos text-primary-foreground"><Siren className="size-6" /></div>
        <h2 className="text-xl font-bold">{t.sosTitle}</h2>
        <p className="text-sm text-muted-foreground">{t.sosDesc}</p>
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder={t.sosPh} className="mt-4 h-28 w-full resize-none rounded-xl border p-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
        <div className="mt-4 flex gap-2">
          <button onClick={onClose} className="flex-1 rounded-xl border py-2.5 font-semibold">{t.cancel}</button>
          <button disabled={!text.trim()} onClick={() => onSend(text.trim())} className="flex-[2] rounded-xl bg-gradient-sos py-2.5 font-bold text-primary-foreground disabled:opacity-50">{t.send}</button>
        </div>
      </div>
    </div>
  );
}
