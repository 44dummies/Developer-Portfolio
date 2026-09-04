import { useEffect, useState, useRef } from "react";
import { useInView } from "motion/react";

interface CountUpStatProps {
  value: string; // e.g. "5+", "12", "410k", "0"
  label: string;
}

export function CountUpStat({ value, label }: CountUpStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    // Parse numeric part and suffix
    const match = value.match(/^([\d.]+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const targetNum = parseFloat(match[1]);
    const suffix = match[2];

    let start = 0;
    const duration = 1400; // ms
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo formula: 1 - Math.pow(2, -10 * progress)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentNum = Math.floor(start + (targetNum - start) * easeProgress);

      setDisplayValue(`${currentNum}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <div ref={ref} className="min-w-0">
      <div className="font-[Newsreader] text-4xl tracking-[-0.03em] text-[#f2f1ef]">
        {displayValue}
      </div>
      <div className="mt-1 text-[12px] leading-5 text-[#8a8a92]">{label}</div>
    </div>
  );
}
