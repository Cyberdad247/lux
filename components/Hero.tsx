"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import LiquidKinetic from "./LiquidKinetic";
import WebGLHero from "./WebGLHero";

export default function Hero({ children }: { children?: React.ReactNode }) {
  const leakRef  = useRef<HTMLDivElement>(null);
  const carRef   = useRef<HTMLDivElement>(null);

  // Smooth mouse-tracked values for car parallax
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 40, damping: 30 });
  const springY = useSpring(rawY, { stiffness: 40, damping: 30 });
  const carX = useTransform(springX, [-1, 1], [-18, 18]);
  const carY = useTransform(springY, [-1, 1], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      const nx = (e.clientX / w - 0.5) * 2;   // -1 → 1
      const ny = (e.clientY / h - 0.5) * 2;

      rawX.set(nx);
      rawY.set(ny);

      // Light leak follows cursor
      if (leakRef.current) {
        const x = (e.clientX / w) * 100;
        const y = (e.clientY / h) * 100;
        leakRef.current.style.background = `
          radial-gradient(ellipse 70% 55% at ${x}% ${y}%,
            rgba(212,175,55,0.16) 0%,
            rgba(212,175,55,0.05) 40%,
            transparent 70%),
          radial-gradient(ellipse 45% 40% at ${100 - x}% ${100 - y}%,
            rgba(212,175,55,0.06) 0%,
            transparent 60%)
        `;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [rawX, rawY]);

  return (
    <>
    <LiquidKinetic />
    <section className="relative min-h-[92svh] sm:min-h-screen flex flex-col items-center justify-center overflow-hidden py-16 sm:py-20">
      <header className="absolute right-4 top-4 z-20 sm:right-6 sm:top-6">
        <div className="flex flex-col items-end gap-2 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-[10px] tracking-[0.3em] uppercase text-white/45">Instant global payments</div>
              <span className="text-[11px] tracking-[0.18em] text-[var(--color-gold)]">
                Dealerships and high-ticket retailers
              </span>
            </div>
          </div>
          <div className="text-right text-[9px] tracking-[0.24em] uppercase text-white/30">
            Currently onboarding select U.S. businesses
          </div>
        </div>
      </header>

      {/* 600ms sovereign wipe — black panel reveals on mount */}
      <motion.div
        className="absolute inset-0 bg-[#000000] pointer-events-none origin-left"
        style={{ zIndex: 30 }}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1], delay: 0.05 }}
      />

      {/* Obsidian base */}
      <div className="absolute inset-0 bg-[var(--color-obsidian)]" />

      {/* Gold particle field — Canvas 2D, 80 particles, 60fps */}
      <WebGLHero />

      {/* ── CAR LAYER — Ken Burns drift + mouse parallax ── */}
      <motion.div
        ref={carRef}
        className="absolute inset-[-10%] bg-cover bg-[center_58%] opacity-95"
        style={{
          backgroundImage: "url('/assets/hero-bg.png')",
          x: carX,
          y: carY,
        }}
        animate={{
          scale: [1.0, 1.07, 1.03, 1.07, 1.0],
          x:     [0,    -14,   6,   -8,    0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.3, 0.55, 0.8, 1],
        }}
      />

      {/* Exposure layer — makes car pop without blowing highlights */}
      <div className="absolute inset-0 opacity-55 bg-gradient-to-t from-transparent via-[var(--color-gold)]/04 to-transparent" />

      {/* Cinematic vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-obsidian)]/70 via-transparent to-[var(--color-obsidian)]/92" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-obsidian)]/60 via-transparent to-[var(--color-obsidian)]/60" />

      {/* Floor reflection shimmer — wet surface under the car */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[30%] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(212,175,55,0.07) 0%, transparent 100%)",
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        className="absolute inset-x-0 bottom-0 h-[42%] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 68% 42% at 50% 100%, rgba(212,175,55,0.20) 0%, rgba(212,175,55,0.08) 42%, transparent 72%)",
          filter: "blur(1px)",
        }}
      />

      {/* ── LENS FLARE — diagonal sweep across car body ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: "3px",
          top: "-20%",
          bottom: "-20%",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(212,175,55,0.55) 40%, rgba(255,255,255,0.3) 50%, rgba(212,175,55,0.55) 60%, transparent 100%)",
          filter: "blur(3px)",
          transform: "rotate(25deg)",
          transformOrigin: "center",
        }}
        animate={{ left: ["-10%", "110%"] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeIn",
          repeatDelay: 7,
        }}
      />

      {/* Secondary flare — softer, wider, offset timing */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: "80px",
          top: "-20%",
          bottom: "-20%",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(212,175,55,0.08) 50%, transparent 100%)",
          filter: "blur(18px)",
          transform: "rotate(25deg)",
          transformOrigin: "center",
        }}
        animate={{ left: ["-15%", "115%"] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeIn",
          repeatDelay: 7,
        }}
      />

      {/* Gold scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.5) 50%, transparent 100%)",
        }}
        animate={{ top: ["-2px", "100vh"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
      />

      {/* Mouse light leak */}
      <div
        ref={leakRef}
        className="absolute inset-0 pointer-events-none transition-[background] duration-150"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(212,175,55,0.10) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {children}
      </div>
    </section>
    </>
  );
}
