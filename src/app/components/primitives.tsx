import { motion, useReducedMotion } from "motion/react";
import { SIGNAL } from "../data";

// Small shared building blocks so pages stay consistent.

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`font-[DM_Mono] text-[10px] uppercase tracking-[0.28em] text-[#7c7c86] ${className}`}>
      {children}
    </div>
  );
}

export function SectionNumber({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-[DM_Mono] text-[11px]" style={{ color: SIGNAL }}>
        {n}
      </span>
      <span className="h-px w-8 bg-white/15" />
      <Eyebrow>{label}</Eyebrow>
    </div>
  );
}

// Scroll-triggered reveal — disabled instantly for prefers-reduced-motion users.
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: shouldReduce ? 1 : 0, y: shouldReduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={
        shouldReduce
          ? { duration: 0 }
          : { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
