import { motion } from "motion/react";

interface KineticTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function KineticText({ text, className = "", delay = 0, as = "h1" }: KineticTextProps) {
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: "110%",
      opacity: 0,
      rotateX: 25,
    },
    visible: {
      y: "0%",
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const Component = motion[as] as typeof motion.h1;

  return (
    <Component
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className={`flex flex-wrap ${className}`}
      style={{ perspective: "1000px" }}
    >
      {words.map((word, idx) => (
        <span key={idx} className="clip-mask mr-[0.25em] inline-block overflow-hidden py-1">
          <motion.span variants={wordVariants} className="inline-block transform-gpu">
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
