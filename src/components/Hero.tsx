"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { SITE } from "@/site";
import type { Dictionary } from "@/i18n/dictionaries";
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
      {/* Stage rig: a truss overhead, two lamps aimed at the logo. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="truss absolute inset-x-0 top-0" />
        <div className="beam absolute left-[38%] top-0 h-[92%] w-[52%] animate-beam-sway opacity-60 md:opacity-100" />
        <div className="beam absolute left-[62%] top-0 h-[88%] w-[44%] animate-beam-sway-alt opacity-50 md:opacity-100" />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(90% 60% at 50% 40%, transparent, rgba(8,8,10,0.85))",
          }}
        />
      </div>

      <div className="container-site relative z-[2] pb-20 pt-16 md:pb-24 md:pt-20">
        <motion.div {...rise(0)} className="relative mx-auto w-[78%] max-w-[400px] sm:max-w-[440px]">
          <div aria-hidden className="absolute -inset-8 rounded-full bg-amber/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src="/logo.jpg"
              alt="SD Light and Sound"
              width={460}
              height={460}
              priority
              className="w-full"
            />
            {/* The reduced-motion media query stops this sweep in CSS, so it can
                render unconditionally. */}
            <span
              aria-hidden
              className="absolute inset-y-0 -left-1/3 w-1/3 animate-sheen bg-gradient-to-r from-transparent via-white/35 to-transparent"
            />
          </div>
        </motion.div>

        <h1 className="h1 mx-auto mt-9 max-w-[18ch]">
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
