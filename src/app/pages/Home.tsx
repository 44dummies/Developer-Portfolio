import { useState, useRef } from "react";
import { Link } from "react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow, SectionNumber } from "../components/primitives";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ProjectCard } from "../components/ProjectCard";
import { Terminal } from "../components/Terminal";
import { PERSON, projects, Category, SIGNAL } from "../data";
import { TechIconsGroup, CORE_TECH_ITEMS } from "../components/TechIcons";
import { KineticText } from "../components/KineticText";
import { CountUpStat } from "../components/CountUpStat";
import { Magnetic } from "../components/Magnetic";

export function Home() {
  const shouldReduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<Category | "All">("All");

  // Scroll parallax for editorial image
  const figureRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: figureRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const filteredProjects = projects.filter((p) => filter === "All" || p.category === filter);

  return (
    <main className="pt-[68px]">
      {/* ---------- HERO ---------- */}
      <section className="mx-auto max-w-[1200px] px-5 pt-24 sm:px-8 sm:pt-32">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
          className="flex flex-wrap items-center gap-3"
        >
          <Eyebrow>{PERSON.role} · {PERSON.location}</Eyebrow>
          <span className="size-1 rounded-full bg-[#9aae85]" aria-hidden />
          <span className="inline-flex items-center gap-2 font-[DM_Mono] text-[10px] uppercase tracking-[0.18em] text-[#93939c]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for select work
          </span>
        </motion.div>

        {/* Masterpiece Kinetic Word-Split Headline */}
        <div className="mt-7 max-w-5xl">
          <KineticText
            text={PERSON.tagline}
            className="font-[Newsreader] text-[clamp(3rem,6.7vw,5.9rem)] font-medium leading-[0.96] tracking-[-0.045em] text-[#f4f3f1]"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.65, delay: shouldReduceMotion ? 0 : 0.4 }}
          className="mt-12 grid gap-8 border-t border-white/10 pt-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end"
        >
          <p className="max-w-xl text-[15px] leading-7 text-[#a8a8b0]">
            I&apos;m Damian. Through <span className="text-[#d7d7dc]">44 Dummies</span>, I build the research,
            software, and operational systems that turn a useful answer into something people rely on.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <Magnetic strength={0.4}>
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 bg-white px-5 py-2.5 text-[13px] font-semibold text-[#0a0a0b] transition hover:bg-[#dfe4ff]"
              >
                View selected work <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Link to="/contact" className="text-[13px] text-[#96969f] transition-colors hover:text-white">
                Start a conversation <span aria-hidden>→</span>
              </Link>
            </Magnetic>
          </div>
        </motion.div>
      </section>

      {/* ---------- CORE STACK MARQUEE ---------- */}
      <section
        className="relative mt-20 overflow-hidden border-y border-white/[0.07] sm:mt-28"
        aria-label="Core technology stack"
      >
        <div className="flex items-center py-5">
          <div className="animate-marquee animate-marquee-paused" aria-hidden>
            <TechIconsGroup />
            <TechIconsGroup />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#07070b] to-transparent" aria-hidden />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#07070b] to-transparent" aria-hidden />

        <ul className="sr-only">
          {CORE_TECH_ITEMS.map((item) => <li key={item.id}>{item.name}</li>)}
        </ul>
      </section>

      {/* ---------- THESIS ---------- */}
      <section className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8 sm:py-32">
        <SectionNumber n="01" label="Approach" />
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_0.8fr]">
          <KineticText
            text="I build software for the moments where being wrong is expensive — legal reasoning, security, money, autonomy. Research becomes a model, a model becomes a system, and a system earns trust in use."
            as="p"
            className="max-w-3xl font-[Newsreader] text-[clamp(1.7rem,3.1vw,2.75rem)] leading-[1.18] tracking-[-0.022em] text-[#e9e8e6]"
          />

          <div className="grid grid-cols-2 gap-x-10 gap-y-8 self-end border-t border-white/10 pt-7 lg:border-t-0 lg:pt-0">
            {[
              ["5+", "years shipping"],
              ["12", "systems in production"],
              ["410k", "docs indexed by Legal RAG"],
              ["0", "cloud calls in Jarvis"],
            ].map(([value, label]) => (
              <CountUpStat key={label} value={value} label={label} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- EDITORIAL IMAGE BAND (PARALLAX) ---------- */}
      <section className="border-t border-white/8">
        <motion.figure
          ref={figureRef}
          initial={{ opacity: shouldReduceMotion ? 1 : 0.45 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
          className="group relative h-[380px] overflow-hidden bg-[#111216] sm:h-[500px] lg:h-[580px]"
        >
          <motion.div style={{ y: shouldReduceMotion ? 0 : imageY }} className="h-[120%] w-full">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1781966995939-3748dc1f1742?w=1800&h=1000&fit=crop&auto=format"
              alt="A dim workspace with a computer screen reflected in a window"
              className="h-full w-full object-cover object-center opacity-75 saturate-[0.65] transition duration-700 ease-out group-hover:scale-[1.018] group-hover:opacity-85"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#07070b]/90 via-[#07070b]/15 to-[#07070b]/40" aria-hidden />
          <figcaption className="absolute inset-x-0 bottom-0 mx-auto flex max-w-[1200px] flex-col gap-4 px-5 pb-8 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:pb-11 z-10">
            <p className="max-w-md font-[Newsreader] text-[clamp(1.45rem,2.6vw,2.2rem)] leading-[1.12] tracking-[-0.022em] text-[#f0efed]">
              The work is quiet. The stakes rarely are.
            </p>
            <Eyebrow className="text-white/55">44 Dummies · Nairobi</Eyebrow>
          </figcaption>
        </motion.figure>
      </section>

      {/* ---------- FEATURED WORK ---------- */}
      <section className="border-t border-white/8">
        <div className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8 sm:py-28">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <SectionNumber n="02" label="Selected work" />

            {/* Filters */}
            <div
              role="group"
              aria-label="Filter projects by category"
              className="flex w-full overflow-x-auto pb-2 sm:w-auto sm:pb-0 scrollbar-none"
            >
              <div className="flex gap-2">
                {(["All", "AI Systems", "SaaS", "Experiments"] as const).map((cat) => {
                  const count = cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      aria-pressed={filter === cat}
                      className={`shrink-0 rounded-full px-4 py-1.5 text-[12px] font-medium transition-colors ${
                        filter === cat ? "bg-white text-black" : "bg-white/[0.05] text-[#8a8a92] hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {cat}{" "}
                      <span className="ml-1 opacity-50" aria-hidden>({count})</span>
                      <span className="sr-only">({count} project{count !== 1 ? "s" : ""})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {filteredProjects.slice(0, 4).map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={project} featured />
              </motion.div>
            ))}
          </div>

          <Link to="/projects" className="group mt-12 inline-flex items-center gap-2 text-[13px] text-[#b7b7bf] transition-colors hover:text-white sm:hidden">
            See all projects <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </section>

      {/* ---------- PLAYGROUND ---------- */}
      <section className="border-t border-white/8">
        <div className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8 sm:py-28">
          <SectionNumber n="03" label="Playground" />
          <div className="mt-10 grid gap-10 lg:grid-cols-[0.85fr_1fr] lg:items-center">
            <div>
              <h2 className="max-w-md font-[Newsreader] text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.02] tracking-[-0.04em] text-[#f4f3f1]">
                Talk to the machine.
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-7 text-[#a4a4ac]">
                A real shell for exploring this studio. Try{" "}
                <code className="rounded bg-white/8 px-1.5 py-0.5 font-[DM_Mono] text-[13px]" style={{ color: SIGNAL }}>whoami</code>,{" "}
                <code className="rounded bg-white/8 px-1.5 py-0.5 font-[DM_Mono] text-[13px]" style={{ color: SIGNAL }}>cat legal-rag</code>, or{" "}
                <code className="rounded bg-white/8 px-1.5 py-0.5 font-[DM_Mono] text-[13px]" style={{ color: SIGNAL }}>matrix</code>.
              </p>
            </div>
            <Terminal />
          </div>
        </div>
      </section>
    </main>
  );
}

