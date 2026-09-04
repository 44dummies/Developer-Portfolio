import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { projects, PERSON, SIGNAL } from "../data";

type Line = { kind: "in" | "out" | "sys"; text: string };

const BANNER = [
  "  _  _   _  _   ___                          _        ",
  " | || | | || | |   \\ _  _ _ __  _ __ (_)___ ___",
  " | || |_| || |_| |) | || | '  \\| '  \\| / -_|_-<",
  " |_||___|_||___|___/ \\_,_|_|_|_|_|_|_|_\\___/__/",
];

/** Interactive shell — a small playground for exploring the studio. */
export function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { kind: "sys", text: "44dummies.os v1.0 — type 'help' to begin, 'ls' to look around." },
  ]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const [matrix, setMatrix] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const push = (...ls: Line[]) => setLines((p) => [...p, ...ls]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    push({ kind: "in", text: cmd });
    if (!cmd) return;
    setHistory((h) => [cmd, ...h]);
    setHIdx(-1);
    const [name, ...args] = cmd.toLowerCase().split(/\s+/);

    switch (name) {
      case "help":
        push({ kind: "out", text: [
          "Available commands:",
          "  whoami          who is behind 44 Dummies",
          "  ls / projects   list the systems we've built",
          "  cat <slug>      read a project summary (e.g. cat legal-rag)",
          "  skills          what we work with",
          "  goto <page>     navigate (home, about, projects, contact)",
          "  github          open our github",
          "  matrix          enter the matrix (Esc to exit)",
          "  banner          print the logo",
          "  clear           clear the screen",
          "  sudo            nice try",
        ].join("\n") });
        break;
      case "whoami":
        push({ kind: "out", text: `${PERSON.name} — ${PERSON.role}. ${PERSON.tagline}` });
        break;
      case "ls":
      case "projects":
        push({ kind: "out", text: projects.map((p) => `  ${p.index}  ${p.title.padEnd(12)} ${p.kind}`).join("\n") });
        break;
      case "cat": {
        const p = projects.find((x) => x.slug === args[0]);
        if (!p) { push({ kind: "out", text: `cat: ${args[0] || "?"}: no such project. try: ${projects.map((x) => x.slug).join(", ")}` }); break; }
        push({ kind: "out", text: `${p.title} — ${p.kind} (${p.year})\n${p.blurb}\nstack: ${p.stack.join(", ")}\n→ opening case study...` });
        setTimeout(() => navigate(`/projects/${p.slug}`), 900);
        break;
      }
      case "skills":
        push({ kind: "out", text: "TypeScript · Rust · Python · Go · React · pgvector · LangGraph · Neo4j · Kubernetes · Arch Linux" });
        break;
      case "goto": {
        const map: Record<string, string> = { home: "/", about: "/about", projects: "/projects", contact: "/contact" };
        const dest = map[args[0]];
        if (!dest) { push({ kind: "out", text: `goto: unknown page '${args[0] || ""}'` }); break; }
        push({ kind: "out", text: `→ navigating to /${args[0]}...` });
        setTimeout(() => navigate(dest), 700);
        break;
      }
      case "github":
        push({ kind: "out", text: `opening ${PERSON.github}...` });
        window.open(`https://${PERSON.github}`, "_blank");
        break;
      case "banner":
        push({ kind: "sys", text: BANNER.join("\n") });
        break;
      case "matrix":
        setMatrix(true);
        push({ kind: "sys", text: "wake up... (press Esc to exit)" });
        break;
      case "sudo":
        push({ kind: "out", text: "nice try. this incident will be reported. 🕵️" });
        break;
      case "clear":
        setLines([]);
        break;
      case "echo":
        push({ kind: "out", text: args.join(" ") });
        break;
      default:
        push({ kind: "out", text: `command not found: ${name}. type 'help'.` });
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { run(value); setValue(""); }
    else if (e.key === "ArrowUp") { e.preventDefault(); const n = Math.min(hIdx + 1, history.length - 1); if (history[n] !== undefined) { setHIdx(n); setValue(history[n]); } }
    else if (e.key === "ArrowDown") { e.preventDefault(); const n = hIdx - 1; if (n < 0) { setHIdx(-1); setValue(""); } else { setHIdx(n); setValue(history[n]); } }
  };

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && matrix) {
        setMatrix(false);
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [matrix]);

  return (
    <>
      {/* Screen-reader announcement for matrix mode state changes */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {matrix ? "Matrix mode activated. Press Escape to exit." : ""}
      </div>

      {matrix && <MatrixRain onExit={() => { setMatrix(false); inputRef.current?.focus(); }} />}

      <motion.div
        initial={{ opacity: 0, y: shouldReduce ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: shouldReduce ? 0 : 0.7 }}
        className="overflow-hidden rounded-[16px] border border-white/12 bg-[#0b0b0d] shadow-[0_40px_120px_-40px_rgba(142,162,255,0.35)]"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex items-center gap-2 border-b border-white/8 bg-white/[0.02] px-4 py-3" aria-hidden>
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-[DM_Mono] text-[11px] text-[#7c7c86]">{PERSON.short}@44dummies — zsh</span>
        </div>
        <div
          ref={scrollRef}
          role="log"
          aria-label="Terminal output"
          aria-live="polite"
          className="h-[420px] overflow-y-auto p-5 font-[DM_Mono] text-[13px] leading-6"
        >
          {lines.map((l, i) => (
            <div key={i} className="whitespace-pre-wrap break-words">
              {l.kind === "in" && (<span><span style={{ color: SIGNAL }} aria-hidden>➜</span> <span className="text-[#54c9a8]" aria-hidden>~</span> <span className="text-[#e9e8e6]">{l.text}</span></span>)}
              {l.kind === "out" && <span className="text-[#b0b0b8]">{l.text}</span>}
              {l.kind === "sys" && <span style={{ color: SIGNAL }}>{l.text}</span>}
            </div>
          ))}
          <div className="flex items-center gap-2">
            <span style={{ color: SIGNAL }} aria-hidden>➜</span>
            <span className="text-[#54c9a8]" aria-hidden>~</span>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKey}
              spellCheck={false}
              className="flex-1 bg-transparent font-[DM_Mono] text-[13px] text-[#e9e8e6] outline-none"
              aria-label="Terminal command input"
              autoComplete="off"
            />
          </div>
        </div>
      </motion.div>
      <p className="mt-4 font-[DM_Mono] text-[11px] text-[#6c6c74]" aria-hidden>
        tip: ↑/↓ for history · click anywhere in the window to focus
      </p>
    </>
  );
}

