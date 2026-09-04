import { Link } from "react-router";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { PERSON } from "../data";
import { BrandMark } from "./BrandMark";

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#08080a]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <BrandMark className="size-5 text-[#c3ceff]" />
          <span className="text-[12px] text-[#a1a1aa]">© 2026 44 Dummies</span>
          <span className="hidden text-[#4b4b54] sm:inline">/</span>
          <span className="hidden text-[12px] text-[#74747d] sm:inline">Independent software studio</span>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-[12px] text-[#8c8c95]">
          <a href={`mailto:${PERSON.email}`} className="transition-colors hover:text-white">{PERSON.email}</a>
          <a href={`https://${PERSON.github}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-white"><Github size={13} /> GitHub</a>
          <a href={`https://${PERSON.linkedin}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-white"><Linkedin size={13} /> LinkedIn</a>
          <Link to="/contact" className="group inline-flex items-center gap-1.5 text-[#c1ccff] transition-colors hover:text-white">
            Enquire <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
