import { useEffect, useRef } from "react";

// Ambient constellation on <canvas>. Mouse acts as a gentle attractor.
// Kept cheap: ~70 nodes, capped DPR, links only within a radius.
export function ParticleField({ density = 70, className = "" }: { density?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };

    type P = { x: number; y: number; vx: number; vy: number };
    let pts: P[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / 22000);
      pts = Array.from({ length: Math.min(count, density) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    };

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 26000) {
          p.vx += (dx / Math.sqrt(d2 + 1)) * 0.02;
          p.vy += (dy / Math.sqrt(d2 + 1)) * 0.02;
        }
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.985;
        p.vy *= 0.985;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        p.x = Math.max(0, Math.min(w, p.x));
        p.y = Math.max(0, Math.min(h, p.y));
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 130) {
            ctx.strokeStyle = `rgba(142,162,255,${0.12 * (1 - d / 130)})`;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        ctx.fillStyle = "rgba(200,208,255,0.5)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.1, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [density]);

  return <canvas ref={ref} className={className} aria-hidden />;
}
