import { useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Tag,
  User,
  Wrench,
  CircleDot,
  Search,
  Map,
  LayoutList,
  MonitorSmartphone,
  MessageSquare,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  GraduationCap,
  ImageIcon,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ProjectData {
  number: string;
  accent: "sky" | "cyan" | "blue";
  header: {
    title: string;
    description: string;
    role: string;
    timeline: string;
    tools: string[];
    status: "Completed" | "In Progress" | "Concept";
  };
  background: string;
  myRole: string[];
  deliverables: string[];
  challenges: string;
  solution: string;
  impact: string[];
  learned: string[];
  screenshots: { label: string; aspect: string }[];
}

// ─── Shared helpers ───────────────────────────────────────────────────────────

const accentText: Record<string, string> = {
  sky: "text-sky-400",
  cyan: "text-cyan-400",
  blue: "text-blue-400",
};
const accentBg: Record<string, string> = {
  sky: "bg-sky-500/10 border-sky-500/20",
  cyan: "bg-cyan-500/10 border-cyan-500/20",
  blue: "bg-blue-500/10 border-blue-500/20",
};
const accentBorder: Record<string, string> = {
  sky: "border-sky-500/30",
  cyan: "border-cyan-500/30",
  blue: "border-blue-500/30",
};
const accentTag: Record<string, string> = {
  sky: "bg-sky-500/10 text-sky-300 border-sky-500/20",
  cyan: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
  blue: "bg-blue-500/10 text-blue-300 border-blue-500/20",
};
const statusColor: Record<string, string> = {
  Completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "In Progress": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Concept: "bg-violet-500/10 text-violet-400 border-violet-500/20",
};

const PROCESS_STEPS = [
  { icon: Search, label: "Riset", sub: "Penemuan pengguna & pasar" },
  { icon: Map, label: "Pemetaan\nKebutuhan", sub: "Definisi kebutuhan & ruang lingkup" },
  { icon: LayoutList, label: "Perencanaan\nProduk", sub: "Desain alur & fitur" },
  { icon: MonitorSmartphone, label: "Dukungan\nPengembangan", sub: "Bangun & implementasikan" },
  { icon: MessageSquare, label: "Umpan Balik", sub: "Kumpulkan masukan pengguna" },
  { icon: RefreshCw, label: "Perbaikan", sub: "Iterasi & penyempurnaan" },
];

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({
  label,
  title,
  children,
  accent = "sky",
  alt = false,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
  accent?: string;
  alt?: boolean;
}) {
  return (
    <section className={`py-16 lg:py-20 ${alt ? "bg-[#0d1b36]" : ""}`}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <p
            className={`text-xs font-semibold tracking-[0.2em] uppercase mb-2 ${accentText[accent]}`}
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            {label}
          </p>
          <h2
            className="text-2xl md:text-3xl font-bold text-white"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            {title}
          </h2>
          <div className="mt-4 w-10 h-0.5 bg-sky-400/40" />
        </div>
        {children}
      </div>
    </section>
  );
}

// ─── Lightbox ────────────────────────────────────────────────────────────────

function Lightbox({
  screenshots,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  screenshots: { label: string }[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl mx-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-slate-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="aspect-video bg-[#0b1527] flex flex-col items-center justify-center gap-3">
            <ImageIcon size={48} className="text-slate-700" />
            <p className="text-slate-500 text-sm">
              {screenshots[index].label}
            </p>
          </div>
          <div className="px-6 py-4 flex items-center justify-between border-t border-border">
            <button
              onClick={onPrev}
              className="p-2 rounded hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-xs text-slate-500 font-mono">
              {index + 1} / {screenshots.length}
            </span>
            <button
              onClick={onNext}
              className="p-2 rounded hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ProjectDetail({
  project,
  onBack,
}: {
  project: ProjectData;
  onBack: () => void;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { header, accent } = project;

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevSlide = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + project.screenshots.length) % project.screenshots.length
    );
  const nextSlide = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % project.screenshots.length
    );

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,189,248,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Sticky top bar */}
      <div className="sticky top-0 z-40 bg-[#0b1527]/95 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 h-14 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-sky-400 font-medium transition-colors"
          >
            <ArrowLeft size={16} /> Kembali ke Portofolio
          </button>
          <span
            className="text-xs font-semibold tracking-widest text-sky-400 uppercase hidden sm:block"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Studi Kasus
          </span>
        </div>
      </div>

      {/* ── 1. PROJECT HEADER ─────────────────────────────────────────── */}
      <header className="pt-16 pb-14 lg:pt-20 lg:pb-18 border-b border-border">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Project number badge */}
          <div className="flex items-center gap-3 mb-6">
            <span
              className={`text-xs font-mono px-3 py-1 rounded-full border ${accentBg[accent]} ${accentText[accent]}`}
            >
              Proyek {project.number}
            </span>
            <span
              className={`text-xs font-medium px-3 py-1 rounded-full border ${statusColor[header.status]}`}
            >
              {header.status}
            </span>
          </div>

          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            {header.title}
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mb-10">
            {header.description}
          </p>

          {/* Metadata grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden border border-border">
            {[
              { icon: User, label: "Peran", value: header.role },
              { icon: CalendarDays, label: "Periode", value: header.timeline },
              {
                icon: CircleDot,
                label: "Status",
                value: header.status,
              },
              { icon: Wrench, label: "Alat Bantu", value: null },
            ].map((meta) => {
              const Icon = meta.icon;
              return (
                <div key={meta.label} className="bg-card p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={13} className="text-slate-500" />
                    <span className="text-xs text-slate-500 uppercase tracking-widest font-medium">
                      {meta.label}
                    </span>
                  </div>
                  {meta.value ? (
                    <p className="text-sm text-slate-200 font-medium leading-snug">
                      {meta.value}
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {header.tools.map((t) => (
                        <span
                          key={t}
                          className={`text-xs px-2 py-0.5 rounded border ${accentTag[accent]}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </header>

      {/* ── 2. BACKGROUND PROBLEM ─────────────────────────────────────── */}
      <Section label="Konteks" title="Latar Belakang Masalah" accent={accent} alt>
        <div className={`p-6 rounded-xl border-l-2 ${accentBorder[accent]} bg-card`}>
          <p className="text-slate-300 leading-relaxed">{project.background}</p>
        </div>
      </Section>

      {/* ── 3. MY ROLE ────────────────────────────────────────────────── */}
      <Section label="Kontribusi" title="Peran Saya" accent={accent}>
        <ul className="space-y-3">
          {project.myRole.map((item, i) => (
            <li key={i} className="flex items-start gap-4">
              <div
                className={`mt-0.5 shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${accentBg[accent]} ${accentText[accent]} border`}
              >
                {i + 1}
              </div>
              <p className="text-slate-300 leading-relaxed pt-0.5">{item}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── 4. PROCESS ────────────────────────────────────────────────── */}
      <Section label="Metodologi" title="Proses" accent={accent} alt>
        {/* Desktop: horizontal stepper */}
        <div className="hidden md:block">
          <div className="relative">
            {/* connector line */}
            <div className="absolute top-7 left-7 right-7 h-px bg-border" />
            <div className="grid grid-cols-6 gap-2 relative">
              {PROCESS_STEPS.map((step, i) => {
                const Icon = step.icon;
                const isLast = i === PROCESS_STEPS.length - 1;
                return (
                  <div key={i} className="flex flex-col items-center text-center">
                    <div
                      className={`w-14 h-14 rounded-full border-2 flex items-center justify-center mb-3 relative z-10 transition-colors ${
                        accentBg[accent]
                      } ${accentBorder[accent]} ${accentText[accent]}`}
                    >
                      <Icon size={18} />
                    </div>
                    <p
                      className="text-xs font-bold text-white leading-tight mb-1 whitespace-pre-line"
                      style={{ fontFamily: "'Raleway', sans-serif" }}
                    >
                      {step.label}
                    </p>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      {step.sub}
                    </p>
                    {!isLast && (
                      <span className="sr-only">→</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile: vertical list */}
        <div className="md:hidden space-y-0">
          {PROCESS_STEPS.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === PROCESS_STEPS.length - 1;
            return (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 ${accentBg[accent]} ${accentBorder[accent]} ${accentText[accent]}`}
                  >
                    <Icon size={16} />
                  </div>
                  {!isLast && (
                    <div className="w-px flex-1 bg-border my-1" />
                  )}
                </div>
                <div className={`pb-6 pt-1.5 ${isLast ? "" : ""}`}>
                  <p
                    className="text-sm font-bold text-white"
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                  >
                    {step.label.replace("\n", " ")}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{step.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ── 5. KEY DELIVERABLES ───────────────────────────────────────── */}
      <Section label="Hasil" title="Hasil Utama" accent={accent}>
        <div className="grid sm:grid-cols-2 gap-3">
          {project.deliverables.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card hover:border-sky-500/20 transition-colors"
            >
              <CheckCircle2
                size={16}
                className={`shrink-0 mt-0.5 ${accentText[accent]}`}
              />
              <p className="text-sm text-slate-300 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 6. CHALLENGES ─────────────────────────────────────────────── */}
      <Section label="Hambatan" title="Tantangan" accent={accent} alt>
        <div className="flex items-start gap-4 p-6 rounded-xl border border-amber-500/20 bg-amber-500/5">
          <AlertTriangle
            size={20}
            className="text-amber-400 shrink-0 mt-0.5"
          />
          <p className="text-slate-300 leading-relaxed">{project.challenges}</p>
        </div>
      </Section>

      {/* ── 7. SOLUTION ───────────────────────────────────────────────── */}
      <Section label="Pendekatan" title="Solusi" accent={accent}>
        <div className="flex items-start gap-4 p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
          <Lightbulb
            size={20}
            className="text-emerald-400 shrink-0 mt-0.5"
          />
          <p className="text-slate-300 leading-relaxed">{project.solution}</p>
        </div>
      </Section>

      {/* ── 8. IMPACT / RESULT ────────────────────────────────────────── */}
      <Section label="Hasil Akhir" title="Dampak & Hasil" accent={accent} alt>
        <div className="space-y-3">
          {project.impact.map((item, i) => (
            <div
              key={i}
              className={`flex items-start gap-4 p-5 rounded-xl border ${accentBorder[accent]} bg-card`}
            >
              <TrendingUp
                size={16}
                className={`shrink-0 mt-0.5 ${accentText[accent]}`}
              />
              <p className="text-slate-300 leading-relaxed text-sm">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 9. WHAT I LEARNED ─────────────────────────────────────────── */}
      <Section label="Refleksi" title="Pelajaran yang Dipetik" accent={accent}>
        <div className="grid sm:grid-cols-2 gap-4">
          {project.learned.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div
                className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${accentBg[accent]} border`}
              >
                <GraduationCap size={14} className={accentText[accent]} />
              </div>
              <p className="text-slate-400 text-sm leading-relaxed pt-1">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 10. SCREENSHOTS / GALLERY ─────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-[#0d1b36]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <p
              className={`text-xs font-semibold tracking-[0.2em] uppercase mb-2 ${accentText[accent]}`}
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              Tampilan Visual
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold text-white"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              Tangkapan Layar & Galeri
            </h2>
            <div className="mt-4 w-10 h-0.5 bg-sky-400/40" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.screenshots.map((shot, i) => (
              <button
                key={i}
                onClick={() => openLightbox(i)}
                className={`group relative rounded-xl overflow-hidden border ${accentBorder[accent]} bg-card hover:border-opacity-60 transition-all duration-200 text-left`}
              >
                <div
                  className={`${shot.aspect} bg-[#0b1527] flex flex-col items-center justify-center gap-2`}
                >
                  <ImageIcon
                    size={32}
                    className="text-slate-700 group-hover:text-slate-600 transition-colors"
                  />
                  <span className="text-[10px] text-slate-600 font-mono tracking-widest">
                    SCREENSHOT
                  </span>
                </div>
                <div className="px-4 py-3 border-t border-border">
                  <p className="text-xs text-slate-400 font-medium">
                    {shot.label}
                  </p>
                </div>
                {/* hover overlay */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${accentBg[accent]} border rounded-xl`}
                  style={{ background: "transparent" }}
                >
                  <div className="absolute top-3 right-3 bg-sky-400/20 rounded-full p-1">
                    <Tag size={12} className="text-sky-400" />
                  </div>
                </div>
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-600 mt-4 text-center">
            Klik thumbnail untuk pratinjau • Tangkapan layar asli akan menggantikan placeholder
          </p>
        </div>
      </section>

      {/* ── FOOTER CTA ────────────────────────────────────────────────── */}
      <div className="py-12 border-t border-border">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm text-slate-500">Tertarik dengan karya ini?</p>
            <p className="text-white font-semibold mt-0.5">
              Mari diskusikan apa yang bisa kita bangun bersama.
            </p>
          </div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-400 text-[#0b1527] font-semibold text-sm rounded transition-colors whitespace-nowrap"
          >
            <ArrowLeft size={16} /> Kembali ke Portofolio
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          screenshots={project.screenshots}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevSlide}
          onNext={nextSlide}
        />
      )}
    </div>
  );
}
