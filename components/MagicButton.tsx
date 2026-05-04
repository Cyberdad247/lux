"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { openTypeform } from "@/lib/typeformPopup";

const SPRING = { type: "spring" as const, stiffness: 100, damping: 30 };

interface MagicButtonProps {
  label?: string;
}

export default function MagicButton({ label = "REQUEST ACCESS" }: MagicButtonProps) {
  const [decrypting, setDecrypting] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const handleClick = () => {
    if (decrypting || revealed) return;
    setDecrypting(true);
    // Pre-warm the module during the animation so popup is instant at 1.4s
    import('@typeform/embed');
    setTimeout(() => {
      setRevealed(true);
      setDecrypting(false);
      openTypeform();
    }, 1400);
  };

  return (
    <div className="flex flex-col items-center gap-3 sm:gap-6">
      <button
        onClick={handleClick}
        aria-label="Start Luxora application"
        className="rounded-full bg-[var(--color-gold)] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-obsidian)] shadow-[0_0_28px_rgba(212,175,55,0.32)] transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] sm:hidden"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {decrypting ? "Opening..." : label}
      </button>

      {/* Shield + pulse rings */}
      <motion.button
        onClick={handleClick}
        aria-label="Start Luxora application"
        className="relative hidden cursor-pointer items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] sm:flex sm:h-28 sm:w-28"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.97 }}
        transition={SPRING}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {/* Outer pulse ring */}
        <motion.span
          className="absolute inset-0 rounded-full border border-[var(--color-gold)]/40"
          animate={decrypting ? {} : { scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Mid pulse ring */}
        <motion.span
          className="absolute inset-2 rounded-full border border-[var(--color-gold)]/25"
          animate={decrypting ? {} : { scale: [1, 1.25, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />

        {/* Glass backing disc */}
        <div className="glass absolute inset-2 rounded-full sm:inset-3" />

        {/* Luxora Shield SVG */}
        <div className="relative z-10 flex h-10 w-10 items-center justify-center drop-shadow-[0_0_12px_rgba(212,175,55,0.6)] sm:h-14 sm:w-14">
          <svg
            className="w-full h-full"
            viewBox="0 0 56 56"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M28 4 L50 14 L50 30 C50 42 28 52 28 52 C28 52 6 42 6 30 L6 14 Z"
              stroke="var(--color-gold)"
              strokeWidth="1.5"
              fill="rgba(212,175,55,0.08)"
            />
            <path
              d="M28 12 L42 20 L42 31 C42 39 28 46 28 46 C28 46 14 39 14 31 L14 20 Z"
              stroke="var(--color-gold)"
              strokeWidth="0.8"
              strokeOpacity="0.4"
              fill="none"
            />
          </svg>
        </div>

        {/* Decryption overlay */}
        <AnimatePresence>
          {decrypting && (
            <motion.div
              className="absolute inset-0 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, var(--color-gold) 0%, transparent 60%)",
                  opacity: 0.6,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.4, ease: "linear" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* CTA Label */}
      <motion.div
        className="hidden flex-col items-center gap-2 sm:flex"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SPRING, delay: 0.6 }}
      >
        <motion.span
          className="text-xs tracking-[0.35em] text-[var(--color-gold)] uppercase font-medium"
          animate={decrypting ? { opacity: [1, 0.3, 1] } : {}}
          transition={{ duration: 0.4, repeat: decrypting ? Infinity : 0 }}
        >
          {decrypting ? "AUTHENTICATING..." : label}
        </motion.span>
        <span className="text-[10px] tracking-widest text-white/30 uppercase">
          {revealed ? "APPLICATION OPENED" : "Secure application"}
        </span>
      </motion.div>
    </div>
  );
}
