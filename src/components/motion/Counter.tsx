"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/** Counts up to `to` the first time it scrolls into view. */
export default function Counter({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const still = useReducedMotion();
  // Renders the final value on the server so the number is still correct
  // without JavaScript; the count only takes over once it scrolls into view.
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (!inView || still) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, still, to]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
