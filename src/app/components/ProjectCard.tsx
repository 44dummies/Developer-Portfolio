import { useState, useRef, type CSSProperties, type MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { Project } from "../data";

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
};

function isActiveStatus(status: string) {
  return ["Live", "In production", "Beta", "Daily driver"].includes(status);
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  const visibleMetrics = project.metrics.slice(0, 2);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setSpotlightPos({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <Link
      ref={cardRef}
      to={`/projects/${project.slug}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="project"
      className="group relative block h-full overflow-hidden border border-white/10 bg-[#0c0d12]/90 backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-white/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
      style={{
        "--project-accent": project.color,
      } as CSSProperties}
    >
      {/* Dynamic Cursor Spotlight Radial Glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255,255,255,0.06), transparent 40%)`,
        }}
        aria-hidden
      />

      <div className="absolute inset-x-0 top-0 h-px bg-[var(--project-accent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative aspect-[16/9] overflow-hidden bg-[#14151b]">
        <ImageWithFallback
          src={project.image}
          alt={`${project.title} — ${project.kind}`}
          className="h-full w-full object-cover opacity-75 saturate-[0.65] transition duration-500 ease-out group-hover:scale-[1.03] group-hover:opacity-95 group-hover:saturate-100"
        />
        <div className="absolute inset-0 bg-[var(--project-accent)] opacity-0 mix-blend-color transition-opacity duration-500 group-hover:opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-[#0c0d12]/10 to-[#0c0d12]/20" />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 sm:p-5">
          <span className="font-[DM_Mono] text-[10px] tracking-[0.16em] text-white/65">{project.index} / {project.year}</span>
          <span className="inline-flex items-center gap-1.5 border border-white/15 bg-black/40 px-2.5 py-1 font-[DM_Mono] text-[9px] uppercase tracking-[0.14em] text-white/80 backdrop-blur-md">
            {isActiveStatus(project.status) && <span className="size-1 rounded-full bg-emerald-300 animate-pulse" />}
            {project.status}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-5">
          <span className="max-w-[70%] font-[DM_Mono] text-[10px] uppercase tracking-[0.16em] text-white/60">{project.category}</span>
          <ArrowUpRight className="size-4 shrink-0 text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
        </div>
      </div>

      <div className={`grid gap-6 p-5 sm:p-6 ${featured ? "lg:grid-cols-[minmax(0,1fr)_160px] lg:gap-8" : ""}`}>
        <div>
          <p className="font-[DM_Mono] text-[10px] uppercase tracking-[0.16em] text-[var(--project-accent)]">{project.kind}</p>
          <h3 className="mt-3 font-[Newsreader] text-[clamp(2rem,3vw,3.15rem)] leading-[0.94] tracking-[-0.035em] text-[#f5f4f1]">
            {project.title}
          </h3>
          <p className="mt-4 max-w-xl text-[14px] leading-6 text-[#a6a6af]">{project.blurb}</p>
        </div>

        <dl className={`grid grid-cols-2 gap-x-4 border-t border-white/10 pt-4 ${featured ? "lg:grid-cols-1 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0" : ""}`}>
          {visibleMetrics.map((metric) => (
            <div key={metric.label} className="min-w-0">
              <dt className="font-[DM_Mono] text-[9px] uppercase tracking-[0.13em] text-[#73737d]">{metric.label}</dt>
              <dd className="mt-1 font-[Newsreader] text-2xl leading-none tracking-[-0.025em] text-[#ecebe8]">{metric.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="flex items-center justify-between border-t border-white/8 px-5 py-3.5 sm:px-6">
        <div className="flex min-w-0 items-center gap-2 overflow-hidden">
          {project.stack.slice(0, 3).map((item) => (
            <span key={item} className="truncate font-[DM_Mono] text-[10px] text-[#81818b]">{item}</span>
          ))}
        </div>
        <span className="ml-4 shrink-0 font-[DM_Mono] text-[10px] uppercase tracking-[0.14em] text-[#b5b5bd] transition-colors group-hover:text-white">Case study</span>
      </div>
    </Link>
  );
}

