"use client";

import { motion, useReducedMotion } from "motion/react";
import { SITE } from "@/site";
import type { Dictionary } from "@/i18n/dictionaries";
import LightRig from "./LightRig";
import PoweredBy from "./PoweredBy";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero({ dict }: { dict: Dictionary }) {
  const still = useReducedMotion();
  const words = dict.hero.slogan.split(" ");

  // Reduced motion collapses the timings; the markup stays identical so the
  // server render and the client hydration always agree.
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: still ? { duration: 0 } : { duration: 0.7, delay, ease: EASE },
  });

  return (
    <header
      id="top"
      className="relative overflow-hidden text-center"
      style={{
        background: "radial-gradient(120% 70% at 50% -10%, #1c1a16 0%, #08080A 62%)",
      }}
    >
      {/* Vignette so the beams fall off into the dark at the edges. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(95% 65% at 50% 35%, transparent, rgba(8,8,10,0.8))",
        }}
      />

      <div className="container-site relative z-[2] pb-20 pt-10 md:pb-24 md:pt-12">
        <motion.div {...rise(0)}>
          <LightRig />
        </motion.div>

        <h1 className="h1 mx-auto mt-4 max-w-[18ch]">
          {words.map((w, i) => (
            <motion.span
              key={`${w}-${i}`}
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                still ? { duration: 0 } : { duration: 0.6, delay: 0.25 + i * 0.06, ease: EASE }
              }
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          ))}
        </h1>

        <motion.p {...rise(0.45)} className="lead mx-auto mt-5 max-w-[58ch]">
          {dict.hero.sub}
        </motion.p>

        <motion.div {...rise(0.55)} className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="#offerte" className="btn btn-primary">
            {dict.hero.cta1}
          </a>
          <a
            href={`https://wa.me/${SITE.whatsapp}`}
            className="btn btn-ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            {dict.hero.cta2}
          </a>
        </motion.div>

        <motion.div {...rise(0.65)} className="mt-10">
          <PoweredBy />
        </motion.div>

        <div aria-hidden className="mt-12 flex justify-center">
          <span className="h-10 w-px animate-cue-pulse bg-gradient-to-b from-amber/70 to-transparent" />
        </div>
      </div>
    </header>
  );
}
