"use client";

import { LazyMotion, domAnimation } from "motion/react";

// Ships only the animation, variant, exit and hover/tap features instead of
// the whole library. `strict` makes a stray `motion.div` throw at build time
// rather than silently pulling the full bundle back in — every animated
// element on this site must use `m.*` from motion/react-m.
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
