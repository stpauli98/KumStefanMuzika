"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/*
 * Reduced motion is handled by collapsing durations to zero, never by
 * rendering different markup — `useReducedMotion` resolves on the client only,
 * so branching on it in the tree causes a hydration mismatch.
 */

/**
 * Fades content up as it enters the viewport. Runs once per element so the page
 * settles instead of re-animating on every scroll pass.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const still = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={still ? { duration: 0 } : { duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const stillContainerVariants: Variants = {
  hidden: {},
  shown: {},
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

// Same hidden state as the animated variant — only the timing differs — so the
// inline style React renders on the server matches the client either way.
const stillItemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  shown: { opacity: 1, y: 0, transition: { duration: 0 } },
};

/** Parent for grids and lists whose children should land one after another. */
export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  const still = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={still ? stillContainerVariants : containerVariants}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const still = useReducedMotion();

  return (
    <motion.div className={className} variants={still ? stillItemVariants : itemVariants}>
      {children}
    </motion.div>
  );
}
