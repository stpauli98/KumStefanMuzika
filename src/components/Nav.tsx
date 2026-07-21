"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import LangSwitcher from "./LangSwitcher";

export default function Nav({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const still = useReducedMotion();
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const links = [
    { href: "#diensten", label: dict.nav.diensten },
    { href: "#materiaal", label: dict.nav.materiaal },
    { href: "#realisaties", label: dict.nav.realisaties },
    { href: "#over", label: dict.nav.over },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page, trap focus, and let Escape out while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !drawerRef.current) return;
      const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ease-stage ${
        scrolled
          ? "border-b border-white/[0.07] bg-void/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div
        className={`container-site flex items-center gap-3 transition-all duration-300 ease-stage md:gap-5 ${
          scrolled ? "h-14" : "h-16"
        }`}
      >
        <Link
          href={`/${lang}`}
          className="mr-auto flex items-baseline gap-2 rounded-md py-1"
          aria-label="SD Light and Sound"
        >
          <span className="font-display text-[22px] font-extrabold text-chrome">SD</span>
          <span className="hidden font-display text-[9px] font-semibold tracking-[0.28em] text-rook sm:inline">
            LIGHT AND SOUND
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative py-1 text-sm text-[#C7C2B7] transition-colors duration-200 hover:text-amber"
            >
              {l.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-amber transition-transform duration-300 ease-stage group-hover:scale-x-100" />
            </a>
          ))}
        </div>

        <LangSwitcher lang={lang} />

        <a href="#offerte" className="btn btn-primary hidden px-4 py-2 text-[13px] md:inline-flex">
          {dict.nav.cta}
        </a>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Menu"
          className="-mr-1 flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 md:hidden"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 block h-px w-full bg-zand transition-all duration-300 ease-stage ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-px w-full bg-zand transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-full bg-zand transition-all duration-300 ease-stage ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            initial={still ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={still ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full border-b border-white/[0.07] bg-void/95 backdrop-blur-xl md:hidden"
          >
            <div ref={drawerRef} className="container-site flex flex-col py-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/[0.05] py-3.5 text-[15px] text-[#C7C2B7] transition-colors hover:text-amber"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#offerte"
                onClick={() => setOpen(false)}
                className="btn btn-primary mt-4 w-full"
              >
                {dict.nav.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
