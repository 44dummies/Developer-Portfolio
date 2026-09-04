import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SectionNumber, Reveal } from "../components/primitives";
import { ProjectCard } from "../components/ProjectCard";
import { projects, type Category } from "../data";

const filters: (Category | "All")[] = ["All", "AI Systems", "SaaS", "Experiments"];

export function Projects() {
  const [filter, setFilter] = useState<(Category | "All")>("All");
  const shown = useMemo(
    () => (filter === "All" ? projects : projects.filter((project) => project.category === filter)),
    [filter],
  );

  return (
    <main className="min-h-screen pt-[68px]">
      <section className="mx-auto max-w-[1200px] px-5 pb-14 pt-20 sm:px-8 sm:pb-16 sm:pt-28">
        <SectionNumber n="02" label="Projects" />
        <div className="mt-8 grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <Reveal>
              <h1 className="max-w-3xl font-[Newsreader] text-[clamp(2.6rem,5.7vw,4.75rem)] font-medium leading-[0.98] tracking-[-0.04em] text-[#f4f3f1]">
                Work with receipts.
              </h1>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="text-[15px] leading-7 text-[#a4a4ac]">
              Production systems, client work, and experiments — with the decisions, constraints, and measurable outcomes included.
            </p>
          </Reveal>
        </div>

        <div
          role="group"
          aria-label="Filter projects by category"
          className="mt-7 flex gap-2 overflow-x-auto pb-1"
        >
          {filters.map((item) => {
            const count = item === "All" ? projects.length : projects.filter((project) => project.category === item).length;
            const selected = filter === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                aria-pressed={selected}
                className={`shrink-0 border px-3.5 py-2 font-[DM_Mono] text-[10px] uppercase tracking-[0.12em] transition-colors ${
                  selected
                    ? "border-white bg-white text-[#0b0b0e]"
                    : "border-white/10 bg-white/[0.015] text-[#a2a2ab] hover:border-white/30 hover:text-white"
                }`}
              >
                {item} <span className="ml-1 opacity-60" aria-hidden>{String(count).padStart(2, "0")}</span>
                <span className="sr-only">({count} project{count !== 1 ? "s" : ""})</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 pb-24 sm:px-8 sm:pb-32">
        <motion.div layout className="grid gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {shown.map((project, index) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: (index % 2) * 0.05, duration: 0.35 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </main>
  );
}
