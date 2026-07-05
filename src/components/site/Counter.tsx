import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export function Counter({
  value,
  suffix = "+",
  variant = "dark",
}: {
  value: number;
  suffix?: string;
  variant?: "dark" | "light";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { damping: 30, stiffness: 80 });
  const [n, setN] = useState(0);

  useEffect(() => { if (inView) mv.set(value); }, [inView, value, mv]);
  useEffect(() => spring.on("change", (v) => setN(Math.round(v))), [spring]);

  return (
    <span
      ref={ref}
      className={cn(
        "font-serif text-5xl font-medium tabular-nums md:text-6xl",
        variant === "light" ? "text-white" : "text-primary",
      )}
    >
      {n}
      <span className="text-gold">{suffix}</span>
    </span>
  );
}
