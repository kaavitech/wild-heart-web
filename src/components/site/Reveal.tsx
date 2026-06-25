import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Dir = "up" | "left" | "right" | "scale";
const variants = (dir: Dir): Variants => {
  const map: Record<Dir, { x?: number; y?: number; scale?: number }> = {
    up: { y: 30 },
    left: { x: -30 },
    right: { x: 30 },
    scale: { scale: 0.94 },
  };
  return {
    hidden: { opacity: 0, ...map[dir] },
    show: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };
};

export function Reveal({
  children,
  dir = "up",
  delay = 0,
  className,
}: {
  children: ReactNode;
  dir?: Dir;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={variants(dir)}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
