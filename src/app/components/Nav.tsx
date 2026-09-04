import { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { nav, PERSON } from "../data";
import { BrandMark } from "./BrandMark";
import { Magnetic } from "./Magnetic";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Focus management: enter → focus first item; exit → restore trigger
  const wasOpen = useRef(false);
  useEffect(() => {
    if (open && !wasOpen.current) {
      // Nav just opened — focus the close button
      requestAnimationFrame(() => {
        mobileNavRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
      });
    }
    if (!open && wasOpen.current) {
      // Nav just closed — restore focus to the trigger
      menuBtnRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  // Keyboard: Escape to close + Tab focus trap
  useEffect(() => {
    if (!open) return;

    // Prevent keyboard access to the page behind the nav
    const pageContent = document.getElementById("page-content");
    if (pageContent) pageContent.setAttribute("inert", "");

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }

      if (e.key !== "Tab" || !mobileNavRef.current) return;

      const focusable = Array.from(
        mobileNavRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      pageContent?.removeAttribute("inert");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-[#0b0b0e]/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between px-5 sm:px-8">
          {/* Brand */}
          <Link to="/" className="group flex items-center gap-2.5 text-[#f2f2f4]" aria-label={`${PERSON.name} — Home`}>
            <span className="grid size-8 place-items-center rounded-md border border-white/10 bg-white/[0.03] transition-colors group-hover:border-white/25">
              <BrandMark className="size-4 text-[#c3ceff] transition-transform duration-300 group-hover:rotate-[-8deg]" />
            </span>
            <span className="font-[Manrope] text-[14px] font-bold tracking-[-0.02em]">
              <span className="text-[#c3ceff]">44</span> Dummies
            </span>
          </Link>

          {/* Desktop links — numbered, editorial */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
            {nav.map((item) => (
              <Magnetic key={item.to} strength={0.3}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className="group relative flex items-center gap-1.5 py-1 text-[13px] tracking-[-0.01em] text-[#9a9aa2] transition-colors hover:text-white"
                >
                  {({ isActive }) => (
                    <>
                      <span className={`font-[DM_Mono] text-[9px] transition-colors ${isActive ? "text-[#c3ceff]" : "text-[#5c5c66] group-hover:text-[#8a8a92]"}`}>
                        {item.n}
                      </span>
                      <span className={isActive ? "text-white" : ""}>{item.label}</span>
                      <span
                        className={`absolute -bottom-1 left-0 h-px bg-white transition-all duration-300 ${
                          isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-40"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </Magnetic>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="hidden items-center gap-4 lg:flex">
            <span className="flex items-center gap-2">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#9aae85] opacity-60" aria-hidden />
                <span className="relative inline-flex size-1.5 rounded-full bg-[#9aae85]" aria-hidden />
              </span>
              <span className="font-[DM_Mono] text-[10px] uppercase tracking-[0.16em] text-[#83838c]">Available</span>
            </span>
            <span className="h-4 w-px bg-white/10" aria-hidden />
            <Magnetic strength={0.5}>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-1.5 rounded-md bg-white px-4 py-2 text-[13px] font-semibold text-[#0a0a0b] transition-colors hover:bg-[#dfe4ff]"
              >
                Get in touch
                <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </Magnetic>
          </div>

          <button
            ref={menuBtnRef}
            className="rounded-md border border-white/12 p-2.5 text-white lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <Menu size={16} aria-hidden />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={mobileNavRef}
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 z-[150] bg-[#0b0b0e] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex h-[68px] items-center justify-between px-5">
              <span className="flex items-center gap-2.5" aria-hidden>
                <span className="grid size-8 place-items-center rounded-md border border-white/10 bg-white/[0.03]">
                  <BrandMark className="size-4 text-[#c3ceff]" />
                </span>
                <span className="font-[Manrope] text-[14px] font-bold text-white">
                  <span className="text-[#c3ceff]">44</span> Dummies
                </span>
              </span>
              <button
                className="rounded-md border border-white/12 p-2.5 text-white"
                onClick={() => setOpen(false)}
                aria-label="Close navigation menu"
              >
                <X size={16} aria-hidden />
              </button>
            </div>

            <nav aria-label="Mobile navigation" className="flex flex-col px-5 pt-4">
              {nav.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-4 border-b border-white/8 py-5 text-[22px] tracking-[-0.02em] text-white"
                  >
                    <span className="font-[DM_Mono] text-[11px] text-[#5c5c66]" aria-hidden>{item.n}</span>
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <div className="px-5 pt-8">
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-md bg-white px-4 py-3.5 text-[14px] font-semibold text-[#0a0a0b]"
              >
                Get in touch <ArrowUpRight size={15} aria-hidden />
              </Link>
              <a href={`mailto:${PERSON.email}`} className="mt-5 block text-center font-[DM_Mono] text-[12px] text-[#8c8c95]">
                {PERSON.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
