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
    import('@typeform/embed');
    setTimeout(() => {
      setRevealed(true);
      setDecrypting(false);
      openTypeform();
    }, 1400);
  };

  const display = decrypting ? "Authenticating…" : revealed ? "Application Opened" : label;

  return (
    <motion.button
      onClick={handleClick}
      aria-label="Start Luxora application"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={SPRING}
      className="relative overflow-hidden rounded-full bg-[var(--color-gold)] px-10 py-5 text-sm font-bold uppercase tracking-[0.26em] text-[var(--color-obsidian)] shadow-[0_0_36px_rgba(212,175,55,0.42)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] sm:px-14 sm:py-6 sm:text-base sm:tracking-[0.3em]"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <span className="relative z-10">{display}</span>
      <AnimatePresence>
        {decrypting && (
          <motion.span
            key="shimmer"
            className="pointer-events-none absolute inset-y-0 left-0 w-1/2"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)",
            }}
            initial={{ x: "-100%" }}
            animate={{ x: "300%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "linear" }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}