// Falling-glyph matrix overlay. Skips animation entirely for reduced-motion users.
function MatrixRain({ onExit }: { onExit: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce) return;

    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    const glyphs = "ｱｲｳｴｵｶｷｸ0123456789ABCDEF".split("");
    let drops: number[] = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const cols = Math.floor(canvas.width / 16);
      drops = Array(cols).fill(1);
    };
    resize();
    const draw = () => {
      ctx.fillStyle = "rgba(10,10,11,0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = SIGNAL;
      ctx.font = "15px monospace";
      for (let i = 0; i < drops.length; i++) {
        ctx.fillText(glyphs[Math.floor(Math.random() * glyphs.length)], i * 16, drops[i] * 16);
        if (drops[i] * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [shouldReduce]);

  if (shouldReduce) {
    return (
      <div
        className="fixed inset-0 z-[170] flex flex-col items-center justify-center bg-[#0a0a0b]/95"
        role="dialog"
        aria-label="Matrix mode"
        aria-modal="true"
      >
        <p className="font-[DM_Mono] text-[15px]" style={{ color: SIGNAL }}>
          [ matrix mode active ]
        </p>
        <button
          onClick={onExit}
          className="mt-6 font-[DM_Mono] text-[12px] text-[#9a9aa2] underline hover:text-white"
          aria-label="Exit matrix mode"
        >
          press Esc or click here to exit
        </button>
      </div>
    );
  }

  return <canvas ref={ref} className="fixed inset-0 z-[170]" aria-hidden />;
}
