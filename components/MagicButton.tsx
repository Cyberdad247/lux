"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const SPRING = { type: "spring" as const, stiffness: 100, damping: 30 };

interface MagicButtonProps {
  href?: string;
  onClick?: () => void;
  label?: string;
}

export default function MagicButton({
  href = "#apply",
  onClick,
  label = "REQUEST ACCESS",
}: MagicButtonProps) {
  const [decrypting, setDecrypting] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const handleClick = () => {
    if (decrypting || revealed) return;
    setDecrypting(true);
    setTimeout(() => {
      setRevealed(true);
      setDecrypting(false);
      onClick?.();
      if (href && href !== "#apply") window.location.href = href;
    }, 1400);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Shield + pulse rings */}
      <motion.button
        onClick={handleClick}
        aria-label="Request Luxora Access"
        className="relative flex items-center justify-center w-28 h-28 rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.97 }}
        transition={SPRING}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {/* Outer pulse ring */}
        <motion.span
          className="absolute inset-0 rounded-full border border-[#D4AF37]/40"
          animate={decrypting ? {} : { scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Mid pulse ring */}
        <motion.span
          className="absolute inset-2 rounded-full border border-[#D4AF37]/25"
          animate={decrypting ? {} : { scale: [1, 1.25, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />

        {/* Glass backing disc */}
        <div className="glass absolute inset-3 rounded-full" />

        {/* Luxora Shield — swap /assets/shield.png when 3539.png is placed */}
        <div className="relative z-10 w-14 h-14 flex items-center justify-center">
          <Image
            src="/assets/shield.png"
            alt="Luxora Shield"
            width={56}
            height={56}
            className="object-contain drop-shadow-[0_0_12px_rgba(212,175,55,0.6)]"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          {/* Fallback geometric shield */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 56 56"
            fill="none"
          >
            <path
              d="M28 4 L50 14 L50 30 C50 42 28 52 28 52 C28 52 6 42 6 30 L6 14 Z"
              stroke="#D4AF37"
              strokeWidth="1.5"
              fill="rgba(212,175,55,0.08)"
            />
            <path
              d="M28 12 L42 20 L42 31 C42 39 28 46 28 46 C28 46 14 39 14 31 L14 20 Z"
              stroke="#D4AF37"
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
                  background:
                    "conic-gradient(from 0deg, #D4AF37 0%, transparent 60%)",
                  opacity: 0.6,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.4, ease: "linear" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* CTA Label — mask-wipe reveal on mount */}
      <motion.div
        className="flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SPRING, delay: 0.6 }}
      >
        <motion.span
          className="text-xs tracking-[0.35em] text-[#D4AF37] uppercase font-medium"
          animate={decrypting ? { opacity: [1, 0.3, 1] } : {}}
          transition={{ duration: 0.4, repeat: decrypting ? Infinity : 0 }}
        >
          {decrypting ? "AUTHENTICATING..." : label}
        </motion.span>
        <span className="text-[10px] tracking-widest text-white/30 uppercase">
          {revealed ? "ACCESS GRANTED" : "Sovereign Merchants Only"}
        </span>
      </motion.div>
    </div>
  );
}
