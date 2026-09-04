import { useEffect, useState, useRef } from "react";
import { useLocation, useOutlet } from "react-router";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import Lenis from "lenis";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Cosmos } from "./Cosmos";
import { CustomCursor } from "./CustomCursor";
import { Preloader } from "./Preloader";

export function Root() {
  const location = useLocation();
  const outlet = useOutlet();
  const shouldReduce = useReducedMotion();
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (shouldReduce) return;
    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 1,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [shouldReduce]);

  // Reset scroll on every route change.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

  return (
    <>
      {!preloaderComplete && <Preloader onComplete={() => setPreloaderComplete(true)} />}

      <div className={`dark bg-grid-pattern relative min-h-screen bg-[#07070b] font-[Manrope] text-[#eeeef0] antialiased selection:bg-white/20 selection:text-white ${!preloaderComplete ? "overflow-hidden h-screen" : ""}`}>
        {/* Living Cosmos background canvas */}
        <Cosmos />

        {/* Analog film grain overlay */}
        <div className="film-grain" aria-hidden />

        {/* Custom magnetic trailing cursor */}
        <CustomCursor />

        <Nav />

        <AnimatePresence mode="wait">
          <motion.div
            id="page-content"
            key={location.pathname}
            className="relative z-10"
            initial={{ opacity: 0, y: shouldReduce ? 0 : 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: shouldReduce ? 0 : -20, filter: "blur(8px)" }}
            transition={{ duration: shouldReduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {outlet}
            <Footer />
          </motion.div>
        </AnimatePresence>

        {/* Advanced Page Transition Overlay (Curtain) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname + "-curtain"}
            className="pointer-events-none fixed inset-0 z-[9000] bg-[#0a0a0f]"
            initial={{ scaleY: 1, transformOrigin: "top" }}
            animate={{ scaleY: 0, transformOrigin: "top" }}
            exit={{ scaleY: 1, transformOrigin: "bottom" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          />
        </AnimatePresence>
      </div>
    </>
  );
}

