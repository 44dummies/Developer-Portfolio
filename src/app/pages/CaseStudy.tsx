import { Link, useParams } from "react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Globe, Lock } from "lucide-react";
import { SectionNumber, Eyebrow, Reveal } from "../components/primitives";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { projects, SIGNAL } from "../data";
import { NotFound } from "./NotFound";

// True if the demo field is a real external URL rather than a status marker.
function isExternalUrl(demo: string): boolean {
  return Boolean(demo) && demo !== "private" && demo !== "local-only";
}

export function CaseStudy() {
  const { slug } = useParams();
  const idx = projects.findIndex((p) => p.slug === slug);
  const p = projects[idx];
  if (!p) return <NotFound />;
  const next = projects[(idx + 1) % projects.length];

  const meta = [
    { label: "Role", value: p.role },
    { label: "Timeline", value: p.duration },
    { label: "Year", value: p.year },
    { label: "Category", value: p.category },
    { label: "Status", value: p.status },
  ];

  const demoLabel =
    p.demo === "local-only"
      ? "Local-only"
      : p.demo === "private"
        ? "Private"
        : "Live demo";

  return (
    <main className="pt-[68px]">
      {/* Hero */}
      <section className="relative">
        <div className="relative mx-auto max-w-[1200px] px-5 pt-14 sm:px-8 sm:pt-20">
          <Link to="/projects" className="inline-flex items-center gap-2 text-[13px] text-[#9a9aa2] hover:text-white">
            <ArrowLeft size={14} /> All projects
          </Link>

          <div className="mt-12 max-w-3xl">
            <div className="flex items-center gap-2.5">
              <span className="size-2 rounded-full" style={{ background: p.color }} aria-hidden />
              <Eyebrow>{p.index} · {p.kind} · {p.year}</Eyebrow>
            </div>
            <h1 className="mt-5 font-[Newsreader] text-[clamp(2.75rem,8vw,6rem)] font-medium leading-[0.95] tracking-[-0.045em] text-[#f4f3f1]">
              {p.title}
            </h1>
            <p className="mt-6 max-w-2xl text-[16px] leading-7 text-[#adadb5]">{p.blurb}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`https://${p.repo}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-white/15 px-4 py-2 text-[13px] text-white hover:border-white/35"
              >
                <Github size={14} aria-hidden /> Repository
              </a>

              {isExternalUrl(p.demo) ? (
                <a
                  href={`https://${p.demo}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-[13px] font-semibold text-[#0a0a0b] hover:bg-white/85"
                >
                  <Globe size={14} aria-hidden /> {demoLabel}
                </a>
              ) : (
                <span
                  className="inline-flex items-center gap-2 rounded-md border border-white/10 px-4 py-2 text-[13px] text-[#8a8a92]"
                  title={p.demo === "private" ? "This project is not publicly accessible" : "This project runs locally only"}
                >
                  <Lock size={14} aria-hidden /> {demoLabel}
                </span>
              )}
            </div>
          </div>

          <div className="relative mt-14 aspect-[21/9] overflow-hidden rounded-2xl border border-white/10">
            <ImageWithFallback
              src={p.image}
              alt={`${p.title} — ${p.kind}`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0e]/70 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Meta bar */}
      <section className="mx-auto mt-12 max-w-[1200px] px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[16px] border border-white/10 bg-white/8 sm:grid-cols-3 lg:grid-cols-5">
          {meta.map((m) => (
            <div key={m.label} className="bg-[#08080c] p-5">
              <div className="font-[DM_Mono] text-[10px] uppercase tracking-[0.18em] text-[#7c7c86]">{m.label}</div>
              <div className="mt-2 text-[14px] leading-5 text-[#e6e5e3]">{m.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Overview */}
      <section className="mx-auto max-w-[1200px] px-5 pt-24 sm:px-8 sm:pt-32">
        <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
          <SectionNumber n="01" label="Overview" />
          <Reveal>
            <p className="max-w-3xl font-[Newsreader] text-[clamp(1.4rem,2.6vw,2.1rem)] leading-[1.32] tracking-[-0.02em] text-[#e9e8e6]">
              {p.overview}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Metrics band */}
      <section className="mx-auto mt-20 max-w-[1200px] px-5 sm:mt-24 sm:px-8">
        <div className="grid gap-px overflow-hidden rounded-[18px] border border-white/10 bg-white/8 sm:grid-cols-4">
          {p.metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.08}>
              <div className="bg-[#07070e]/70 p-7 backdrop-blur-md">
                <div className="font-[Newsreader] text-5xl tracking-[-0.04em]" style={{ color: "#f2f1ef" }}>{m.value}</div>
                <div className="mt-2 text-[12px] text-[#8a8a92]">{m.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Problem / Approach */}
      <section className="mx-auto max-w-[1200px] px-5 py-28 sm:px-8 sm:py-36">
        <div className="grid gap-16 lg:grid-cols-2">
          <Reveal>
            <SectionNumber n="02" label="The problem" />
            <p className="mt-8 font-[Newsreader] text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.25] tracking-[-0.02em] text-[#e9e8e6]">
              {p.problem}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionNumber n="03" label="The approach" />
            <p className="mt-8 font-[Newsreader] text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.25] tracking-[-0.02em] text-[#e9e8e6]">
              {p.approach}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Key decisions during the build */}
      <section className="mx-auto max-w-[1200px] px-5 pb-28 sm:px-8 sm:pb-36">
        <SectionNumber n="04" label="Inside the build" />
        <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {p.build.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.06}>
              <div className="flex gap-5">
                <span className="font-[DM_Mono] text-[12px] leading-8" style={{ color: SIGNAL }}>{String(i + 1).padStart(2, "0")}</span>
                <div className="border-t border-white/12 pt-4">
                  <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-[#f0efed]">{b.title}</h3>
                  <p className="mt-2.5 max-w-md text-[14px] leading-7 text-[#a4a4ac]">{b.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Architecture diagram */}
      <section className="border-y border-white/8 bg-[#07070e]/60 backdrop-blur-md">
        <div className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8 sm:py-32">
          <SectionNumber n="05" label="Architecture" />
          <div className="mt-12 grid gap-4 lg:grid-cols-4">
            {p.architecture.map((a, i) => (
              <Reveal key={a.node} delay={i * 0.1}>
                <div className="group relative flex h-full flex-col rounded-[16px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
                  <span className="font-[DM_Mono] text-[11px]" style={{ color: SIGNAL }}>0{i + 1}</span>
                  <h3 className="mt-4 text-[15px] font-semibold text-[#f0efed]">{a.node}</h3>
                  <p className="mt-2 text-[13px] leading-6 text-[#9a9aa2]">{a.detail}</p>
                  {i < p.architecture.length - 1 && (
                    <ArrowRight size={16} className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-[#4a4a52] lg:block" aria-hidden />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span key={s} className="rounded-full border border-white/12 px-3 py-1.5 font-[DM_Mono] text-[11px] text-[#c4c4cc]">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Outcome */}
      <section className="mx-auto max-w-[1200px] px-5 py-28 sm:px-8 sm:py-36">
        <SectionNumber n="06" label="Outcome" />
        <Reveal>
          <p className="mt-10 max-w-4xl font-[Newsreader] text-[clamp(1.7rem,3.4vw,3rem)] leading-[1.18] tracking-[-0.03em] text-[#f2f1ef]">
            {p.outcome}
          </p>
        </Reveal>
      </section>

      {/* Lessons */}
      <section className="mx-auto max-w-[1200px] px-5 pb-28 sm:px-8 sm:pb-36">
        <SectionNumber n="07" label="Lessons learned" />
        <div className="mt-12 divide-y divide-white/8 border-y border-white/8">
          {p.lessons.map((l, i) => (
            <Reveal key={i}>
              <div className="flex items-start gap-6 py-8">
                <span className="font-[Newsreader] text-3xl tracking-[-0.03em]" style={{ color: SIGNAL }}>0{i + 1}</span>
                <p className="max-w-3xl text-[clamp(1.1rem,2vw,1.6rem)] leading-[1.35] tracking-[-0.01em] text-[#dcdce0]">{l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Next project */}
      <section className="border-t border-white/8">
        <Link to={`/projects/${next.slug}`} className="group relative block overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-40" style={{ background: `radial-gradient(600px circle at 80% 50%, ${next.color}, transparent 60%)` }} aria-hidden />
          <div className="relative mx-auto flex max-w-[1200px] items-center justify-between px-5 py-20 sm:px-8 sm:py-28">
            <div>
              <Eyebrow>Next project</Eyebrow>
              <div className="mt-4 font-[Newsreader] text-6xl tracking-[-0.045em] text-[#f2f1ef] transition group-hover:translate-x-2 sm:text-8xl">{next.title}</div>
            </div>
            <ArrowUpRight size={48} className="shrink-0 text-[#5a5a62] transition group-hover:text-white" aria-hidden />
          </div>
        </Link>
      </section>
    </main>
  );
}
