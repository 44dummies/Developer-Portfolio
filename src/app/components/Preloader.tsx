import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = "hidden";

    // Simulate loading progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 10) + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsFading(true);
        }, 400); // Hold at 100% briefly
      }
      setProgress(currentProgress);
    }, 100);

    return () => {
      document.body.style.overflow = "";
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isFading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#07070b] text-[#f4f3f1]"
          exit={{ y: "-100vh" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="font-[DM_Mono] text-4xl font-light tracking-tighter">
            {progress}%
          </div>
          <motion.div
            className="mt-6 h-px bg-white/20"
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="h-full bg-white"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
