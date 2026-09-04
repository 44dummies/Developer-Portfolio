import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Terminal, Shield, Cpu, Boxes } from "lucide-react";
import { Eyebrow, SectionNumber, Reveal } from "../components/primitives";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { timeline, PERSON, SIGNAL } from "../data";

const values = [
  { icon: Shield, title: "Correct or silent", body: "A system that guesses is worse than one that abstains. I design for honest failure." },
  { icon: Cpu, title: "Understand the machine", body: "From the kernel to the cache line. You can't optimize what you treat as magic." },
  { icon: Boxes, title: "Ship the whole thing", body: "Idea to infra to interface. The interesting problems live in the seams." },
  { icon: Terminal, title: "Own your stack", body: "Local-first, self-hosted where it counts. Dependence is a design smell." },
];

export function About() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start center", "end center"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <main className="pt-[68px]">
      {/* Intro */}
      <section className="mx-auto max-w-[1200px] px-5 pt-20 sm:px-8 sm:pt-28">
        <SectionNumber n="01" label="Identity" />
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <Reveal>
            <h1 className="max-w-4xl font-[Newsreader] text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.05em] text-[#f4f3f1]">
              An engineer who&apos;d rather understand the whole machine than any single layer of it.
            </h1>
          </Reveal>
          <Reveal delay={0.15} className="lg:pb-1">
            <p className="max-w-md text-[15px] leading-7 text-[#a4a4ac]">
              I&apos;m {PERSON.short}, based in {PERSON.location}. I came up through broken systems —
              modding games, wiping laptops, breaking things at CTFs — and never lost the instinct
              to take the cover off and see how it really works.
            </p>
            <figure className="group relative mt-9 aspect-[4/5] max-h-[580px] overflow-hidden bg-[#15161b]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1765539160785-e7953620488f?w=1000&h=1250&fit=crop&auto=format"
                alt="Developer working at a computer in a low-lit studio"
                className="h-full w-full object-cover object-center opacity-85 saturate-[0.68] transition duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06070d]/60 via-transparent to-[#06070d]/10" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                <Eyebrow className="text-white/60">In practice</Eyebrow>
                <span className="font-[DM_Mono] text-[10px] uppercase tracking-[0.18em] text-white/60">01 / 01</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8 sm:py-28">
        <div className="grid gap-px overflow-hidden rounded-[18px] border border-white/10 bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06}>
              <div className="group h-full bg-[#07070e]/70 p-7 backdrop-blur-md transition-colors hover:bg-white/[0.05]">
                <v.icon size={20} style={{ color: SIGNAL }} className="transition group-hover:scale-110" />
                <h3 className="mt-8 font-[Newsreader] text-2xl tracking-[-0.02em] text-[#f0efed]">{v.title}</h3>
                <p className="mt-3 text-[13px] leading-6 text-[#9a9aa2]">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="border-t border-white/8 bg-[#07070e]/50 backdrop-blur-md">
        <div className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8 sm:py-32">
          <div className="mb-16 flex items-end justify-between">
            <SectionNumber n="02" label="Mission log" />
            <Eyebrow>2021 — 2026</Eyebrow>
          </div>

          <div ref={trackRef} className="relative" style={{ position: "relative" }}>
            {/* progress rail */}
            <div className="absolute left-[7px] top-2 h-full w-px bg-white/10 sm:left-1/2 sm:-translate-x-1/2" />
            <motion.div
              className="absolute left-[7px] top-2 w-px origin-top sm:left-1/2 sm:-translate-x-1/2"
              style={{ height: lineHeight, background: SIGNAL }}
            />

            <div className="space-y-14 sm:space-y-24">
              {timeline.map((t, i) => (
                <div
                  key={t.year}
                  className={`relative grid gap-6 pl-9 sm:grid-cols-2 sm:gap-16 sm:pl-0 ${i % 2 === 0 ? "" : "sm:[direction:rtl]"}`}
                >
                  {/* node */}
                  <span className="absolute left-0 top-2 flex size-3.5 items-center justify-center sm:left-1/2 sm:-translate-x-1/2">
                    <span className="size-3.5 rounded-full border-2 border-[#0c0c0e]" style={{ background: SIGNAL, boxShadow: `0 0 0 4px rgba(142,162,255,0.15)` }} />
                  </span>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className={`[direction:ltr] ${i % 2 === 0 ? "sm:text-right sm:pr-16" : "sm:col-start-2 sm:pl-16"}`}
                  >
                    <div className="font-[Newsreader] text-6xl tracking-[-0.04em] text-white/90 sm:text-7xl">{t.year}</div>
                    <h3 className="mt-3 text-[15px] font-semibold text-[#e9e8e6]">{t.title}</h3>
                    <p className="mt-2 max-w-sm text-[14px] leading-6 text-[#9a9aa2] sm:ml-auto sm:[&]:max-w-sm">
                      {t.body}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8 sm:py-32">
        <SectionNumber n="03" label="Toolkit" />
        <div className="mt-10 flex flex-wrap gap-3">
          {["TypeScript", "Rust", "Python", "Go", "React", "Next.js", "Node", "PostgreSQL", "pgvector", "Redis", "Docker", "Kubernetes", "Ray", "LangGraph", "Claude", "llama.cpp", "Arch Linux", "Nix", "Stripe", "Elasticsearch", "Tauri", "GSAP"].map((s, i) => (
            <Reveal key={s} delay={i * 0.02}>
              <span className="rounded-full border border-white/12 px-4 py-2 text-[13px] text-[#c4c4cc] transition-colors hover:border-white/30 hover:text-white">
                {s}
              </span>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
