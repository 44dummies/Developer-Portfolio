import { Link } from "react-router";
import { motion } from "motion/react";
import { SIGNAL } from "../data";

export function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center px-5 pt-[68px]">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="font-[DM_Mono] text-[11px] uppercase tracking-[0.3em] text-[#7c7c86]"
        >
          Signal lost
        </motion.div>
        <h1 className="mt-6 font-[Newsreader] text-[clamp(5rem,20vw,14rem)] font-medium leading-none tracking-[-0.05em] text-[#f4f3f1]">
          4<span style={{ color: SIGNAL }}>0</span>4
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-[15px] leading-7 text-[#a4a4ac]">
          This coordinate doesn&apos;t map to anything. The system stayed silent rather than guess.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link to="/" className="rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-[#0a0a0b]">Return home</Link>
          <Link to="/projects" className="rounded-full border border-white/15 px-5 py-2.5 text-[13px] text-white hover:border-white/35">View work</Link>
        </div>
      </div>
    </main>
  );
}
