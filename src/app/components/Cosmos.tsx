import { useEffect, useRef } from "react";

// The living night sky behind the entire site.
// One fixed canvas: parallax starfield (3 depth layers), drifting nebula clouds,
// mouse parallax, and shooting stars every 8–20s. Kept ultra-fluid and smooth.
export function Cosmos() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    let lastTime = performance.now();

    type Star = { x: number; y: number; z: number; r: number; tw: number };
    type Nebula = { x: number; y: number; r: number; c: string; vx: number; vy: number };
    type Shooter = { x: number; y: number; vx: number; vy: number; life: number; len: number } | null;

    let stars: Star[] = [];
    let nebulae: Nebula[] = [];
    let shooter: Shooter = null;
    let nextShooter = 0;
    let timeAcc = 0;

    const target = { x: 0, y: 0 };
    const parallax = { x: 0, y: 0 };
    const mousePos = { x: -500, y: -500 };
    const mouseGlow = { x: -500, y: -500 };

    const NEBULA_COLORS = ["142,162,255", "120,90,220", "70,180,160", "200,120,200"];

    const build = () => {
      const count = Math.min(Math.round((w * h) / 4200), 520);
      stars = Array.from({ length: count }, () => {
        const z = Math.random(); // depth 0..1
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          r: 0.3 + z * 1.4,
          tw: Math.random() * Math.PI * 2,
        };
      });
      nebulae = Array.from({ length: 5 }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.max(w, h) * (0.28 + Math.random() * 0.25),
        c: NEBULA_COLORS[i % NEBULA_COLORS.length],
        vx: (Math.random() - 0.5) * 0.05,
        vy: (Math.random() - 0.5) * 0.05,
      }));
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const onMove = (e: MouseEvent) => {
      target.x = (e.clientX / w - 0.5) * 2;
      target.y = (e.clientY / h - 0.5) * 2;
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    const spawnShooter = () => {
      const startX = Math.random() * w;
      shooter = {
        x: startX,
        y: -20,
        vx: (Math.random() - 0.3) * 6 - 2,
        vy: 5 + Math.random() * 4,
        life: 1,
        len: 80 + Math.random() * 120,
      };
    };

    const draw = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.05); // cap delta at 50ms
      lastTime = now;
      timeAcc += delta;

      // Ultra-smooth lerp interpolation for parallax & ambient mouse halo
      parallax.x += (target.x - parallax.x) * 0.025;
      parallax.y += (target.y - parallax.y) * 0.025;

      mouseGlow.x += (mousePos.x - mouseGlow.x) * 0.05;
      mouseGlow.y += (mousePos.y - mouseGlow.y) * 0.05;

      ctx.clearRect(0, 0, w, h);

      // Base vertical gradient
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, "#05050b");
      bg.addColorStop(0.55, "#070711");
      bg.addColorStop(1, "#04040a");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Ethereal Mouse Light Beam (ambient glow following cursor)
      if (mouseGlow.x > 0) {
        const mouseRadial = ctx.createRadialGradient(
          mouseGlow.x,
          mouseGlow.y,
          0,
          mouseGlow.x,
          mouseGlow.y,
          600
        );
        mouseRadial.addColorStop(0, "rgba(99, 102, 241, 0.06)");
        mouseRadial.addColorStop(0.5, "rgba(139, 92, 246, 0.02)");
        mouseRadial.addColorStop(1, "transparent");
        ctx.fillStyle = mouseRadial;
        ctx.fillRect(0, 0, w, h);
      }

      // Nebula clouds
      ctx.globalCompositeOperation = "screen";
      for (const n of nebulae) {
        if (!reduce) {
          n.x += n.vx * delta * 60;
          n.y += n.vy * delta * 60;
          if (n.x < -n.r) n.x = w + n.r;
          if (n.x > w + n.r) n.x = -n.r;
          if (n.y < -n.r) n.y = h + n.r;
          if (n.y > h + n.r) n.y = -n.r;
        }
        const px = n.x + parallax.x * 22;
        const py = n.y + parallax.y * 22;
        const g = ctx.createRadialGradient(px, py, 0, px, py, n.r);
        g.addColorStop(0, `rgba(${n.c},0.09)`);
        g.addColorStop(0.5, `rgba(${n.c},0.025)`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      // Stars with depth parallax + smooth twinkle
      for (const s of stars) {
        const depth = 6 + s.z * 34;
        const x = s.x + parallax.x * depth;
        const y = s.y + parallax.y * depth;
        const tw = reduce ? 0.85 : 0.55 + Math.sin(timeAcc * 1.5 + s.tw) * 0.45;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${s.z > 0.7 ? "200,214,255" : "235,238,255"},${tw * (0.35 + s.z * 0.65)})`;
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fill();

        if (s.z > 0.92) {
          ctx.strokeStyle = `rgba(200,214,255,${tw * 0.25})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(x - s.r * 3, y);
          ctx.lineTo(x + s.r * 3, y);
          ctx.moveTo(x, y - s.r * 3);
          ctx.lineTo(x, y + s.r * 3);
          ctx.stroke();
        }
      }

      // Shooting stars
      if (!reduce) {
        if (!shooter && timeAcc > nextShooter) {
          spawnShooter();
          nextShooter = timeAcc + (8 + Math.random() * 12);
        }
        if (shooter) {
          shooter.x += shooter.vx * delta * 60;
          shooter.y += shooter.vy * delta * 60;
          shooter.life -= 0.012 * delta * 60;
          const tailX = shooter.x - shooter.vx * (shooter.len / 8);
          const tailY = shooter.y - shooter.vy * (shooter.len / 8);
          const grad = ctx.createLinearGradient(shooter.x, shooter.y, tailX, tailY);
          grad.addColorStop(0, `rgba(255,255,255,${Math.max(0, shooter.life)})`);
          grad.addColorStop(1, "transparent");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(shooter.x, shooter.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();
          if (shooter.life <= 0 || shooter.y > h + 40 || shooter.x < -80) shooter = null;
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 h-full w-full" aria-hidden />;
}

