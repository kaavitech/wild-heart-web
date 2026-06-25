import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export function Counter({ value, suffix = "+" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { damping: 30, stiffness: 80 });
  const [n, setN] = useState(0);

  useEffect(() => { if (inView) mv.set(value); }, [inView, value, mv]);
  useEffect(() => spring.on("change", (v) => setN(Math.round(v))), [spring]);

  return (
    <span ref={ref} className="font-serif text-5xl md:text-6xl font-medium text-primary tabular-nums">
      {n}
      <span className="text-[var(--gold)]">{suffix}</span>
    </span>
  );
}
