"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "motion/react";
import type { MouseEvent, ReactNode } from "react";

/**
 * A card that catches a warm light where the pointer is — a fixture aimed at a
 * surface, which is what this company actually sells.
 */
export default function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const still = useReducedMotion();

  const glow = useMotionTemplate`radial-gradient(340px circle at ${x}px ${y}px, rgba(240,169,60,0.11), transparent 72%)`;

  function track(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  }

  return (
    <div
      onMouseMove={still ? undefined : track}
      className={`group relative overflow-hidden transition duration-300 ease-stage hover:-translate-y-1 hover:border-amber/30 ${className}`}
    >
      {/* Rendered unconditionally so server and client markup match; with the
          pointer untracked it simply sits off-canvas. */}
      <motion.span
        aria-hidden
        style={{ background: glow }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
