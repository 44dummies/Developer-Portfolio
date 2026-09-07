import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hoverState, setHoverState] = useState<"none" | "hover" | "project">("none");
  const hoverStateRef = useRef<"none" | "hover" | "project">("none");
  const [visible, setVisible] = useState(false);

  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      let nextState: "none" | "hover" | "project" = "none";
      if (target.closest("[data-cursor='project']")) {
        nextState = "project";
      } else if (target.closest("a, button, [data-cursor='hover']")) {
        nextState = "hover";
      }

      if (nextState !== hoverStateRef.current) {
        hoverStateRef.current = nextState;
        setHoverState(nextState);
      }
    };

    const leave = () => setVisible(false);

    // Smooth Lerp Animation Loop
    const animate = () => {
      // Easing lerp factor: 0.14 for ultra-silky fluid inertia
      ring.current.x += (mouse.current.x - ring.current.x) * 0.14;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.14;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.body.addEventListener("mouseleave", leave);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      document.body.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(rafId.current);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] hidden md:block">
      {/* Outer Silky Trailing Ring */}
      <div
        ref={ringRef}
        className="absolute left-0 top-0 will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)" }}
      >
        <motion.div
          className="flex items-center justify-center rounded-full mix-blend-difference"
          animate={{
            width: hoverState === "project" ? 84 : hoverState === "hover" ? 46 : 26,
            height: hoverState === "project" ? 84 : hoverState === "hover" ? 46 : 26,
            backgroundColor: hoverState === "project" ? "#ffffff" : "transparent",
          }}
          transition={{ type: "spring", stiffness: 350, damping: 26, mass: 0.4 }}
        >
          <div
            className={`h-full w-full rounded-full border ${
              hoverState === "project" ? "border-transparent" : "border-white/70"
            } flex items-center justify-center`}
          >
            {hoverState === "project" && (
              <span className="font-[DM_Mono] text-[10px] font-bold uppercase tracking-wider text-black">
                EXPLORE
              </span>
            )}
          </div>
        </motion.div>
      </div>

      {/* Precision Inner Dot */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)" }}
      >
        <motion.div
          className="h-1.5 w-1.5 rounded-full bg-white"
          animate={{ scale: hoverState !== "none" ? 0 : 1 }}
          transition={{ duration: 0.15 }}
        />
      </div>
    </div>
  );
}


