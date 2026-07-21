"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { MouseEvent } from "react";

/**
 * The hero visual: a truss of moving heads throwing beams down onto the
 * wordmark. Drawn in SVG and CSS rather than shipped as an image so it stays
 * sharp at any size and can actually move.
 */

// Fixture positions across the truss. Every head aims inward, so the beams
// converge on the wordmark the way a real rig lights a performer.
const FIXTURES = [
  { x: 10, aim: 17, sway: 4.5, period: 13 },
  { x: 30, aim: 8, sway: 3.5, period: 9.5 },
  { x: 50, aim: 0, sway: 2.5, period: 11 },
  { x: 70, aim: -8, sway: 3.5, period: 10.2 },
  { x: 90, aim: -17, sway: 4.5, period: 12.4 },
];

function MovingHead() {
  return (
    <svg width="26" height="30" viewBox="0 0 26 30" fill="none" aria-hidden>
      {/* clamp onto the truss */}
      <rect x="10" y="0" width="6" height="4" rx="1" fill="#6E747C" />
      {/* yoke */}
      <path d="M5 4v11M21 4v11M5 4h16" stroke="#8A9099" strokeWidth="1.6" />
      {/* head */}
      <rect x="6" y="11" width="14" height="13" rx="2.5" fill="#2B2E34" stroke="#767C85" strokeWidth="1.2" />
      {/* lens */}
      <ellipse cx="13" cy="24" rx="5.5" ry="2.6" fill="#F5C56B" />
      <ellipse cx="13" cy="24" rx="5.5" ry="2.6" fill="url(#lensGlow)" />
      <defs>
        <radialGradient id="lensGlow">
          <stop offset="0%" stopColor="#FFF3DC" />
          <stop offset="100%" stopColor="#F0A93C" stopOpacity="0.2" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default function LightRig() {
  const still = useReducedMotion();

  // Pointer nudges the whole rig a couple of degrees — enough to feel like the
  // operator is following you, not enough to notice as an effect.
  const pointer = useMotionValue(0);
  const tilt = useSpring(pointer, { stiffness: 60, damping: 20 });
  const rigTilt = useTransform(tilt, [-1, 1], [3, -3]);

  function track(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    pointer.set(((e.clientX - r.left) / r.width) * 2 - 1);
  }

  return (
    <div
      onMouseMove={still ? undefined : track}
      onMouseLeave={still ? undefined : () => pointer.set(0)}
      className="relative mx-auto w-full max-w-[860px] select-none"
      style={{ height: "clamp(280px, 42vw, 440px)" }}
    >
      {/* haze the beams cut through */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[-10%] top-8 bottom-0"
        style={{
          background: "radial-gradient(60% 70% at 50% 30%, rgba(245,197,107,0.07), transparent 70%)",
        }}
      />

      {/* truss */}
      <svg
        aria-hidden
        viewBox="0 0 400 22"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 h-[22px] w-full text-[#9AA0A8]"
      >
        <path d="M0 3h400M0 19h400" stroke="currentColor" strokeWidth="1.4" opacity="0.75" />
        <path
          d="M0 19 8 3 16 19 24 3 32 19 40 3 48 19 56 3 64 19 72 3 80 19 88 3 96 19 104 3 112 19 120 3 128 19 136 3 144 19 152 3 160 19 168 3 176 19 184 3 192 19 200 3 208 19 216 3 224 19 232 3 240 19 248 3 256 19 264 3 272 19 280 3 288 19 296 3 304 19 312 3 320 19 328 3 336 19 344 3 352 19 360 3 368 19 376 3 384 19 392 3 400 19"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        />
      </svg>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{ rotate: rigTilt, transformOrigin: "50% 0%" }}
      >
        {FIXTURES.map((f, i) => (
          <div key={f.x} className="absolute top-[14px]" style={{ left: `${f.x}%` }}>
            <div className="-translate-x-1/2">
              <MovingHead />
            </div>

            {/* the beam: pinned to the lens, swinging on its own cycle */}
            <motion.div
              className="absolute left-0 top-[26px] origin-top"
              style={{
                width: "clamp(160px, 26vw, 280px)",
                height: "clamp(260px, 40vw, 420px)",
                marginLeft: "calc(clamp(160px, 26vw, 280px) / -2)",
                clipPath: "polygon(47% 0, 53% 0, 96% 100%, 4% 100%)",
                background:
                  "linear-gradient(180deg, rgba(255,232,190,0.5), rgba(240,169,60,0.12) 30%, rgba(240,169,60,0.04) 55%, transparent 78%)",
                filter: "blur(13px)",
              }}
              initial={{ rotate: f.aim }}
              animate={
                still
                  ? { rotate: f.aim }
                  : { rotate: [f.aim - f.sway, f.aim + f.sway, f.aim - f.sway] }
              }
              transition={
                still
                  ? { duration: 0 }
                  : { duration: f.period, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }
              }
            />
          </div>
        ))}
      </motion.div>

      {/* pool of light on the floor, under the wordmark */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[12%] left-1/2 h-[80px] w-[70%] -translate-x-1/2 rounded-[50%] blur-2xl"
        style={{ background: "radial-gradient(closest-side, rgba(240,169,60,0.22), transparent)" }}
      />

      {/* the wordmark, standing in the light */}
      <div className="absolute inset-x-0 bottom-[14%] z-10 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[130%] w-[80%] -translate-x-1/2 -translate-y-1/2 blur-2xl"
          style={{
            background: "radial-gradient(closest-side, rgba(245,197,107,0.16), transparent)",
          }}
        />
        <div
          className="relative font-display font-extrabold leading-none text-chrome"
          style={{ fontSize: "clamp(3.5rem, 2rem + 8vw, 7rem)", fontVariationSettings: '"wdth" 125' }}
        >
          SD
        </div>
        <div className="relative mt-2 font-mono text-[clamp(0.7rem,0.55rem+0.5vw,0.95rem)] font-medium uppercase tracking-[0.42em] text-zand/75">
          Light and Sound
        </div>
      </div>
    </div>
  );
}
